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
        if(proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await nuevoProyecto(proyecto)
        }
    }

    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

            // Sincronizar el state
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectosActualizados)

            setAlerta({
                msg: 'Proyecto Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos', proyecto, config)

            setProyectos([...proyectos, data])

            setAlerta({
                msg: 'Proyecto Creado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
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

    // ELIMINAR PROYECTO
    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)

            // Sincronizar el state
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id )
            setProyectos(proyectosActualizados)
            // MOSTRAMOS ELMENSAJE DEL SERVIDOR 
            setAlerta({
                msg: data.msg,
                error: false
            })
            // REDIRECCIONAMOS AL USUARIO
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error)
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
              cargando,
              eliminarProyecto
            }}
        >{children}
        </ProyectosContext.Provider>
    )
}
export { 
    ProyectosProvider
}

export default ProyectosContext