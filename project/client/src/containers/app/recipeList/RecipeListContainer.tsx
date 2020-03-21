import React from 'react';
import {connect} from 'react-redux';
import { compose } from 'redux';

import { requestSetRecipe, requestGetRecipes } from '../../../store/appReducer';
import RecipeList from '.';
import { getRecipes } from '../../../store/selectors';
import { Recipe } from '../../../types/types';
import { AppStateType } from '../../../store';


interface MapStatePropsType  {
  recipes: Array<Recipe>;
};

interface MapDispatchPropsType  {
  requestSetRecipe: (recipe: Recipe) => void;
  requestGetRecipes: () => void;
};

interface OwnPropsType  {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class RecipeListContainer extends React.Component<PropsType> {
  componentDidMount() {
    //when will be backend
    //this.props.requestGetRecipes();
  }

  render() {
    const { recipes, requestSetRecipe } = this.props;
    return (
      <>
        <RecipeList recipes={recipes} requestSetRecipe={requestSetRecipe} />
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
    connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps,{requestGetRecipes,requestSetRecipe})
(RecipeListContainer))
