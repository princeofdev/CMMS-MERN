import clone from 'clone';
import actions from './actions';
const initState = {
  purchaseItems: [],
  purchaseItem: {},
  isDelete: false,
  createdPurcaseId: null,
  lineItems: [],
  planBoards: [],
  taxVal: 0,
};

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_PURCHASE_REQUEST_REDUCER:
      return {
        ...state,
        purchaseItems: action.data,
        isDelete: false,
      };
    case actions.GET_PURCHASE_LINEITEM_REDUCER:
      var temp = [];
      action.data.forEach((row, index) => {
        var obj = {};
        obj.key = index;
        obj._id = row._id;
        var itemName = '';
        if (row.bolEquipmentCon) {
          itemName = row.intSourceAssetID ? row.intSourceAssetID.strName : '';
        } else {
          itemName = row.strNotInventory;
        }
        obj.strPartName = row.strPartName ? row.strPartName : '';
        obj.requestItem = itemName;
        obj.qtyOnOrder = row.qtyOnOrder;
        obj.received = '';
        obj.dblUnitPrice = row.dblUnitPrice ? row.dblUnitPrice : '';
        obj.dblTaxRate = row.dblTaxRate ? row.dblTaxRate : '';
        obj.lineSubTotal = (
          parseInt(obj.qtyOnOrder) *
          parseFloat(obj.dblUnitPrice != '' ? obj.dblUnitPrice : 0)
        ).toFixed(2);
        obj.strDescription = row.strDescription;
        obj.account = row.intAccountID ? row.intAccountID.strDescription : '';
        obj.chargeDepartment = row.intChargeDepartmentID
          ? row.intChargeDepartmentID.strDescription
          : '';
        var requestUser = row.intRequestedByUserID
          ? row.intRequestedByUserID.strFullName
          : '';
        obj.source = row.intSourceAssetID
          ? row.intSourceAssetID.strName + ', ' + requestUser
          : requestUser;
        obj.intPurchaseOrderID = row.intPurchaseOrderID;
        temp.push(obj);
      });
      return {
        ...state,
        lineItems: temp,
        isDelete: false,
      };
    case actions.GET_PURCHASE_PLAN_BOARD_REDUCER:
      var temp = [];
      action.data.forEach((row, index) => {
        if (!row.bolAddedDirectlyToPurchaseOrder) {
          var obj = {};
          obj.key = index;
          obj._id = row._id;
          var itemName = '';
          if (row.bolEquipmentCon) {
            itemName = row.intSourceAssetID ? row.intSourceAssetID.strName : '';
          } else {
            itemName = row.strNotInventory;
          }
          obj.strPartName = row.strPartName ? row.strPartName : '';
          obj.requestItem = itemName;
          obj.qtyOnOrder = row.qtyOnOrder;
          obj.received = '';
          obj.dblUnitPrice = row.dblUnitPrice ? row.dblUnitPrice : '';
          obj.dblTaxRate = row.dblTaxRate ? row.dblTaxRate : '';
          obj.lineSubTotal = (
            parseInt(obj.qtyOnOrder) *
            parseFloat(obj.dblUnitPrice != '' ? obj.dblUnitPrice : 0)
          ).toFixed(2);
          obj.strDescription = row.strDescription;
          obj.account = row.intAccountID ? row.intAccountID.strDescription : '';
          obj.chargeDepartment = row.intChargeDepartmentID
            ? row.intChargeDepartmentID.strDescription
            : '';
          var requestUser = row.intRequestedByUserID
            ? row.intRequestedByUserID.strFullName
            : '';
          obj.source = row.intSourceAssetID
            ? row.intSourceAssetID.strName + ', ' + requestUser
            : requestUser;
          obj.intPurchaseOrderID = row.intPurchaseOrderID;
          obj.row = row;
          temp.push(obj);
        }
      });
      return {
        ...state,
        planBoards: temp,
        isDelete: false,
      };
    case actions.CREATED_PURCHASE_ORDER_ID_REDUCER:
      return {
        ...state,
        createdPurcaseId: action.data,
      };
    case actions.UPGRADE_LINE_ITEM:
      return {
        ...state,
        lineItems: clone(action.lineData),
        // planBoards: clone(action.lineData),
      };
    case actions.SET_TAX_VAL:
      return {
        ...state,
        taxVal: action.tax,
      };
    case actions.DELETE_PURCHASE_LINEITEM_SUCCESS:
      return {
        ...state,
        isDelete: true,
      };
    default:
      return state;
  }
}
