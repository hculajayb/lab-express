import { HashRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { UsersPage } from "../pages/users/UsersPage";
import { Register } from "../pages/users/Register";
import Landing from "../pages/principal/Landing";
import { Layout } from "../containers/Layout";

export const Browser = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/register" Component={Register} />
          <Route path="/" Component={Landing} />
          <Route path="/user" Component={UsersPage} />
          <Route path="/login" Component={Login} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};
