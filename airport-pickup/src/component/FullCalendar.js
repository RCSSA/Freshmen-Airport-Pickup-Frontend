import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import EventInfoModal from './EventInfoModal';


export default function FullCalendarModel(props) {
  const [eventColors, setEventColors] = useState({});
  const [loaded, setLoaded] = useState(false);
  var [events, setEvents] = useState([]);
  var [openModals, setOpenModals] = useState({});

  function loadEvents(){
    events = []
    setEvents([])
    for (var i = 0; i < props.ids.length; i++){
      var id = props.ids[i]
      events.push({
          id: `${id}`,
          title: `${props.titles[i]}`, 
          date: `${props.dates[i]}`,
          classNames: ['selectedEvent'],
          description: `${props.descriptions[i]}`,    
          backgroundColor: eventColors[[id]],
      })
      setEvents([...events])
    }
  }
  
  useEffect(()=>{
    for (var i = 0; i < props.ids.length; i++) {
      var id = props.ids[i]
      eventColors[`${props.ids[i]}`]= "rgb(14, 119, 217)";
      setEventColors({...eventColors, [`${props.ids[i]}`]: "rgb(14, 119, 217)"});
      openModals[`${props.ids[i]}`] = false;
      setOpenModals({...openModals, [`${props.ids[i]}`]: false});
      loadEvents();
    setLoaded(true);
  }}, [])

  useEffect(()=>{
    loadEvents()
  }, [eventColors])
  
  function handleEventClick(info){   
    const eventId = info.event.id;
    openModals[eventId] = true;
    setOpenModals({...openModals, [`${eventId}`]: true});

      // if (props.selected.includes(eventId)){
      //   props.setSelected(props.selected.filter((elem)=>{return elem != eventId}));
      //   eventColors[[eventId]] = "rgb(14, 119, 217)"
      //   setEventColors({...eventColors, [`${eventId}`]: "rgb(14, 119, 217)"});
      // } else {
      //   props.setSelected([...props.selected, eventId]);
      //   eventColors[[eventId]] = "rgb(73, 246, 255)"
      //   setEventColors({...eventColors, [`${eventId}`]: "rgb(73, 246, 255)"});
      // }
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
            openModals = {openModals}
            setOpenModals = {setOpenModals}
            description = {props.descriptions[idx]}
            setSelected = {props.setSelected}
            selected = {props.selected}
            eventColors = {eventColors}
            setEventColors = {setEventColors}
            />)
          })
        }
      </div>
      
      <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          events={events}
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