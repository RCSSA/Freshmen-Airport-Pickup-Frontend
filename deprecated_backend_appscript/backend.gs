const time_option = { hour12: false };
const timeZone = "est"; //note that est is the same as cdt, it is used here because the system doesn't support cdt 
const vol_start_col_num = 9;
const matchvol_firstname_col_num = 10;
const matchvol_lastname_col_num	= 11;
const matchvol_phone_col_num = 12;
const	matchvol_email_col_num = 13;
const matchvol_wechat_col_num = 14;
const vol_firstname_col_num = 1;
const vol_lastname_col_num	= 2;
const vol_phone_col_num = 3;
const	vol_email_col_num = 4;
const vol_wechat_col_num = 5;
const vol_confirmed = 7;
const vol_count_col_num = 6;
const vol_notified_col_num = 8;

/* column number for both defined here*/
const firstname_col_num = 1;
const lastname_col_num = 2;
const phone_col_num = 3;
const email_col_num = 4;
const wechat_col_num = 5;
const airport_col_num = 6; 
const arr_time_col_num = 7;
const flight_num_col_num = 8;
const status_num_col_num = 9;
// DB used for test
const test_db_url = "1iqVDDJ2UPLThz-ZxvAXy5zdLh21b-8nEUd9imv3AE5E";
//1iqVDDJ2UPLThz-ZxvAXy5zdLh21b-8nEUd9imv3AE5E
// DB used for product
const prod_db_url = "1wi5GHt2LyEQgvL8_I_-ysRg5H-5UTbYl9l_lgJG6ViM";
//new prod_db: 1wi5GHt2LyEQgvL8_I_-ysRg5H-5UTbYl9l_lgJG6ViM
const db = SpreadsheetApp.openById(prod_db_url);

function doGet(e) {
  var action = e.parameter.action;
  //spreadsheet link: https://docs.google.com/spreadsheets/d/1T_YHlkxXlmUM7MWA0obevTBGf5cjQtdsYdW7X2a71-g/edit#gid=0

//get the table out

  var sheetMatch = db.getSheetByName("新生&志愿者");
   
  switch(action) {
    case "get_all":
      return do_get_all(e, sheetMatch);
      break;
    return response().json({
      status: false,
      message: 'silent!'
    });
  }
}

function doPost(e){
  var action = e.parameter.action;

  // Supabase uses this Apps Script deployment only as an email relay.
  // Keep this before any spreadsheet access so email sending does not depend on
  // the old Google Sheets table names.
  if (action === "send_email") {
    return do_send_email(e);
  }

  //spreadsheet link: https://docs.google.com/spreadsheets/d/1T_YHlkxXlmUM7MWA0obevTBGf5cjQtdsYdW7X2a71-g/edit#gid=0


  // get tables out
  var sheetMatch = db.getSheetByName("新生&志愿者");
  var sheetVol = db.getSheetByName("志愿者");
  var sheetStud = db.getSheetByName("新生");
  
  switch(action) {
    case "insert_student":
        return do_insert_student(e, sheetStud, sheetMatch);
        break;
    case "insert_new_vol":
        return do_insert_new_vol(e, sheetVol);
        break;
    case "student_login_search":
        return do_student_login_search(e, sheetMatch);
        break;
    case "volunteer_login_search":
        return do_volunteer_login_search(e, sheetVol, sheetMatch);
        break;
    case "match":
        return do_match(e, sheetMatch, sheetVol, sheetStud);
        break;
    case "change_time":
        return do_change_time(e, sheetVol);
        break;
    case "delete_student":
        return do_delete_new_student(e, sheetStud, sheetMatch, sheetVol);
        break;
    case "delete_match_from_volunteer":
        return do_delete_match_from_volunteer(e, sheetVol, sheetMatch);
        break;
    return response().json({
      status: false,
      message: 'silent!'
    });
  }
  
}


function LogTest() {
  var db = SpreadsheetApp.openById("1WtsdrTkDb5nVS7aOAxt5aAaZ0mU532YpiONiuEZAXzE");
  var sheet = db.getSheetByName("新生");
  var dataRange = sheet.getDataRange();
  var dataValues = dataRange.getValues();
  Logger.log(dataValues[1][status_num_col_num]);
  Logger.log(dataValues[1][status_num_col_num] == null);
  Logger.log(dataValues[1][status_num_col_num] == "");

}


