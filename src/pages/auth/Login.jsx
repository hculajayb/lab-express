import { Button, Form, Input, Row } from "antd";
import "../../styles/auth/index.css";
import axios from "axios";
import { useEffect } from "react";

const onFinish = (values) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:8080/api/umg/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: values,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if (response.data && response.data.id) {
        window.location.href = "/#/solicitud";
        console.log("Inicio de sesión exitoso:", response.data);
        window.localStorage.setItem("usuario", JSON.stringify(response.data));
      } else {
        alert("Usuario o contraseña incorrecta");
        console.log("error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};




export const Login = () => (
  useEffect(() => {
    var usuario = window.localStorage.getItem("usuario");
    if (usuario) {
      window.location.href = "/#/solicitud";
    }
  
  }, []),

  <div className="container">
    <img
      className="background"
      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/221808/sky.jpg"
    />
    <Row justify="space-around py-5" align="middle">
      <section>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="correo"
            rules={[
              {
                required: true,
                message: "Por favor ingresar correo!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="contrasenia"
            rules={[
              {
                required: true,
                message: "Por favor ingrear su contraseña!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Recordarme</Checkbox>
          </Form.Item> */}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Ingresar
            </Button>
          </Form.Item>
          <br />
          <Form.Item
            wrapperCol={{
              offset: 9,
              span: 16,
            }}
            labelCol={{
              span: 24,
            }}
          >
            ¿No tienes una cuenta?{" "}
            <a href="#/register">Registrarse</a>
          </Form.Item>
        </Form>
      </section>
    </Row>
  </div>
);
