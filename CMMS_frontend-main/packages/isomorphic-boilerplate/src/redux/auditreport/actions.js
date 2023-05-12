const actions = {
  GET_AUDIT_REPORT: 'GET_AUDIT_REPORT',
  ADD_AUDIT_REPORT: 'ADD_AUDIT_REPORT',
  GET_AUDIT_REPORT_REDUCER: 'GET_AUDIT_REPORT_REDUCER',
  UPDATE_AUDIT_REPORT: 'UPDATE_AUDIT_REPORT',
  GET_AUDIT_REPORT_BY_ID: 'GET_AUDIT_REPORT_BY_ID',
  GET_AUDIT_REPORT_BY_ID_REDUCER: 'GET_AUDIT_REPORT_BY_ID_REDUCER',
  DELETE_AUDIT_REPORT: 'DELETE_AUDIT_REPORT',
  DELETE_AUDIT_REPORT_REDUCER: 'DELETE_AUDIT_REPORT_REDUCER',
  ADD_AUDIT_REPORT_REDUCER: 'ADD_AUDIT_REPORT_REDUCER',

  initData: () => ({ type: actions.GET_AUDIT_REPORT }),
  addAuditReport: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_AUDIT_REPORT,
        payload: { sendData: sendData },
      });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_AUDIT_REPORT_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_AUDIT_REPORT,
        payload: { id: selected },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_AUDIT_REPORT,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
