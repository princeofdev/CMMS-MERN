const actions = {
  GET_ADDITIONALCOASTS: "GET_ADDITIONALCOASTS",
  ADD_ADDITIONALCOAST: "ADD_ADDITIONALCOAST",
  UPDATE_ADDITIONALCOAST: "UPDATE_ADDITIONALCOAST",
  GET_ADDITIONALCOASTS_REDUCER: "GET_ADDITIONALCOASTS_REDUCER",
  DELETE_ADDITIONALCOASTS: "DELETE_ADDITIONALCOASTS",
  DELETE_ADDITIONALCOASTS_REDUCER: "DELETE_ADDITIONALCOASTS_REDUCER",
  UPGRADE_COST_LINE_ITEM:'UPGRADE_COST_LINE_ITEM',
//  getAdditionalCostData: () => ({ type: actions.GET_ADDITIONALCOASTS }),
   getAdditionalCostData: (id) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_ADDITIONALCOASTS, payload: { id: id } });
    };
  },
  editLIneItem: lineData => ({ type: actions.UPGRADE_COST_LINE_ITEM, lineData }),
  addAdditionalCost: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_ADDITIONALCOAST, payload: { sendData: sendData } });
    };
  },
  // getById: (id) => {
  //   return (dispatch) => {
  //     dispatch({ type: actions.GET_PROJECT_BY_ID, payload: { id: id } });
  //   };
  // },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_ADDITIONALCOASTS,
        payload: {id:selected}
      });
    };
  },
  updateCostTypeData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_ADDITIONALCOAST,
        payload: { sendData: sendData, id: id },
      });
    };
  },
};
export default actions;
