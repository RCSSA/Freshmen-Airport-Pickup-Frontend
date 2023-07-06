import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/zh-cn";
// import "react-datetime-picker/dist/DateTimePicker.css";
// import "react-calendar/dist/Calendar.css";
// import "react-clock/dist/Clock.css";
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
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

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
    setIsSubmitDisabled(true);
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
    props.setStudentInfo(student_data);
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
        // if (data.found === true && data.confirmed === true){
        //   alert("登陆成功！");
        //   setStudentLoggedIn(true);
        //   navigate("/info");
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
          免责声明： 2023
          RCSSA接机活动是莱斯大学中国学生会自发组织的志愿活动，其目的在于帮初到机场的新生排忧解难，给老生认识新生、回馈中国学生群体的机会。本次活动非盈利、非政治、非宗教，万望各方注意、并请谅解。
          世上任何事情皆有不可抗力，所以请各方充分认识参与此活动潜在的风险，然后再决定是否参加此活动。可能存在的风险包括但不限于海陆空交通所造成的一切财产、时间之损失，不论主观还是客观的存在。学生会会尽力提供安全保障包括审核新生、志愿者信息，但学生会终究是庙小香火淡薄，不能保证给到所有人最满意的帮助，还望各位官家大人谅解！
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
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    required
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    我已知晓一个账号只为一名新生进行匹配接机，如有多名新生需要接机，需要分别填写表格
                  </label>
                </div>
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    required
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    我已阅读并了解免责声明
                  </label>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-info homepage-btn my-2"
                    disabled={isSubmitDisabled}
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
