import React, { useState } from 'react'
import ProgressStepper from '../../component/ProgressStepper'

export default function StudentAllocatePage(props) {
    {/* need pass in props to know student status */}
    const [progress, setProgress] = useState(0)
  return (
    <div>
        <ProgressStepper/>
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
    </div>
    

  )
}
