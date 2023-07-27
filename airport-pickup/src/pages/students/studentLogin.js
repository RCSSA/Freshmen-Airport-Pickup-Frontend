import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../const";

export default function StudentLoginPage(props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const setStudentLoggedIn = props.setStudentLoggedIn; // update student logged in status
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  function handleSubmit(e) {
    setIsSubmitDisabled(true);
    e.preventDefault();
    let login_data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
    };
    let data = {};
    let baseUrl = serverUrl;
    let action = "student_login_search";
    let url = baseUrl + "?action=" + action;
    // console.log("Student login with Url: ", url, JSON.stringify(login_data));
    fetch(url, {
      redirect: "follow",
      method: "POST",
      body: JSON.stringify(login_data),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((response) => response.json(data))
      .then((data) => {
        // console.log(data);
        if (data.found === true && data.confirmed === true) {
          alert("登陆成功！");
          JSON.stringify(data.record) === "{}"
            ? props.setProgress(1)
            : props.setProgress(2);
          setStudentLoggedIn(true);
          props.setStudentName(firstName + " " + lastName);
          props.setStudentEmail(email);
          props.setVolInfo(data.record);
          const studentInfo = {
            wechat: data.wechat,
            flight_number: data.flight_number,
            airport: data.airport,
            arriving_time: data.arriving_time,
          };
          props.setStudentInfo(studentInfo);
          navigate("/studentallocate", {
            email,
            name: firstName + " " + lastName,
          });
        } else {
          props.setStatus(2);
          navigate("/status");
        }
      });
  }
  return (
    <div className="row justify-content-center p-5">
      <div className="col-12 col-md-8">
        <h1 className="fw-bold my-4">新生登录</h1>
        <div>请登录以查看您的接机信息</div>

        <form className="mt-3 row" onSubmit={handleSubmit}>
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
          <div className="my-2 col-12 col-md-6">
            <div className="fw-bold mb-2">邮箱</div>
            <input
              type="email"
              className="form-control"
              placeholder="e.g. gh31@rice.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="btn btn-info homepage-btn"
            >
              登录
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
