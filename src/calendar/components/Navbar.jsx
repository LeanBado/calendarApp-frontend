import React from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'

export const Navbar = () => {
  const {startLogout, user} = useAuthStore()
  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
        <span>
            <i className='fas fa-calendar-alt'>&nbsp;{user.name}</i>
        </span>
        <button className='btn btn-outline-danger' onClick={startLogout}>
            <i className='fas fa-sign-out-alt'>&nbsp;Salir</i>
        </button>
    </div>
  )
}
