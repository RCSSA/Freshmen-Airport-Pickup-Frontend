import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function StudentOrVolunteer() {
    const navigate = useNavigate();
    return (
      <div className='full-white d-flex justify-content-center align-items-center'>
          <div className='row justify-content-center'>
              <div className='col-12 col-md-6 d-flex justify-content-center'>
                  <button type='button' className='btn btn-info fs-5 m-2 py-2 homepage-btn' onClick={()=>navigate("/")}>我是新生</button>
              </div>
              <div className='col-12 col-md-6 d-flex justify-content-center'>
                  <button type='button' className='btn btn-info fs-5 m-2 py-2 homepage-btn' onClick={()=>navigate("/volunteerhome")}>我是志愿者</button>
              </div>
              
          </div>
      </div>
    )
}
