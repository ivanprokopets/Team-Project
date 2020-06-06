import React, { FC } from 'react';
import { Recipe, User } from '../../../types/types';
import { NavLink } from 'react-router-dom';

interface PropsType {
  user: User;
}

const Profile: FC<PropsType> = ({ user }) => {
  return (
    <>
      <div style={{ margin: '30px' }}>
        <div>
          <b>name:</b> {user.name}
        </div>
        <div>
          <b>email:</b> {user.email}
        </div>
        <NavLink to="/addRecipe">add recipe</NavLink>
      </div>
    </>
  );
};

export default Profile;
