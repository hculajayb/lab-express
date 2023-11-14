import { Form, Row, Col } from "react-bootstrap";
import {string, array, func, bool, oneOfType, number} from "prop-types"

export const SelectForm = (props) => {
  const {
    label,
    name,
    column,
    value,
    onBlur,
    onChange,
    error,
    required,
    data,
    idField,
    nameField,
    unSelectedValue,
    size,
  } = props;
  return (
    <Row className="mb-3">
      <Form.Label column={column} md={3} className="fw-bold">
        {label} {required && <span className="text-danger fw-bold">*</span>}
      </Form.Label>
      <Col>
        <Form.Select
          aria-label="Default select example"
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onClick={onBlur}
          isValid={error ? false : true}
          isInvalid={error ? true : false}
          required={required}
          size={size ?? "lg"}
        >
          {data ? (
            data.map((d) => (
              <option key={d[idField]} value={d[nameField]}>
                {d[nameField]}
              </option>
            ))
          ) : (
            <option value={unSelectedValue}>Sin Datos</option>
          )}
        </Form.Select>
        {error && (
          <Form.Text className="text-danger fw-bold">{error}</Form.Text>
        )}
      </Col>
    </Row>
  );
};

SelectForm.propTypes = {
  label : string,
    name : string ,
    column : oneOfType([string, number]),
    value : oneOfType([string, number]),
    onBlur : func,
    onChange : func,
    error : string,
    required : bool,
    data : array,
    idField : string,
    nameField : string,
    unSelectedValue : oneOfType([string, number]),
    size : string,
}