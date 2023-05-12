const actions = {
  GET_CURRENCY: 'GET_CURRENCY',
  ADD_CURRENCY: 'ADD_CURRENCY',
  // ADD_CODE_TYPE_SUCCESS: "ADD_CODE_TYPE",
  GET_CURRENCY_REDUCER: 'GET_CURRENCY_REDUCER',
  UPDATE_CURRENCY: 'UPDATE_CURRENCY',
  DELETE_CURRENCY: 'DELETE_CURRENCY',

  getCurrencyData: () => ({ type: actions.GET_CURRENCY }),
  addCurrency: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_CURRENCY, payload: { sendData: sendData } });
    };
  },

  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_CURRENCY,
        payload: { id: selected },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_CURRENCY,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
