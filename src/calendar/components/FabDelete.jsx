import { addHours } from 'date-fns'
import React from 'react'
import { useCalendarStore } from '../../hooks/useCalendarStore'

export const FabDelete = () => {

 const { deleteEvent, hasActiveEvent } = useCalendarStore()
  const handleDelete = () =>{
    deleteEvent()
  }

  return (
    <button
    className='btn btn-danger fab-danger'
    onClick={handleDelete}
    style= {{display: hasActiveEvent ? '' : 'none'}}
    >
        <i
        className='fas fa-trash-alt'></i>
    </button>
  )
}