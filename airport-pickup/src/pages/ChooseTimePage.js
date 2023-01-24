import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import FullCalendarModel from './FullCalendar';
export default function ChooseTimePage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [choices, setChoices] = useState(<div></div>);
  useEffect(()=>{
    console.log(selected)
    setChoices( <div>
      {
        selected.map((element, key) => {
          return <div key={key}>{element}</div>
        })
      }
    </div>)
  }, [selected])
  return (
    <div className='row justify-content-center p-5'>
      <div className='col-12 col-md-8'>
        <h1 className='fw-bold my-4'>志愿者接机时间选择</h1>
        <div className='my-2'>
          请选择接机时间并完善细节，谢谢~
        </div>
        {/* <div>
          <iframe src="https://calendar.google.com/calendar/embed?src=61hqh4guqb0gttl6j5ijubegn4%40group.calendar.google.com&ctz=America%2FChicago" style={{border:"0"}} width={"100%"} height="600" frameBorder="0" scrolling="no"></iframe>
        </div> */}
        <div>
          <FullCalendarModel selected = {selected} setSelected = {setSelected}/>
        </div>
        <div className='d-flex justify-content-end mt-4'>
          <button type='button' className='btn btn-info homepage-btn' data-bs-toggle="modal" data-bs-target="#exampleModal">查看并确认选择</button>
        </div> 
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">已选择时间段</h1>
              
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {choices}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">返回</button>
              <button type="button" className="btn btn-info" onClick={()=>navigate("/choosetime")}>确认并继续</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
