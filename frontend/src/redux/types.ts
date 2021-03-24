import { IKnowns, IKnownsObject } from "../types/knowns";
export const SET_KNOWNS = "SET_KNOWNS";
export const SET_LOADING = "SET_LOADING"
export interface IKnownState {
    knowns: IKnownsObject[];
}

interface SetKnownsAction {
    type: typeof SET_KNOWNS;
    payload: IKnowns;
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
}

export type ActionTypes = SetKnownsAction | SetLoadingAction;
export type KnownActionTypes = SetKnownsAction;