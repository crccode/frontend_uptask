import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
    // HOKS PARA NAVEGAR
    const navigate = useNavigate();

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        // DESPUES DE 5 SEG SE REINICIA HACIA UN OBJETO VACIO
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }
    // ESTA FUNCION VA INTERACTURAR CON LA API
    const submitProyecto = async proyecto => {
        // AGREGAMOS EL PROYECTO PERO NECESITAMOS EL TOKEN PARA HACERLO, LO USAMOS DEL LOCALSTORAGE
        try {
            const token = localStorage.getItem('token')
            if (!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // data ES LA RESUPUESTA DE AXIOS
            // proyecto ESTO VIENE DEL FORMULARIO
            const { data } = await clienteAxios.post('/proyectos', proyecto, config)

            setAlerta({
                msg: 'Proyecto creado exitosamente',
                error: false
            })
            // DESPUIES DE 3 SEG LO REINICIARE
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        }catch (error) {
            console.log(error)
        }
    }
    
    return (
        <ProyectosContext.Provider
            value={{
              proyectos,
              mostrarAlerta,
              alerta,
              submitProyecto
            }}
        >{children}
        </ProyectosContext.Provider>
    )
}
export { 
    ProyectosProvider
}

export default ProyectosContext