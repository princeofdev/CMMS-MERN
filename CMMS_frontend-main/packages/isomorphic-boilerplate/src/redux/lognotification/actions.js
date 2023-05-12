const actions = {
  GET_LOGS_BY_USER_ID: "GET_LOGS_BY_USER_ID",
  GET_LOGS_BY_USER_ID_REDUCER: "GET_LOGS_BY_USER_ID_REDUCER",
  // ADD_STATUS: "ADD_STATUS",
  // ADD_SUCCESS: "ADD_SUCCESS",
  // ADD_FAILED: "ADD_FAILED",
  // GET_STATUS_REDUCER: "GET_STATUS_REDUCER",
  // GET_BY_ID: "GET_BY_ID",
  // GET_BY_ID_REDUCER: "GET_BY_ID_REDUCER",
  // UPDATE_ASSET_CATEGORY: "UPDATE_ASSET_CATEGORY",
  // UPDATE_SUCCESS:'UPDATE_SUCCESS',
  // DELETE_ASSET_CATEGORY:'DELETE_ASSET_CATEGORY',
  // DELETE_SUCCESS:'DELETE_SUCCESS',
  // DELETE_FAILED:'DELETE_FAILED',

  // initData: () => ({ type: actions.GET_STATUS }),
  // add: (sendData) => {
  //   return (dispatch, getState) => {
  //     dispatch({ type: actions.ADD_STATUS, payload: { sendData: sendData } });
  //   };
  // },
  getLogsById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_LOGS_BY_USER_ID, payload: { id: id } });
    };
  },
//   deleteData: (selected) => {
//     return (dispatch) => {
//       dispatch({
//         type: actions.DELETE_ASSET_CATEGORY,
//         payload: {id:selected}
//       });
//     };
//   },
//   updateData: (sendData, id) => {
//     return (dispatch) => {
//       dispatch({
//         type: actions.UPDATE_ASSET_CATEGORY,
//         payload: { sendData: sendData, id: id },
//       });
//     };
//   },
};
export default actions;
