import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { checking, clearMessage, onLogin, onLogOut } from "../store/auth/authSlice"

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state=> state.auth)
    const dispatch = useDispatch()

    const startLogin = async({email, password})=> {
        dispatch(checking())

        try {
            const {data} = await calendarApi.post('/auth',{email, password})

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({name: data.usuario, uid: data.id}))
            

           
        } catch (error) {
            dispatch(onLogOut('credenciales incorrectas'))
            console.log(error)
            setTimeout(() => {
                dispatch(clearMessage())
            }, 20);
        }
    }   


    const startRegister = async({name, email, password}) =>{
        dispatch(checking())

        try {
            const {data} = await calendarApi.post('/auth/new',{name, email, password})
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({name: data.usuario, uid: data.id}))


        } catch (error) {
            dispatch(onLogOut(error.response.data?.msg || ''))
            setTimeout(() => {
                dispatch(clearMessage())
            }, 20);
        }
    }

    const checkAuthToken = async() =>{
        const token = localStorage.getItem('token')
        if(!token) return dispatch(onLogOut())

        try {
            const {data} = await calendarApi.get('/auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({name: data.name, uid: data.uid}))
            


        } catch (error) {
            localStorage.clear()
            dispatch(onLogOut())
        }
    }

    const startLogout = ()=>{
        localStorage.clear()
        dispatch(onLogOut())
    }

    return {
        status,
        user,
        errorMessage,

        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,

    }
}
