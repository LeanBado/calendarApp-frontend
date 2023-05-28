import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () =>{
    const dispatch = useDispatch()
    const { events,activeEvent} = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async ( calendarEvent) => {
        //todo: llegar al backend

        //todo bien:
        if(calendarEvent._id){
            dispatch(onUpdateEvent({...calendarEvent}))
            
        } else {
            //creando
            dispatch(onAddNewEvent( {...calendarEvent, _id: new Date().getTime() } ))
        }
    }

    const deleteEvent = () => {
        dispatch(onDeleteEvent())
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
    }
    
}