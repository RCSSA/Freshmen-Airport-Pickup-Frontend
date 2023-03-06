import React, {useState} from 'react'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

export default function EventInfoModal(props) {
    const eventId = props.id;
    const openModals = props.openModals;
    const setOpenModals = props.setOpenModals;
    const selected = props.selected;
    const eventColors = props.eventColors;
    const setEventColors = props.setEventColors;
    const [select, setSelect] = useState("选择");

    function handleClose(){
        openModals[eventId] = false;
        setOpenModals({...openModals, [`${eventId}`]: false});
    }

    function handleSelect(e){
        e.preventDefault();
        if (select == "选择"){
            setSelect("取消选择");

            props.setSelected([...props.selected, eventId]);
            eventColors[[eventId]] = "rgb(73, 246, 255)"
            setEventColors({...eventColors, [`${eventId}`]: "rgb(73, 246, 255)"});
            
        } else {
            setSelect("选择");
           
            props.setSelected(props.selected.filter((elem)=>{return elem != eventId}));
            eventColors[[eventId]] = "rgb(14, 119, 217)"
            setEventColors({...eventColors, [`${eventId}`]: "rgb(14, 119, 217)"});
        }
    }

  return (
    <Modal
        open={openModals[eventId]}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='eventInfoModalFrame d-flex justify-content-center align-items-center'
    >
        <div className='eventInfoModal bg-light p-5'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                时间段信息
            </Typography>
            <div className='d-flex flex-column mt-2'>
                {props.description}
                <button className='btn btn-primary' onClick={(e)=>handleSelect(e)}>
                    {select}
                </button>
            </div>
        </div>
  </Modal>
  )
}
