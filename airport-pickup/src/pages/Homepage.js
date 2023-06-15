import React from "react";
import { useNavigate } from "react-router-dom";
import HailIcon from '@mui/icons-material/Hail';
import NoCrashIcon from '@mui/icons-material/NoCrash';

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="full-white d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-2">
          <HailIcon fontSize="large" color="primary"/>
          <div className="button-frame p-3 d-flex flex-column m-1">
            <button
              type="button"
              className="btn btn-info fs-5 m-2 py-2 homepage-btn"
              onClick={() => navigate("/nstudent")}
            >
              新生注册
            </button>
            <button
              type="button"
              className="btn btn-info fs-5 m-2 py-2 homepage-btn"
              onClick={() => navigate("/stulogin")}
            >
              新生接机状态查询
            </button>
          </div>
        </div>
        
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center p-2">
          <NoCrashIcon fontSize="large" color="primary"/>
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
    
  );
}
