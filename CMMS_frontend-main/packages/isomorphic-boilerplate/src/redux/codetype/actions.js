const actions = {
  GET_CODE_TYPE: 'GET_CODE_TYPE',
  ADD_CODE_TYPE: 'ADD_CODE_TYPE',
  // ADD_CODE_TYPE_SUCCESS: "ADD_CODE_TYPE",
  GET_CODE_TYPE_REDUCER: 'GET_CODE_TYPE_REDUCER',
  UPDATE_CODE_TYPE: 'UPDATE_CODE_TYPE',
  DELETE_CODE_TYPE: 'DELETE_CODE_TYPE',

  initCodeData: () => ({ type: actions.GET_CODE_TYPE }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_CODE_TYPE,
        payload: { sendData: sendData },
      });
    };
  },

  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_CODE_TYPE,
        payload: { id: selected },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_CODE_TYPE,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
