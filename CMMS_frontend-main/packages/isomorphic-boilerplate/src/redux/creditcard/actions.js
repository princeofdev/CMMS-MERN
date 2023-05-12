const actions = {
  GET_CREDIT_CARDS: 'GET_CREDIT_CARDS',
  ADD_CREDIT_CARD: 'ADD_CREDIT_CARD',
  ADD_FAILED: 'ADD_FAILED',
  // ADD_CODE_TYPE_SUCCESS: "ADD_CODE_TYPE",
  GET_CREDIT_CARD_REDUCER: 'GET_CREDIT_CARD_REDUCER',
  UPDATE_CREDIT_CARD: 'UPDATE_CREDIT_CARD',
  DELETE_CREDIT_CARD: 'DELETE_CREDIT_CARD',
  CREATED_CREDIT_CARD_ID: 'CREATED_CREDIT_CARD_ID',
  CREATED_CREDIT_CARD_ID_REDUCER: 'CREATED_CREDIT_CARD_ID_REDUCER',

  getcreditcards: () => ({ type: actions.GET_CREDIT_CARDS }),
  add: (sendData) => {
    console.log('here', sendData);
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_CREDIT_CARD,
        payload: { sendData: sendData },
      });
    };
  },

  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_CREDIT_CARD,
        payload: { id: selected },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_CREDIT_CARD,
        payload: { sendData: sendData, id: id },
      });
    };
  },
  createdId: (id) => {
    return (dispatch) => {
      dispatch({
        type: actions.CREATED_CREDIT_CARD_ID,
        payload: { id: id },
      });
    };
  },
};
export default actions;
