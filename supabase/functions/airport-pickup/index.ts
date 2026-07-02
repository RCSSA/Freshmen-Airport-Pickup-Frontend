import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

type StudentPayload = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  wechat?: string;
  airport: "IAH" | "HOU";
  arriving_time: string;
  flight_number?: string;
};

type VolunteerPayload = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  wechat?: string;
};

type LoginPayload = {
  firstname: string;
  lastname: string;
  email: string;
};

type MatchPayload = {
  date: string;
  hour: string;
  airport: "IAH" | "HOU";
  number: number;
  vol_email: string;
};

type DeleteStudentPayload = {
  firstname: string;
  lastname: string;
  email: string;
};

type DeleteMatchPayload = {
  stud_email: string;
  vol_email: string;
};

const hourLabels = Array.from({ length: 12 }, (_, index) => {
  const start = index * 2;
  const end = start + 2;
  return `${String(start).padStart(2, "0")}:00-${String(end).padStart(2, "0")}:00`;
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    switch (action) {
      case "get_all":
        return json(await getAll());
      case "insert_student":
        return json(await insertStudent(await parseBody<StudentPayload>(req)));
      case "insert_new_vol":
        return json(await insertVolunteer(await parseBody<VolunteerPayload>(req)));
      case "student_login_search":
        return json(await studentLoginSearch(await parseBody<LoginPayload>(req)));
      case "volunteer_login_search":
        return json(await volunteerLoginSearch(await parseBody<LoginPayload>(req)));
      case "match":
        return json(await matchStudents(await parseBody<MatchPayload>(req)));
      case "delete_student":
        return json(await deleteStudent(await parseBody<DeleteStudentPayload>(req)));
      case "delete_match_from_volunteer":
        return json(await deleteMatchFromVolunteer(await parseBody<DeleteMatchPayload>(req)));
      case "notify_confirmed":
        return json(await notifyConfirmedVolunteers());
      default:
        return json({ status: false, message: "Unknown action" }, 400);
    }
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Server error";
    return json({ status: false, message }, 500);
  }
});

