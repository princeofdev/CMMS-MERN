const actions = {
  ADD_WORKORDER_COMPLETION: "ADD_WORKORDER_COMPLETION",
  ADD_WORKORDER_COMPLETION_SUCCESS: "ADD_WORKORDER_COMPLETION_SUCCESS",
  GET_WORKORDER_COMPLETION: "GET_WORKORDER_COMPLETION",
  GET_WORKORDER_COMPLETION_REDUCER: "GET_WORKORDER_COMPLETION_REDUCER",
  UPDATE_WORKORDER_COMPLETION: "UPDATE_WORKORDER_COMPLETION",
  
  getDatas: (workOrderId) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.GET_WORKORDER_COMPLETION, payload: { workOrderId: workOrderId } });
    };
  },
  addData: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_WORKORDER_COMPLETION, payload: { sendData: sendData } });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_WORKORDER_COMPLETION,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
