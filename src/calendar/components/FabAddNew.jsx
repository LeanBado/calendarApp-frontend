import { addHours } from 'date-fns'
import React from 'react'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useUiStore } from '../../hooks/useUiStore'

export const FabAddNew = () => {

  const {openDateModal} = useUiStore()
  const {setActiveEvent} = useCalendarStore()

  const handleClickNew = () =>{
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(),2),
      bgColor: '#fafafa',
      user:{
        _id: '123',
        name: 'Leandro'
      }
    })
    openDateModal()
  }

  return (
    <button
    className='btn btn-primary fab'
    onClick={handleClickNew}
    >
        <i
        className='fas fa-plus'></i>
    </button>
  )
}
