import { Dispatch } from "redux";
import {
    SEARCH_FAIL,
    SEARCH_LOADING,
    SEARCH_SUCCESS,
    SearchDispatchTypes,
} from "./SearchActionTypes";
import axios from "axios";
import _ from "lodash";
import { parseSearchBar, checkEmptyObject, encodeSearch } from "../../utils";

export const GetScans = (
    search: string,
    loadMore: number,
    more: boolean,
    list: [],
    history?: any
) => async (dispatch: Dispatch<SearchDispatchTypes>) => {
    try {
        dispatch({
            type: SEARCH_LOADING,
        });
        let parsedStateSearch;
        if (more) {
            parsedStateSearch = parseSearchBar(search, loadMore * 50);
        } else {
            parsedStateSearch = parseSearchBar(search);
        }
    
        if (_.isEmpty(parsedStateSearch)) {
            dispatch({
                type: SEARCH_FAIL,
                payload: {
                    message: "Your search input did not match any of the search operators.",
                }
                    
            });
            return;
        }
        
        if (checkEmptyObject(parsedStateSearch)) {
            dispatch({
                type: SEARCH_FAIL,
                payload: {
                    message: "One of your search operators need a value.",
                }
            });
            return;
        }
        
        let url = encodeSearch(
            JSON.stringify(parsedStateSearch)
        )
        
        const res = await axios.get(
            `/api/search?query=${url}`
        );
        if (history !== undefined) {
            history.push(`search?query=${url}`)
        }
    
        
        dispatch({
            type: SEARCH_SUCCESS,
            payload: {
                scans: list.concat(res.data.scans),
                query: encodeURIComponent(JSON.stringify(parsedStateSearch)),
                loadMore: loadMore + 1,
            },
        });
    } catch (e) {
        dispatch({
            type: SEARCH_FAIL,
            payload: {
                message: e.message
            },
        });
    }
};
