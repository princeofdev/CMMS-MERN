import clone from 'clone';
import actions from './actions';
const initState = {  
  additionalCosts:[],
  additionalCost:{},
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_ADDITIONALCOASTS_REDUCER:
      return {
        ...state,             
        additionalCosts:action.data,
        isDelete: false
      };
    case actions.DELETE_ADDITIONALCOASTS_REDUCER:
      return {
        ...state,    
        isDelete: true
      };   
    case actions.UPGRADE_COST_LINE_ITEM:
      return {
        additionalCosts: clone(action.lineData),
      };      
    default:
      return state;
    } 
   
}
