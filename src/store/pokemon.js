import { baseUrl } from '../config';

const LOAD = 'pokedex/pokemon/LOAD';

export const load = pokemonList => ({ type: LOAD, pokemonList });

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

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        pokemonList: action.pokemonList,
      };
    }

    default: return state;
  }
}