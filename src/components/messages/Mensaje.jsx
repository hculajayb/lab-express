import { useState, useEffect } from "react";
import { Col, Row, Alert } from "react-bootstrap";
import {string, bool} from "prop-types"

export const Mensaje = ({ mensaje, tipo }) => {
  const [color, setColor] = useState("");
  const [header, setHeader] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (tipo) {
      setColor("success");
      setHeader("Peticion realizada con exito");
    } else {
      setColor("danger");
      setHeader("Upss ha ocurrido un error");
    }
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, [tipo]);

  return (
    visible && (
      <Row>
        <Col md="12" className="my-3">
          <Alert variant={color}>
            <Alert.Heading>{header}</Alert.Heading>
            <p>{mensaje}</p>
          </Alert>
        </Col>
      </Row>
    )
  );
};

Mensaje.propTypes = {
  tipo: bool,
  mensaje: string
}