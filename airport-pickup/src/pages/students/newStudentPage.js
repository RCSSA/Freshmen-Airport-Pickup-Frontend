import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/zh-cn";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { serverUrl } from "../../const";

export default function NewStudentPage(props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [wechat, setWechat] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [airport, setAirport] = useState("IAH");
  const [arriveTime, setArriveTime] = useState(new Date());
  const { setStudentLoggedIn } = props.setStudentLoggedIn; // update student logged in status

  dayjs.extend(utc);
  dayjs.extend(timezone);
  // America/Ojinaga
  useEffect(() => {
    const getServerData = async () => {
      const dataFromServerHouston = {
        unix: 1687339343000,
        timezone: "America/Ojinaga",
      };
      const datetimeHouston = dayjs(dataFromServerHouston.unix).tz(
        dataFromServerHouston.timezone
      );
      setArriveTime(datetimeHouston);
    };
    void getServerData();
  }, []);

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
      flight_number: flightNumber,
      airport: airport,
      arriving_time: arriveTime,
    };
    let baseUrl = serverUrl;
    let url = baseUrl + "?action=" + action;
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
          alert("登陆成功！");
          props.setStudentLoggedIn(true);
          props.setProgress(1);
          props.setStudentName(firstName + " " + lastName);
          props.setStudentEmail(email);
          navigate("/studentallocate");
        } else {
          props.setStatus(2);
          navigate("/status");
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
        <div className="justify-content-center form">
          <div className="row spacing">
            <div className="col-md-1 mb-3"> </div>
            <div className="col-md-12 mb-3">
              <form className="needs-validation" onSubmit={handleSubmit}>
                <div className="row form-row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="validationCustom01" className="fw-bold">
                      名（请输入拼音）
                    </label>
                    <input
                      type="text"
                      pattern="[A-Za-z]+"
                      className="form-control"
                      id="validationCustom01"
                      placeholder="e.g. Juan"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="validationCustom02" className="fw-bold">
                      姓（请输入拼音）
                    </label>
                    <input
                      type="text"
                      pattern="[A-Za-z]+"
                      className="form-control"
                      id="validationCustom02"
                      placeholder="e.g. Huang"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                </div>
                <div className="row form-row">
                  <div className="col-md-6 mb-3">
                    <b>
                      {" "}
                      <label htmlFor="validationCustom03">电话</label>
                    </b>
                    <input
                      type="number"
                      className="form-control"
                      id="validationCustom03"
                      placeholder="Phone Number"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide a valid phone number.
                    </div>
                  </div>
                </div>

                <div className="row form-row">
                  <div className="col-md-6 mb-3">
                    <b>
                      <label htmlFor="email">
                        邮箱 (请填入@rice.edu邮箱以便于身份核实)
                      </label>
                    </b>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="e.g. gh31@rice.edu"
                      pattern=".+@rice.edu"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide a valid rice email.
                    </div>
                  </div>
                </div>

                <div className="row form-row">
                  <div className="col-md-6 mb-3">
                    <b>
                      {" "}
                      <label htmlFor="validationCustom05">微信号</label>{" "}
                    </b>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom05"
                      placeholder="WeChat ID (example: _ge_huang_)"
                      onChange={(e) => setWechat(e.target.value)}
                      required
                    />

                    <div className="invalid-feedback">
                      Please provide a rice id.
                    </div>
                  </div>
                </div>

                <div className="row form-row">
                  <div className="col-md-6 mb-3">
                    <b>
                      <label htmlFor="validationCustom06">航班号</label>
                    </b>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom06"
                      placeholder="Flight Number (example: NH114)"
                      onChange={(e) => setFlightNumber(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide a Flight Number.
                    </div>
                  </div>
                </div>

                <div className="row">
                  <b>
                    <legend className="col-form-label col-sm-2 pt-0">
                      机场
                    </legend>
                  </b>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        id="gridRadios1"
                        value="option1"
                        onClick={() => setAirport("IAH")}
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Houston Intercontinental Airport(IAH)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        id="gridRadios2"
                        value="option2"
                        onClick={() => setAirport("HOU")}
                      />
                      <label className="form-check-label" htmlFor="gridRadios2">
                        William P. Hobby Airport(HOU)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row form-row">
                  <div className="col-md-6 mb-3">
                    <br />
                    <br />
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="zh-cn"
                    >
                      <DateTimePicker
                        label="到达时间（CST 休斯敦时间）"
                        onChange={(e) => setArriveTime(e)}
                        value={dayjs(arriveTime)}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-info homepage-btn my-2"
                    type="submit"
                  >
                    提交
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
