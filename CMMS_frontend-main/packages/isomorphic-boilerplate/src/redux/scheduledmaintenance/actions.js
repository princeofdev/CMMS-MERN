const actions = {
  GET_SMs: "GET_SMs",
  ADD_SM: "ADD_SM",
  ADD_SM_SUCCESS: "ADD_SM_SUCCESS",
  DELETE_SM_DATA: "DELETE_SM_DATA",
  GET_SM_REDUCER: "GET_SM_REDUCER",
  GET_SM_BYID: "GET_SM_BYID",
  GET_SM_BYID_REDUCER: "GET_SM_BYID_REDUCER",
  UPDATE_SM_DATA: "UPDATE_SM_DATA",
  DELETE_SM_SUCCESS:"DELETE_SM_SUCCESS",
  GET_SM_PRINT_DATA_BYID:"  GET_SM_PRINT_DATA_BYID",
  GET_SM_PRINT_BYID_REDUCER:"GET_SM_PRINT_BYID_REDUCER",
  CREATE_SM_ID: "CREATE_SM_ID",
  CREATE_SM_ID_SUCCESS: "CREATE_SM_ID_SUCCESS",
  GET_SM_LOGS: "GET_SM_LOGS",
  GET_SM_LOGS_REDUCER: "GET_SM_LOGS_REDUCER",
  initSMData: () => ({ type: actions.GET_SMs }),
  addSM: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_SM, payload: { sendData: sendData } });
    };
  },
  getAssetById: (Id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_SM_BYID, payload: { Id: Id } });
    };
  },
  getPrintData: (Id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_SM_PRINT_DATA_BYID, payload: { Id: Id } });
    };
  },
  getSMLogsData: (Id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_SM_LOGS, payload: { Id: Id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_SM_DATA,
        payload: {id:selected}
      });
    };
  },
  updateSMData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_SM_DATA,
        payload: { sendData: sendData, id: id },
      });
    };
  },
  createSMID: () => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.CREATE_SM_ID,
      });
    };
  },

};
export default actions;