/* 
This function happens when we sent all information for all dates initially to the front end. 
Front end needs:
  Events to be grouped by dates, and within dates grouped by time 
*/
function do_get_all(req, sheet){

  //var db = SpreadsheetApp.openById("1wi5GHt2LyEQgvL8_I_-ysRg5H-5UTbYl9l_lgJG6ViM/edit#gid=24990355");

  /*Just for testing*/
  // var test_date_string = "2024-07-01T04:26:53.000Z";
  // var test_date = new Date(test_date_string);
  // var test_hour = test_date.getHours();
  // var test_UTChour = test_date.getUTCHours();
  // console.log("The test hour is: " + test_hour + ", UTC hour is: " + test_UTChour);
  // var test_date = formatDate(test_date);
  // console.log("The test date is: " + test_date );
  /*Just for testing*/

  // // get tables out
  //var sheet = db.getSheetByName("新生&志愿者");

  var hour_int2str = {};
  for (var i = 0; i < 24; i += 2) {
    var start = i < 10 ? "0" + i + ":00" : i + ":00";
    var end = i + 2 < 10 ? "0" + (i + 2) + ":00" : (i + 2) + ":00";
    hour_int2str[i] = start + "-" + end;
  }

  var all_dates = {};

  var dataRange = sheet.getDataRange();
  var dataValues = dataRange.getValues();

  for (var i = 1; i < dataValues.length; i++) {
    var record = dataValues[i];
    // only get unmatched student info
    if (record[matchvol_email_col_num] !== "") { continue; }
    var arrivingTime = record[arr_time_col_num]; // Assuming "arrivingTime" column is at index 7 (0-based)
    // Convert arrivingTime to a Date object
    var arrivingTimeDate = new Date(arrivingTime);

    // Extract the date and time components from the Date object
    var date = formatDate(arrivingTimeDate);
    
    console.log(date);
    // var time = arrivingTimeDate.toLocaleTimeString(time_option);
    // convert UTC to CDT
    var hour = (arrivingTimeDate.getUTCHours() + 24 - 5) % 24;
    console.log(i + ": " + hour);
    var airport = record[airport_col_num];

    // TODO:这里的condition怎么办？？？
    if (!(date in all_dates)) {
      all_dates[date] = create_structure_for_date();
      all_dates[date]["date"] = date;
    }
    all_dates[date][airport]["TotalToBePicked"] += 1;
    all_dates[date][airport][hour_int2str[Math.floor(hour/2) * 2]] += 1;

  }

  //delete all records that have value of 0
  for (const [date, date_value] of Object.entries(all_dates)) {

    //date_value is a dictionary with 3 keys: "IAH", "HOU", "Date".
    for (const [time, num] of Object.entries(date_value["IAH"])) {
      if (num == 0) {
        delete date_value["IAH"][time];
      } 
    }

    for (const [time, num] of Object.entries(date_value["HOU"])) {
      if (num == 0) {
        delete date_value["HOU"][time];
      } 
    }
    if (Object.keys(date_value["IAH"]).length === 0) {
      delete all_dates[date]["IAH"];
    }
    if (Object.keys(date_value["HOU"]).length === 0) {
      delete all_dates[date]["HOU"];
    }
  }
  console.log(all_dates);

  return response().json({
    status: true,
    events: all_dates,
  });

}

function formatDate(date) {
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + (date.getDate())).slice(-2);

  return year + '-' + month + '-' + day;
}


function create_structure_for_date(){

  var date_value = {};
  date_value["IAH"] = {};
  date_value["HOU"] = {};
  date_value["date"] = "";
  date_value["IAH"]["TotalToBePicked"] = 0;
  date_value["HOU"]["TotalToBePicked"] = 0;

  for (var hours = 0; hours < 24; hours += 2) {

    var startHour = hours < 10 ? "0" + hours + ":00" : hours + ":00";
    var endHour = hours + 2 < 10 ? "0" + (hours + 2) + ":00" : (hours + 2) + ":00";
  
    var final_str = startHour + "-" + endHour;
    date_value["IAH"][final_str] = 0;
    date_value["HOU"][final_str] = 0;
  }

  return date_value;
}



function do_insert_student(req, stud_sheet, match_sheet) {
  var data = JSON.parse(req.postData.contents); // Assuming the request payload is in JSON format
  var dataRange = stud_sheet.getDataRange();
  var stud_values = dataRange.getValues();

  var return_val = {
      status: true,
      message: "done post"
    }

  //loop through stud_sheet to make sure that we don't have repetitive
  for (var i = 1; i < stud_values.length; i++) {
    var row = stud_values[i];
    var rowEmail = row[email_col_num];
    
    if (rowEmail.toLowerCase() === data.email.toLowerCase()) {
      return_val.status = false;
      return response().json(return_val);
    }
  }

  
  // Get the last used ID from the spreadsheet
  var lastId = stud_sheet.getRange(stud_sheet.getLastRow(), 1).getValue();
  
  // Calculate the next ID by incrementing the last ID
  var nextId = lastId ? lastId + 1 : 1;
  
  var newRow = [
    nextId,
    data.firstname,
    data.lastname,
    data.phone,
    data.email,
    data.wechat,
    data.airport,
    data.arriving_time,
    data.flight_number,
  ];
  
  stud_sheet.appendRow([ ...newRow, "Not matched"]);
  match_sheet.appendRow(newRow);

  //send email confirmation for signup to student
  student_signup_send_email(data.firstname, data.lastname, data.email);
  return response().json(return_val);
}



