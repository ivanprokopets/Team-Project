import React from 'react';
import s from './addRecipe.module.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Field, reduxForm} from 'redux-form';
import {InputText, TextArea,InputPicker} from '../../common/formsControls';
import {required} from '../../utils/validation';
import {Redirect} from 'react-router-dom';
import {Recipe} from '../../types/types';
import { NavLink } from 'react-router-dom';

interface Props {
    requestAddRecipe: (recipe : Recipe) => void;
}
interface IState {
    isRedirect: boolean;
}
class AddRecipe extends React.Component < Props,
IState > {
    constructor(props : Props) {
        super(props);
        this.state = {
            isRedirect: false
        };
    }
    postData = ({
        name,
        ingredients,
        timeForPreparing,
        description,
        isPublic
    } : any) => {
        const _ingredients = ingredients.split(',');
        const _isPublic = isPublic.toUpperCase() === 'YES';
        this.props.requestAddRecipe({
            name,
            ingredients: _ingredients,
            timeForPreparing,
            description,
            isPublic: _isPublic,
            likers: ['']
        });
        this.setState({isRedirect: true});
    };

    render() {
        if (this.state.isRedirect) {
            return <Redirect to="/"/>;
        }
        return (
            <>
                <div className={
                    s.backgroundRegister
                }>
                    <div>
                        <div className={
                            s.title
                        }>Dodanie przepisu</div>
                        <RecipeFormRedux onSubmit={
                            this.postData
                        }
                      />
                    </div>
                </div>
            </>
        );
    }
}

const FormRecipe = (props : any) => {

    return (
        <Form className={
                s.formRegister
            }
            onSubmit={
                props.handleSubmit
        }>
            <Form.Group as={Row}>
                <Form.Label column sm="4">
                    Nazwa
                </Form.Label>
                <Col sm="7">
                    <Field name="name" placeholder="Nazwa"
                        validate={
                            [required]
                        }
                        component={InputText}
                        type="text"/>
                </Col>
            </Form.Group>
             <Form.Group as={Row}>
        <Form.Label column sm="4">
          Ingredienty
        </Form.Label>
        <Col sm="7">
          <Field
            name="ingredients"
            placeholder="Egg,milk.."
            validate={[required]}
            component={InputText}
            type="text"
          />
        </Col>
      </Form.Group> 
     
        
            <Form.Group as={Row}>
                <Form.Label column sm="4">
                    Czas przygotowania
                </Form.Label>
                <Col sm="7">
                    <Field name="timeForPreparing" placeholder="TimeForPreparing"
                        validate={
                            [required]
                        }
                        component={InputText}
                        type="text"/>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm="4">
                    Przepis
                </Form.Label>
                <Col sm="7">
                    <Field name="description" placeholder="Firstly... "
                        validate={
                            [required]
                        }
                        component={TextArea}
                        type="text"/>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm="4">
                    Publicznosć
                </Form.Label>
                <Col sm="7">
                    <Field name="isPublic" placeholder="yes or no"
                        validate={
                            [required]
                        }
                        component={InputText}
                        type="text"/>
                </Col>
            </Form.Group>
            <div className={
                s.formButton
            }>
                <button className={
                        s.buttonRegister
                    }
                    disabled={
                        props.pristine || props.submitting
                    }
                    onClick={
                        props.reset
                }>
                    Usuń
                </button>
                <NavLink to="/" >
                  <button className={s.buttonRegister}>
                    Wróć
                  </button>
                </NavLink>
                <button className={
                    s.buttonRegister
                }>Dodaj przepis</button>
            </div>
        </Form>
    );
};
const RecipeFormRedux = reduxForm({form: 'FormRecipe'})(FormRecipe);
export default AddRecipe;
