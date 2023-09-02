import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
    // HOKS PARA NAVEGAR
    const navigate = useNavigate();

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [proyecto, setProyecto] = useState({});
    // ESTE STATE NOS AYUDA A MITIGAR EL DELAY QUE OCURRE CUANDO CAMBIA EL COMPONENTE
    const [cargando, setCargando] = useState(false);
    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        // DESPUES DE 5 SEG SE REINICIA HACIA UN OBJETO VACIO
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    // HACEMOS LA CONSULTA A LA API Y NOS TRAEMOS LOS PROYECTOS
    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
            
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                // EXTRAEMOS EL RESULTADO EN DATA 
                const { data } = await clienteAxios('/proyectos', config)
                // COLOCAMOS EN EL STATE LOS PROYECTOS
                setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [])

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
            // CADA VEZ QUE SE AGREGA UN PROYECTO ACTUALIZAMOS EL STATE
            setProyectos([...proyectos, data])
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
    // PROYECTO
    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            // ARMAMOS EL REQUEST CON AUTENTICACION
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // LE PASAMOS EL ID QUE OBTUVIMOS
            const { data } = await clienteAxios(`/proyectos/${id}`, config )
            setProyecto(data)
            setAlerta({})
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }
    return (
        <ProyectosContext.Provider
            value={{
              proyectos,
              mostrarAlerta,
              alerta,
              submitProyecto,
              obtenerProyecto,
              proyecto,
              cargando
            }}
        >{children}
        </ProyectosContext.Provider>
    )
}
export { 
    ProyectosProvider
}

export default ProyectosContext