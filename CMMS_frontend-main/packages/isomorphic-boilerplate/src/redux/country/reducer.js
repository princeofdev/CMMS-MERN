// import clone from 'clone';
import actions from './actions';
const initState = {  
  countries:[],
  isDelete:false,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_COUNTRY_REDUCER: {
      return {
        ...state,
        countries: action.data,
        isDelete:false
      };
    }    
    default:
      return state;
  }
}
