import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from '@iso/components/utility/customScrollBar';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import '../../../component/table.css';
// import addDoubleImg from '../../../assets/images/new-group-inner-list.png';
import newAddImg from '../../../assets/images/new-inner-list.png';
import PurchaseRequestModal from '../../../component/PurchaseRequestModal';
import Actions from '../../../redux/purchaserequest/actions';
const FormItem = Form.Item;

export default function (props) {
  const { purcaseOrderId } = props;
  const dispatch = useDispatch();
  const {
    getDataByPOId,
    updateLineItemData,
    editLIneItem,
    deleteData,
    getDataFromBoard,
  } = Actions;
  const { lineItems, purchaseItems, isDelete } = useSelector(
    (state) => state.purchaseRequest
  );
  const [pageSate, setpageSate] = React.useState('Add');
  const [
    purchaseRequestModalActive,
    setPurchaseRequestModalActive,
  ] = React.useState(false);
  const [selectedPR, setSelectedPR] = React.useState(null);
  const [subTotal, setSubTotal] = React.useState(0);
  const [sumTax, setSumTax] = React.useState(0);
  const handleCancel = () => {
    setPurchaseRequestModalActive(false);
  };
  React.useEffect(() => {
    dispatch(getDataFromBoard);
  }, []);
  React.useEffect(() => {
    dispatch(getDataFromBoard);
  }, [purchaseItems]);
  const updateData = (key) => {
    var sendData = {};
    sendData.intPurchaseOrderID = lineItems[key].intPurchaseOrderID;
    sendData.strPartName = lineItems[key].strPartName;
    sendData.qtyOnOrder = lineItems[key].qtyOnOrder;
    sendData.dblUnitPrice = lineItems[key].dblUnitPrice;
    sendData.dblTaxRate = lineItems[key].dblTaxRate;

    dispatch(updateLineItemData(sendData, lineItems[key]._id));
  };
  React.useEffect(() => {
    console.log(lineItems, 'lineItems');
    var sum = 0;
    var tax = 0;
    lineItems.map((row, index) => {
      sum =
        sum +
        parseInt(row.qtyOnOrder) *
          parseFloat(row.dblUnitPrice != '' ? row.dblUnitPrice : 0);
      tax =
        tax +
        parseInt(row.qtyOnOrder) *
          parseFloat(row.dblUnitPrice != '' ? row.dblUnitPrice : 0) *
          parseFloat(row.dblTaxRate != '' ? row.dblTaxRate : 0) *
          0.01;
    });
    setSubTotal(sum.toFixed(2));
    setSumTax(tax.toFixed(2));
  }, [lineItems]);

  return (
    // <div className="isoInvoiceTable">
    <>
      <Scrollbars
        style={{ width: '100%', height: '200px' }} //"calc(80vh - 300px)"
      >
        <table className="lineItem" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>
                <span className="listHeaderLabel35">
                  Purchase Order Additional Cost Type
                </span>
              </th>
              <th style={{ width: '20%' }}>
                <span className="listHeaderLabel35">Notes</span>
              </th>
              <th style={{ width: '15%' }}>
                <span className="listHeaderLabel35"></span>
              </th>
              <th style={{ width: '15%' }}>
                <span className="listHeaderLabel35">Amount</span>
              </th>
              <th style={{ width: '10%' }}>
                <span className="listHeaderLabel35"></span>
              </th>
              <th style={{ width: '*' }}>
                <span className="listHeaderLabel35"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="listRow">
              <td className="column2" style={{ paddingLeft: 10 }}>
                Tax
              </td>
              <td className="column2" style={{ paddingLeft: 10 }}>
                <input className="item" type="Text"></input>
              </td>
              <td className="column4">Tax is being calculated</td>
              <td className="column4">Amount</td>
              <td className="column2"></td>
              <td className="column2"></td>
            </tr>
          </tbody>
        </table>
      </Scrollbars>
      <div
        style={{
          color: 'rgb(102, 115, 136)',
          fontSize: '10pt',
          background: '#f7f7f7',
          border: '1px solid rgb(241, 243, 246)',
          height: '25px',
        }}
      >
        <span
          style={{
            float: 'left',
            marginLeft: '4px',
            marginRight: '4px',
            cursor: 'pointer',
          }}
          onClick={() => setPurchaseRequestModalActive(true)}
        >
          <img src={newAddImg}></img>
        </span>
      </div>
      <div style={{ height: '60px', maxWidth: '750px' }}>
        <div
          style={{
            clear: 'both',
            fontSize: '11px',
            float: 'right',
            width: '75px',
            textAlign: 'right',
            marginRight: '30px',
          }}
        >
          ${subTotal}&nbsp;
        </div>
        <div
          style={{
            fontSize: '11px',
            float: 'right',
            width: '100px',
            fontWeight: 'bold',
          }}
        >
          Subtotal
        </div>
        <div
          style={{
            clear: 'both',
            fontSize: '11px',
            float: 'right',
            width: '75px',
            textAlign: 'right',
            marginRight: '30px',
          }}
        >
          $53.00&nbsp;
        </div>
        <div
          style={{
            fontSize: '11px',
            float: 'right',
            width: '100px',
            fontWeight: 'bold',
          }}
        >
          Additional
        </div>
        <div
          style={{
            clear: 'both',
            fontSize: '11px',
            float: 'right',
            width: '75px',
            textAlign: 'right',
            marginRight: '30px',
          }}
        >
          ${sumTax}&nbsp;
        </div>
        <div
          style={{
            fontSize: '11px',
            float: 'right',
            width: '100px',
            fontWeight: 'bold',
          }}
        >
          Tax
        </div>
        <div
          style={{
            clear: 'both',
            float: 'right',
            borderTop: '1px #cecece dotted',
            width: '325px',
            paddingTop: '5px',
          }}
        >
          <div
            style={{
              clear: 'both',
              fontSize: '14px',
              float: 'right',
              width: '75px',
              textAlign: 'right',
              marginRight: '30px',
            }}
          >
            $66.97
          </div>
          <div
            style={{
              fontSize: '16px',
              float: 'right',
              width: '100px',
              fontWeight: 'bold',
            }}
          >
            Total
          </div>
        </div>
      </div>
      <PurchaseRequestModal
        onCancel={handleCancel}
        visible={purchaseRequestModalActive}
        title="PURCHASE ORDER LINE ITEM"
        pageState={pageSate}
        intPurchaseOrderID={purcaseOrderId}
        selectedPR={selectedPR}
      ></PurchaseRequestModal>
    </>
    // </div>
  );
}
