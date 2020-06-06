import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../store';
import { connect } from 'react-redux';
import { compose } from 'redux';
import jwt from 'jwt-decode';
import { toggleAuth, setUserId } from '../store/authReducer';
interface MapStatePropsType {
  isAuth: boolean;
}

interface MapDispatchPropsType {
  toggleAuth: (isAuth: boolean) => void;
  setUserId: (userId: string) => void;
}
interface OwnPropsType {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const withAuthRedirect = (WrappedComponent: any) => {
  class HeaderContainer extends React.Component<PropsType> {
    render() {
      const token = localStorage.getItem('accessToken');
      if (token) {
        this.props.toggleAuth(true);
        const { userId } = jwt(JSON.parse(token).value);
        this.props.setUserId(userId);
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
      setUserId,
      toggleAuth,
    })(HeaderContainer),
  );
};
export default withAuthRedirect;
