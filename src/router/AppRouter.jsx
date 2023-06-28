import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {LoginPage} from "../auth/pages/LoginPage"
import {CalendarPage} from "../calendar/pages/CalendarPage"
import { useAuthStore } from '../hooks/useAuthStore'


export const AppRouter = () => {
    const {status, checkAuthToken} = useAuthStore()
    //const autStatus = "not-authenticated"

    useEffect(() => {
        checkAuthToken()
    }, [])
    
    if(status == 'checking'){
        return (
            <h3>Cargando...</h3>
        )
    }

   return (
    <Routes>

        {
            (status == "not-authenticated")
            ? 
                (
                    <>
                        <Route path='/auth/*' element={<LoginPage></LoginPage>}></Route>
                        <Route path='/*' element={<Navigate to="/auth/login"></Navigate>}></Route>
                    </>
                )
            : (
                <>
                    <Route path='/' element={<CalendarPage></CalendarPage>}></Route>
                    <Route path='/*' element={<Navigate to="/"></Navigate>}></Route>
                </>
                )

        }
        



    </Routes>
  )
}
