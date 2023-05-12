const actions = {
  ADD_WORKORDER_BUSINESS: 'ADD_WORKORDER_BUSINESS',
  ADD_WORKORDER_BUSINESS_SUCCESS: 'ADD_WORKORDER_BUSINESS_SUCCESS',
  GET_WORKORDER_BUSINESSES: 'GET_WORKORDER_BUSINESSES',
  GET_WORKORDER_BUSINESSES_REDUCER: 'GET_WORKORDER_BUSINESSES_REDUCER',
  UPDATE_WORKORDER_BUSINESS: 'UPDATE_WORKORDER_BUSINESS',
  DELETE_WORKORDER_BUSINESSES: 'DELETE_WORKORDER_BUSINESSES',
  DELETE_WORKORDER_BUSINESSES_SUCCESS: 'DELETE_WORKORDER_BUSINESSES_SUCCESS',

  // initData: () => ({ type: actions.GET_WORKORDER_TASKS }),
  getDatas: (workOrderId) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.GET_WORKORDER_BUSINESSES,
        payload: { workOrderId: workOrderId },
      });
    };
  },
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_WORKORDER_BUSINESS,
        payload: { sendData: sendData },
      });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_WORKORDER_TASK_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_WORKORDER_BUSINESSES,
        payload: { id: selected },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_WORKORDER_BUSINESS,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
