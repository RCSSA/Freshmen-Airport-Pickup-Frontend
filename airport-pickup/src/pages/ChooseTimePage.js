import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import FullCalendarModel from '../component/FullCalendar';
export default function ChooseTimePage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [choices, setChoices] = useState(<div></div>);
  const ids = ["1", "2"];
  const titles = ["IAH: 7人", "HOU: 10人"];
  const dates = ["2023-03-13", "2023-03-23"];
  const descriptions = ["event description1", "event description2"];

  useEffect(()=>{
    setChoices( <div>
      {
        selected.map((element, key) => {
          return <div key={key}>{element}</div>
        })
      }
    </div>)
  }, [selected])
  return (
    <div className='row justify-content-center py-5'>
      <div className='col-12 col-md-8'>
        <h1 className='fw-bold my-4'>志愿者接机时间选择</h1>
        <div className='mt-0 mb-4'>
          请选择接机时间并完善细节，谢谢~
        </div>
        <div className='row'>
          <div className='col-lg-9 col-12'>
            <FullCalendarModel selected = {selected} setSelected = {setSelected} ids = {ids} titles = {titles} dates = {dates} descriptions = {descriptions}/>
          </div>
          <div className='col-lg-3 col-12 pt-3 selectedEventsFrame'>
            <p>已选时间段：</p>
            {choices}
          </div>
        </div>
        
        <div className='d-flex justify-content-center mt-4'>
          <button type='button' className='btn btn-info homepage-btn' onClick={()=>navigate("/choosetime")}>确认并提交</button>
        </div> 
      </div>
    </div>
  )
}