function do_insert_new_vol(req, sheet){

  var data = JSON.parse(req.postData.contents); // Assuming the request payload is in JSON format
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  var return_val = {
      status: true,
      message: "done post"
    }

  //loop through stud_sheet to make sure that we don't have repetitive
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var rowEmail = row[email_col_num];
    if (rowEmail.toLowerCase() === data.email.toLowerCase()) {
      console.log(rowEmail + data.email);
      return_val.status = false;
      console.log(return_val);
      return response().json(return_val);
    }
  }

  
  // Get the last used ID from the spreadsheet
  var lastId = sheet.getRange(sheet.getLastRow(), 1).getValue();
  
  // Calculate the next ID by incrementing the last ID
  var nextId = lastId ? lastId + 1 : 1;
  
  var newRow = [
    nextId,
    data.firstname,
    data.lastname,
    data.phone,
    data.email,
    data.wechat,
    0
  ];
  
  sheet.appendRow(newRow);
  volunteer_signup_send_email(data.firstname, data.lastname, data.email);
  return response().json(return_val);
}

function do_student_login_search(req, match_sheet) {
  var data = JSON.parse(req.postData.contents); // Assuming the request payload is in JSON format
  var dataRange = match_sheet.getDataRange();
  var values = dataRange.getValues();
  
  var firstname = data.firstname;
  var lastname = data.lastname;
  var email = data.email;

  var return_val = {
    found: false,
    confirmed: true,
    record: {},
    wechat: "", //match_row[wechat_col_num],
    airport: "", //match_row[airport_col_num],
    arriving_time: "", //match_row[arr_time_col_num],
    flight_number: "" //match_row[flight_num_col_num]
  };
  
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var rowFirstname = row[firstname_col_num];
    var rowLastname = row[lastname_col_num];
    var rowEmail = row[email_col_num];
    
    if (rowFirstname.toLowerCase() == firstname.toLowerCase() && rowLastname.toLowerCase() == lastname.toLowerCase() && rowEmail == email) {
      return_val.found = true;
      return_val.wechat = row[wechat_col_num];
      return_val.airport = row[airport_col_num];
      return_val.arriving_time = row[arr_time_col_num];
      return_val.flight_number = row[flight_num_col_num];
      if (row[matchvol_email_col_num] !== "") { //if this student is picked by a volunteer
        return_val.record = {
          vol_firstname: row[matchvol_firstname_col_num],
          vol_lastname: row[matchvol_lastname_col_num],
          vol_phone: row[matchvol_phone_col_num],
          vol_email: row[matchvol_email_col_num],
          vol_wechat: row[matchvol_wechat_col_num]
        };
      }
    }
  }
  
  return response().json(return_val);
}


function do_volunteer_login_search(req, vol_sheet, match_sheet) {
  var data = JSON.parse(req.postData.contents); // Assuming the request payload is in JSON format
  var vol_dataRange = vol_sheet.getDataRange();
  var vol_values = vol_dataRange.getValues();
  var match_dataRange = match_sheet.getDataRange();
  var match_values = match_dataRange.getValues();
  
  var fisrtname = data.firstname;
  var lastname = data.lastname;
  var email = data.email;

  var return_val = {
    found: false,
    confirmed: false,
    record: []
  };
  
  for (var i = 1; i < vol_values.length; i++) {
    var row = vol_values[i];
    var rowFirstname = row[firstname_col_num];
    var rowLastname = row[lastname_col_num];
    var rowEmail = row[email_col_num];
    
    if (rowFirstname == fisrtname && rowLastname == lastname && rowEmail == email) {
      return_val.found = true;
      if (row[vol_confirmed] !== "") { //if volunteer is confirmed
        return_val.confirmed = true;
        //search in the matching sheet to find a student that has same volunteer email
        var student_list = [];
        for (var j = 1; j < match_values.length; j++) {
          var match_row = match_values[j];
          if (match_row[matchvol_email_col_num] === rowEmail) { // if the current student in iteration is picked up by volunteer with same email as rowEmail.
            //then append to the student list
            var student_obj = {
              firstname: match_row[firstname_col_num],
              lastname: match_row[lastname_col_num],
              phone: match_row[phone_col_num],
              email: match_row[email_col_num],
              wechat: match_row[wechat_col_num],
              airport: match_row[airport_col_num],
              arriving_time: match_row[arr_time_col_num],
              flight_number: match_row[flight_num_col_num]
            }
            student_list.push(student_obj);
          }
        }
        return_val.record = student_list;
      }
    }
  }
  
  return response().json(return_val);
}

