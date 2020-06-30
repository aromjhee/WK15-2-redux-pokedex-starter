import { baseUrl } from '../config';

const SET_TOKEN = 'pokedex/authentication/SET_TOKEN';
const TOKEN_KEY = 'pokedex/authentication/TOKEN_KEY';

export const setToken = token => ({ type: SET_TOKEN, token });

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

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    default: return state;
  }
}