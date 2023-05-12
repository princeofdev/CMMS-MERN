const actions = {
  GET_PORT: 'GET_PORT',
  ADD_PORT: 'ADD_PORT',
  // ADD_CODE_TYPE_SUCCESS: "ADD_CODE_TYPE",
  GET_PORT_REDUCER: 'GET_PORT_REDUCER',
  UPDATE_PORT: 'UPDATE_PORT',
  DELETE_PORT: 'DELETE_PORT',

  getPortData: () => ({ type: actions.GET_PORT }),
  addPort: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_PORT, payload: { sendData: sendData } });
    };
  },

  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_PORT,
        payload: { id: selected },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_PORT,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