/**
 * req: request object
 * sheet: sheetMatch
 * given date, hour, airport, number, vol_email
 * JSON {date: '2022-03-15', hour: '10:00-12:00', airport:"IAH", number: 2, vol_email: hs56@rice.edu} //note that 2AM is written as 02:00 not 2:00
 * Find appropriate person
 * If req.number > available_num, fill available num and return num. 
 * 
 * return a num. (0 for failed, >0 for actual number allocated.)
 */
function do_match(req, match_sheet, vol_sheet, stud_sheet){

  var match_dataRange = match_sheet.getDataRange();
  var match_values = match_dataRange.getValues();

  var vol_dataRange = vol_sheet.getDataRange();
  var vol_values = vol_dataRange.getValues();

  var stud_dataRange = stud_sheet.getDataRange();
  var stud_values = stud_dataRange.getValues();

  var data = JSON.parse(req.postData.contents); 
  var req_date = data.date;
  var req_start_hour = Number(data.hour.substring(0, 2));
  var req_end_hour = Number(data.hour.substring(6, 8));
  var req_airport = data.airport;
  var req_number = data.number;
  var req_vol_email = data.vol_email;
  var num_allocated = 0;
  var vol_row_idx = 0;


  for (var i = 1; i < match_values.length; i++) {
    //changed === to >= for safety
    if (num_allocated >= req_number) {
      break;
    }
    var match_record = match_values[i];
    var arrivingTimeDate = new Date(match_record[arr_time_col_num]);
    var pickup_date = formatDate(arrivingTimeDate);
    var pickup_hour = (arrivingTimeDate.getUTCHours() + 24 - 5) % 24;
    var airport = match_record[airport_col_num];
    var vol_email = match_record[matchvol_email_col_num];
    if (
      req_vol_email !== null &&
      vol_email === "" &&
      pickup_date === req_date &&
      pickup_hour >= req_start_hour &&
      pickup_hour < req_end_hour &&
      airport === req_airport
    ) {
      // search volunteer info by volunteer email
      for (var j = 1; j < vol_values.length; j++) {
        if (vol_values[j][vol_email_col_num] === req_vol_email) {
          vol_row_idx = j;
          if (vol_values[j][vol_count_col_num] >= 10) {
            return response().json(
              {
            has_reached_limit: true,
            num_allocated
              }
            )
          }
          match_sheet.getRange(i + 1, matchvol_firstname_col_num + 1).setValue(vol_values[vol_row_idx][vol_firstname_col_num])
          match_sheet.getRange(i + 1, matchvol_lastname_col_num + 1).setValue(vol_values[vol_row_idx][vol_lastname_col_num])
          match_sheet.getRange(i + 1, matchvol_phone_col_num + 1).setValue(vol_values[vol_row_idx][vol_phone_col_num])
          match_sheet.getRange(i + 1, matchvol_email_col_num + 1).setValue(vol_values[vol_row_idx][vol_email_col_num])
          match_sheet.getRange(i + 1, matchvol_wechat_col_num + 1).setValue(vol_values[vol_row_idx][vol_wechat_col_num])
          num_allocated += 1;
          new_match_send_to_stud_email(match_record[firstname_col_num], match_record[lastname_col_num], vol_values[vol_row_idx][vol_firstname_col_num], vol_values[vol_row_idx][vol_lastname_col_num], match_record[email_col_num], vol_values[vol_row_idx][vol_email_col_num], vol_values[vol_row_idx][vol_wechat_col_num]);
          // add log if necessary
          // const log_sheet = db.getSheetByName("日志");
          // log_sheet.appendRow([new Date(), "INFO", `MATCHED : Student: ${match_record[firstname_col_num]} ${match_record[lastname_col_num]}, Volunteer: ${vol_values[vol_row_idx][vol_firstname_col_num]} ${vol_values[vol_row_idx][vol_lastname_col_num]}`]);

          //changed j to k to avoid same var name in same scope
          for (var k = 1; k < stud_values.length; k++) {
            if (stud_values[k][email_col_num] === match_record[email_col_num]) {
              stud_sheet.getRange(k + 1, 10).setValue("Matched");
              break;
            }
          }
          break;
        }
      }
    }
  }

  vol_values[vol_row_idx][vol_count_col_num] += num_allocated;
  vol_sheet.getRange(vol_row_idx+1, vol_count_col_num+1).setValue(vol_values[vol_row_idx][vol_count_col_num]);


  return response().json(
    {
      num_allocated
    }
  )
}


/**
 * Req format: {firstname: Sarah, lastname: Yao, email: jy75@rice.edu}
 * Effect: delete the entire row in 新生， 新生&志愿者 sheet
 */