async function parseBody<T>(req: Request): Promise<T> {
  const raw = await req.text();
  if (!raw) return {} as T;
  return JSON.parse(raw) as T;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function cleanEmail(value: unknown) {
  return clean(value).toLowerCase();
}

function assertRequired(data: Record<string, unknown>, fields: string[]) {
  for (const field of fields) {
    if (!clean(data[field])) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

async function insertStudent(data: StudentPayload) {
  assertRequired(data as unknown as Record<string, unknown>, [
    "firstname",
    "lastname",
    "phone",
    "email",
    "airport",
    "arriving_time",
  ]);

  const email = cleanEmail(data.email);
  const { data: existing, error: existingError } = await supabase
    .from("students")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing) return { status: false, message: "Student already exists" };

  const { error } = await supabase.from("students").insert({
    firstname: clean(data.firstname),
    lastname: clean(data.lastname),
    phone: clean(data.phone),
    email,
    wechat: clean(data.wechat),
    airport: data.airport,
    arriving_time: new Date(data.arriving_time).toISOString(),
    flight_number: clean(data.flight_number),
  });

  if (error) throw error;
  await sendEmail(studentSignupEmail(data.firstname, data.lastname, email));
  return { status: true, message: "done post" };
}

async function insertVolunteer(data: VolunteerPayload) {
  assertRequired(data as unknown as Record<string, unknown>, [
    "firstname",
    "lastname",
    "phone",
    "email",
  ]);

  const email = cleanEmail(data.email);
  const { data: existing, error: existingError } = await supabase
    .from("volunteers")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing) return { status: false, message: "Volunteer already exists" };

  const { error } = await supabase.from("volunteers").insert({
    firstname: clean(data.firstname),
    lastname: clean(data.lastname),
    phone: clean(data.phone),
    email,
    wechat: clean(data.wechat),
  });

  if (error) throw error;
  await sendEmail(volunteerSignupEmail(data.firstname, data.lastname, email));
  return { status: true, message: "done post" };
}

async function studentLoginSearch(data: LoginPayload) {
  const email = cleanEmail(data.email);
  const { data: student, error } = await supabase
    .from("students")
    .select("id, firstname, lastname, email, wechat, airport, arriving_time, flight_number")
    .eq("email", email)
    .ilike("firstname", clean(data.firstname))
    .ilike("lastname", clean(data.lastname))
    .maybeSingle();

  if (error) throw error;

  const returnValue = {
    found: false,
    confirmed: true,
    record: {},
    wechat: "",
    airport: "",
    arriving_time: "",
    flight_number: "",
  };

  if (!student) return returnValue;

  returnValue.found = true;
  returnValue.wechat = student.wechat ?? "";
  returnValue.airport = student.airport ?? "";
  returnValue.arriving_time = student.arriving_time ?? "";
  returnValue.flight_number = student.flight_number ?? "";

  const { data: match, error: matchError } = await supabase
    .from("matches")
    .select("volunteer_id")
    .eq("student_id", student.id)
    .maybeSingle();

  if (matchError) throw matchError;
  if (match?.volunteer_id) {
    const { data: volunteer, error: volunteerError } = await supabase
      .from("volunteers")
      .select("firstname, lastname, phone, email, wechat")
      .eq("id", match.volunteer_id)
      .maybeSingle();

    if (volunteerError) throw volunteerError;
    if (!volunteer) return returnValue;

    returnValue.record = {
      vol_firstname: volunteer.firstname,
      vol_lastname: volunteer.lastname,
      vol_phone: volunteer.phone,
      vol_email: volunteer.email,
      vol_wechat: volunteer.wechat,
    };
  }

  return returnValue;
}

async function volunteerLoginSearch(data: LoginPayload) {
  const email = cleanEmail(data.email);
  const { data: volunteer, error } = await supabase
    .from("volunteers")
    .select("id, firstname, lastname, email, confirmed")
    .eq("email", email)
    .ilike("firstname", clean(data.firstname))
    .ilike("lastname", clean(data.lastname))
    .maybeSingle();

  if (error) throw error;

  const returnValue = {
    found: false,
    confirmed: false,
    record: [] as unknown[],
  };

  if (!volunteer) return returnValue;

  returnValue.found = true;
  returnValue.confirmed = Boolean(volunteer.confirmed);

  if (!returnValue.confirmed) return returnValue;

  const { data: matches, error: matchesError } = await supabase
    .from("matches")
    .select("student:students(firstname, lastname, phone, email, wechat, airport, arriving_time, flight_number)")
    .eq("volunteer_id", volunteer.id)
    .order("matched_at", { ascending: true });

  if (matchesError) throw matchesError;

  returnValue.record = (matches ?? [])
    .map((match) => Array.isArray(match.student) ? match.student[0] : match.student)
    .filter(Boolean)
    .map((student) => ({
      firstname: student.firstname,
      lastname: student.lastname,
      phone: student.phone,
      email: student.email,
      wechat: student.wechat,
      airport: student.airport,
      arriving_time: student.arriving_time,
      flight_number: student.flight_number,
    }));

  return returnValue;
}

async function getAll() {
  const { data, error } = await supabase
    .from("matches")
    .select("student:students(airport, arriving_time)")
    .is("volunteer_id", null);

  if (error) throw error;

  const events: Record<string, Record<string, unknown>> = {};

  for (const row of data ?? []) {
    const student = Array.isArray(row.student) ? row.student[0] : row.student;
    if (!student?.arriving_time || !student?.airport) continue;

    const { date, hour } = houstonDateHour(student.arriving_time);
    const hourLabel = hourLabels[Math.floor(hour / 2)];
    const airport = student.airport as "IAH" | "HOU";

    if (!events[date]) events[date] = createDateStructure(date);
    const airportBucket = events[date][airport] as Record<string, number>;
    airportBucket.TotalToBePicked += 1;
    airportBucket[hourLabel] += 1;
  }

  for (const date of Object.keys(events)) {
    for (const airport of ["IAH", "HOU"] as const) {
      const airportBucket = events[date][airport] as Record<string, number>;
      for (const key of Object.keys(airportBucket)) {
        if (key !== "TotalToBePicked" && airportBucket[key] === 0) {
          delete airportBucket[key];
        }
      }
      if (airportBucket.TotalToBePicked === 0) {
        delete events[date][airport];
      }
    }
  }

  return { status: true, events };
}

async function matchStudents(data: MatchPayload) {
  const [start, end] = parseHourRange(data.hour);
  const { data: result, error } = await supabase.rpc("allocate_matches", {
    p_date: data.date,
    p_start_hour: start,
    p_end_hour: end,
    p_airport: data.airport,
    p_number: Number(data.number),
    p_vol_email: cleanEmail(data.vol_email),
  });

  if (error) throw error;

  const row = Array.isArray(result) ? result[0] : result;
  const numAllocated = row?.num_allocated ?? 0;

  if (numAllocated > 0) {
    await notifyNewMatches(row?.match_ids ?? []);
  }

  return {
    num_allocated: numAllocated,
    has_reached_limit: Boolean(row?.has_reached_limit),
  };
}

async function deleteStudent(data: DeleteStudentPayload) {
  const email = cleanEmail(data.email);
  const { data: student, error } = await supabase
    .from("students")
    .select("id, firstname, lastname, email")
    .eq("email", email)
    .ilike("firstname", clean(data.firstname))
    .ilike("lastname", clean(data.lastname))
    .maybeSingle();

  if (error) throw error;
  if (!student) return { status: false };

  const { data: match, error: matchError } = await supabase
    .from("matches")
    .select("volunteer_id")
    .eq("student_id", student.id)
    .maybeSingle();

  if (matchError) throw matchError;

  let volunteer = null;
  if (match?.volunteer_id) {
    const { data: volunteerData, error: volunteerError } = await supabase
      .from("volunteers")
      .select("firstname, lastname, email")
      .eq("id", match.volunteer_id)
      .maybeSingle();

    if (volunteerError) throw volunteerError;
    volunteer = volunteerData;
  }

  const { error: deleteError } = await supabase
    .from("students")
    .delete()
    .eq("id", student.id);

  if (deleteError) throw deleteError;

  await log("INFO", `STUDENT DELETED : ${student.firstname} ${student.lastname}`, { student_id: student.id });
  await sendEmail(studentDeleteEmail(student.firstname, student.lastname, student.email));

  if (volunteer?.email) {
    await sendEmail(studentDeletedVolunteerEmail(
      student.firstname,
      student.lastname,
      volunteer.firstname,
      volunteer.lastname,
      volunteer.email,
    ));
  }

  return { status: true };
}

async function deleteMatchFromVolunteer(data: DeleteMatchPayload) {
  const studentEmail = cleanEmail(data.stud_email);
  const volunteerEmail = cleanEmail(data.vol_email);

  const { data: student, error: studentError } = await supabase
    .from("students")
    .select("id, firstname, lastname, email")
    .eq("email", studentEmail)
    .maybeSingle();

  if (studentError) throw studentError;
  if (!student) return { status: false };

  const { data: volunteer, error: volunteerError } = await supabase
    .from("volunteers")
    .select("id, firstname, lastname, email")
    .eq("email", volunteerEmail)
    .maybeSingle();

  if (volunteerError) throw volunteerError;
  if (!volunteer) return { status: false };

  const { data: match, error: matchError } = await supabase
    .from("matches")
    .select("id")
    .eq("student_id", student.id)
    .eq("volunteer_id", volunteer.id)
    .maybeSingle();

  if (matchError) throw matchError;
  if (!match) return { status: false };

  const { error: updateError } = await supabase
    .from("matches")
    .update({ volunteer_id: null, matched_at: null })
    .eq("id", match.id);

  if (updateError) throw updateError;

  await log("INFO", `VOL UNMATCHED : Student: ${student.firstname} ${student.lastname}, Volunteer: ${volunteer.firstname} ${volunteer.lastname}`, {
    match_id: match.id,
  });

  await sendEmail(matchDeletedStudentEmail(student.firstname, student.lastname, volunteer.firstname, volunteer.lastname, student.email));
  await sendEmail(matchDeletedVolunteerEmail(student.firstname, student.lastname, volunteer.firstname, volunteer.lastname, volunteer.email));

  return { status: true };
}

async function notifyConfirmedVolunteers() {
  const { data: volunteers, error } = await supabase
    .from("volunteers")
    .select("id, firstname, lastname, email")
    .eq("confirmed", true)
    .eq("notified", false);

  if (error) throw error;

  let notified = 0;
  for (const v of volunteers ?? []) {
    const ok = await sendEmail(volunteerConfirmedEmail(v.firstname, v.lastname, v.email));
    if (!ok) continue; // 发失败就不标记，下次还能补发
    const { error: updateError } = await supabase
      .from("volunteers")
      .update({ notified: true })
      .eq("id", v.id);
    if (updateError) throw updateError;
    notified += 1;
  }

  await log("INFO", `CONFIRMED VOLUNTEERS NOTIFIED : ${notified}`, { notified });
  return { status: true, notified };
}

function createDateStructure(date: string) {
  const structure: Record<string, unknown> = {
    date,
    IAH: { TotalToBePicked: 0 },
    HOU: { TotalToBePicked: 0 },
  };

  for (const hourLabel of hourLabels) {
    (structure.IAH as Record<string, number>)[hourLabel] = 0;
    (structure.HOU as Record<string, number>)[hourLabel] = 0;
  }

  return structure;
}

function houstonDateHour(value: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(value));

  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? "";
  return {
    date: `${part("year")}-${part("month")}-${part("day")}`,
    hour: Number(part("hour")),
  };
}

