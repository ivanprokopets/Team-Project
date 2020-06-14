import React from 'react';
import s from './register.module.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, reduxForm } from 'redux-form';
import { InputEmail, InputPassword, InputText } from '../../../common/formsControls';
import { required } from '../../../utils/validation';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

interface Props {
  requestRegister:(name:string,email:string,password:string)=>void;
}
class Register extends React.Component<Props> {
  constructor(props:Props) {
    super(props);
    this.state = {
      isAuth: false,
      errorData: null,
      isError: false,
      result: null,
      validation: null,
      counter: 5,
    };
  }

  postData = ({name,email,password}:any) => {
      this.props.requestRegister(name,email,password);
  };

  render() {
    return (
      <>
        <div className={s.backgroundRegister}>
          <div >
            <div className={s.title}>Register</div>
            <RegisterFormRedux onSubmit={this.postData} />
            <NavLink  className={s.loginButton} to="/login">
              Login
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}

const FormRegister = (props:any) => {
  return (
    <Form className={s.formRegister} onSubmit={props.handleSubmit}>
        <Form.Group as={Row} controlId="formBasicEmail">
        <Form.Label column sm="4">
          Name
        </Form.Label>
        <Col sm="7">
          <Field
            name="name"
            placeholder="name"
            validate={[required]}
            component={InputText}
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formBasicEmail">
        <Form.Label column sm="4">
          Email
        </Form.Label>
        <Col sm="7">
          <Field
            name="email"
            placeholder="email"
            validate={[required]}
            component={InputEmail}
            type="email"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formBasicPassword">
        <Form.Label column sm="4">
          Password
        </Form.Label>
        <Col sm="7">
          <Field
            name="password"
            placeholder="Password"
            validate={[required]}
            component={InputPassword}
          />
        </Col>
      </Form.Group>
      <div className={s.formButton}>
        <button
          className={s.buttonRegister}
          disabled={props.pristine || props.submitting}
          onClick={props.reset}>
          Clear
        </button>
        <button className={s.buttonRegister}>Register</button>
      </div>
    </Form>
  );
};

const RegisterFormRedux = reduxForm({ form: 'RegisterForm' })(FormRegister);
export default Register;
