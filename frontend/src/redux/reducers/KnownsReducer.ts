import {
    KnownsDispatchTypes,
    KNOWNS_FAIL,
    KNOWNS_LOADING,
    KNOWNS_SUCCESS,
} from "../actions/KnownsActionTypes";

interface DefaultStateI {
    loading: boolean;
    knowns?: {
        id: string;
        name: string;
        amount: number;
        sslImplementationTested: string;
        jarmHash: string;
        link: string;
    }[];
}

const defaultState: DefaultStateI = {
    loading: false,
};

const knownsReducer = (
    state: DefaultStateI = defaultState,
    action: KnownsDispatchTypes
): DefaultStateI => {
    switch (action.type) {
        case KNOWNS_FAIL:
            return {
                loading: false,
            };
        case KNOWNS_LOADING:
            return {
                loading: true,
            };
        case KNOWNS_SUCCESS:
            return {
                loading: false,
                knowns: action.payload,
            };
        default:
            return state;
    }
};

export default knownsReducer;
