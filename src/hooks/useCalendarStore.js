import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import calendarApi from "../api/calendarApi"
import { convierteFecha } from "../helpers/convierteFecha"
import { onAddNewEvent, onDeleteEvent, onLoadEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () =>{
    const dispatch = useDispatch()
    const { events,activeEvent} = useSelector(state => state.calendar)
    const { user} = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async ( calendarEvent) => {
        //todo: llegar al backend
        //todo bien -> se actualiza:
        try {
            if(calendarEvent.id){
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent, user}))
                
            } else {
                //sino -> crea un evento
                const {data} = await calendarApi.post('/events', calendarEvent)
    
                dispatch(onAddNewEvent( {...calendarEvent, id: data.evento.id, user } ))
            }
            
        } catch (error) {
            Swal.fire('Error de guardado/actualizacion de evento', error.response.data.msg, 'error')
        }
        
    }
    const deleteEvent = async () => {
        try {
            await calendarApi.delete((`/events/${activeEvent.id}`))
            dispatch(onDeleteEvent())

        } catch (error) {
            console.log(error)
            
        }
        
    }

    const startLoadingEvents = async() =>{

        try {
            const {data} = await calendarApi.get('/events')
            const events = convierteFecha(data.mostrarEventos)
            dispatch(onLoadEvent(events))
            
        } catch (error) {
            console.log('cargado de error:', error)
            Swal.fire('Error al eliminar evento', error.response.data.msg, 'error')

        }
    }

    return{
        //propiedades
        events,
        activeEvent,
        hasActiveEvent: !!activeEvent,

        //metodos
        setActiveEvent,
        startSavingEvent,
        deleteEvent,
        startLoadingEvents,
        onLoadEvent,
    }
    
}