function do_delete_new_student(req, stud_sheet, match_sheet, vol_sheet){

  var data = JSON.parse(req.postData.contents); 
  var match_dataRange = match_sheet.getDataRange();
  var match_values = match_dataRange.getValues();
  let isFound = false;

  var stud_dataRange = stud_sheet.getDataRange();
  var stud_values = stud_dataRange.getValues();
  
  var vol_dataRange = vol_sheet.getDataRange();
  var vol_values = vol_dataRange.getValues();

  var req_firstname = data.firstname.toLowerCase();
  var req_lastname = data.lastname.toLowerCase();
  var req_email = data.email.toLowerCase();

  for (var i = 1; i < stud_values.length; i++) {
    var row = stud_values[i];
    console.log(typeof row[firstname_col_num]);
    var curr_firstname = row[firstname_col_num].toLowerCase();
    var curr_lastname = row[lastname_col_num].toLowerCase();
    var curr_email = row[email_col_num].toLowerCase();
    // console.log(i + " " +curr_firstname + " " + curr_lastname + " ");
    if (curr_firstname === req_firstname && curr_lastname === req_lastname && req_email === curr_email){
      stud_sheet.deleteRow(i+1);
      //add delete log
      const log_sheet = db.getSheetByName("日志");
      log_sheet.appendRow([new Date(), "INFO", `STUDENT DELETED : ${row[firstname_col_num]} ${row[lastname_col_num]}`]);
      isFound = true;
      break;
    }
  }

  for (var i = 1; i < match_values.length; i++) {
    var row = match_values[i];
    var curr_firstname = row[firstname_col_num].toLowerCase();
    var curr_lastname = row[lastname_col_num].toLowerCase();
    var curr_email = row[email_col_num].toLowerCase();
    var vol_email = row[matchvol_email_col_num].toLowerCase();
    if (curr_firstname === req_firstname && curr_lastname === req_lastname && req_email === curr_email){
      // delete_send_to_vol_email(match_values[i][firstname_col_num], match_values[i][lastname_col_num], match_values[i][matchvol_firstname_col_num], match_values[i][matchvol_lastname_col_num], match_values[i][matchvol_email_col_num]);

      delete_student_send_to_student_email(match_values[i][firstname_col_num], match_values[i][lastname_col_num], match_values[i][email_col_num]);
      if (row[matchvol_email_col_num] != "") {
        delete_student_send_to_vol_email(match_values[i][firstname_col_num], match_values[i][lastname_col_num], match_values[i][matchvol_firstname_col_num], match_values[i][matchvol_lastname_col_num], match_values[i][matchvol_email_col_num]);
      }

      //add delete log
      const log_sheet = db.getSheetByName("日志");
      const match_record = row;
      log_sheet.appendRow([new Date(), "INFO", `STUDENT UNMATCHED : Student: ${match_record[firstname_col_num]} ${match_record[lastname_col_num]}, Volunteer: ${match_record[matchvol_firstname_col_num]} ${match_record[matchvol_lastname_col_num]}`]);

      match_sheet.deleteRow(i+1);
      break;
    }
  }

  if (isFound) {
    // decrement volunteer's students count
    for (var i = 1; i < vol_values.length; i++) {
      var row = vol_values[i];
      var cur_email = row[email_col_num].toLowerCase();
      if (vol_email === cur_email){
        // decrement the count
        vol_sheet.getRange(i + 1, vol_count_col_num + 1).setValue(vol_values[i][vol_count_col_num] - 1)
        break;
      }
    }
  }

  return response().json({status:isFound});
}


/**
 * Req format: {"stud_email": "jy75@rice.edu", "vol_email": "jy75@rice.edu"};
 * Effect: find the corresponding new student record in 新生&志愿者，delete the volunteer portion of the row.
 */
