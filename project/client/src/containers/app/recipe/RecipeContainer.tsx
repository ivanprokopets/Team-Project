import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  requestGetRecipes,
  togglePublic,
  requestUpdateRecipe,
  requestGetRecipe,
} from '../../../store/appReducer';
import RecipeComponent from '.';
import { getRecipes } from '../../../store/selectors';
import { Recipe } from '../../../types/types';
import { AppStateType } from '../../../store';
import HeaderContainer from '../../../components/header/HeaderContainer';
import withExistToken from '../../../HOC/withExistToken';

interface MapStatePropsType {
  recipes: Array<Recipe>;
  isAuth: boolean;
  userId: string;
  recipe: Recipe;
}

interface MapDispatchPropsType {
  requestGetRecipes: () => void;
  togglePublic: (isPublic: string) => void;
  requestUpdateRecipe: (recipe: Recipe) => void;
  requestGetRecipe: (recipeId: string) => void;
}

interface OwnPropsType {
  match: any;
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class RecipeContainer extends React.Component<PropsType> {
  componentDidMount() {
    const recipeId = this.props.match.params.recipeId;
    this.props.requestGetRecipe(recipeId);
  }

  render() {
    return (
      <>
        <HeaderContainer />
        <RecipeComponent {...this.props} />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    recipes: getRecipes(state),
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    recipe: state.app.recipe,
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
  mapStateToProps,
  { requestGetRecipes, togglePublic, requestUpdateRecipe, requestGetRecipe },
)(withExistToken(RecipeContainer));
