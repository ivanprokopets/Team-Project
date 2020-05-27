import { productAPI, authAPI } from './../api/api';
import { recipeAPI } from '../api/api';
import { AppStateType } from '.';
import { Recipe,Product} from '../types/types';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const SET_USER ='SET_USER'
const initialState = {
 
};

type InitialState = typeof initialState;

const AuthReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    default:
      return state;
  }
};

type ActionsTypes = SetUserActionType;

interface SetUserActionType {
  type: typeof SET_USER;
  user: Object;
}
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestSignIn = (email:string,password:string): ThunkType => {
  return async (dispatch, getState) => {
    const {data} = await authAPI.signIn(email,password);
    console.log(data);
    localStorage.setItem('accessToken',data.accessToken);
    localStorage.setItem('refreshToken',data.refreshToken);
    console.log('sign in');
  };
};
export const requestRegister = (name:string,email:string,password:string): ThunkType => {
  return async (dispatch, getState) => {
    const {data} = await authAPI.register(name,email,password);
    console.log(data);
    console.log('registered');
  };
};
export default AuthReducer;
