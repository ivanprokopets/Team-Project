import React, { FC } from 'react';
import { Recipe, User } from '../../../types/types';

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

      </div>
    </>
  );
};

export default Profile;
