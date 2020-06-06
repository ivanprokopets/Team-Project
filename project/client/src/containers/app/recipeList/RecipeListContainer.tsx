import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { requestGetRecipes, togglePublic, requestUpdateRecipe } from '../../../store/appReducer';
import RecipeList from '.';
import { getRecipes } from '../../../store/selectors';
import { Recipe } from '../../../types/types';
import { AppStateType } from '../../../store';
import HeaderContainer from '../../../components/header/HeaderContainer';
import withExistToken from '../../../HOC/withExistToken';

interface MapStatePropsType {
  recipes: Array<Recipe>;
  isAuth: boolean;
  userId: string;
}

interface MapDispatchPropsType {
  requestGetRecipes: () => void;
  togglePublic: (isPublic: string) => void;
  requestUpdateRecipe: (recipe: Recipe) => void;
}

interface OwnPropsType {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class RecipeListContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.requestGetRecipes();
  }

  render() {
    const { recipes, togglePublic, requestGetRecipes, requestUpdateRecipe, userId } = this.props;

    return (
      <>
        <HeaderContainer withSearch />
        <RecipeList
          userId={userId}
          requestUpdateRecipe={requestUpdateRecipe}
          isAuth={this.props.isAuth}
          recipes={recipes}
          togglePublic={togglePublic}
          requestGetRecipes={requestGetRecipes}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    recipes: getRecipes(state),
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
  mapStateToProps,
  { requestGetRecipes, togglePublic, requestUpdateRecipe },
)(withExistToken(RecipeListContainer));
