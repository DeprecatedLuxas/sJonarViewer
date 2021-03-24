import { IKnownState, ActionTypes } from "../types";

const initialState: IKnownState = { knowns: [] };

export default function known(
    state = initialState,
    action: ActionTypes
): IKnownState {
    switch (action.type) {
        case "SET_KNOWNS":
            return {
                ...state,
                knowns: action.payload.knowns
            }
        default:
            return state;
    }
}
 