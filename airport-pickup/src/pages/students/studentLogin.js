import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../const";
import { UserContext } from "../../App";

export default function StudentLoginPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { setStudentLoggedIn } = useContext(UserContext); // update student logged in status

  function handleSubmit(e) {
    e.preventDefault();
    // navigate("/info");
    let login_data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
    };
    let data = {};
    let baseUrl = serverUrl;
    let action = "student_login_search";
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
        if (data.status === true) {
          alert("登陆成功！");
          setStudentLoggedIn(true);
          navigate("/studentstatus");
        } else {
          alert("登陆失败！请重试！");
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
              <label for="validationCustom01" className="fw-bold">名（请输入拼音）</label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="e.g. Yifan"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-4 mb-3">
              <label for="validationCustom02" className="fw-bold">姓（请输入拼音）</label>
              <input
                type="text"
                className="form-control"
                id="validationCustom02"
                placeholder="e.g. Hong"
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
              placeholder="e.g. gh38@rice.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
