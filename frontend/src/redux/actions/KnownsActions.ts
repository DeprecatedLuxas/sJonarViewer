import {Dispatch} from "redux";
import {KNOWNS_LOADING, KNOWNS_FAIL, KNOWNS_SUCCESS, KnownsDispatchTypes} from "./KnownsActionTypes";
import axios from "axios";

export const GetKnowns = () => async (dispatch: Dispatch<KnownsDispatchTypes>) => {
  try {
    dispatch({
      type: KNOWNS_LOADING
    })

    const res = await axios.get("/api/known");

    dispatch({
      type: KNOWNS_SUCCESS,
      payload: res.data.knowns
    })

  } catch(e) {
    dispatch({
      type: KNOWNS_FAIL
    })
  }
};