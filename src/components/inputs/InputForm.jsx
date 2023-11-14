import { Form, Row, Col } from "react-bootstrap";
import {string, array, func, bool, oneOfType, number, any} from "prop-types"

export const InputForm = (props) => {
  const {
    label,
    name,
    type,
    placeholder,
    value,
    onBlur,
    onChange,
    error,
    column,
    required,
    readOnly,
    size,
    referencia,
  } = props;

  return (
    <Row className="mb-3">
      <Form.Label className="fw-bold" column={column} md={3}>
        {label} {required && <span className="text-danger fw-bold">*</span>}
      </Form.Label>
      <Col>
        <Form.Control
          ref={referencia}
          size={size ?? 'lg'}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onKeyUp={onChange}
          required={required}
          autoFocus
          isValid={error ? false : true}
          isInvalid={error ? true : false}
          readOnly={readOnly}
        />
        <Form.Text className="text-danger fw-bold">{error}</Form.Text>
      </Col>
    </Row>
  );
};

InputForm.propTypes = {
  label : string,
    name : string ,
    column : oneOfType([string, number]),
    value : oneOfType([string, number]),
    onBlur : func,
    onChange : func,
    error : string,
    required : bool,
    data : array,
    type : string,
    placeholder : string,
    referencia : any,
    readOnly : bool,
    size : string,
}