import axios from "axios";
import { URL_BASE } from "../utils/const";

export const GET_COMPLEXES = "GET_COMPLEXES";
export const GET_PUBLICATIONS = "GET_PUBLICATIONS";

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