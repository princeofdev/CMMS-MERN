const actions = {
  GET_CHECKLIST: "GET_CHECKLIST",
  ADD_CHECKLIST: "ADD_CHECKLIST",
  DELETE_CHECKLIST:'DELETE_CHECKLIST',
  UPDATE_CHECKLIST:'UPDATE_CHECKLIST',
  GET_CHECKLIST_REDUCER: "GET_CHECKLIST_REDUCER",
  DELETE_CHECKLIST_REDUCER: 'DELETE_CHECKLIST_REDUCER',
  getCheckListData: (id) => ({ type: actions.GET_CHECKLIST, payload: { id: id } }),
  addCheckList: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_CHECKLIST, payload: { sendData: sendData } });
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
        type: actions.DELETE_CHECKLIST,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_CHECKLIST,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
