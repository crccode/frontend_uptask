import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <>
      {/* md:mt-20 EN CASO DE QUE SEA DISPOSITIVO MAS GRANDE 
      mt-5 EN DISPOSITIVOS MAS PEQUEÑOS */}
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
      {/* lg:w-1/2 TOMA LA MITAD DE LA PANTALLA 
      md:w-2/3 EN UN DISPOSITIVO MAS PEQUEÑO  */}
        <div className="md:w-2/3 lg:w-1/2 ">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
