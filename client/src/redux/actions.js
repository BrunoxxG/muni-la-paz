import axios from "axios";
import { URL_BASE } from "../utils/const";

export const GET_COMPLEXES = "GET_COMPLEXES";
export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_COMPLEX_DETAIL = "GET_COMPLEX_DETAIL";
export const GET_PUBLICATION_DETAIL = "GET_PUBLICATION_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";

export const getComplexes = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL_BASE}/complexes`);
            return dispatch({
                type: GET_COMPLEXES,
                payload: data,
            });
        } catch (error) {
            console.log(error.response.data);
        }
        
    };
};

export const getPublications = () => {
  return async (dispatch) => {
      try {
          const { data } = await axios.get(`${URL_BASE}/publications`);
          return dispatch({
              type: GET_PUBLICATIONS,
              payload: data,
          });
      } catch (error) {
          console.log(error.response.data);
      }
      
  };
};

export const getComplexDetail = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL_BASE}/complexes/${id}`);
            return dispatch({
                type: GET_COMPLEX_DETAIL,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: GET_COMPLEX_DETAIL,
                payload: error.response.data,
            });
        }
    };
};

export const getPublicationDetail = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL_BASE}/publications/${id}`);
            return dispatch({
                type: GET_PUBLICATION_DETAIL,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: GET_PUBLICATION_DETAIL,
                payload: error.response.data,
            });
        }
    };
};

export const cleanDetail = () => {
    return { type: CLEAN_DETAIL };
};