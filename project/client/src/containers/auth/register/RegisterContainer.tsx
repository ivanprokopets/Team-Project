import React from 'react';
import {connect} from 'react-redux';
import { compose } from 'redux';

import {  requestRegister } from '../../../store/authReducer';
import { getRecipes } from '../../../store/selectors';
import { AppStateType } from '../../../store';
import Register from './Register';


interface MapStatePropsType  {
};

interface MapDispatchPropsType  {
  requestRegister: (name:string,email:string,password:string) => void;
};

interface OwnPropsType  {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class RegisterContainer extends React.Component<PropsType> {


  render() {

    return (
      <>
       <Register requestRegister={this.props.requestRegister}/>
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    recipes: getRecipes(state),
  };
};

export default compose(
    connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps,{requestRegister})
(RegisterContainer))
