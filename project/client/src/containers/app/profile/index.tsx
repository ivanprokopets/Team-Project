import React, { FC } from 'react';
import { Recipe, User } from '../../../types/types';
import { NavLink } from 'react-router-dom';
import s from './profile.module.css';

interface PropsType {
  user: User;
}

const Profile: FC<PropsType> = ({ user }) => {
  return (
    <>
      <div style={{ margin: '30px' }}>
        <div>
          <b>Name:</b> {user.name}
        </div>
        <div>
          <b>Email:</b> {user.email}
        </div>
        <NavLink to="/addRecipe">
          <button className={s.buttonAddRecipe}>Dodaj swój przepis!</button>
        </NavLink>
      </div>
    </>
  );
};

export default Profile;
