import { handle } from 'redux-pack';
import { ADD_ARTICLE, GET_DATA } from "../actionTypes/index";

const initialState = {
  data: [],
  loaded: 'false',
};

function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case ADD_ARTICLE:
      return { ...state, articles: payload };
    case GET_DATA:
      return handle(state, action, {
        start: (_state) => ({
          ..._state,
          loaded: 'falseeeeeee',
        }),
        success: (_state) => ({
          ..._state,
          data: payload,
          loaded: 'trueeeeeeeee',
        }),
        failure: (_state) => ({
          ..._state,
          loaded: 'failssssssss',
        }),
        finish: (_state) => ({ ..._state, loaded: 'trew' }),
      });

    default: return state;
  }
}

export default rootReducer;