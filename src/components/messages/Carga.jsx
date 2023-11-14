import { Spinner, Row, Col } from "react-bootstrap";

const Carga = () => {
  return (
    <Row md={12} className="justify-content-center">
      <Col md="12">
        <p className="text-center fw-bold">Cargando...</p>
      </Col>
      <Col md="12" className="d-flex justify-content-center">
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
        <Spinner animation="grow" variant="dark" />
      </Col>
    </Row>
  );
};

export default Carga;
