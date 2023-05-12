// import clone from 'clone';
import actions from './actions';
const initState = {  
  stocks:[],
  stock:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_STOCKS_REDUCER:
      return {
        ...state,             
        stocks: action.data,
        isDelete:false
      };
    case actions.DELETE_STOCK_SUCCESS:
      return {
        ...state,        
        isDelete: true
      };
    default:
      return state;
  }
}
