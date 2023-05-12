const actions = {
  GET_ITEM_TYPE: "GET_ITEM_TYPE",
  ADD_ITEM_TYPE: "ADD_ITEM_TYPE",
  GET_ITEM_TYPE_REDUCER: "GET_ITEM_TYPE_REDUCER",
  UPDATE_ITEM_TYPE: "UPDATE_ITEM_TYPE",  
  DELETE_ITEM_TYPE:'DELETE_ITEM_TYPE', 

  initItemData: () => ({ type: actions.GET_ITEM_TYPE }),
  add: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_ITEM_TYPE, payload: { sendData: sendData } });
    };
  },

  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_ITEM_TYPE,
        payload: {id:selected}
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_ITEM_TYPE,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