function parseHourRange(hour: string) {
  const match = /^(\d{2}):00-(\d{2}):00$/.exec(hour);
  if (!match) throw new Error(`Invalid hour range: ${hour}`);
  return [Number(match[1]), Number(match[2])];
}

async function notifyNewMatches(matchIds: number[]) {
  if (matchIds.length === 0) return;

  const { data: matches, error } = await supabase
    .from("matches")
    .select("student:students(firstname, lastname, email), volunteer:volunteers(firstname, lastname, email, wechat)")
    .in("id", matchIds)
    .order("matched_at", { ascending: false });

  if (error) throw error;

  for (const match of matches ?? []) {
    const student = Array.isArray(match.student) ? match.student[0] : match.student;
    const volunteer = Array.isArray(match.volunteer) ? match.volunteer[0] : match.volunteer;
    if (!student || !volunteer) continue;
    await sendEmail(newMatchStudentEmail(
      student.firstname,
      student.lastname,
      volunteer.firstname,
      volunteer.lastname,
      student.email,
      volunteer.email,
      volunteer.wechat,
    ));
  }
}

async function log(level: string, message: string, metadata: Record<string, unknown> = {}) {
  const { error } = await supabase.from("app_logs").insert({ level, message, metadata });
  if (error) console.error(error);
}

