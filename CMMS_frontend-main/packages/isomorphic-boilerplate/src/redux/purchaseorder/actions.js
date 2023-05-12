const actions = {
  GET_PURCHASE_ORDER: 'GET_PURCHASE_ORDER',
  ADD_PURCHASE_ORDER: 'ADD_PURCHASE_ORDER',
  GET_PURCHASE_ORDER_REDUCER: 'GET_PURCHASE_ORDER_REDUCER',
  GET_PURCHASE_ORDER_BYID: 'GET_PURCHASE_ORDER_BYID',
  GET_PURCHASE_ORDER_BYID_REDUCER: 'GET_PURCHASE_ORDER_BYID_REDUCER',
  UPDATE_PURCHASE_ORDER: 'UPDATE_PURCHASE_ORDER',
  SEND_MAIL_SUPPLIER: 'SEND_MAIL_SUPPLIER',
  DELETE_PURCHASE_ORDER: 'DELETE_PURCHASE_ORDER',
  DELETE_PURCHASE_ORDER_REDUCER: 'DELETE_PURCHASE_ORDER_REDUCER',
  GET_PURCHASE_ORDER_PRINT_DATA: 'GET_PURCHASE_ORDER_PRINT_DATA',
  GET_PURCHASE_ORDER_PRINT_DATA_REDUCER: 'GET_PURCHASE_ORDER_PRINT_DATA_REDUCER',
  getPurchaseOrderData: () => ({ type: actions.GET_PURCHASE_ORDER }),
  addPurchaseOrder: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_PURCHASE_ORDER,
        payload: { sendData: sendData },
      });
    };
  },
  sendEmail: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.SEND_MAIL_SUPPLIER,
        payload: { sendData: sendData },
      });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_PURCHASE_ORDER_BYID, payload: { id: id } });
    };
  },
  getPrintData: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_PURCHASE_ORDER_PRINT_DATA, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_PURCHASE_ORDER,
        payload: { id: selected }
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_PURCHASE_ORDER,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
