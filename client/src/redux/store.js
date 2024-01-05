
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //thunk es un middleware, una funcion de paso que
                                // se ejecuta antes de que se termine de solicitar info
import rootReducer from './reducer';

const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk)) // esta línea es para poder hacer peticiones a un server
);
export default store;