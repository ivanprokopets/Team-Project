import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../store';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toggleAuth } from '../store/authReducer';
interface MapStatePropsType {
  isAuth: boolean;
}

interface MapDispatchPropsType {}

interface OwnPropsType {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const withAuthRedirect = (WrappedComponent: any) => {
  class HeaderContainer extends React.Component<PropsType> {
    render() {
      const token = localStorage.getItem('accessToken');
      if (token) {
        toggleAuth(true);
      } else {
        toggleAuth(false);
      }
      if (this.props.isAuth) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <Redirect to="/login" />;
      }
    }
  }

  const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
      isAuth: state.auth.isAuth,
    };
  };

  return compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
      toggleAuth,
    })(HeaderContainer),
  );
};
export default withAuthRedirect;
