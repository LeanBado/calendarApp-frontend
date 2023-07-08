import React, { useEffect, useState } from 'react'
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
import { useAuthStore } from '../../hooks/useAuthStore.js'




export const CalendarPage = () => {

  const{user} = useAuthStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()
  const {openDateModal} = useUiStore()
  const [period, setPeriod] = useState(localStorage.getItem("period") || "week");

  const eventStyleGetter = (event, start, end, isSelected)=>{

    const validador = (event.user._id === user.uid) || (event.user.uid === user.uid)

    const style ={
      backgroundColor: validador ? '#347CF7' : '#465660',
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


    useEffect(() => {
      startLoadingEvents()
    }, [])//arreglo vacio para que se dispare 1 sola vez
    

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
