import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  requestGetRecipes,
  requestFilterProducts,
  setProductSearch,
  setProducts,
} from '../../store/appReducer';
import { getRecipes } from '../../store/selectors';
import { Recipe, Product } from '../../types/types';
import { AppStateType } from '../../store';
import Header from './Header';

interface MapStatePropsType {
  isAuth: boolean;
  recipes: Array<Recipe>;
  productSearch: string;
  products: any;
}

interface MapDispatchPropsType {
  requestGetRecipes: (ingredients?: Array<string>) => void;
  requestFilterProducts: () => void;
  setProductSearch: (product: string) => void;
  setProducts: (products: Array<Product>) => void;
}

interface OwnPropsType {
  withSearch?: boolean;
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return (
      <>
        <Header {...this.props} />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    recipes: getRecipes(state),
    isAuth: state.auth.isAuth,
    productSearch: state.app.productSearch,
    products: state.app.products,
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    requestGetRecipes,
    requestFilterProducts,
    setProductSearch,
    setProducts,
  })(HeaderContainer),
);
