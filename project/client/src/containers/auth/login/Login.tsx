import React from 'react';
import s from './login.module.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, reduxForm } from 'redux-form';
import { InputEmail, InputPassword } from '../../../common/formsControls';
import { required } from '../../../utils/validation';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

interface Props {
  requestSignIn:(email:string,password:string)=>void;
}
interface IState {
  isRedirect:boolean;
}
class Login extends React.Component<Props,IState> {

  constructor(props:Props) {
    super(props);
    this.state = {
      isRedirect:false
    };
  }
  postData = ({email,password}:any) => {
      this.props.requestSignIn(email,password);
      this.setState({isRedirect:true});
  };

  render() {
    if(this.state.isRedirect) {
      return <Redirect to="/"/>
    }
    return (
      <>
        <div className={s.backgroundRegister}>
          <div>
            <div className={s.title}>L O G I N</div>
            <LoginFormRedux onSubmit={this.postData} />
            <NavLink  className={s.registerButton} to="/register">
              Register
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}

const FormLogin = (props:any) => {
  return (
    <Form className={s.formRegister} onSubmit={props.handleSubmit}>
      <Form.Group as={Row} controlId="formBasicEmail">
        <Form.Label column sm="4">
          Login
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
        <button className={s.buttonRegister}>Login</button>
      </div>
    </Form>
  );
};

const LoginFormRedux = reduxForm({ form: 'LoginForm' })(FormLogin);
export default Login;
