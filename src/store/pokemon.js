import { baseUrl } from '../config';

const LOAD = 'pokedex/pokemon/LOAD';
const LOAD_ONE = 'pokedex/pokemon/LOAD_ONE';
const LOAD_TYPES = 'pokedex/pokemon/LOAD_TYPES';
const HIDE_FORM = 'pokedex/authentication/HIDE_FORM';
const SHOW_FORM = 'pokedex/authentication/SHOW_FORM';

export const load = pokemonList => ({ type: LOAD, pokemonList });
export const loadOne = onePokemon => ({ type: LOAD_ONE, onePokemon });
export const loadTypes = types => ({ type: LOAD_TYPES, types });
export const hideForm = () => ({ type: HIDE_FORM });
export const showForm = () => ({ type: SHOW_FORM });

export const getPokemon = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/pokemon`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (response.ok) {
    const pokemon = await response.json();
    dispatch(load(pokemon))
  }
};

export const getOnePokemon = id => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/pokemon/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (response.ok) {
    const onePokemon = await response.json();
    dispatch(loadOne(onePokemon));
  }
};

export const getTypes = () => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/pokemon/types`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    const types = await response.json();
    dispatch(loadTypes(types));
  }
}

export const createPokemon = data => async (dispatch, getState) => {
  const { authentication: { token } } = getState();
  const response = await fetch(`${baseUrl}/pokemon`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(hideForm());
    dispatch(getPokemon());
  }
}

export default function reducer(state = { types: [] }, action) {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        pokemonList: action.pokemonList,
      };
    }

    case LOAD_ONE: {
      return {
        ...state,
        onePokemon: action.onePokemon,
      }
    }

    case LOAD_TYPES: {
      return {
        ...state,
        types: action.types,
      }
    }

    case HIDE_FORM: {
      return {
        ...state,
        formVisible: false,
      };
    }

    case SHOW_FORM: {
      return {
        ...state,
        formVisible: true,
      };
    }

    default: return state;
  }
}