const actions = {
  GET_FORM_DATAS: 'GET_FORM_DATAS',
  ADD_FORM_BUILDER: 'ADD_FORM_BUILDER',
  GET_FORM_DATAS_REDUCER: 'GET_FORM_DATAS_REDUCER',
  GET_FORM_DATA_BY_ID: 'GET_FORM_DATA_BY_ID',
  GET_FORM_DATA_BY_ID_REDUCER: 'GET_FORM_DATA_BY_ID_REDUCER',
  UPDATE_FORM_DATA: 'UPDATE_FORM_DATA',
  DELETE_FORM_DATA: 'DELETE_FORM_DATA',
  DELETE_FORM_DATA_REDUCER: 'DELETE_FORM_DATA_REDUCER',
  getDatas: () => ({ type: actions.GET_FORM_DATAS }),
  addForm: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_FORM_BUILDER,
        payload: { sendData: sendData },
      });
    };
  },
  getById: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_FORM_DATA_BY_ID, payload: { id: id } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_FORM_DATA,
        payload: { id: selected },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_FORM_DATA,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
