import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es'
import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'
import DatePicker, { registerLocale } from "react-datepicker";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import "react-datepicker/dist/react-datepicker.css";
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const CalendarModal = () => {

    const {isDateModalOpen, closeDateModal} = useUiStore()

    const {events, activeEvent, startSavingEvent} = useCalendarStore()
    
    const [formSubmitted, setformSubmitted] = useState(false)

    const [formValues, setformValues] = useState({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2)
    }); 

    useEffect(() => {
      if(activeEvent !== null){
        setformValues({...activeEvent})
      }
    }, [activeEvent]);

      Modal.setAppElement('#root'); //va el id del div del HTML que contiene todo

      const validator = useMemo(() => {
        if( !formSubmitted ) return '';

        return (formValues.title.length > 1)
          ? ''
          : 'is-invalid'

      }, [formValues.title, formSubmitted])

      const onCloseModal = ()=> {
      
        closeDateModal()
      }

      const onChangeForm = (event) =>{
        
        setformValues({
          ...formValues,
          [event.target.name]:event.target.value
        })
      }
      const onChangeDate = (event, dates) =>{
        setformValues({
          ...formValues,
          [dates]:event
        })
      }

      const onSubmit = async (event) =>{
        event.preventDefault()
        setformSubmitted(true)

        const  diferencia = differenceInSeconds(formValues.end, formValues.start)
        if(isNaN(diferencia) || diferencia<= 0) {
          Swal.fire('error en fechas', 'revisar fechas ingresadas')
          return
        }
        if (formValues.title.length <= 0) return

        
        await startSavingEvent(formValues)
        closeDateModal()
        setformSubmitted(false)
      }

  return (
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
        >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>

            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <DatePicker className='form-control' selected={formValues.start}
                onChange={(event) => onChangeDate(event, 'start')} dateFormat='Pp'
                showTimeSelect
                locale='es' 
                timeCaption='Hora'
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker className='form-control' selected={formValues.end}
                onChange={(event) => onChangeDate(event, 'end')} dateFormat='Pp' minDate={formValues.start}
                showTimeSelect
                locale='es'
                timeCaption='Hora'
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${validator}`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={formValues.title}
                    onChange={(event)=> onChangeForm(event)}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={formValues.notes}
                    onChange={(event)=> onChangeForm(event)}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
