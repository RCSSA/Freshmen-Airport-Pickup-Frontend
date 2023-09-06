import { React, useState } from "react";
import { Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function StatusPage(props) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(
    <div className="full-width">
      <Alert
        message="尚未登陆"
        description="您尚未登陆，请返回主页进行登陆或者注册。"
        type="info"
        showIcon
      />
    </div>
  );

  useEffect(() => {
    const status = props.status;
    if (status === 0) {
      setAlert(
        <div className="full-width">
          <Alert
            message="注册成功"
            description="您的信息已被记录，稍后我们会给您发送一封确认邮件，请注意查收。"
            type="success"
            showIcon
            closable
          />
        </div>
      );
    } else if (status === 1) {
      setAlert(
        <div className="full-width">
          <Alert
            message="信息审核中"
            description="您的信息正在审核中，您可以通过姓名邮箱查询审核和匹配进度，谢谢您的参与。"
            type="warning"
            showIcon
          />
        </div>
      );
    } else if (status === 2) {
      setAlert(
        <div className="full-width">
          <Alert
            message="尚未注册或已被注册"
            description="您尚未注册您的相关信息，请返回主页进行注册后再次尝试登陆。"
            type="error"
            showIcon
          />
        </div>
      );
    } else {
      setAlert(
        <div className="full-width">
          <Alert
            message="尚未登陆"
            description="您尚未登陆，请返回主页进行登陆或者注册。"
            type="info"
            showIcon
          />
        </div>
      );
    }
  }, [props.status]);

  return (
    <div className="d-flex flex-column align-items-center p-5">
      {alert}

      <button
        onClick={() => {
          navigate("/");
        }}
        className="btn btn-info fs-5 mt-5 py-2 homepage-btn"
      >
        返回首页
      </button>
    </div>
  );
}
