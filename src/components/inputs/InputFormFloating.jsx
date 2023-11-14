import { Col, FloatingLabel, Form } from "react-bootstrap";
import {string, func, bool, oneOfType, number, any} from "prop-types"

export const InputFormFloating = (props) => {
  const {
    label,
    type,
    placeholder,
    name,
    onBlur,
    onChange,
    value,
    error,
    id,
    referencia,
    className,
    autocomplete,
  } = props;
  const complete = autocomplete ?? 'true';
  return (
    <>
      <Col className={className ?? "mb-3"}>
        <FloatingLabel controlId={id} label={label}>
          <Form.Control
            type={type}
            placeholder={placeholder}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onKeyUp={onChange}
            value={value}
            ref={referencia}
            autoComplete={complete}
            required
          />
        </FloatingLabel>
        <Form.Text className="text-danger fw-bold">{error}</Form.Text>
      </Col>
    </>
  );
};

InputFormFloating.propTypes = {
  label : string,
    name : string ,
    value : oneOfType([string, number]),
    onBlur : func,
    onChange : func,
    error : string,
    type : string,
    placeholder : string,
    id : string,
    referencia : any,
    className : string,
    autocomplete : bool,
}