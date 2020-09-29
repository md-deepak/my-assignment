import { call, put, takeEvery, all } from "redux-saga/effects";
import Axios from "axios";
import _ from "lodash";
import { newStoriesUrl, storyUrl } from "../services/NewsApi";

export function* fetchNews() {
    try {
        const response = yield call(Axios.get, `${newStoriesUrl}`);
        const data = yield all(
            _.reverse(response.data)
                .slice(0, 90)
                .map((d) => call(Axios.get, `${storyUrl + d}.json`))
        );
        const responseData = _.map(data, (d) => d.data);
        yield put({
            type: "@FETCH_NEWS_ID_FULFILLED",
            payload: responseData,
        });
    } catch (error) {
        yield put({
            type: "@FETCH_NEWS_ID_REJECTED",
            payload: error.response,
        });
    }
}

export default function* NewsRootSaga() {
    yield all([takeEvery("@FETCH_NEWS_ID", fetchNews)]);
}
