import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { todoListReducer } from "./todoListReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todoListReducer: todoListReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storeRedux = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default storeRedux;