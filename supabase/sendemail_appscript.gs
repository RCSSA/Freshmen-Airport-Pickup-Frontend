// this file is for `sendEmail`. supabase edge function -> apps script web app
// remember to re-deploy it

function doPost(e) {
  var action = e.parameter.action;
  if (action === "send_email") {
    return do_send_email(e);
  }
  return response().json({ status: false, message: "Unknown action" });
}

function do_send_email(req) {
  var data = JSON.parse(req.postData.contents);
  MailApp.sendEmail({
    to: data.to,
    subject: data.subject,
    name: "RCSSA",
    body: data.body
  });
  return response().json({ status: true });
}

function response() {
  return {
    json: function(data) {
      return ContentService
        .createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
}

