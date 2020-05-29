import React from 'react';
import {connect} from 'react-redux';
import { compose } from 'redux';

import {  requestGetRecipes } from '../../../store/appReducer';
import RecipeList from '.';
import { getRecipes } from '../../../store/selectors';
import { Recipe } from '../../../types/types';
import { AppStateType } from '../../../store';
import HeaderContainer from "../../../components/header/HeaderContainer";
import withExistToken from '../../../HOC/withExistToken';

interface MapStatePropsType  {
  recipes: Array<Recipe>;
};

interface MapDispatchPropsType  {
  requestGetRecipes: () => void;
};

interface OwnPropsType  {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class RecipeListContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.requestGetRecipes();
  
  }

  render() {
    const { recipes } = this.props;

    return (
      <>
        <HeaderContainer withSearch/>
        <RecipeList recipes={recipes} />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    recipes: getRecipes(state),
  };
};

export default 
    connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps,{requestGetRecipes})
(withExistToken(RecipeListContainer))
