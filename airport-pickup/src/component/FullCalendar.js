import React, { useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import EventInfoModal from './EventInfoModal';


export default function FullCalendarModel(props) {
  const [eventColors, setEventColors] = useState({});
  const [loaded, setLoaded] = useState(false);
  var [events, setEvents] = useState([]);
  var [openModals, setOpenModals] = useState({});
  const calendarRef = useRef(null);

  function loadEvents(){
    events = []
    setEvents([])
    for (var i = 0; i < props.ids.length; i++){
      var id = props.ids[i]
      events.push({
          id: `${id}`,
          title: `${props.titles[i]}`, 
          date: `${props.dates[i]}`,   
          backgroundColor: eventColors[[id]],
      })
      setEvents([...events])
    }
  }
  
  useEffect(()=>{
    
      for (var i = 0; i < props.ids.length; i++) {
        var id = props.ids[i]
        eventColors[`${id}`]= "rgb(14, 119, 217)";
        setEventColors({...eventColors, [`${id}`]: "rgb(14, 119, 217)"});
        openModals[`${id}`] = false;
        setOpenModals({...openModals, [`${id}`]: false});
      }
      loadEvents();
      setLoaded(true);
    
  }, [])

  useEffect(()=>{
    loadEvents()
  }, [eventColors])
  
  function handleEventClick(info){   
    const eventId = info.event.id;
    openModals[eventId] = true;
    setOpenModals({...openModals, [`${eventId}`]: true});
  }
    
  return (
    <>
    {
      loaded?
      <>
        <div>
        {
          props.ids.map((id, idx)=>{
            return (<EventInfoModal
            id = {id}
            key = {idx}
            date = {props.dates[idx]}
            openModals = {openModals}
            setOpenModals = {setOpenModals}
            description = {props.descriptions[idx]}
            setSelected = {props.setSelected}
            selected = {props.selected}
            eventColors = {eventColors}
            setEventColors = {setEventColors}
            pickUpNumber = {props.pickUpNumber}
            setPickUpNumber = {props.setPickUpNumber}
            />)
          })
        }
      </div>
      
      <FullCalendar
        ref={calendarRef}
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          events={events}
          eventMouseEnter={()=>{document.body.style.cursor = 'pointer'}}
          eventMouseLeave={()=>{document.body.style.cursor = 'auto'}}
          eventClick={(info)=>handleEventClick(info)}
          eventTimeFormat= {[ // like '14:30:00'
            {hour: '2-digit'},
            {minute: '2-digit'},
            {second: '2-digit'},
            {meridiem: false}]
          }
        />
      </>
      
      :
      <div>Loading...</div>
    }
    
    </>
    
  )
}