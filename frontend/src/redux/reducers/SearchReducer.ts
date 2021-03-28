import {
    SEARCH_FAIL,
    SEARCH_LOADING,
    SEARCH_SUCCESS,
    SearchDispatchTypes
} from "../actions/SearchActionTypes";

interface DefaultStateI {
    loading: boolean;
    scans?: [];
    query?: string;
    loadMore?: number;
    message?: string
}

const defaultState: DefaultStateI = {
    loading: false,
};

const searchReducer = (
    state: DefaultStateI = defaultState,
    action: SearchDispatchTypes
): DefaultStateI => {
    switch (action.type) {
        case SEARCH_FAIL:
            return {
                loading: false,
                message: action.payload.message
            };
        case SEARCH_LOADING:
            return {
                loading: true,
            };
        case SEARCH_SUCCESS:
            return {
                loading: false,
                scans: action.payload.scans as [],
                query: action.payload.query,
                loadMore: action.payload.loadMore,
                
            };
        default:
            return state;
    }
};

export default searchReducer;