//Tim:volunteer email not deleted
function do_delete_match_from_volunteer(req, vol_sheet, match_sheet){

  // data = {"stud_email": "jy75@rice.edu", "vol_email": "jy75@rice.edu"};
  // var vol_sheet = db.getSheetByName("志愿者");
  // var match_sheet = db.getSheetByName("新生&志愿者");
  var data = JSON.parse(req.postData.contents); 
  var match_dataRange = match_sheet.getDataRange();
  var match_values = match_dataRange.getValues();
  let isFound = false;

  var req_vol_email = data.vol_email.toLowerCase();
  var req_stud_email = data.stud_email.toLowerCase();

  var vol_values = vol_sheet.getDataRange().getValues();

  // delete from match sheet
  for (var i = 1; i < match_values.length; i++) {
    var row = match_values[i];
    var curr_vol_email = row[matchvol_email_col_num].toLowerCase();
    var curr_stud_email = row[email_col_num].toLowerCase();
    if (curr_vol_email === req_vol_email && curr_stud_email === req_stud_email){
      // delete_send_to_student_email(match_values[i][firstname_col_num], match_values[i][lastname_col_num], match_values[i][matchvol_firstname_col_num], match_values[i][matchvol_lastname_col_num], match_values[i][email_col_num]);

      delete_match_send_to_student_email(match_values[i][firstname_col_num], match_values[i][lastname_col_num], match_values[i][matchvol_firstname_col_num], match_values[i][matchvol_lastname_col_num], match_values[i][email_col_num]);

      delete_match_send_to_vol_email(match_values[i][firstname_col_num], match_values[i][lastname_col_num], match_values[i][matchvol_firstname_col_num], match_values[i][matchvol_lastname_col_num], match_values[i][matchvol_email_col_num]);

      //add delete log
      const log_sheet = db.getSheetByName("日志");
      const match_record = row;
      log_sheet.appendRow([new Date(), "INFO", `VOL UNMATCHED : Student: ${match_record[firstname_col_num]} ${match_record[lastname_col_num]}, Volunteer: ${match_record[matchvol_firstname_col_num]} ${match_record[matchvol_lastname_col_num]}`]);

      deleteFieldsInRow(i+1, matchvol_firstname_col_num + 1, matchvol_wechat_col_num+1, match_sheet);

      isFound = true;
      break;
    }
  }

  if (isFound) {
    // decrement volunteer's students count
    for (var i = 1; i < vol_values.length; i++) {
      var row = vol_values[i];
      var cur_email = row[email_col_num].toLowerCase();
      if (req_vol_email === cur_email){
        // decrement the count
        vol_sheet.getRange(i + 1, vol_count_col_num + 1).setValue(vol_values[i][vol_count_col_num] - 1)
        break;
      }
    }
  }
  
  return response().json({status:isFound});
}



/**
 * Email-only webhook for the Supabase Edge Function.
 * Req format: { to: "user@example.com", subject: "...", body: "..." }
 */
function do_send_email(req) {
  var data = JSON.parse(req.postData.contents);

  MailApp.sendEmail({
    to: data.to,
    subject: data.subject,
    name: "RCSSA",
    body: data.body
  });

  return response().json({
    status: true
  });
}




/* Helper functions */

/**
 * This helper sends email to student when student sign up successfully.
 */
function student_signup_send_email(stud_firstname, stud_lastname, stud_email){

  MailApp.sendEmail({
    to: stud_email,
    // multi line string!
    subject: `[DO NOT REPLY] You Have Signed up as New Student for the 2024 RCSSA Airport Pickup Program`,
    name: "RCSSA",
    body: `
Dear ${stud_firstname} ${stud_lastname},

Thank you for registering for the 2024 RCSSA Airport Pickup Program! We appreciate your interest and look forward to assisting you. We wanted to provide you with some important information regarding the program.

Please note that the matching process may take some time as we strive to find the best volunteer to assist you. Rest assured, we will notify you as soon as a volunteer has been successfully matched with you.

However, we want to emphasize that registering for the program does not guarantee a matched volunteer due to the availability of our volunteers. Therefore, we encourage you to keep alternative options in mind, such as using Houston's public transportation or services like Uber and Lyft.

If you need to make any changes to your flight information or cancel your request, please refer to the instructions published on the RCSSA WeChat platform. There, you will find the necessary steps to follow.

Should you have any further questions or concerns about the program, please feel free to leave us a message at https://rcssa.rice.edu/about/#contact-us

Thank you once again for your participation in the RCSSA Airport Pickup Program. We wish you a wonderful day.


Sincerely,
Rice Chinese Students and Scholars Association
  `
  });
}

/**
 * This function should be registered under a trigger that triggers daily.
 */
function vol_confirmed_send_email_trigger(){

  var sheetVol = db.getSheetByName("志愿者");

  var vol_dataRange = sheetVol.getDataRange();
  var vol_values = vol_dataRange.getValues();

  for (var i = 1; i < vol_values.length; i++) {
    var row = vol_values[i];
    if (row[vol_confirmed] === 1 && row[vol_notified_col_num] !== 1) {
      try {
        vol_confirmed_send_email_helper(row[vol_firstname_col_num], row[vol_lastname_col_num], row[vol_email_col_num]);
        sheetVol.getRange(i + 1, vol_notified_col_num + 1).setValue(1);
      } catch {
        Logger.log('Failed to send email for row ' + i + ': ' + error.message);
      }
    }
  }
}

/**
 * This helper sends email to vol when they got confirmed.
 */
