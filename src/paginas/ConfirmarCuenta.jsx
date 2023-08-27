import React from "react";
import { Link, useNavigate } from "react-router-dom";
const ConfirmarCuenta = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y Comienza a crear tus {""}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Inicia Sesión
        </Link>
      </div>
    </>
  );
};

export default ConfirmarCuenta;
