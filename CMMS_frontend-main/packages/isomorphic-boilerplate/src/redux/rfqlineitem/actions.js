const actions = {
  GET_RFQ_LINEITEM: 'GET_RFQ_LINEITEM',
  ADD_RFQ_LINEITEM: 'ADD_RFQ_LINEITEM',
  GET_RFQ_LINEITEM_REDUCER: 'GET_RFQ_LINEITEM_REDUCER',
  UPDATE_RFQ_LINEITEM: 'UPDATE_RFQ_LINEITEM',
  DELETE_RFQ_LINEITEM: 'DELETE_RFQ_LINEITEM',
  CHANGE_LINEITEM_REDUCER: 'CHANGE_LINEITEM_REDUCER',
  UPGRADE_RFQ_LINE_ITEM:'UPGRADE_RFQ_LINE_ITEM',
  addRfqLineItem: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_RFQ_LINEITEM, payload: { sendData: sendData } });
    };
  },  
  getLineItems: (rfqId) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_RFQ_LINEITEM, payload: { id: rfqId } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_RFQ_LINEITEM,
        payload: { id: selected },
      });
    };
  },
  editLIneItem: (lineData) => ({ type: actions.UPGRADE_RFQ_LINE_ITEM, lineData }),
  updateDataLineItem: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_RFQ_LINEITEM,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
