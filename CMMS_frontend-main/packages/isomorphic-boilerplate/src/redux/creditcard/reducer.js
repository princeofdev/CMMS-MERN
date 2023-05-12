// import clone from 'clone';
import actions from './actions';
const initState = {
  creditCards: [],
  creditCard: {},
  isDelete: false,
  createdCreditCardId: null,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_CREDIT_CARD_REDUCER:
      var temp = [];
      action.data.forEach((row, index) => {
        var obj = {};
        obj.key = index;
        obj._id = row._id;
        obj.strCardType = row.strCardType;
        obj.currency = row.intCurrencyId ? row.intCurrencyId.strCurrency : '';
        obj.strCardNickName = row.strCardNickName;
        obj.strCardHolderName = row.strCardHolderName;
        obj.intCardNumber = row.intCardNumber;
        obj.dtmExpirationDate = row.dtmExpirationDate;
        obj.strZipCode = row.strZipCode;
        obj.bolImageUploaded = row.bolImageUploaded;
        temp.push(obj);
      });
      return {
        ...state,
        creditCards: temp,
        isDelete: false,
      };
    case actions.CREATED_CREDIT_CARD_ID_REDUCER:
      return {
        ...state,
        createdCreditCardId: action.data,
      };
    default:
      return state;
  }
}
