import React from 'react';
import {connect} from 'react-redux';
import { compose } from 'redux';

import {  requestSignIn } from '../../../store/authReducer';
import { getRecipes } from '../../../store/selectors';
import { Recipe } from '../../../types/types';
import { AppStateType } from '../../../store';
import Login from './Login';


interface MapStatePropsType  {
};

interface MapDispatchPropsType  {
    requestSignIn: (email:string,password:string) => void;
};

interface OwnPropsType  {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class RecipeListContainer extends React.Component<PropsType> {


  render() {

    return (
      <>
       <Login requestSignIn={this.props.requestSignIn}/>
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
    connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps,{requestSignIn})
(RecipeListContainer))
