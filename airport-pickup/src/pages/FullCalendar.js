import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import { Tooltip } from 'bootstrap'


export default function FullCalendarModel(props) {
  const [e1color, sete1color] = useState("rgb(14, 119, 217)");
  const [e2color, sete2color] = useState("rgb(14, 119, 217)");
  const setColors = [sete1color, sete2color];
    
    function handleEventDidMount(info){
      let eventDescription = info.event.extendedProps.description;
      eventDescription = eventDescription.replaceAll("\n", "<br/>");
        var tooltip = new Tooltip(info.el, {
            title: eventDescription,
            placement: 'top',
            trigger: 'hover',
            container: 'body',
            html: true,
          });
        return tooltip;
    }

    function handleEventClick(info){
      
      const eventId = info.event.id;
        if (props.selected.includes(eventId)){
          props.setSelected(props.selected.filter((elem)=>{return elem != eventId}));
          setColors[eventId-1]("rgb(14, 119, 217)");
        } else {
          props.setSelected([...props.selected, eventId]);
          setColors[eventId-1]("rgb(73, 246, 255)");
        }
    }
    
  return (
    <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={[
            { id: '1',
              title: "Event 1", 
              date: '2023-02-13',
              // start:  '2023-02-13T14:30:00',
              // end: '2023-02-13T18:30:00',
              classNames: ['selectedEvent'],
              description: "机场\n 时间段\n 待接人数 ",
              backgroundColor: e1color,
            },
              
            { id: '2',
              title: 'Event 2', 
              date: '2023-02-27' ,
              classNames: ['unselectedEvent'],
              description: "event description",
              backgroundColor: e2color,
            },
              
          ]}
        eventDidMount={(info)=>handleEventDidMount(info)}
        eventClick={(info)=>handleEventClick(info)}
        eventTimeFormat= {[ // like '14:30:00'
          {hour: '2-digit'},
          {minute: '2-digit'},
          {second: '2-digit'},
          {meridiem: false}]
        }
      />
  )
}