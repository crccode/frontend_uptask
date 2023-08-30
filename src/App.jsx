import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";

import {AuthProvider} from "./context/AuthProvider"
import Proyectos from "./paginas/Proyectos";
import RutaProtegida from "./layouts/RutaProtegida";
import NuevoProyecto from "./paginas/NuevoProyecto";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      {/* GRUPO DE RUTAS  */}
        <Routes>
        {/* RUTA PRINCIPAL  */}
          {/* AREA PUBLICA  */}
          <Route path="/" element={<AuthLayout />}>
          {/* LO QUE SE VA A EJECUTAR CUANDO SE CARGUE / PAGINA HOME  */}
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>
          {/* RUTA PROTEGIDA  */}
          <Route path="/proyectos" element={<RutaProtegida />}>
            <Route index element={<Proyectos />} />
     
            <Route path="crear-proyecto" element={<NuevoProyecto />} />
            {/* <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
            <Route path=":id" element={<Proyecto />} />
            <Route path="editar/:id" element={<EditarProyecto />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
