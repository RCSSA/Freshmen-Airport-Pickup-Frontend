import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../const";
import DeleteModal from "../../component/DeleteModal";

export default function TimeInfoPage(props) {
  const navigate = useNavigate();

  function logout() {
    navigate("/");
  }

  const handleDeleteByIndex = (closeRef, index) => {
    // props.deleteStudent(index);
    console.log(props.studentList[index]);
    let data = {};
    let action = "delete_match_from_volunteer";
    let url = serverUrl + "?action=" + action;
    fetch(url, {
      redirect: "follow",
      method: "POST",
      body: JSON.stringify({
        stud_email: props.studentList[index].email,
        vol_email: props.volEmail,
      }),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((response) => response.json(data))
      .then((data) => {
        console.log(data);
        closeRef.current.click();
        if (data.status === true) {
          const newStudentList = props.studentList.filter(
            (student, i) => i !== index
          );
          alert("删除成功");
          props.setStudentList(newStudentList);
        } else alert("删除失败");
      });
  };

  useEffect(() => {
    console.log("TimeInfoPage: props:", props);
    let data = {};
    let baseUrl = serverUrl;
    let action = "volunteer_login_search";
    let url = baseUrl + "?action=" + action;
    fetch(url, {
      redirect: "follow",
      method: "POST",
      body: JSON.stringify(props.volInfo),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((response) => response.json(data))
      .then((data) => {
        console.log(data);
        if (data.found === true && data.confirmed === true) {
          props.setStudentList(data.record || []);
        }
      });
  }, []);

  return (
    <div className="full-width ">
      <div className="full-width d-flex flex-column align-items-center p-5">
        <h1 className="fw-bold my-4">接机信息</h1>
        <div className="fw-bold">
          您好，匹配信息如下，当前已匹配{props.studentList.length}
          人（最多10名）：
        </div>

        <div>
          {/* 分配信息 */}
          {props.studentList.map((student, index) => (
            <div className="card text-bg-light p-3 py-4 mt-3" key={index}>
              <div className="row m-0 full-width">
                <div className="col-12 col-lg-6">
                  <div>
                    新生姓名：{student.firstname + " " + student.lastname}
                  </div>
                  <div>航班号：{student.flight_number}</div>
                  <div>
                    到达机场时间：
                    {new Date(student.arriving_time).toLocaleString("zh-cn", {
                      timeZone: "America/Chicago",
                    })}
                  </div>
                  <div>机场：{student.airport}</div>
                  <div>新生邮箱：{student.email}</div>
                  <div>新生微信号：{student.wechat}</div>
                </div>
                <div className="col-12 col-lg-6 d-flex align-items-center justify-content-end">
                  <p className="text-success me-3 mt-3">状态: 分配成功</p>
                  <DeleteModal
                    deleteHandler={(closeRef) => handleDeleteByIndex(closeRef, index)}
                    btnClassName="btn btn-outline-danger"
                    btnChildren={"删除"}
                    modalTitle={"确认删除该分配信息？"}
                    modalBody={
                      "到达机场时间：" +
                      new Date(student.arriving_time).toLocaleString("zh-cn", {
                        timeZone: "America/Chicago",
                      }) +
                      ", 机场：" +
                      student.airport
                    }
                  />
                  {/* <div
                    className="btn btn-outline-danger"
                    onClick={() => {
                      handleDeleteByIndex(index);
                    }}
                  >
                    删除
                  </div> */}
                </div>
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
