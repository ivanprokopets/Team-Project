import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { requestGetUser } from '../../../store/profileReducer';
import Profile from '.';
import { getUser } from '../../../store/selectors';
import { User } from '../../../types/types';
import { AppStateType } from '../../../store';
import HeaderContainer from '../../../components/header/HeaderContainer';
import jwt from 'jwt-decode';

interface MapStatePropsType {
  user: User;
}

interface MapDispatchPropsType {
  requestGetUser: (id: string) => void;
}

interface OwnPropsType {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { userId } = jwt(localStorage.getItem('accessToken') || '');
    this.props.requestGetUser(userId);
  }
  render() {
    return (
      <>
        <HeaderContainer />
        <Profile user={this.props.user} />
      </>
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    user: state.profile.user,
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    requestGetUser,
  })(ProfileContainer),
);
