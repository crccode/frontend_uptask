import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';

// CREAMOS CONTEXT
const AuthContext = createContext();
// PROVIDER RODEA TODA LA APP TODA LA INFORMACION QUE ESTE AQUI ESTARA EN LOS DEMAS COMPONENTES 
const AuthProvider = ({children}) => {
    // CUANDO EL USUARIO ES AUTENTICADO RETORNAMOS UN OBJETO
    const [auth, setAuth] = useState({})
    //  DETIENE EL CODIGO PARA REALIZAR LA COMPROBACION
    const [cargando, setCargando] = useState(true)
    // EN CASO DE QUE EL USUARIO SE HAYA AUTENTICADO DE FORMA CORRECTA LO LLEVAMOS A PROYECTO
    const navigate = useNavigate()
    // REVISAMOS SI HAY UN TOKEN EN LOCALSTORAGE
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token){
                setCargando(false)
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
                // EL USUARIO SE LOGEO DE FORMA CORRECTA 
                navigate('/proyectos')
            } catch (error) {
                setAuth({})
            } 

            setCargando(false)

            
        }
        autenticarUsuario()
    }, [])


    // TODA LA INFORMACION QUE VA A ESTAR EN LOS DEMAS COMPONENTES 
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
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