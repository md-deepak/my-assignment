import { all } from "redux-saga/effects";
import NewsRootSaga from "./NewsSaga";
export default function* rootSaga() {
	yield all([NewsRootSaga()]);
}
