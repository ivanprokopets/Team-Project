import React from 'react';
import s from './addRecipe.module.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Field, reduxForm } from 'redux-form';
import { InputEmail, InputPassword, InputText, TextArea } from '../../common/formsControls';
import { required } from '../../utils/validation';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Recipe } from '../../types/types';

interface Props {
  requestAddRecipe: (recipe: Recipe) => void;
}
interface IState {
  isRedirect: boolean;
}
class AddRecipe extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isRedirect: false,
    };
  }
  postData = ({ name, ingredients, timeForPreparing, description, rating, isPublic }: any) => {
    const _ingredients = ingredients.split(',');
    const _isPublic = isPublic.toUpperCase() === 'YES';
    this.props.requestAddRecipe({
      name,
      ingredients: _ingredients,
      timeForPreparing,
      description,
      rating,
      isPublic: _isPublic,
    });
    this.setState({ isRedirect: true });
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className={s.backgroundRegister}>
          <div>
            <div className={s.title}>Add recipe</div>
            <RecipeFormRedux onSubmit={this.postData} />
          </div>
        </div>
      </>
    );
  }
}

const FormRecipe = (props: any) => {
  return (
    <Form className={s.formRegister} onSubmit={props.handleSubmit}>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Name
        </Form.Label>
        <Col sm="7">
          <Field
            name="name"
            placeholder="Name"
            validate={[required]}
            component={InputText}
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          ingredients
        </Form.Label>
        <Col sm="7">
          <Field
            name="ingredients"
            placeholder="Egg,milk"
            validate={[required]}
            component={InputText}
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          timeForPreparing
        </Form.Label>
        <Col sm="7">
          <Field
            name="timeForPreparing"
            placeholder="TimeForPreparing"
            validate={[required]}
            component={InputText}
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          description
        </Form.Label>
        <Col sm="7">
          <Field
            name="description"
            placeholder="Firstly... "
            validate={[required]}
            component={TextArea}
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          rating
        </Form.Label>
        <Col sm="7">
          <Field
            name="rating"
            placeholder="np. 3.4"
            validate={[required]}
            component={InputText}
            type="text"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          isPublic
        </Form.Label>
        <Col sm="7">
          <Field
            name="isPublic"
            placeholder="yes or no"
            validate={[required]}
            component={InputText}
            type="text"
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
        <button className={s.buttonRegister}>add recipe</button>
      </div>
    </Form>
  );
};

const RecipeFormRedux = reduxForm({ form: 'FormRecipe' })(FormRecipe);
export default AddRecipe;
