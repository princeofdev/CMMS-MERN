const actions = {
  GET_BUSINESS: "GET_BUSINESS",
  ADD_BUSINESS: "ADD_BUSINESS",
  ADD_BUSINESS_REDUCER: "ADD_BUSINESS_REDUCER",
  GET_BUSINESS_BY_ID: "GET_BUSINESS_BY_ID",
  GET_BUSINESS_REDUCER: "GET_BUSINESS_REDUCER",
  GET_BUSINESS_BY_ID_REDUCER: "GET_BUSINESS_BY_ID_REDUCER",
  UPDATE_BUSINESS: "UPDATE_BUSINESS",
  DELETE_BUSINESS: "DELETE_BUSINESS",
  getData: () => ({ type: actions.GET_BUSINESS }),
  addBusiness: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_BUSINESS, payload: { sendData: sendData } });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_BUSINESS_BY_ID, payload: {id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_BUSINESS,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_BUSINESS,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