type EmailMessage = {
  to: string;
  subject: string;
  body: string;
};

async function sendEmail(message: EmailMessage): Promise<boolean> {
  const webhookUrl = Deno.env.get("GOOGLE_EMAIL_WEBHOOK_URL");

  if (!webhookUrl) {
    console.log(`Email skipped: ${message.subject} -> ${message.to}`);
    return false;
  }

  const url = new URL(webhookUrl);
  url.searchParams.set("action", "send_email");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: message.to,
      subject: message.subject,
      body: message.body,
    }),
    redirect: "follow",
  });

  if (!response.ok) {
    console.error("Google email webhook failed", response.status, await response.text());
    return false;
  }

  const result = await response.json().catch(() => null);
  if (result && result.status === false) {
    console.error("Google email webhook returned failure", result);
    return false;
  }

  return true;
}

function studentSignupEmail(firstname: string, lastname: string, to: string): EmailMessage {
  return {
    to,
    subject: "[DO NOT REPLY] You Have Signed up as New Student for the RCSSA Airport Pickup Program",
    body: `Dear ${firstname} ${lastname},

Thank you for registering for the RCSSA Airport Pickup Program. We will notify you when a volunteer has been matched with you.

Sincerely,
Rice Chinese Students and Scholars Association`,
  };
}

