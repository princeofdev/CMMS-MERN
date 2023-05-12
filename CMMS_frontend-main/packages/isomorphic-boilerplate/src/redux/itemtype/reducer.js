// import clone from 'clone';
import actions from './actions';
const initState = {  
  itemTypes:[],
  isDelete:false,
};

export default function ItemType(state = initState, { type, ...action }) {
  switch (type) {  
    case actions.GET_ITEM_TYPE_REDUCER: {
      return {
        ...state,
        itemTypes: action.data,      
        isDelete:false
      };
    }    
    default:
      return state;
  }
}
