import { React, useContext, useEffect, useState } from "react";
import { Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import ProgressBar from "../../component/ProgressBar";

export default function StudentStatusPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0)
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
    <div className="d-flex flex-column align-items-center p-5">
      {/* need pass in props to know student status */}
      <ProgressBar progress = {progress}/>
      
      <div className="full-width">
        <Alert
          message="信息审核中"
          description="您的信息正在审核中，您可以通过姓名邮箱查询审核和匹配进度，谢谢您的参与。"
          type="warning"
          showIcon
        />
      </div>
      <div className="full-width">
        <Alert
          message="注册成功"
          description="您的信息已被记录，稍后我们会给您发送一封确认邮件，请注意查收。"
          type="success"
          showIcon
          closable
        />
      </div>

      <div className="row full-width">
        <div className="col-12 col-lg-6 p-0 p-lg-5">
          <div className="full-width p-3 p-lg-5 card text-bg-light mt-3">
            <div className="fw-bold fs-5">新生信息</div>
            <div>到达机场时间：</div>
            <div>机场：</div>
            <div>航班号：</div>
          </div>
        </div>
        
        <div className="col-12 col-lg-6 p-0 p-lg-5">
          <div className="full-width p-3 p-lg-5 card text-bg-light my-3">
            <div className="fw-bold fs-5">志愿者信息</div>
            <div>姓名：</div>
            <div>邮箱：</div>
            <div>微信号：</div>
          </div>
        </div>
      </div>
      
      
      <button
        onClick={() => {
          navigate("/");
        }}
        className="btn btn-info fs-5 my-3 py-2 homepage-btn"
      >
        返回首页
      </button>
    </div>
  );
}
