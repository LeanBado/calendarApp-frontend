import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useForm } from '../../helpers/useForm'
import { useAuthStore } from '../../hooks/useAuthStore'
import './LoginPage.css'

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}
const registerFormFields = {
    registerEmail: '',
    registerName: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {

    const {loginEmail, loginPassword, onInputChange: loginInputChange} = useForm(loginFormFields)
    const {registerEmail, registerName, registerPassword, registerPassword2, onInputChange: registerInputChange} = useForm(registerFormFields)
    const {startLogin, startRegister, errorMessage} = useAuthStore()

    const loginSubmit = (event) =>{
        event.preventDefault()
        startLogin({email: loginEmail, password: loginPassword})
    }

    const registerSubmit = (event) =>{
        event.preventDefault()
        if(registerPassword !== registerPassword2){
            Swal.fire('Error en registro', 'Las claves no coinciden', 'error')
            return
        }
        startRegister({name: registerName, email: registerEmail, password: registerPassword})
    }

    useEffect(() => {
        if(errorMessage !== undefined){
            Swal.fire('Error en la autenticacion', errorMessage, 'error')
        }
        
    }, [errorMessage]);
    

  return (
      <div className="container login-container">
          <div className="row">
              <div className="col-md-6 login-form-1">
                  <h3>Ingreso</h3>
                  <form onSubmit={loginSubmit}>
                      <div className="form-group mb-2">
                          <input 
                              type="text"
                              className="form-control"
                              placeholder="Correo"
                              name='loginEmail'
                              value={loginEmail}
                              onChange={loginInputChange}
                          />
                      </div>
                      <div className="form-group mb-2">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Contraseña"
                              name='loginPassword'
                              value={loginPassword}
                              onChange={loginInputChange}
                          />
                      </div>
                      <div className="d-grid gap-2">
                          <input 
                              type="submit"
                              className="btnSubmit"
                              value="Login" 
                          />
                      </div>
                  </form>
              </div>

              <div className="col-md-6 login-form-2">
                  <h3>Registro</h3>
                  <form onSubmit={registerSubmit}>
                      <div className="form-group mb-2">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Nombre"
                              name='registerName'
                              value={registerName}
                              onChange={registerInputChange}
                          />
                      </div>
                      <div className="form-group mb-2">
                          <input
                              type="email"
                              className="form-control"
                              placeholder="Correo"
                              name='registerEmail'
                              value={registerEmail}
                              onChange={registerInputChange}
                          />
                      </div>
                      <div className="form-group mb-2">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Contraseña" 
                              name='registerPassword'
                              value={registerPassword}
                              onChange={registerInputChange}
                          />
                      </div>

                      <div className="form-group mb-2">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Repita la contraseña" 
                              name='registerPassword2'
                              value={registerPassword2}
                              onChange={registerInputChange}
                          />
                      </div>

                      <div className="form-group mb-2">
                          <input 
                              type="submit" 
                              className="btnSubmit" 
                              value="Crear cuenta" />
                      </div>
                  </form>
              </div>
          </div>
      </div>
  )
}
