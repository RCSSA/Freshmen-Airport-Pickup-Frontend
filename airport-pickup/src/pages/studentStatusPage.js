import { React, useContext, useEffect } from "react";
import { Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function StudentStatusPage() {
  const navigate = useNavigate();
  const { studentLoggedIn } = useContext(UserContext); // student logged in or not
  const checkIsLoggin = () => {
    return studentLoggedIn;
  };

  useEffect(() => {
    if (checkIsLoggin() === false) {
      navigate("/");
      return;
    }
  }, []);
  return (
    <div className="full-white d-flex flex-column align-items-center p-5">
      <div className="full-width">
        <Alert
          message="注册成功"
          description="您的信息已被记录，稍后我们会给您发送一封确认邮件，请注意查收。"
          type="success"
          showIcon
          closable
        />
      </div>

      <div className="full-width">
        <Alert
          message="信息审核中"
          description="您的信息正在审核中，您可以通过姓名邮箱查询审核和匹配进度，谢谢您的参与。"
          type="warning"
          showIcon
        />
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="btn btn-info fs-5 my-3 py-2 homepage-btn"
      >
        {" "}
        返回首页{" "}
      </button>
    </div>
  );
}
