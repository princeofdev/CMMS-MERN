// import clone from 'clone';
import actions from './actions';
const initState = {
  rfqs:[],
  rfq:null,
  isChanged: false,
  createdRfqId:null
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.CHANGED_REDUCER:
      return {
        ...state,      
        isChanged: true,
      };
    case actions.GET_RFQS_REDUCER:
      return {
        ...state,
        rfqs: action.data,
        isChanged: false,
      };
    case actions.CREATED_RFQ_ID_REDUCER:
      return {    
        ...state,
        createdRfqId: action.data,
        isChanged: false,
      };
    case actions.GET_RFQ_BY_ID_REDUCER:
      return {
        ...state,
        rfq: action.data,
        isChanged: false,
      };
      
    default:
      return state;
  }
}
