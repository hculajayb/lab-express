import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Row, Table, Space, Avatar, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import {v4 as uuidv4} from 'uuid';
import moment from "moment/moment";

const validatePhoneNumber = (rule, value, callback) => {
  // Se permite el ingreso de números positivos de hasta 8 cifras
  const phoneNumberRegex = /^[0-9]{1,8}$/;

  if (!phoneNumberRegex.test(value)) {
    callback("Ingrese un número válido de hasta 8 cifras.");
  } else {
    callback();
  }
};

export const Solicitud = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm(); // Agregar una referencia al formulario
  const [Usuario, setUsuario] = useState("");
  const [tipoUsuario, settipoUsuario] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [carrito, setCarrito] = useState(
    window.localStorage.getItem("carrito")
      ? JSON.parse(window.localStorage.getItem("carrito"))
      : []
  );

  const onFinish = (value) => {

  var objeto=JSON.parse(localStorage.getItem("usuario"));   
     
  const CodigoFactura=uuidv4();
  const CodigoSolicitud=uuidv4();
  const NoSoporte= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
 
  const fecha=moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  
    let data = JSON.stringify({
      "clienteId": objeto.id,
      "estadoSolicitudId": 1,
      "numeroSoporte":NoSoporte.slice(0, 8),
      "codigoSolicitud": CodigoSolicitud.slice(0, 10),
      "descripcion": value.descripcion,
      "noFactura":CodigoFactura.slice(0, 10),
      "fechaCreacion": fecha,
      "fechaModificacion": null,
      "creadoPor": objeto.id,
      "modificadoPor": null,
      "estado": 1
    });
    
    
     let config = {
       method: 'post',
       maxBodyLength: Infinity,
       url: 'http://localhost:8080/api/umg/solicitud',
       headers: { 
         'Content-Type': 'application/json'
       },
       data : data
     };
    
     axios.request(config)
     .then((response) => {
       console.log(JSON.stringify(response.data));
     })
     .catch((error) => {
       console.log(error);
     });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    onFinish(form.getFieldsValue());
    setIsModalOpen(false);
    window.localStorage.removeItem("carrito");
    window.localStorage.removeItem("usuario");
      
    navigate("/");
    // setCarrito([]);

    //navigate("/login");
  };
  const 
  handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    var usuarioLocal = JSON.parse(window.localStorage.getItem("usuario"));
    setUsuario(usuarioLocal.correo);
    settipoUsuario(usuarioLocal.tipoUsuario);
  }, []);


  return (
    <div className="px-5" style={{ padding: 1, minHeight: 360 }}>
      <Row justify="end" align="top">
        <Space direction="vertical" size={15}>
          <Space wrap size={15}>
            <label htmlFor="">{Usuario}</label>
            <Avatar size={60} icon={<UserOutlined />} />
          </Space>
        </Space>
      </Row>
      <Row className="py-1 px-4" justify="end" align="top">
        <Button
          type="primary rounded-pill"
          className="btn btn-danger"
          onClick={() => {
            window.localStorage.removeItem("usuario");
            navigate("/");
          }}
        >
          Cerrar Sesion
        </Button>
      </Row>
      <Row justify="center" align="top">
        <div>
          <h2>Pedido Realizado</h2>
        </div>
      </Row>
      <Row justify="center" align="top">
        <Table
          columns={[
            {
              title: "Nombre",
              dataIndex: "nombre",
              key: "nombre",
            },
            {
              title: "Precio",
              dataIndex: "precio",
              key: "precio",
            },
          ]}
          dataSource={carrito}
          pagination={false}
          footer={() => (
            <h2>
              Total: Q.
              {carrito?.reduce((acc, examen) => acc + examen.precio, 0) ?? 0}
            </h2>
          )}
        />
      </Row>
      {/* <Row justify="center" align="top">
        <Button
          type="primary border"
          className="btn btn-info"
          onClick={() => {
            navigate("/servicios");
          }}
        >
          Modificar Carrito
        </Button>
      </Row> */}
      <>
        <Form form={form} onFinish={showModal}>
          <Form.Item
            label="Tipo Solicitante"
            name="tipoSolicitante"
            // rules={[
            //   {
            //     required: true,
            //     message: "Por favor, ingrese el tipo de solicitud",
            //   },
            // ]}
          >
            <Input type="text" placeholder={tipoUsuario} defaultValue={tipoUsuario} disabled/>
          </Form.Item>

          <Form.Item
            label="Tipo Solicitud"
            name="tipoSolicitud"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el tipo de solicitud",
              },
            ]}
          >
            <Select placeholder="Seleccione el tipo de solicitud">
              <Option value="muestramedica">MM-Muestra Medica</Option>
              <Option value="laboratorio">LQ-Laboratorio</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese la descripción",
              },
              {
                max: 2000,
                message: "La descripción no puede superar los 2000 caracteres",
              },
            ]}
          >
            <Input.TextArea placeholder="Ingrese hasta 2000 caracteres" />
          </Form.Item>

          <Form.Item
            label="Número de Solicitud"
            name="numeroSolicitud"
            rules={[
              {
                required: false,
                message: "Por favor, ingrese el número de solicitud",
              },
            ]}
          >
            <Input defaultValue="Este numero se generará automaticamente" disabled/>
          </Form.Item>

          <Form.Item
            label="Número de Factura"
            name="numeroFactura"
            rules={[
              {
                required: false,
                message: "Por favor, ingrese el número de factura",
              },
            ]}
          >
            <Input defaultValue="Este numero se generará automaticamente" disabled />
          </Form.Item>

          <Form.Item
            label="Tipo Soporte"
            name="tipoSoporte"
            rules={[
              {
                required: true,
                message: "Por favor, seleccione el tipo de soporte",
              },
            ]}
          >
            <Select placeholder="Seleccione el tipo de soporte">
              <Option value="externo">Externo</Option>
              <Option value="interno">Interno</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="No. Soporte"
            name="noSoporte"
            rules={[
              {
                required: false,
                message: "Por favor, ingrese el numero de soporte",
              },
              {
                max: 50,
                message:
                  "El numero de soporte no puede superar los 50 caracteres",
              },
            ]}
          >
            <Input defaultValue="Este numero se generará automaticamente" disabled />
          </Form.Item>

          <Form.Item
            label="Telefono"
            name="telefono"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese el numero de teléfono",
              },
              { validator: validatePhoneNumber },
            ]}
          >
            <Input placeholder="Ingrese el numero de teléfono" />
          </Form.Item>

          <Form.Item label="Correo" name="correo">
            <Input placeholder={Usuario} disabled />
          </Form.Item>

          <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
         Enviar solicitud
        </Button>
       
      </Form.Item>
      <Modal
          title="Confirmar pedido"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Si"
          cancelText="No"
        >
          <p>¿Esta seguro?</p>
        </Modal>
        </Form>
      </>
    </div>
  );
};