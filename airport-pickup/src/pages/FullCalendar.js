import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import { Tooltip } from 'bootstrap'


export default function FullCalendarModel(props) {
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
        } else {
          props.setSelected([...props.selected, eventId]);
        }
    }
    
  return (
    <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={[
            { id: '1',
              title: 'event 1', 
              date: '2023-01-23',
              classNames: ['unselectedEvent'],
              description: "Event Description1"},
            { id: '2',
              title: 'event 2', 
              date: '2023-01-27' ,
              classNames: ['unselectedEvent'],
              description: "Event Description2"}
          ]}
        eventDidMount={(info)=>handleEventDidMount(info)}
        eventClick={(info)=>handleEventClick(info)}
      />
  )
}