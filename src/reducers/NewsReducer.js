const initialState = {
    loading: false,
    newsList: {},
    newsIdStatus: false,
    error: {},
};

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "@FETCH_NEWS_ID":
            return {
                ...state,
                loading: true,
                newsIdStatus: false,
                newsList: {},
                error: {},
            };

        case "@FETCH_NEWS_ID_FULFILLED":
            return {
                ...state,
                loading: false,
                newsList: action.payload,
                newsIdStatus: true,
                error: {},
            };
        case "@FETCH_NEWS_ID_REJECTED":
            return {
                ...state,
                loading: false,
                newsIdStatus: false,
                newsList: {},
                error: action.payload.data,
            };
        default:
            return state;
    }
};