function vol_confirmed_send_email_helper(vol_firstname, vol_lastname, vol_email){

  MailApp.sendEmail({
    to: vol_email,
    // multi line string!
    subject: `[DO NOT REPLY] Your Volunteer Status for the 2024 RCSSA Airport Pickup Program Has Been Approved`,
    name: "RCSSA",
    body: `
Dear ${vol_firstname} ${vol_lastname},

Congratulations! We are delighted to inform you that your volunteer status for the 2024 RCSSA Airport Pickup Program has been approved!

You are now able to proceed to the website and begin matching with students who have requested airport pickup. If you need to make a new match or cancel an existing match, please refer to the instructions published on the RCSSA WeChat platform.

If you have any further questions or concerns about the program, please do not hesitate to contact us. You can leave us a message at https://rcssa.rice.edu/about/#contact-us

Once again, thank you for signing up to volunteer for the program. Your contribution will undoubtedly have a positive impact on the arrival experience of our students. We wish you a wonderful day.

Best regards,
Rice Chinese Students and Scholars Association
  `
  });
}

/**
 * This helper sends email to student when volunteer sign up successfully.
 */
function volunteer_signup_send_email(vol_firstname, vol_lastname, vol_email){

  MailApp.sendEmail({
    to: vol_email,
    // multi line string!
    subject: `[DO NOT REPLY] You Have Signed up as Volunteer for the 2024 RCSSA Airport Pickup Program`,
    name: "RCSSA",
    body: `
Dear ${vol_firstname} ${vol_lastname},

Thank you for signing up to volunteer for the 2024 RCSSA Airport Pickup Program! We greatly appreciate your willingness to assist our new students. Your efforts will undoubtedly make a positive impact on the student's arrival experience. We wanted to provide you with some important information regarding the program.

Please note that we are currently in the process of verifying the identity of all volunteers. This verification step ensures the safety and security of our participants. We anticipate that this process may take up to several days to complete.

Once your identity has been successfully verified, we will promptly notify you, and you can begin matching with new students who request airport pickup.

We sincerely appreciate your patience and understanding during this verification process. Should you have any further questions or concerns about the program, please feel free to leave us a message at https://rcssa.rice.edu/about/#contact-us

Thank you once again for your participation in the RCSSA Airport Pickup Program. We wish you a wonderful day.

Best regards,
Rice Chinese Students and Scholars Association
  `
  });
}

/**
 * This helper sends email to volunteer when they are being confirmed
 */
function volunteer_confirmed_send_email(vol_firstname, vol_lastname, vol_email){

  MailApp.sendEmail({
    to: vol_email,
    // multi line string!
    subject: `[DO NOT REPLY] Your Volunteer Status for the 2024 RCSSA Airport Pickup Program Has Been Approved`,
    name: "RCSSA",
    body: `
Dear ${vol_firstname} ${vol_lastname},

Congratulations! We are delighted to inform you that your volunteer status for the 2024 RCSSA Airport Pickup Program has been approved!

You are now able to proceed to the website and begin matching with students who have requested airport pickup. If you need to make a new match or cancel an existing match, please refer to the instructions published on the RCSSA WeChat platform.

If you have any further questions or concerns about the program, please do not hesitate to contact us. You can leave us a message at https://rcssa.rice.edu/about/#contact-us

Once again, thank you for signing up to volunteer for the program. Your contribution will undoubtedly have a positive impact on the arrival experience of our students. We wish you a wonderful day.

Best regards,
Rice Chinese Students and Scholars Association
  `
  });
}

/**
 * The helper function that sends the email to corresponding student when a student cancels
 * Parameters: all information is about the new_student. receiver: stud's email
 */
function delete_student_send_to_student_email(stud_firstname, stud_lastname, stud_email){

  MailApp.sendEmail({
    to: stud_email,
    // multi line string!
    subject: `[DO NOT REPLY] You Have Cancelled Your Airport Pickup Request`,
    name: "RCSSA",
    body: `
Dear ${stud_firstname} ${stud_lastname},

We hope this message finds you well. We wanted to inform you that your airport pickup request for the 2024 RCSSA Airport Pickup Program has been canceled.

If you want to make a new request, you can refer to the instructions published on the RCSSA WeChat platform. 

For any questions or concerns about the program, you can leave us a message at https://rcssa.rice.edu/about/#contact-us

We wish you a wonderful day.

Best regards,
Rice Chinese Students and Scholars Association
  `
  });
}

/**
 * The helper function that sends the email to corresponding volunteer when a student deletes oneself.
 * Parameters: all information is about the new_student. receiver: vol's email
 */
