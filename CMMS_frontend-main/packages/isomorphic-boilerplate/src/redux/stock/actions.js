const actions = {
  GET_STOCKS: "GET_STOCKS",
  ADD_STOCK: "ADD_STOCK",
  GET_STOCKS_REDUCER:"GET_STOCKS_REDUCER",
  UPDATE_STOCK: "UPDATE_STOCK",
  DELETE_STOCK:"DELETE_STOCK",
  DELETE_STOCK_SUCCESS:"DELETE_STOCK_SUCCESS",
  addStock: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_STOCK, payload: { sendData: sendData } });
    };
  },
  // getById: (id) => {
  //   return (dispatch) => {
  //     dispatch({ type: actions.GET_PROJECT_BY_ID, payload: { id: id } });
  //   };
  // },
  getStockData: (assetId) => {
    return (dispatch) => {      
      dispatch({ type: actions.GET_STOCKS, payload: { id: assetId } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_STOCK,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_STOCK,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
