import { parseISO } from "date-fns"


export const convierteFecha = (events = []) =>{
    return events.map(event =>{

        event.start = parseISO(event.start)
        event.end = parseISO(event.end)

        return event
    })
}