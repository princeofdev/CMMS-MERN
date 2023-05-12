const actions = {
  GET_RFQS: 'GET_RFQS',
  ADD_RFQS: 'ADD_RFQS',
  GET_RFQS_REDUCER: 'GET_RFQS_REDUCER',
  GET_RFQ_BY_ID: 'GET_RFQ_BY_ID',
  GET_RFQ_BY_ID_REDUCER: 'GET_RFQ_BY_ID_REDUCER',
  UPDATE_RFQ: 'UPDATE_RFQ',
  DELETE_RFQ: 'DELETE_RFQ',
  CHANGED_REDUCER: 'CHANGED_REDUCER',
  CREATED_RFQ_ID: 'CREATED_RFQ_ID',
  CREATED_RFQ_ID_REDUCER: 'CREATED_RFQ_ID_REDUCER',
  getRFQs: () => ({ type: actions.GET_RFQS }),
  addRFQ: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_RFQS,
        payload: { sendData: sendData },
      });
    };
  },

  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_RFQ_BY_ID, payload: { id: id } });
    };
  },

  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_RFQ,
        payload: { id: selected }
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_RFQ,
        payload: { sendData: sendData, id: id },
      });
    };
  },
  creatId: (id) => {
    return (dispatch) => {
      dispatch({
        type: actions.CREATED_RFQ_ID,
        payload: { id: id },
      });
    };
  },
};
export default actions;
