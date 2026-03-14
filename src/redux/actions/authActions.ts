import { AUTH_TYPES, User } from '../types';

interface SetUserAction {
  type: typeof AUTH_TYPES.SET_USER;
  payload: User;
}

interface SetAuthLoadingAction {
  type: typeof AUTH_TYPES.SET_AUTH_LOADING;
  payload: boolean;
}

interface SetAuthErrorAction {
  type: typeof AUTH_TYPES.SET_AUTH_ERROR;
  payload: string;
}

interface LogoutAction {
  type: typeof AUTH_TYPES.LOGOUT;
}

interface ClearAuthErrorAction {
  type: typeof AUTH_TYPES.CLEAR_ERROR;
}

export type AuthActionTypes =
  | SetUserAction
  | SetAuthLoadingAction
  | SetAuthErrorAction
  | LogoutAction
  | ClearAuthErrorAction;

export const setUser = (user: User): SetUserAction => ({
  type: AUTH_TYPES.SET_USER,
  payload: user,
});

export const setAuthLoading = (loading: boolean): SetAuthLoadingAction => ({
  type: AUTH_TYPES.SET_AUTH_LOADING,
  payload: loading,
});

export const setAuthError = (error: string): SetAuthErrorAction => ({
  type: AUTH_TYPES.SET_AUTH_ERROR,
  payload: error,
});

export const logout = (): LogoutAction => ({
  type: AUTH_TYPES.LOGOUT,
});

export const clearAuthError = (): ClearAuthErrorAction => ({
  type: AUTH_TYPES.CLEAR_ERROR,
});
