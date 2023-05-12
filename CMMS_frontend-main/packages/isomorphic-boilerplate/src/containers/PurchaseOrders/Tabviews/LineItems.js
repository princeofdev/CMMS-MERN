import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from '@iso/components/utility/customScrollBar';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import { Button } from 'antd';
import '../../../component/table.css';
// import addDoubleImg from '../../../assets/images/new-group-inner-list.png';
import newAddImg from '../../../assets/images/new-inner-list.png';
import PurchaseLineItemModal from '../../../component/PurchaseLineItemModal';
import Actions from '../../../redux/purchaserequest/actions';
import Actions2 from '../../../redux/additionalcost/actions';
const FormItem = Form.Item;

export default function (props) {
  const { purcaseOrderId } = props;
  const dispatch = useDispatch();
  const {
    getDataByPOId,
    updateLineItemData,
    editLIneItem,
    deleteData,
    setTaxVal,
  } = Actions;
  const { getAdditionalCostData } = Actions2;
  const { lineItems, purchaseItems, isDelete } = useSelector(
    (state) => state.purchaseRequest
  );
  const { additionalCosts } = useSelector((state) => state.AdditionalCost);
  const [pageSate, setpageSate] = React.useState('Add');
  const [
    purchaseRequestModalActive,
    setPurchaseRequestModalActive,
  ] = React.useState(false);
  const [selectedPR, setSelectedPR] = React.useState(null);
  const [subTotal, setSubTotal] = React.useState(0);
  const [sumTax, setSumTax] = React.useState(0);
  const [sumAdditionalCost, setSumAdditionalCost] = React.useState(0);
  const handleCancel = () => {
    setPurchaseRequestModalActive(false);
  };
  React.useEffect(() => {
    dispatch(getDataByPOId(purcaseOrderId));
    dispatch(getAdditionalCostData(purcaseOrderId));
  }, []);
  React.useEffect(() => {
    if(!isDelete)
    dispatch(getDataByPOId(purcaseOrderId));
  }, [purchaseItems]);
  React.useEffect(() => {
    if(isDelete)
    dispatch(getDataByPOId(purcaseOrderId));
  }, [isDelete]);
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
    dispatch(setTaxVal(tax));
  }, [lineItems]);
  React.useEffect(() => {
    var sumCost = 0;
    additionalCosts.map((row, index) => {
      sumCost = sumCost + parseFloat(row.intAmount ? row.intAmount : 0);
    });
    setSumAdditionalCost(sumCost);
    console.log('change', sumCost);
  }, [additionalCosts]);
  return (
    // <div className="isoInvoiceTable">
    <>
      <Scrollbars
        style={{ width: '100%', height: '200px' }} //"calc(80vh - 300px)"
      >
        <table className="lineItem">
          <thead>
            <tr>
              <th style={{ width: '25%' }}>
                <span className="listHeaderLabel35">Requested Item</span>
              </th>
              <th style={{ width: '13%' }}>
                <span className="listHeaderLabel35">Part#</span>
              </th>
              <th style={{ width: '7%' }}>
                <span className="listHeaderLabel35">Qty</span>
              </th>
              <th style={{ width: '10%' }}>
                <span className="listHeaderLabel35">Received</span>
              </th>
              <th style={{ width: '10%' }}>
                <span className="listHeaderLabel35">Unit Price</span>
              </th>
              <th style={{ width: '10%' }}>
                <span className="listHeaderLabel35">Tax Rate(%)</span>
              </th>
              <th style={{ width: '14%' }}>
                <span className="listHeaderLabel35">Line Subtotal</span>
              </th>
              <th style={{ width: '25%' }}>
                <span className="listHeaderLabel35">Description</span>
              </th>
              <th style={{ width: '15%' }}>
                <span className="listHeaderLabel35">Account</span>
              </th>
              <th style={{ width: '15%' }}>
                <span className="listHeaderLabel35">Charge Department</span>
              </th>
              <th style={{ width: '20%' }}>
                <span className="listHeaderLabel35">Source</span>
              </th>
              <th style={{ width: '10%' }}>
                <span className="listHeaderLabel35"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((row, index) => {
              return (
                <tr key={index} className="listRow">
                  <td className="column2" style={{ paddingLeft: 10 }}>
                    {row.requestItem}
                  </td>
                  <td className="column2">
                    <input
                      className="item"
                      type="Text"
                      value={row.strPartName}
                      onBlur={() => updateData(row.key)}
                      onChange={(event) => {
                        lineItems[row.key].strPartName = event.target.value;
                        dispatch(editLIneItem(lineItems));
                      }}
                    />
                  </td>
                  <td className="column2">
                    <input
                      className="item"
                      type="Text"
                      value={row.qtyOnOrder}
                      onBlur={() => updateData(row.key)}
                      onChange={(event) => {
                        lineItems[row.key].qtyOnOrder = event.target.value;
                        dispatch(editLIneItem(lineItems));
                      }}
                    />
                  </td>
                  <td className="column2"></td>
                  <td className="column2">
                    <input
                      className="item"
                      type="Text"
                      value={row.dblUnitPrice}
                      onBlur={() => updateData(row.key)}
                      onChange={(event) => {
                        lineItems[row.key].dblUnitPrice = event.target.value;
                        dispatch(editLIneItem(lineItems));
                      }}
                    />
                  </td>
                  <td className="column2">
                    <input
                      className="itemTax"
                      type="Text"
                      value={row.dblTaxRate}
                      onBlur={() => updateData(row.key)}
                      onChange={(event) => {
                        lineItems[row.key].dblTaxRate = event.target.value;
                        dispatch(editLIneItem(lineItems));
                      }}
                    />
                    $
                    {(
                      parseInt(row.qtyOnOrder) *
                      parseFloat(
                        row.dblUnitPrice != '' ? row.dblUnitPrice : 0
                      ) *
                      parseFloat(row.dblTaxRate != '' ? row.dblTaxRate : 0) *
                      0.01
                    ).toFixed(2)}
                  </td>
                  <td className="column3">
                    $
                    {(
                      parseInt(row.qtyOnOrder) *
                      parseFloat(row.dblUnitPrice != '' ? row.dblUnitPrice : 0)
                    ).toFixed(2)}
                    {/* {row.lineSubTotal} */}
                  </td>
                  <td className="column2">{row.strDescription}</td>
                  <td className="column2">{row.account}</td>
                  <td className="column2">{row.chargeDepartment}</td>
                  <td className="column2">{row.source}</td>
                  <td className="column"> <Button
                    className="DltBtn"
                    // icon="delete"
                    onClick={() => {
                      dispatch(deleteData(row._id));

                    }}
                  >
                    <i className="ion-android-delete" />
                  </Button></td>
                </tr>
              );
            })}
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
          ${sumAdditionalCost.toFixed(2)}&nbsp;
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
              fontSize: '16px',
              float: 'right',
              width: '75px',
              textAlign: 'right',
              marginRight: '30px',
              fontWeight: 'bold',
            }}
          >
            $
            {(
              parseFloat(subTotal) +
              parseFloat(sumAdditionalCost) +
              parseFloat(sumTax)
            ).toFixed(2)}
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
      <PurchaseLineItemModal
        onCancel={handleCancel}
        visible={purchaseRequestModalActive}
        title="PURCHASE ORDER LINE ITEM"
        pageState={pageSate}
        bolAddedDirectlyToPurchaseOrder={true}
        intPurchaseOrderID={purcaseOrderId}
        selectedPR={selectedPR}
      ></PurchaseLineItemModal>
    </>
    // </div>
  );
}
