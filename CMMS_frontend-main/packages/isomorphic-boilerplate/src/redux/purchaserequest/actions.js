const actions = {
  GET_PURCHASE_REQUEST: 'GET_PURCHASE_REQUEST',
  ADD_PURCHASE_REQUEST: 'ADD_PURCHASE_REQUEST',
  GET_PURCHASE_REQUEST_REDUCER: 'GET_PURCHASE_REQUEST_REDUCER',
  UPDATE_PURCHASE_REQUEST: 'UPDATE_PURCHASE_REQUEST',
  UPDATE_PURCHASE_BOARD: 'UPDATE_PURCHASE_BOARD',
  DELETE_PURCHASE_REQUES: 'DELETE_PURCHASE_REQUES',
  CREATED_PURCHASE_ORDER_ID: 'CREATED_PURCHASE_ORDER_ID',
  CREATED_PURCHASE_ORDER_ID_REDUCER: 'CREATED_PURCHASE_ORDER_ID_REDUCER',
  GET_PURCHASE_LINEITEM: 'GET_PURCHASE_LINEITEM',
  GET_PURCHASE_LINEITEM_REDUCER: 'GET_PURCHASE_LINEITEM_REDUCER',
  UPGRADE_LINE_ITEM: 'UPGRADE_LINE_ITEM',
  EDIT_LINE_ITEM: 'EDIT_LINE_ITEM',
  GET_PURCHASE_PLAN_BOARD: 'GET_PURCHASE_PLAN_BOARD',
  GET_PURCHASE_PLAN_BOARD_REDUCER: 'GET_PURCHASE_PLAN_BOARD_REDUCER',
  SET_TAX_VAL: 'SET_TAX_VAL',
  GET_PURCHASE_LINEITEM_FROM_BOARD: 'GET_PURCHASE_LINEITEM_FROM_BOARD',
  DELETE_PURCHASE_LINEITEM_SUCCESS: 'DELETE_PURCHASE_LINEITEM_SUCCESS',

  editLIneItem: (lineData) => ({ type: actions.UPGRADE_LINE_ITEM, lineData }),
  setTaxVal: (val) => ({ type: actions.SET_TAX_VAL, tax: val }),
  getDatas: () => ({ type: actions.GET_PURCHASE_REQUEST }),
  getPurchaseBoards: () => ({ type: actions.GET_PURCHASE_PLAN_BOARD }),
  addPurchaseRequest: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_PURCHASE_REQUEST,
        payload: { sendData: sendData },
      });
    };
  },
  getDataByPOId: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_PURCHASE_LINEITEM, payload: { id: id } });
    };
  },
  getDataFromBoard: () => {
    return (dispatch) => {
      dispatch({ type: actions.GET_PURCHASE_LINEITEM_FROM_BOARD });
    };
  },
  createdId: (id) => {
    return (dispatch) => {
      dispatch({
        type: actions.CREATED_PURCHASE_ORDER_ID,
        payload: { id: id },
      });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_PURCHASE_REQUES,
        payload: { id: selected },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_PURCHASE_REQUEST,
        payload: { sendData: sendData, id: id },
      });
    };
  },
  updatePurchaseBoardData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_PURCHASE_BOARD,
        payload: { sendData: sendData, id: id },
      });
    };
  },
  updateLineItemData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.EDIT_LINE_ITEM,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
