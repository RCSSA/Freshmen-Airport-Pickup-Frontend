import React, {useRef, useState} from 'react'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

export default function EventInfoModal(props) {
    const eventId = props.id;
    const openModals = props.openModals;
    const setOpenModals = props.setOpenModals;
    const eventColors = props.eventColors;
    const setEventColors = props.setEventColors;
    const [select, setSelect] = useState("确认选择");

    function checkAllZero(){
        const checkNumbers = props.pickUpNumber[`${props.id}`];
        var sum = checkNumbers.reduce((acc, currentValue) => {
            return acc + parseInt(currentValue)
          }, 0);

        if (sum === 0) {
            return true;
        }
        return false;
    }

    function handleClose(){
        openModals[eventId] = false;
        setOpenModals({...openModals, [`${eventId}`]: false});
    }

    function handleSelect(e){
        e.preventDefault();
        props.setSelected(props.selected.filter((elem)=>{
            return elem[0] !== eventId}));
        if (checkAllZero()){
            setSelect("确认选择");
            eventColors[[eventId]] = "rgb(14, 119, 217)"
            setEventColors({...eventColors, [`${eventId}`]: "rgb(14, 119, 217)"});
        } else {
            setSelect("更新选择");

            var selectedCopy = props.selected;
            var i = 0;
            var repeat = false;
            while (i < props.selected.length){
                if (props.selected[i][0] === eventId) {
                    repeat = true;
                    break;
                }
                i += 1;
            }
            if (repeat){
                selectedCopy[i] = [eventId, ["Hey"]]
                props.setSelected([...selectedCopy])

            } else {
                props.setSelected([...props.selected, [eventId, ["Hey"]]])
            }

            eventColors[[eventId]] = "rgb(73, 246, 255)"
            setEventColors({...eventColors, [`${eventId}`]: "rgb(73, 246, 255)"});
        }
    }

  return (
    <Modal
        open = {openModals[eventId]}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='eventInfoModalFrame d-flex justify-content-center align-items-center'
    >
        <div className='eventInfoModal bg-light p-5'>
            <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center fw-bold'>
                时间段信息
            </Typography>
            <div className='mt-2'>请输入每个时间段计划的接机人数，并点击“选择”。</div>
            <div className='color-light-blue'>温馨提示：一个同学一般会携带2-3个箱子，请志愿者合理计算安排自己车辆的空间哦</div>
            <form className='d-flex flex-column mt-2' onSubmit={handleSelect}>
                {props.description.map((time, idx)=>{
                    return (
                    <div key={idx} className='d-flex justify-content-between align-items-center mb-2'>
                        <div className='d-flex'>{`${time[0] + ":"}`}<div className='mx-2'>{`${time[1] + "人"}`}</div></div>
                        <div className='d-flex align-items-center'>
                            <div>接机人数：</div>
                            <input type='number'min={0} max={time[1]} className='form-control ms-2 text-center' style={{width: "100px"}} 
                            name={time[0]}
                            value={props.pickUpNumber[`${props.id}`][idx]}
                            onChange={(e)=>{
                                let pickUpNumberPart = props.pickUpNumber[`${props.id}`]
                                pickUpNumberPart[idx] = e.target.value;
                                props.pickUpNumber[`${props.id}`][idx] = e.target.value; 
                                props.setPickUpNumber({...props.pickUpNumber, [`${props.id}`]: pickUpNumberPart})}}
                            />
                        </div>
                    </div>
                    )
                })}
                <button className='btn btn-primary' type='submit'>
                    {select}
                </button>
            </form>
        </div>
  </Modal>
  )
}
