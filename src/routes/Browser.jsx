import { HashRouter, Route, Routes } from "react-router-dom";
import { Solicitud } from "../pages/request/Solicitud";
import { Login } from "../pages/auth/Login";
import { UsersPage } from "../pages/users/UsersPage";
import { Register } from "../pages/users/Register";
import  Landing  from "../pages/principal/Landing";
import { Layout } from "../containers/Layout";
import Servicios from "../pages/principal/Servicios";
import { ConsultaSolicitud } from "../pages/request/ConsultaSolicitud";

export const Browser = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/solicitud" Component={Solicitud} />
          <Route path="/register" Component={Register} />
          <Route path="/" Component={Landing} />
          <Route path="/user" Component={UsersPage} />
          <Route path="/login" Component={Login} />
          <Route path="/servicios" Component={Servicios} />
          <Route path="/consulta" Component={ConsultaSolicitud} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};
