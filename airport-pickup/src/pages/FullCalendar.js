import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import { Tooltip } from 'bootstrap'


export default function FullCalendarModel(props) {
  const [e1color, sete1color] = useState("rgb(78, 213, 220)");
  const [e2color, sete2color] = useState("rgb(78, 213, 220)");
  const setColors = [sete1color, sete2color];
    function handleEventDidMount(info){
        var tooltip = new Tooltip(info.el, {
            title: info.event.extendedProps.description,
            placement: 'top',
            trigger: 'hover',
            container: 'body'
          });
        return tooltip;
    }

    function handleEventClick(info){
      
      const eventId = info.event.id;
        if (props.selected.includes(eventId)){
          props.setSelected(props.selected.filter((elem)=>{return elem != eventId}));
          setColors[eventId-1]("rgb(78, 213, 220)");
        } else {
          props.setSelected([...props.selected, eventId]);
          setColors[eventId-1]("rgb(29, 107, 112)");
        }
    }
    
  return (
    <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={[
            { id: '1',
              title: 'Event 1', 
              date: '2023-02-13',
              classNames: ['selectedEvent'],
              description: "Event Description1",
              backgroundColor: e1color,
            },
              
            { id: '2',
              title: 'Event 2', 
              date: '2023-02-27' ,
              classNames: ['unselectedEvent'],
              description: "Event Description2",
              backgroundColor: e2color,
            },
              
          ]}
        eventDidMount={(info)=>handleEventDidMount(info)}
        eventClick={(info)=>handleEventClick(info)}
      />
  )
}