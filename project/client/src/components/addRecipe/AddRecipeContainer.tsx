import React from 'react';
import { connect } from 'react-redux';
import { requestAddRecipe } from '../../store/appReducer';
import { getRecipes } from '../../store/selectors';
import { AppStateType } from '../../store';
import AddRecipe from './AddRecipe';
import { Recipe } from '../../types/types';
import withExistToken from '../../HOC/withExistToken';
import withAuthRedirect from '../../HOC/withAuthRedirect';

interface MapStatePropsType {}

interface MapDispatchPropsType {
  requestAddRecipe: (recipe: Recipe) => void;
}

interface OwnPropsType {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class RecipeListContainer extends React.Component<PropsType> {
  render() {
    return (
      <>
        <AddRecipe requestAddRecipe={this.props.requestAddRecipe} />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    recipes: getRecipes(state),
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
  mapStateToProps,
  {
    requestAddRecipe,
  },
)(withAuthRedirect(withExistToken(RecipeListContainer)));
