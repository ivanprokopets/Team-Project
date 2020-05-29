import { getUser } from './selectors/index';
import { userAPI } from './../api/api';
import { User } from './../types/types';
import { productAPI } from '../api/api';
import { recipeAPI } from '../api/api';
import { AppStateType } from '.';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const SET_USERS = 'SET_USERS';
const SET_USER = 'SET_USER';

const initialState = {
  user: {
    id: 0,
    name: '',
    email: '',
  } as User,
  users: [{}] as Array<User>,
};

type InitialState = typeof initialState;

const ProfileReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };

    default:
      return state;
  }
};

type ActionsTypes = SetUsersActionType | SetUserActionType;

interface SetUsersActionType {
  type: typeof SET_USERS;
  users: Array<User>;
}
export const setUsers = (users: Array<User>): SetUsersActionType => ({
  type: SET_USERS,
  users,
});
interface SetUserActionType {
  type: typeof SET_USER;
  user: User;
}
export const setUser = (user: User): SetUserActionType => ({
  type: SET_USER,
  user,
});

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestGetUsers = (): ThunkType => {
  return async (dispatch, getState) => {
    const { data } = await userAPI.getUsers();
    dispatch(setUsers(data));
  };
};
export const requestGetUser = (id: string): ThunkType => {
  return async (dispatch, getState) => {
    const { data } = await userAPI.getUser(id);
    dispatch(setUser(data));
  };
};

export const requestRemoveUser = (id: string): ThunkType => {
  return async (dispatch, getState) => {
    await productAPI.removeProduct(id);
  };
};
export default ProfileReducer;
