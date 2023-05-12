// import clone from 'clone';
import actions from './actions';
const initState = {
  purchaseOrders: [],
  purchaseOrder: {},
  isDelete: false,
  printData:null
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_PURCHASE_ORDER_REDUCER:
      return {
        ...state,
        purchaseOrders: action.data,
        isDelete: false,
      };
    case actions.GET_PURCHASE_ORDER_BYID_REDUCER:
      return {
        ...state,
        purchaseOrder: action.data,
        isDelete: false,
      };
    case actions.DELETE_PURCHASE_ORDER_REDUCER:
      return {    
        ...state,
        isDelete: true,
      };
    case actions.GET_PURCHASE_ORDER_PRINT_DATA_REDUCER:
      return {
        ...state,
        printData: action.data,
        isDelete: false,
      };
      
    default:
      return state;
  }
}
