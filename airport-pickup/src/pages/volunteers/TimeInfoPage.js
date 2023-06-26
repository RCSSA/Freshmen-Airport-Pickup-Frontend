import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TimeInfoPage(props) {
  const navigate = useNavigate();

  function logout() {
    navigate("/");
  }

  useEffect(() => {
    console.log("TimeInfoPage: props:", props);
  }, []);

  return (
    <div className="full-width ">
      <div className="full-width d-flex flex-column align-items-center p-5">
        <h1 className="fw-bold my-4">接机信息</h1>
        <div className="fw-bold">您好，匹配信息如下：</div>

        <div>
          {/* 分配信息 */}
          {props.studentList.map((student, index) => (
            <div className="card text-bg-light p-3" key={index}>
              <div>航班号：{student.flight_number}</div>
              <div>
                到达机场时间：
                {new Date(student.arriving_time).toLocaleString("zh-cn", {
                  timeZone: "America/Chicago",
                })}
              </div>
              <div>机场：{student.airport}</div>
              <div className="d-flex align-items-center">
                <p className="text-success me-3 mt-3">状态: 分配成功</p>
                <div className="btn btn-outline-danger">删除</div>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-4 justify-content-center">
          <button
            className="btn btn-info homepage-btn m-2 col-12 col-lg-6"
            onClick={() => navigate("/choosetime")}
          >
            增加接机时间段
          </button>
          <button
            className="btn btn-info homepage-btn m-2 col-12 col-lg-6"
            onClick={logout}
          >
            返回主页
          </button>
        </div>
      </div>
    </div>
  );
}
