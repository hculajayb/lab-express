import logo from "../img/logo.png";
const NavbarPagina = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            alt="Logo"
            width="177"
            height="44"
            className="d-inline-block align-text-top"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav  mb-2 mb-lg-0 ">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#/servicios">
                Exámenes
              </a>
            </li>
            {/* <li className="nav-item">
              <span className="border">
                <a href="#/register" className="btn btn-info" role="button">
                  Registro
                </a>
              </span>
            </li> */}
            <li className="nav-item">
              <a href="#/login" className="btn btn-primary" role="button">
                Iniciar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPagina;
