import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';

// CREAMOS CONTEXT
const AuthContext = createContext();
// PROVIDER RODEA TODA LA APP TODA LA INFORMACION QUE ESTE AQUI ESTARA EN LOS DEMAS COMPONENTES 
const AuthProvider = ({children}) => {
    // CUANDO EL USUARIO ES AUTENTICADO RETORNAMOS UN OBJETO
    const [auth, setAuth] = useState({})

    // REVISAMOS SI HAY UN TOKEN EN LOCALSTORAGE
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token){
    
                return
            }
            // ENVIAMOS HEADER AUTORIZATION TYPE BEARER
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)

            } catch (error) {
                setAuth({})
            } 

     

            
        }
        autenticarUsuario()
    }, [])


    // TODA LA INFORMACION QUE VA A ESTAR EN LOS DEMAS COMPONENTES 
    return (
        <AuthContext.Provider
            value={{
                setAuth
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