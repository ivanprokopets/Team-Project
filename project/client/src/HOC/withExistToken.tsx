import React from 'react';
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

const withExistToken = (WrappedComponent: any) => {
  class withExistTokenContainer extends React.Component<PropsType> {
    render() {
      const token = localStorage.getItem('accessToken');
      if (token) {
        this.props.toggleAuth(true);
        const { userId } = jwt(JSON.parse(token).value);
        this.props.setUserId(userId);
        const { time } = JSON.parse(token);
        if (new Date().getTime() > time + 1800000) {
          localStorage.removeItem('accessToken');
          this.props.toggleAuth(false);
          this.props.setUserId('');
        } else {
          return <WrappedComponent {...this.props} />;
        }
      } else {
        this.props.toggleAuth(false);
        return <WrappedComponent {...this.props} />;
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
      setUserId,
    })(withExistTokenContainer),
  );
};
export default withExistToken;
