import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { convertToCreateUser } from "../../util/convert";
import { createUser } from "../../services/userServices";
import { Mensaje } from "../../components/messages/Mensaje";
import Carga from "../../components/messages/Carga";
import Modal from "react-bootstrap/Modal";
import { json } from "react-router-dom";



const initialForm = {
  txtsearch: "",
};

const validateForm = (form) => {
  const errors = {};

  if (form.txtsearch.trim() === "") {
    errors.txtsearch = " ";
  }

  return errors;
};

export const ConsultaSolicitud = () => {
  const peticion = async (form) => {
    const user = convertToCreateUser(form);
    const response = await createUser(user);

    return response;
  };

  const [carrito, setCarrito] = useState(window.localStorage.getItem("carrito") ? JSON.parse(window.localStorage.getItem("carrito")) : []);

  const [show, setShow] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { form, errors, handleChange, handleSubmit, loading, response } =
    useForm(initialForm, validateForm, peticion);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/umg/solicitud"
        );
            console.log(response.data);
        setSolicitudes(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    

    fetchSolicitudes();
  },[]);

  return (
    <div className="container">
      <Row className="align-items-center main">
        <section>
          <h1 className="text-center fw-bold">Consulta de Solicitud</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  name="txtsearch"
                  type="text"
                  placeholder="Ingrese su búsqueda"
                  value={form.txtsearch}
                  onChange={handleChange}
                  isInvalid={!!errors.txtsearch}
                />
                <Button variant="primary" onClick={handleShow}>
                  Buscar
                </Button>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errors.txtsearch}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </section>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Informacion de la solicitud</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {JSON.stringify(carrito)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Regresar
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </div>
  );
};