function delete_student_send_to_vol_email(stud_firstname, stud_lastname, vol_firstname, vol_lastname, vol_email){
  
  MailApp.sendEmail({
    to: vol_email,
    // multi line string!
    subject: `[DO NOT REPLY] You Have Been Unmatched for One Airport Pickup`,
    name: "RCSSA",
    body: `
Dear ${vol_firstname} ${vol_lastname},

Thank you for signing up for the 2024 RCSSA Airport Pickup Program. We appreciate your willingness to volunteer and provide assistance to our new students.

We regret to inform you that the student, ${stud_firstname} ${stud_lastname}, whom you were assigned to for airport pickup, has canceled their confirmation. For an updated list of airport pickup matches, please visit our website. We understand that circumstances can change, and we appreciate your understanding in this matter.

If you are still available and interested in volunteering for the program, we encourage you to check for any new matching opportunities on the website. There may be other students who require airport pickup and would greatly benefit from your assistance.

Once again, we thank you for your willingness to volunteer and support our program. If you have any questions or need further assistance, please feel free to contact us at https://rcssa.rice.edu/about/#contact-us

We wish you a wonderful day.

Best regards,
Rice Chinese Students and Scholars Association
  `
  });
}

/**
 * The helper function that sends the email to corresponding student when a match is cancelled
 * Parameters: all information is about the new_student. receiver: stud's email
 */
function delete_match_send_to_student_email(stud_firstname, stud_lastname, vol_firstname, vol_lastname, stud_email){

  MailApp.sendEmail({
    to: stud_email,
    // multi line string!
    subject: `[DO NOT REPLY] You Have Been Unmatched for Your Airport Pickup Request`,
    name: "RCSSA",
    body: `
Dear ${stud_firstname} ${stud_lastname}, 

Thank you for signing up for the 2024 RCSSA Airport Pickup Program. 

We regret to inform you that your assigned volunteer, ${vol_firstname} ${vol_lastname}, has canceled their confirmation. We understand that circumstances can change, and we are working diligently to find a new volunteer for you.

Rest assured, we are actively seeking a replacement volunteer and will inform you as soon as a new match is found. We appreciate your patience in this matter.

If you have any questions or require further assistance, please do not hesitate to contact us at https://rcssa.rice.edu/about/#contact-us

We wish you a wonderful day.

Best regards,
Rice Chinese Students and Scholars Association
  `
  });
}

/**
 * The helper function that sends the email to corresponding volunteer when a match is cancelled
 * Parameters: all information is about the new_student. receiver: vol's email
 */
function delete_match_send_to_vol_email(stud_firstname, stud_lastname, vol_firstname, vol_lastname, vol_email){

  MailApp.sendEmail({
    to: vol_email,
    // multi line string!
    subject: `[DO NOT REPLY] You Have Been Unmatched for One Airport Pickup`,
    name: "RCSSA",
    body: `
Dear ${vol_firstname} ${vol_lastname},

We hope this message finds you well. We wanted to inform you that your airport pickup match for the 2024 RCSSA Airport Pickup Program with ${stud_firstname} ${stud_lastname} has been canceled.

We appreciate your willingness to volunteer and apologize for any inconvenience caused. If you are still available and interested in volunteering for the program, we encourage you to regularly check the website for any new matching opportunities.

If you have any questions or require further assistance, please do not hesitate to contact us at https://rcssa.rice.edu/about/#contact-us

We wish you a wonderful day.

Best regards,
Rice Chinese Students and Scholars Association
  `
  });
}


/**
 * The helper function that sends the email to corresponding student when one is being matched.
 * Parameters: receiver: stud's email
 */
function new_match_send_to_stud_email(stud_firstname, stud_lastname, vol_firstname, vol_lastname, stud_email, vol_email, vol_wechat){

  MailApp.sendEmail({
    to: stud_email,
    // multi line string!
    subject: `[DO NOT REPLY] You Have Been Matched with A Volunteer for Your Airport Pickup Request`,
    name: "RCSSA",
    body: `
Dear ${stud_firstname} ${stud_lastname},

Thank you for signing up for the 2024 RCSSA Airport Pickup Program. We appreciate your participation and look forward to assisting you.

We are pleased to inform you that you have been matched with a volunteer to pick you up from the airport! Your assigned volunteer for airport pickup is ${vol_firstname} ${vol_lastname}. Please reach out to ${vol_firstname} ${vol_lastname} to coordinate the details of your airport pickup. You can contact them via email at ${vol_email} or through WeChat at ${vol_wechat}.

If, for any reason, you no longer need the airport pickup service from us, we kindly request that you inform both the volunteer and our team. To inform our team, please cancel your request from our website.

If you have any questions or need further assistance, please do not hesitate to contact us at https://rcssa.rice.edu/about/#contact-us

We wish you a wonderful day.

Best regards,
Rice Chinese Students and Scholars Association
  `
  });
}




function deleteFieldsInRow(rowIndex, startColumn, endColumn, sheet) {
  var range = sheet.getRange(rowIndex, startColumn, 1, endColumn - startColumn + 1);
  // const log_sheet = db.getSheetByName("日志");  
  // log_sheet.appendRow([new Date(), "INFO", range.getValues() + " was deleted from " + sheet.getName()]);
  range.clear();
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
