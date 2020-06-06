import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { requestFilterRecipe } from '../../store/appReducer';
import { getRecipes } from '../../store/selectors';
import { Recipe } from '../../types/types';
import { AppStateType } from '../../store';
import Header from './Header';

interface MapStatePropsType {
  isAuth: boolean;
  recipes: Array<Recipe>;
}

interface MapDispatchPropsType {
  requestFilterRecipe: (ingredients: Array<string>) => void;
}

interface OwnPropsType {
  withSearch?: boolean;
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return (
      <>
        <Header
          isAuth={this.props.isAuth}
          withSearch={this.props.withSearch}
          requestFilterRecipe={this.props.requestFilterRecipe}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    recipes: getRecipes(state),
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    requestFilterRecipe,
  })(HeaderContainer),
);
