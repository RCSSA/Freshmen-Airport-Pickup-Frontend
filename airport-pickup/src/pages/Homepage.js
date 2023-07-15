import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HailIcon from "@mui/icons-material/Hail";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import { Alert } from "antd";

export default function Homepage(props) {
  const navigate = useNavigate();

  useEffect(() => {
    props.setStatus(3);
    props.setStudentLoggedIn(false);
    props.setVolunteerLoggedIn(false);
    props.setStudentName("");
    props.setStudentEmail("");
    props.setVolEmail("");
    props.setVolInfo({});
    props.setStudentList([]);
  }, []);

  return (
    <div className="full-white pb-3 px-2">
      {/* <div>
        <br /> <br />
        <Alert
          message="测试中"
          description="当前平台测试中，预计下周正式上线。如急需接机服务请在新生注册中填入自己的信息，并邮件联系gh31@rice.edu，谢谢。"
          type="warning"
          showIcon
        />
      </div> */}

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70%" }}
      >
        <div className="row">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-2">
            <HailIcon fontSize="large" color="primary" />
            <div className="button-frame p-3 d-flex flex-column m-1">
              <button
                type="button"
                className="btn btn-info fs-5 m-2 py-2 homepage-btn"
                onClick={() => navigate("/studentregister")}
              >
                新生注册
              </button>
              <button
                type="button"
                className="btn btn-info fs-5 m-2 py-2 homepage-btn"
                onClick={() => navigate("/studentlogin")}
              >
                新生接机状态查询
              </button>
            </div>
          </div>

          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-2">
            <NoCrashIcon fontSize="large" color="primary" />
            <div className="button-frame p-3 d-flex flex-column m-1">
              <button
                type="button"
                className="btn btn-info fs-5 m-2 py-2 homepage-btn"
                onClick={() => navigate("/register")}
              >
                注册成为志愿者
              </button>
              <button
                type="button"
                className="btn btn-info fs-5 m-2 py-2 homepage-btn"
                onClick={() => navigate("/login")}
              >
                志愿者登录
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-center text-center"
        style={{ height: "10%" }}
      >
        <div class="alert alert-info" role="alert">
          <a href="#" class="alert-link">
            温馨提示
          </a>
          ：由于接机平台使用了谷歌服务，大陆用户请使用VPN访问本网站，敬请谅解。
        </div>
      </div>
      <div
        className="d-flex justify-content-center text-center"
        style={{ height: "16%" }}
      ></div>

      <div className="d-flex justify-content-center text-secondary text-center">
        Copyright @ 2023 RCSSA IT. Frontend development by Alexia Yuening Huang.
        Backend development by Allen Sun, Sarah Yao. <br /> Product Management
        by Ge Huang. <br /> Special credit to Weijian Zeng, James Li, Yankai
        Wang. All rights reserved.
      </div>
    </div>
  );
}
