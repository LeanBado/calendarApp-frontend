import React, { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { localizer } from '../../helpers/calendarLocalizer.js'
import { Navbar } from '../components/Navbar'
import { getMessages } from '../../helpers/getMessages.js'
import { CalendarEvent } from '../components/CalendarEvent.jsx'
import { CalendarModal } from '../components/CalendarModal.jsx'
import { FabAddNew } from '../components/FabAddNew.jsx'
import { useUiStore } from '../../hooks/useUiStore.js'
import { useCalendarStore } from '../../hooks/useCalendarStore.js'
import { FabDelete } from '../components/FabDelete.jsx'




export const CalendarPage = () => {

  const {events, setActiveEvent} = useCalendarStore()
  const {openDateModal} = useUiStore()
  const [period, setPeriod] = useState(localStorage.getItem("period") || "week");

  const eventStyleGetter = (event, start, end, isSelected)=>{
    const style ={
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return {
      style
    }
  }

    const onDobleClick = (event) => {
      openDateModal()
    }
    const onSelect = (event) => {
      setActiveEvent(event)
    }
    const onViewChange = (event) => {
      console.log(event)
     localStorage.setItem("period", event)
    }

  return (
    <>
      <Navbar></Navbar>

      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={period}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px )' }}
      messages={getMessages()}
      eventPropGetter={eventStyleGetter}
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={onDobleClick}
      onSelectEvent={onSelect}
      onView={onViewChange}
      />
    <CalendarModal></CalendarModal>
    <FabAddNew></FabAddNew>
    <FabDelete></FabDelete>

    </>
  )
}
