const actions = {
  ADD_BUSINESSES_DATA: 'ADD_BUSINESSES_DATA',
  // GET_WORKORDERS: 'GET_WORKORDERS',
  // ADD_WORKORDER: 'ADD_WORKORDER',
  // ADD_WORKORDER_FROM_TASK: 'ADD_WORKORDER_FROM_TASK',
  // ADD_WORKORDER_SUCCESS: 'ADD_WORKORDER_SUCCESS',
  ADD_FAILED: 'ADD_FAILED',
  // GET_WORKORDER_REDUCER: 'GET_WORKORDER_REDUCER',
  // GET_WORK_ORDER_BY_ID: 'GET_WORK_ORDER_BY_ID',
  GET_BY_ID_REDUCER: 'GET_BY_ID_REDUCER',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS', 
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAILED: 'DELETE_FAILED',
  GET_BUSINESSES_DATA: 'GET_BUSINESSES_DATA',
  GET_BUSINESSES_REDUCER: 'GET_BUSINESSES_REDUCER',
  GET_BUSINESSES_BY_ID: 'GET_BUSINESSES_BY_ID',
  GET_BUSINESSES_BY_ID_REDUCER: 'GET_BUSINESSES_BY_ID_REDUCER',
  DELETE_BUSINESSES: 'DELETE_BUSINESSES',
  UPDATE_BUSINESSES: 'UPDATE_BUSINESSES',
  ADD_BUSINESSES_SUCCESS: 'ADD_BUSINESSES_SUCCESS',

  initData: () => ({ type: actions.GET_WORKORDERS }),
  initOrderData: () => ({ type: actions.GET_WORKORDERS }),
  getBusinessData: () => ({ type: actions.GET_BUSINESSES_DATA }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_WORKORDER,
        payload: { sendData: sendData },
      });
    };
  },
  addBusinessData: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_BUSINESSES_DATA,
        payload: { sendData: sendData },
      });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_BUSINESSES_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (id) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_BUSINESSES,
        payload: { id: id },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_BUSINESSES,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
