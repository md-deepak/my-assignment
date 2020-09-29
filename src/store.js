import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger/src";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/RootSaga";
import { newsReducer } from "./reducers/NewsReducer";
const sagaMiddleware = createSagaMiddleware();
const middleWares = [];

if (process.env.NODE_ENV !== "production") {
	middleWares.push(logger);
}
const store = createStore(combineReducers({ newsReducer }), compose(composeWithDevTools(applyMiddleware(sagaMiddleware, ...middleWares))));
sagaMiddleware.run(rootSaga);
export default store;
