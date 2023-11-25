import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Button,
  Drawer,
  Space,
  FloatButton,
  Avatar,
  Modal,
  Result,
  Table,
} from "antd";
import axios from "axios";
import {
  FileTextOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Tab } from "bootstrap";

const { Meta } = Card;

const Servicios = () => {
  const navigate = useNavigate();
  const [examenes, setExamenes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carrito, setCarrito] = useState(
    window.localStorage.getItem("carrito")
      ? JSON.parse(window.localStorage.getItem("carrito"))
      : []
  );
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "Examen",
      dataIndex: "examen",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Precio",
      className: "column-money",
      dataIndex: "money",
      align: "right",
    },
    {
      title: "Accion",
      dataIndex: "accion",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    // setCarrito([]);

    navigate("/login");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Comprar = (examen) => {
    const examenEncontrado = carrito?.find(
      (examenCarrito) => examenCarrito.id === examen.id
    );

    if (!examenEncontrado) {
      const newCarrito = [...carrito, examen];
      setCarrito(newCarrito);
      window.localStorage.setItem("carrito", JSON.stringify(newCarrito));
    } else {
      alert(`El examen ${examen.nombre} ya ha sido seleccionado.`);
    }
  };

  useEffect(() => {
    const fetchExamenes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/umg/examenes"
        );

        setExamenes(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchExamenes();

    console.log(JSON.stringify(carrito));
  }, [carrito]);

  const onClose = () => {
    setOpen(false);
    //setCarrito([]);
  };

  const FinalizarCompras = () => {
    setOpen(true);
  };

  return (
    <div className="px-5">
      <Row justify="end" align="top">
        <Button
          type="primary rounded-pill"
          style={{ height: 50, width: 240, position: "fixed" }}
          onClick={() => FinalizarCompras()}
        >
          Visualizar Examenes Seleccionados
        </Button>
      </Row>
      <br />
      <br />
      <Row gutter={16}>
        {examenes?.map((examen) => (
          <Col span={7} key={examen.id}>
            <Card
              hoverable
              style={{ width: 350, height: 500 }}
              cover={
                <img
                  alt="example"
                  src="https://phantom-marca.unidadeditorial.es/751b14770a522268c5a62eef164831c4/resize/660/f/webp/assets/multimedia/imagenes/2023/05/30/16854446505830.jpg"
                />
              }
            >
              <Meta title={examen.nombre} description={examen.descripcion} />
              <br />
              <br />
              <h3>Precio: Q.{examen.precio}</h3>
              <br />
              <Row justify="center" align="top">
                <Button type="primary" onClick={() => Comprar(examen)}>
                  Selecionar
                </Button>
              </Row>
            </Card>
            <br />
            <br />
          </Col>
        ))}
      </Row>
      <FloatButton
        shape="circle"
        style={{
          top: 300 - 70,
        }}
        tooltip={<div>Examenes seleccionados</div>}
        badge={{
          count: carrito?.length ?? 0,
          color: "blue",
        }}
        onClick={() => FinalizarCompras()}
      />

      <Drawer
        title="compra"
        placement="right"
        width={640}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <h1>Examenes seleccionados</h1>

        <br />
        <br />
        <Table
          columns={columns}
          dataSource={
            carrito?.map((examen) => ({
              key: examen.id,
              examen: examen.nombre,
              money: examen.precio,
              accion: (
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    const examenEncontrado = carrito?.find(
                      (examenCarrito) => examenCarrito.id === examen.id
                    );

                    if (examenEncontrado) {
                      const index = carrito?.indexOf(examenEncontrado);
                      carrito?.splice(index, 1);
                      setCarrito([...carrito]);
                      window.localStorage.setItem(
                        "carrito",
                        JSON.stringify([...carrito])
                      );
                    }
                  }}
                >
                  Eliminar
                </Button>
              ),
            })) || []
          }
          pagination={false}
          footer={() => (
            <h2>
              Total: Q.
              { carrito?.reduce((acc, examen) => acc + examen.precio, 0) ?? 0}
            </h2>
          )}
        />

        <Button
          type="primary border"
          className="btn btn-danger"
          onClick={() => {
            setCarrito();
            window.localStorage.setItem("carrito", JSON.stringify([]));
          }}
        >
          {" "}
          Limpiar Carrito
        </Button>
        {/* <Button type="primary border" danger onClick={onClose}>
          {" "}
          Cancelar Pedido
        </Button> */}
        <br />
        <br />
        <Button type="primary border" onClick={showModal}>
          {" "}
          Crear Solicitud
        </Button>
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
      </Drawer>

      {/* <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      /> */}
      {/* <Row justify="end" align="top">
        <Space direction="vertical" size={15}>
          <Space wrap size={15}>
            <label htmlFor="">User</label>
            <Avatar size={60} icon={<UserOutlined />} />
          </Space>
        </Space>
      </Row> */}
    </div>
  );
};

export default Servicios;
