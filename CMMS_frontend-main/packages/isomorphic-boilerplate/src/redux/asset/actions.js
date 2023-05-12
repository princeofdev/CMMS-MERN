const actions = {
  GET_ASSET: 'GET_ASSET',
  ADD_ASSET: 'ADD_ASSET',
  ADD_SUCCESS: 'ADD_SUCCESS',
  ADD_FAILED: 'ADD_FAILED',
  GET_ASSET_REDUCER: 'GET_ASSET_REDUCER',
  GET_ASSET_BYID: 'GET_ASSET_BYID',
  GET_ASSET_BYID_REDUCER: 'GET_ASSET_BYID_REDUCER',
  UPDATE_DATA: 'UPDATE_DATA',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  DELETE_DATA: 'DELETE_DATA',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAILED: 'DELETE_FAILED',
  CREATE_NUMBER: 'CREATE_NUMBER',
  CREATE_NUMBER_SUCCESS: 'CREATE_NUMBER_SUCCESS',
  GET_ASSET_BY_FILTER: 'GET_ASSET_BY_FILTER',
  GET_PRINT_DATA: 'GET_PRINT_DATA',
  GET_PRINT_DATA_BY_ID: 'GET_PRINT_DATA_BY_ID',
  GET_SUPPLIES:'GET_SUPPLIES',
  UPDATE_SUPPLY_DATA:'UPDATE_SUPPLY_DATA',
  ADD_SUPPLY: 'ADD_SUPPLY',
  GET_SUPPLY_ASSETS: 'GET_SUPPLY_ASSETS',
  initData: () => ({ type: actions.GET_ASSET }),
  getAllAsset: () => ({ type: actions.GET_SUPPLY_ASSETS }),
  addAsset: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_ASSET, payload: { sendData: sendData } });
    };
  },
  addSupply: (sendData) => {
    return (dispatch, getState) => {
      dispatch({ type: actions.ADD_SUPPLY, payload: { sendData: sendData } });
    };
  },
  getSupplies: () => ({ type: actions.GET_SUPPLIES }),
  getAssetById: (assetId) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_ASSET_BYID, payload: { assetId: assetId } });
    };
  },
  getPrintData: (assetId) => {
    return (dispatch) => {
      dispatch({ type: actions.GET_PRINT_DATA, payload: { assetId: assetId } });
    };
  },
  deleteData: (selected) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_DATA,
        payload: { id: selected },
      });
    };
  },
  getAssetByFilter: (filterIds) => {
    return (dispatch) => {
      dispatch({
        type: actions.GET_ASSET_BY_FILTER,
        payload: { filterIds: filterIds },
      });
    };
  },
  updateData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_DATA,
        payload: { sendData: sendData, id: id },
      });
    };
  },
  updateSupplyData: (sendData, id) => {
    return (dispatch) => {
      dispatch({
        type: actions.UPDATE_SUPPLY_DATA,
        payload: { sendData: sendData, id: id },
      });
    };
  },
  createNumber: () => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.CREATE_NUMBER,
        payload: { userId: localStorage.getItem('user_id') },
      });
    };
  },
};
export default actions;
