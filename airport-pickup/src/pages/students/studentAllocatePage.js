import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressStepper from "../../component/ProgressStepper";

export default function StudentAllocatePage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div className="d-flex flex-column align-items-center full-width">
        <div className="mt-5 full-width pt-3">
        <ProgressStepper progress={props.progress} />
        </div>
        <div className="row full-width px-5 pt-2">
            <div className="col-12 col-lg-6 p-0 p-lg-5 pe-lg-2">
            <div className="full-width p-3 p-lg-5 card text-bg-light mt-3">
                <div className="fw-bold fs-5">新生信息</div>
                <div>姓名：{props.studentName}</div>
                <div>邮箱：{props.studentEmail}</div>
                {/* <div>到达机场时间：</div>
                <div>机场：</div>
                <div>航班号：</div> */}
            </div>
            </div>

            <div className="col-12 col-lg-6 p-0 p-lg-5 ps-lg-2">
            <div className="full-width p-3 p-lg-5 card text-bg-light my-3">
                <div className="fw-bold fs-5">志愿者信息</div>
                <div>
                姓名：
                {props.volInfo &&
                props.volInfo.vol_firstname &&
                props.volInfo.vol_lastname
                    ? props.volInfo.vol_firstname + " " + props.volInfo.vol_lastname
                    : "Unknown"}
                </div>
                <div>
                邮箱：
                {props.volInfo && props.volInfo.vol_email
                    ? props.volInfo.vol_email
                    : "Unknown"}
                </div>
                <div>
                微信号：
                {props.volInfo && props.volInfo.vol_wechat
                    ? props.volInfo.vol_wechat
                    : "Unknown"}
                </div>
            </div>
            </div>
        </div>
        <div className='d-flex full-width flex-column align-items-center'>
            <button
                className="btn btn-outline-info fs-5 py-2 homepage-btn"
            >
                若信息有误,点此重新注册
            </button>
            <button
                onClick={() => {navigate("/");}}
                className="btn btn-info fs-5 my-3 py-2 homepage-btn"
            >
                返回首页
            </button>
        </div>
    </div>
  )
}
