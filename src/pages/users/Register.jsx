import { Col, Row, Form } from "react-bootstrap";
import "../../styles/auth/index.css";
import { InputForm } from "../../components/inputs/InputForm";
import { SelectForm } from "../../components/inputs/SelectForm";
import { GENDERDATA } from "../../config/constants";
import { useForm } from "../../hooks/useForm";
import { convertToCreateUser } from "../../util/convert";
import { createUser } from "../../services/userServices";
import { Mensaje } from "../../components/messages/Mensaje";
import Carga from "../../components/messages/Carga";

const initialForm = {
  txtnombre: "",
  txtapellido: "",
  txtdpi: "",
  txtdireccion: "",
  txtedad: 0,
  txtgenero: "",
  txtemail: "",
  txtcontrasenia: "",
  txtcontrasenia2: "",
};

const validateForm = (form) => {
  const errors = {};
  if (form.txtnombre.trim() == "") {
    errors.txtnombre = "El nombre no puede ser vacio";
  }
  if (form.txtapellido.trim() == "") {
    errors.txtapellido = "El apellido no puede ser vacio";
  }
  if (form.txtdpi.trim() == "") {
    errors.txtdpi = "El DPI no puede ser vacio";
  } else if (form.txtdpi.length < 13 || form.txtdpi.length > 13) {
    errors.txtdpi = "El DPI debe tener 13 caracteres";
  }
  if (form.txtdireccion.trim() == "") {
    errors.txtdireccion = "La dirección no puede ser vacio";
  }
  if (form.txtedad <= 0) {
    errors.txtedad = "la edad debe ser mayor a cero";
  }
  if (form.txtemail.trim() == "") {
    errors.txtemail = "El correo no puede ser vacio";
  } else if (!/\S+@\S+\.\S+/.test(form.txtemail)) {
    errors.txtemail = "El correo electronico es invalido";
  }
  if (form.txtcontrasenia.trim() == "") {
    errors.txtcontrasenia = "La contraseña no puede ser vacio";
  }
  if (form.txtcontrasenia2.trim() == "") {
    errors.txtcontrasenia2 = "La confirmación contraseña no puede ser vacio";
  } else if (form.txtcontrasenia.trim() !== form.txtcontrasenia2.trim()) {
    errors.txtcontrasenia2 = "Las contraseñas no coinciden";
  }
  return errors;
};

export const Register = () => {
  const peticion = async (form) => {
    const user = convertToCreateUser(form);
    const response = await createUser(user);

    return response;
  };

  const { form, errors, handleChange, handleSubmit, loading, response } =
    useForm(initialForm, validateForm, peticion);
  console.log(response, "Debugueando respuesta", loading);
  return (
    <div className="container">
      <Row className="align-items-center main">
        <section>
          <h1 className="text-center fw-bold">Registro</h1>
          <form onSubmit={handleSubmit}>
            <InputForm
              name={"txtnombre"}
              label={"Nombre"}
              type={"text"}
              value={form.txtnombre}
              onChange={handleChange}
              error={errors.txtnombre}
            />
            <InputForm
              name={"txtapellido"}
              label={"Apellido"}
              type={"text"}
              value={form.txtapellido}
              onChange={handleChange}
              error={errors.txtapellido}
            />
            <InputForm
              name={"txtdpi"}
              label={"DPI"}
              type={"text"}
              value={form.txtdpi}
              onChange={handleChange}
              error={errors.txtdpi}
            />
            <InputForm
              name={"txtdireccion"}
              label={"Dirección"}
              type={"text"}
              value={form.txtdireccion}
              onChange={handleChange}
              error={errors.txtdireccion}
            />

            <Row className="g-2">
              <Col md>
                <InputForm
                  name={"txtedad"}
                  label={"Edad"}
                  type={"number"}
                  value={form.txtedad}
                  onChange={handleChange}
                  error={errors.txtedad}
                />
              </Col>
              <Col md>
                <SelectForm
                  name={"txtgenero"}
                  label={"Genero"}
                  data={GENDERDATA}
                  idField={"value"}
                  nameField={"name"}
                  value={form.txtgenero}
                  onChange={handleChange}
                  error={errors.txtgenero}
                />
              </Col>
            </Row>
            <InputForm
              name={"txtemail"}
              label={"Correo Electrónico"}
              type={"email"}
              value={form.txtemail}
              onChange={handleChange}
              error={errors.txtemail}
            />
            <Row className="g-2">
              <Col md>
                <InputForm
                  name={"txtcontrasenia"}
                  label={"Contraseña"}
                  type={"password"}
                  value={form.txtcontrasenia}
                  onChange={handleChange}
                  error={errors.txtcontrasenia}
                />
              </Col>
              <Col md>
                <InputForm
                  name={"txtcontrasenia2"}
                  label={"Confirmar Contraseña"}
                  type={"password"}
                  value={form.txtcontrasenia2}
                  onChange={handleChange}
                  error={errors.txtcontrasenia2}
                />
              </Col>
            </Row>
            <Form.Text id="passwordHelpBlock" muted>
              Su contraseña debe tener entre 8 y 20 caracteres, contener letras
              y números y no debe contener espacios, caracteres especiales ni
              emojis.
            </Form.Text>
            <Col className="d-flex justify-content-center py-4">
              <input className="btn btn-primary" type="submit" name="enviar" />
            </Col>
            {loading && <Carga />}
            {response !== "" && response !== null && (
              <Mensaje mensaje={response} tipo={response !== ""} />
            )}
          </form>
        </section>
      </Row>
    </div>
  );
};
