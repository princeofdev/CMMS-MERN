const actions = {
  GET_CMMS_SETTING_CHARGEDEPARTMENT: 'GET_CMMS_SETTING_CHARGEDEPARTMENT',
  ADD_CMMS_SETTING_CHARGEDEPARTMENT: 'ADD_CMMS_SETTING_CHARGEDEPARTMENT',
  GET_CHARGEDEPARTMENT_SETTING: 'GET_CHARGEDEPARTMENT_SETTING',
  GET_CHARGEDEPARTMENT_SETTING_REDUCER: 'GET_CHARGEDEPARTMENT_SETTING_REDUCER',
  GET_CHARGEDEPARTMENT_REDUCER: 'GET_CHARGEDEPARTMENT_REDUCER',
  DELETE_CHARGEDEPARTMENT_SETTING: 'DELETE_CHARGEDEPARTMENT_SETTING',

  getChargeDepartment: () => ({ type: actions.GET_CHARGEDEPARTMENT_SETTING }),
  addChargeDepartment: (sendData) => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_CMMS_SETTING_CHARGEDEPARTMENT,
        payload: { sendData: sendData },
      });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_CHARGEDEPARTMENT_SETTING,
        payload: { id: selected },
      });
    };
  },
};
export default actions;
