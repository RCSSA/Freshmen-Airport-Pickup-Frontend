import React from 'react';


export default function TimeInfoPage() {
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
                <button type='submit' className='btn btn-info homepage-btn'>修改接机时间</button>
                <button type='submit' className='btn btn-info homepage-btn ms-3' onClick={logout}>登出</button>
            </div>   
        </div>
    </div>
  )
}
