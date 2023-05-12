const actions = {
  GET_BUSINESS_BRANCH: "GET_BUSINESS_BRANCH",
  ADD_BUSINESS_BRANCH: "ADD_BUSINESS_BRANCH",
  GET_BUSINESS_BRANCH_REDUCER:"GET_BUSINESS_BRANCH_REDUCER",
  UPDATE_BUSINESS_BRANCH: "UPDATE_BUSINESS_BRANCH",
  DELETE_BUSINESS_BRANCH:'DELETE_BUSINESS_BRANCH',
  CHANGED_REDUCER:'CHANGED_REDUCER',
  getAllBranch: (businessId) => ({ type: actions.GET_BUSINESS_BRANCH, payload: businessId}),
  addBranch: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_BUSINESS_BRANCH, payload: { sendData: sendData } });
    };
  },
  deleteData: (selected,intBusinessID) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_BUSINESS_BRANCH,
        payload: {id:selected,intBusinessID:intBusinessID}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_BUSINESS_BRANCH,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