function volunteerSignupEmail(firstname: string, lastname: string, to: string): EmailMessage {
  return {
    to,
    subject: "[DO NOT REPLY] You Have Signed up as Volunteer for the RCSSA Airport Pickup Program",
    body: `Dear ${firstname} ${lastname},

Thank you for signing up to volunteer for the RCSSA Airport Pickup Program. We will notify you after your volunteer status has been approved.

Best regards,
Rice Chinese Students and Scholars Association`,
  };
}


// curl "https://ccyusgdcruwkpdyteogf.supabase.co/functions/v1/airport-pickup?action=notify_confirmed"

function volunteerConfirmedEmail(firstname: string, lastname: string, to: string): EmailMessage {
  return {
    to,
    subject: "[DO NOT REPLY] Your Volunteer Status for the RCSSA Airport Pickup Program Has Been Approved",
    body: `Dear ${firstname} ${lastname},

Congratulations! Your volunteer status for the RCSSA Airport Pickup Program has been approved. You can now log in to the website and start matching with students who need airport pickup.

Best regards,
Rice Chinese Students and Scholars Association`,
  };
}

function studentDeleteEmail(firstname: string, lastname: string, to: string): EmailMessage {
  return {
    to,
    subject: "[DO NOT REPLY] You Have Cancelled Your Airport Pickup Request",
    body: `Dear ${firstname} ${lastname},

Your airport pickup request has been canceled.

Best regards,
Rice Chinese Students and Scholars Association`,
  };
}

function studentDeletedVolunteerEmail(
  studentFirstname: string,
  studentLastname: string,
  volunteerFirstname: string,
  volunteerLastname: string,
  to: string,
): EmailMessage {
  return {
    to,
    subject: "[DO NOT REPLY] You Have Been Unmatched for One Airport Pickup",
    body: `Dear ${volunteerFirstname} ${volunteerLastname},

The student ${studentFirstname} ${studentLastname}, whom you were assigned to for airport pickup, has canceled their request.

Best regards,
Rice Chinese Students and Scholars Association`,
  };
}

function matchDeletedStudentEmail(
  studentFirstname: string,
  studentLastname: string,
  volunteerFirstname: string,
  volunteerLastname: string,
  to: string,
): EmailMessage {
  return {
    to,
    subject: "[DO NOT REPLY] You Have Been Unmatched for Your Airport Pickup Request",
    body: `Dear ${studentFirstname} ${studentLastname},

Your assigned volunteer, ${volunteerFirstname} ${volunteerLastname}, has canceled this match. We are working to find a new volunteer for you.

Best regards,
Rice Chinese Students and Scholars Association`,
  };
}

function matchDeletedVolunteerEmail(
  studentFirstname: string,
  studentLastname: string,
  volunteerFirstname: string,
  volunteerLastname: string,
  to: string,
): EmailMessage {
  return {
    to,
    subject: "[DO NOT REPLY] You Have Been Unmatched for One Airport Pickup",
    body: `Dear ${volunteerFirstname} ${volunteerLastname},

Your airport pickup match with ${studentFirstname} ${studentLastname} has been canceled.

Best regards,
Rice Chinese Students and Scholars Association`,
  };
}

function newMatchStudentEmail(
  studentFirstname: string,
  studentLastname: string,
  volunteerFirstname: string,
  volunteerLastname: string,
  to: string,
  volunteerEmail: string,
  volunteerWechat: string,
): EmailMessage {
  return {
    to,
    subject: "[DO NOT REPLY] You Have Been Matched with A Volunteer for Your Airport Pickup Request",
    body: `Dear ${studentFirstname} ${studentLastname},

You have been matched with ${volunteerFirstname} ${volunteerLastname}. Please contact them by email at ${volunteerEmail} or through WeChat at ${volunteerWechat ?? ""}.

Best regards,
Rice Chinese Students and Scholars Association`,
  };
}
