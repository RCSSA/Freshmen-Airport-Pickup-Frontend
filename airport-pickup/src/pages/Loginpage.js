import React from 'react'

export default function Loginpage() {
  return (
    <div className='row justify-content-center p-5'>
    <div className='col-12 col-md-8'>
        <h1 className='fw-bold my-4'>接机志愿者登录</h1>

        <form className='mt-3 row'>
            <div className="my-2 col-12 col-md-6">
                <div className='fw-bold mb-2'>姓名</div>
                <input type="text" className="form-control" placeholder="" required/>
            </div>
            <div className="my-2 col-12 col-md-6">
                <div className='fw-bold mb-2'>邮箱</div>
                <input type="email" className="form-control" placeholder="" required/>
            </div>
            <div className='d-flex justify-content-end mt-4'>
                <button type='submit' className='btn btn-info homepage-btn'>登录</button>
            </div>
        </form>
    </div>
</div>
  )
}
