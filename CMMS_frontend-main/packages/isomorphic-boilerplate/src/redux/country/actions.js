const actions = {
  GET_COUNTRY: "GET_COUNTRY",
  ADD_COUNTRY: "ADD_COUNTRY",
  // ADD_CODE_TYPE_SUCCESS: "ADD_CODE_TYPE",
  GET_COUNTRY_REDUCER: "GET_COUNTRY_REDUCER",
  UPDATE_COUNTRY: "UPDATE_COUNTRY",
  DELETE_COUNTRY: 'DELETE_COUNTRY',

  getCountryData: () => ({ type: actions.GET_COUNTRY }),
  addCountry: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_COUNTRY, payload: { sendData: sendData } });
    };
  },

  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_COUNTRY,
        payload: { id: selected }
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_COUNTRY,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
