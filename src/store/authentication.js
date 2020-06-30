import { baseUrl } from '../config';

const SET_TOKEN = 'pokedex/authentication/SET_TOKEN';
const TOKEN_KEY = 'pokedex/authentication/TOKEN_KEY';
const REMOVE_TOKEN = 'pokedex/authentication/REMOVE_TOKEN';

export const setToken = token => ({ type: SET_TOKEN, token });

export const removeToken = token => ({ type: REMOVE_TOKEN });

export const login = (email, password) => async dispatch => {
  // Dispatch an action, here
  const response = await fetch(`${baseUrl}/session`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token))
  }
}

export const loadToken = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN_KEY)
  if (token) {
    dispatch(setToken(token))
  }
}

export const logout = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const res = await fetch(`${baseUrl}/session`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (res.ok) {
    window.localStorage.removeItem(TOKEN_KEY);
    dispatch(removeToken(token));
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      return newState;
    }

    default: return state;
  }
}