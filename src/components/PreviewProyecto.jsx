import { Link } from "react-router-dom";
// LO PASAMOS ATRAVES DE PROPS
const PreviewProyecto = ({ proyecto }) => {
  const { nombre, _id, cliente, creador } = proyecto;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2">
        {/* nombre TOMA TODO EL ESPACIO flex-1 Ver Proyecto TOMA LO QUE REQUIERE  */}
        <p className="flex-1">
          {nombre}

          <span className="text-sm text-gray-500 uppercase">
            {""} {cliente}
          </span>
        </p>

      </div>
      {/* NOS LLEVA AL ID DE CADA PROYECTO  */}
      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
