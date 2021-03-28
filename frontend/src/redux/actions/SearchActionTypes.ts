export const SEARCH_LOADING = "SEARCH_LOADING";
export const SEARCH_FAIL = "SEARCH_FAIL";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";


export interface SearchLoading {
    type: typeof SEARCH_LOADING;
}

export interface SearchFail {
    type: typeof SEARCH_FAIL
    payload: {
        message: string
    }
}


export interface SearchSuccess {
    type: typeof SEARCH_SUCCESS;
    payload: {
        scans: any[],
        query: string,
        loadMore: number,
        list?: []
    };
}

export type SearchDispatchTypes = SearchLoading | SearchFail | SearchSuccess;
