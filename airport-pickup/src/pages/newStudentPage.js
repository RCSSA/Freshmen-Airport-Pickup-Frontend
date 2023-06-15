import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { serverUrl } from "../const";

export default function NewStudentPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [wechat, setWechat] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [airport, setAirport] = useState("IAH");
  const [arriveTime, setArriveTime] = useState(new Date());

  // On submit form, send a request to google sheet
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("In submiting form ");
    let action = "insert_student";
    let data = {};
    //TODO:: Still missing the flight number
    let student_data = {
      firstname: firstName,
      lastname: lastName,
      phone: phoneNumber,
      email: email,
      wechat: wechat,
      airport: airport,
      arrivingTime: arriveTime,
    };
    let baseUrl = serverUrl;
    let url = baseUrl + "?" + "action=" + action;
    console.log("Url: ", url, JSON.stringify(student_data));
    fetch(url, {
      redirect: "follow",
      method: "POST",
      body: JSON.stringify(student_data),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((response) => response.json(data))
      .then((data) => {
        console.log(data);
        if (data.status === true) {
          alert("注册成功！请等待志愿者联系！");
          navigate("/stustatus");
        } else {
          alert("注册失败！请重试！");
        }
      });
  };

  useEffect(() => {
    console.log(`firstname: ${firstName} \n`);
    console.log(`lastname: ${lastName} \n`);
    console.log(`phonenumber: ${phoneNumber} \n`);
    console.log(`email: ${email} \n`);
    console.log(`wechat: ${wechat} \n`);
    console.log(`flightnumber: ${flightNumber} \n`);
    console.log(`airport: ${airport} \n`);
    console.log(`arrive time: ${arriveTime} \n`);
  }, [
    firstName,
    lastName,
    phoneNumber,
    email,
    wechat,
    flightNumber,
    airport,
    arriveTime,
  ]);

  return (
    <div className="row justify-content-center p-5">
      <div className="col-12 col-md-8">
        <h1 className="fw-bold my-4">新生注册</h1>
        <div className="my-2">
          免责声明：
          RCSSA在本次活动中只提供一个志愿者和新生匹配的平台，无法为因此产生的后果承担任何责任。在接机过程中可能会出现您因为海关，行李，天气等原因导致延误，还请您和志愿者保持联络。希望您可以通过本次活动更快更好的适应rice的新生活！
        </div>
        <div className="my-2 color-light-blue">
          友情提醒：请您随身带好带有签证的护照和 I-20。
        </div>
        <div class="justify-content-center form">
          <div class="row spacing">
            <div class="col-md-1 mb-3"> </div>
            <div class="col-md-12 mb-3">
              <form class="needs-validation" onSubmit={handleSubmit} novalidate>
                <div class="row form-row">
                  <div class="col-md-4 mb-3">
                    <label for="validationCustom01">First name(拼音)</label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom01"
                      placeholder="e.g. Yifan"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <div class="valid-feedback">Looks good!</div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="validationCustom02">Last name（拼音）</label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom02"
                      placeholder="e.g. Hong"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <div class="valid-feedback">Looks good!</div>
                  </div>
                </div>
                <div class="row form-row">
                  <div class="col-md-6 mb-3">
                    <label for="validationCustom03">电话</label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom03"
                      placeholder="Phone Number"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <div class="invalid-feedback">
                      Please provide a valid phone number.
                    </div>
                  </div>
                </div>

                <div class="row form-row">
                  <div class="col-md-6 mb-3">
                    <label for="email">
                      邮箱 (请填入@rice.edu邮箱以便于身份核实)
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="e.g. bj01@rice.edu"
                      pattern=".+@rice.edu"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div class="invalid-feedback">
                      Please provide a valid rice email.
                    </div>
                  </div>
                </div>

                <div class="row form-row">
                  <div class="col-md-6 mb-3">
                    <label for="validationCustom05">微信号</label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom05"
                      placeholder="WeChat ID (example: yw01)"
                      onChange={(e) => setWechat(e.target.value)}
                      required
                    />

                    <div class="invalid-feedback">
                      Please provide a rice id.
                    </div>
                  </div>
                </div>

                <div class="row form-row">
                  <div class="col-md-6 mb-3">
                    <label for="validationCustom06">航班号</label>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustom06"
                      placeholder="Flight Number (example: NH114)"
                      onChange={(e) => setFlightNumber(e.target.value)}
                      required
                    />
                    <div class="invalid-feedback">
                      Please provide a Flight Number.
                    </div>
                  </div>
                </div>

                <div class="row">
                  <legend class="col-form-label col-sm-2 pt-0">机场</legend>
                  <div class="col-sm-10">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gridRadios"
                        id="gridRadios1"
                        value="option1"
                        onClick={() => setAirport("IAH")}
                        defaultChecked
                      />
                      <label class="form-check-label" for="gridRadios1">
                        Houston Intercontinental Airport(IAH)
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="gridRadios"
                        id="gridRadios2"
                        value="option2"
                        onClick={() => setAirport("HOU")}
                      />
                      <label class="form-check-label" for="gridRadios2">
                        William P. Hobby Airport(HOU)
                      </label>
                    </div>
                  </div>
                </div>

                <div class="row form-row">
                  <div class="col-md-6 mb-3">
                    <label for="datepicker">到达时间 (休斯顿时间 CST)</label>
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker/>
                    </LocalizationProvider> 
                    {/* <DateTimePicker
                      id="datepicker"
                      onChange={(val)=>setArriveTime(val)}
                      value={arriveTime}
                    /> */}
                  </div>
                </div>

                <button class="btn btn-primary" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
