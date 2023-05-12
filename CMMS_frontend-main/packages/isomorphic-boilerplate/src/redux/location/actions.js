const actions = {
  GET_LOCATIONS: "GET_LOCATIONS",
  ADD_LOCATION: "ADD_LOCATION",
  GET_LOCATIONS_REDUCER: "GET_LOCATIONS_REDUCER",
  DELETE_LOCATION: "DELETE_LOCATION",
  UPDATE_LOCATION:'UPDATE_LOCATION',
  initData: () => ({ type: actions.GET_LOCATIONS }),
  addLocation: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_LOCATION, payload: { sendData: sendData } });
    };
  },
  // getById: (id) => {
  //   return (dispatch) => {
  //     dispatch({ type: actions.GET_PROJECT_BY_ID, payload: { id: id } });
  //   };
  // },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_LOCATION,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_LOCATION,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
