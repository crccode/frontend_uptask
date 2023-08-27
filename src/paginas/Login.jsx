import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra tus {""}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
      >
      {/* PRIMER ELEMENTO  */}
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        {/* SEGUNDO ELEMENTO  */}
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        {/* BOTON  */}
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      {/* NAVEGACION ROUTERDOM  */}
      {/* lg:justify-between COLOCA LOS ELEMENTOS UNO A LA DERECHA E IZQUIERDA  */}
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password"
        >
          Olvide Mi Password
        </Link>
      </nav>
    </>
  );
};

export default Login;
