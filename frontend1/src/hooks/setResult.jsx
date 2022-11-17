import { postResult } from "../helper/helper";
import * as Action from "../redux/result_reducer";

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result));
  } catch (error) {
    console.log(error);
  }
};

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index));
  } catch (error) {
    console.log(error);
  }
};

export const usePublishResult = (resultData) => {
  const {result} = resultData;
  (async () => {
    try {
      if(result == []) throw new Error("Couldn't get Result")
      await postResult('/api/user/storeResult', resultData , data => data)
    } catch (error) {
      console.log(error);
    }
  })()
}