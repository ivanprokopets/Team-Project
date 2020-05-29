import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { requestFilterRecipe } from '../../store/appReducer';
import { getRecipes } from '../../store/selectors';
import { Recipe } from '../../types/types';
import { AppStateType } from '../../store';
import Header from './Header';

interface MapStatePropsType {}

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
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    requestFilterRecipe,
  })(HeaderContainer),
);
