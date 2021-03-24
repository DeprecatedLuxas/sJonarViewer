import { SET_KNOWNS, ActionTypes } from "../types";

import { IKnowns } from "../../types/knowns";

export function setKnowns(knowns: IKnowns): ActionTypes {
    return {
        type: SET_KNOWNS,
        payload: knowns,
    };
}
