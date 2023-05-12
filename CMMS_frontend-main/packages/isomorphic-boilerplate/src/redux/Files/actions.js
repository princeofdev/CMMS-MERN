const actions = {
  SUBMIT_FILE: 'SUBMIT_FILE',
  // ADD_PROJECT: "ADD_PROJECT",
  SUBMIT_SUCCESS: 'SUBMIT_SUCCESS',
  GET_FILELIST_BY_WORKORDERID: 'GET_FILELIST_BY_WORKORDERID',
  GET_FILELIST_BY_ASSET: 'GET_FILELIST_BY_ASSET',
  GET_FILELIST_REDUCER: 'GET_FILELIST_REDUCER',
  GET_FILELIST_BY_PURCHASE_ORDER: 'GET_FILELIST_BY_PURCHASE_ORDER',
  GET_FILELIST_BY_CREDIT_CARD: 'GET_FILELIST_BY_CREDIT_CARD',
  GET_FILELIST_BY_RRQ: 'GET_FILELIST_BY_RRQ',
  // initData: () => ({ type: actions.GET_PROJECTS }),
  submitFile: (sendData, config) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.SUBMIT_FILE,
        payload: { sendData: sendData, config: config },
      });
    };
  },
  getFiles: (workOrderId) => {
    return (dispatch) => {
      dispatch({
        type: actions.GET_FILELIST_BY_WORKORDERID,
        payload: { id: workOrderId },
      });
    };
  },
  getFilesByAsset: (assetId) => {
    return (dispatch) => {
      dispatch({
        type: actions.GET_FILELIST_BY_ASSET,
        payload: { id: assetId },
      });
    };
  },
  getFilesByPurchaseOrder: (purchaseOrderId) => {
    return (dispatch) => {
      dispatch({
        type: actions.GET_FILELIST_BY_PURCHASE_ORDER,
        payload: { id: purchaseOrderId },
      });
    };
  },
  getFilesByCreditCard: (creditCardId) => {
    return (dispatch) => {
      dispatch({
        type: actions.GET_FILELIST_BY_CREDIT_CARD,
        payload: { id: creditCardId },
      });
    };
  },
  getFilesByRfq: (rfqId) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_FILELIST_BY_RRQ, payload: { id: rfqId } });
    };
  },
  // deleteData: (selected) => {
  //   return (dispatch) => {
  //     dispatch({
  //       type: actions.DELETE_PROJECT,
  //       payload: {id:selected}
  //     });
  //   };
  // },
  // updateData: (sendData, id) => {
  //   return (dispatch) => {
  //     dispatch({
  //       type: actions.UPDATE_PROJECT,
  //       payload: { sendData: sendData, id: id },
  //     });
  //   };
  // },
};
export default actions;
