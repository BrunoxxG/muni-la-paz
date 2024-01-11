import {
  GET_COMPLEXES,
  GET_PUBLICATIONS,
} from "./actions";

const initialState = {
  complexes: [],
  publications: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_COMPLEXES:
          return {
              ...state,
              complexes: action.payload,
          };
      case GET_PUBLICATIONS:
          return {
              ...state,
              publications: action.payload,
          };
      default:
          return { ...state };
  }
};

export default rootReducer;