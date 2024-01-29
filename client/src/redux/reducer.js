import {
  GET_COMPLEXES,
  GET_PUBLICATIONS,
  GET_USERS,
  GET_COMPLEX_DETAIL,
  GET_PUBLICATION_DETAIL,
  CLEAN_DETAIL,
  GET_PUBLICATIONS_BY_TITLE
} from "./actions";

const initialState = {
  complexes: [],
  publications: [],
  users: [],
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
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
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
    case GET_PUBLICATIONS_BY_TITLE:
      return {
        ...state,
        publications: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;