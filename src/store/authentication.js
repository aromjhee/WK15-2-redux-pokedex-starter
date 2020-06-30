import { baseUrl } from '../config';

const SET_TOKEN = 'store/authentication/setToken';

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