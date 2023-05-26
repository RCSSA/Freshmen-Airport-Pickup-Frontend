import React from 'react';
import {useNavigate} from "react-router-dom";

export default function TimeInfoPage() {
  const navigate = useNavigate();

  function logout() {
    window.location.href = '/';
  }

  return (
    <div className='d-flex justify-content-center p-5'>
        <div>
            <h1 className='fw-bold my-4'>接机信息</h1>
            <div>
                <div>待确认接机时间段：</div>
                <div>已确认接机时间段：</div>
            </div>  
            <div className='d-flex justify-content-end mt-4'>
                <button className='btn btn-info homepage-btn' onClick={()=>navigate("/choosetime")}>修改接机时间</button>
                <button className='btn btn-info homepage-btn ms-3' onClick={logout}>登出</button>
            </div>   
        </div>
    </div>
  )
}
