import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';

// CREAMOS CONTEXT
const AuthContext = createContext();
// PROVIDER RODEA TODA LA APP TODA LA INFORMACION QUE ESTE AQUI ESTARA EN LOS DEMAS COMPONENTES 
const AuthProvider = ({children}) => {


    // TODA LA INFORMACION QUE VA A ESTAR EN LOS DEMAS COMPONENTES 
    return (
        <AuthContext.Provider
            value={{

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { 
    AuthProvider
}

export default AuthContext;