const actions = {
  GET_CMMS_SETTING_ACCOUNT: 'GET_CMMS_SETTING_ACCOUNT',
  ADD_CMMS_SETTING_ACCOUNT: 'ADD_CMMS_SETTING_ACCOUNT',
  GET_ACCOUNT_SETTING: 'GET_ACCOUNT_SETTING',
  GET_ACCOUNT_SETTING_REDUCER: 'GET_ACCOUNT_SETTING_REDUCER',
  GET_ACCOUNT_REDUCER: 'GET_ACCOUNT_REDUCER',
  DELETE_ACCOUNT_SETTING: 'DELETE_ACCOUNT_SETTING',

  getAccount: () => ({ type: actions.GET_ACCOUNT_SETTING }),
  addAccount: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_CMMS_SETTING_ACCOUNT,
        payload: { sendData: sendData },
      });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_ACCOUNT_SETTING,
        payload: { id: selected },
      });
    };
  },
};
export default actions;
