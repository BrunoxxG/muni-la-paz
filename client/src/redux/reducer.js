import {
  GET_COMPLEXES,
  GET_PUBLICATIONS,
  GET_COMPLEX_DETAIL,
  GET_PUBLICATION_DETAIL,
  CLEAN_DETAIL
} from "./actions";

const initialState = {
  complexes: [],
  publications: [],
  complexDetail: {},
  publicationDetail: {},
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
    case GET_COMPLEX_DETAIL:
      return {
        ...state,
        complexDetail: action.payload,
      };
    case GET_PUBLICATION_DETAIL:
      return {
        ...state,
        publicationDetail: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        complexDetail: {},
        publicationDetail: {},
      };
    default:
      return { ...state };
  }
};

export default rootReducer;