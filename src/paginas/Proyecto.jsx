import React from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos';

const Proyecto = () => {
  // NOS PERMITE LEER EL ID URL
  const params = useParams();
  // LO PASAMOS AL PROVIDER
  const { obtenerProyecto,proyecto, cargando} = useProyectos()
  const { nombre } = proyecto

  // PASAMOS EL ID 
  useEffect( () => {
    obtenerProyecto(params.id)
  }, [])

  return (
    cargando ? '...' : (
      <div>
        <h1 className='font-black text-4xl'>{nombre}</h1>
      </div>
    )
    
  )
}

export default Proyecto
