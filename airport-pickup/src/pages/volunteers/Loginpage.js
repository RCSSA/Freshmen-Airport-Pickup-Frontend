import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../const";

export default function Loginpage(props) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const setVolunteerLoggedIn = props.setVolunteerLoggedIn; // update volunteer logged in status

  function handleSubmit(e) {
    e.preventDefault();
    let login_data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
    };
    let data = {};
    let baseUrl = serverUrl;
    let action = "volunteer_login_search";
    let url = baseUrl + "?action=" + action;
    console.log("Student login with Url: ", url, JSON.stringify(login_data));
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
        console.log(data);
        if (data.found === true && data.confirmed === true) {
          alert("登陆成功！");
          setVolunteerLoggedIn(true);
          props.setVolEmail(email);
          props.setStudentList(data.record || []);
          navigate("/info");
        } else {
          if (data.found === true && data.confirmed === false) {
            props.setStatus(1);
            navigate("/status");
          } else {
            props.setStatus(2);
            navigate("/status");
          }
        }
      });
  }
  return (
    <div className="row justify-content-center p-5">
      <div className="col-12 col-md-8">
        <h1 className="fw-bold my-4">接机志愿者登录</h1>
        <div>请登录以查看您的接机信息</div>

        <form className="mt-3 row" onSubmit={handleSubmit}>
          <div className="row form-row">
            <div className="col-md-4 mb-3">
              <label htmlFor="validationCustom01" className="fw-bold">
                名（请输入拼音）
              </label>
              <input
                type="text"
                pattern = "[A-Za-z]+"
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
                pattern = "[A-Za-z]+"
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
              required
            />
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-info homepage-btn">
              登录
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
