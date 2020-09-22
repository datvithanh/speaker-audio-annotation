import { GET_LIST_COMPETITION } from '../actions/types';

const initialState = {
  loading: true,
  competitions: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LIST_COMPETITION:
      return {
        ...state,
        loading: false,
        competitions: payload.competitions,
      };

    default:
      return state;
  }
}
