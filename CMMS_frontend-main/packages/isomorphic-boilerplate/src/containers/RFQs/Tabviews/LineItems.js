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
import RfqLineItemModal from '../../../component/RfqLineItemModal';
import Actions from '../../../redux/rfqlineitem/actions';

const FormItem = Form.Item;

export default function (props) {
  const { rfqId } = props;
  const dispatch = useDispatch();
  const {
    getLineItems,
    updateDataLineItem,
    editLIneItem,
    deleteData,  
  } = Actions;

  const { rfqLineItems,  isChanged } = useSelector(
    (state) => state.RfqLineItem
  );
  const [pageSate, setpageSate] = React.useState('Add');
  const [
    purchaseRequestModalActive,
    setPurchaseRequestModalActive,
  ] = React.useState(false);
  const handleCancel = () => {
    setPurchaseRequestModalActive(false);
  };
  React.useEffect(() => {
    dispatch(getLineItems(rfqId));
  }, []);
  const updateData = (key) => {
    var sendData = {};
    sendData.intQty = rfqLineItems[key].intQty;
    sendData.intQtyQuoted = rfqLineItems[key].intQtyQuoted;
    sendData.intUnitPrice = rfqLineItems[key].intUnitPrice;
    dispatch(updateDataLineItem(sendData, rfqLineItems[key]._id));
  };

  React.useEffect(() => {
    if (isChanged)
    dispatch(getLineItems(rfqId));
  }, [isChanged]);
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
                <span className="listHeaderLabel35">Qty Requested</span>
              </th>
              <th style={{ width: '10%' }}>
                <span className="listHeaderLabel35">Qty Quoted</span>
              </th>
              <th style={{ width: '10%' }}>
                <span className="listHeaderLabel35">Unit Price Quoted</span>
              </th>             
              <th style={{ width: '15%' }}>
                <span className="listHeaderLabel35">Total Price Quoted</span>
              </th>            
              <th style={{ width: '10%' }}>
                <span className="listHeaderLabel35"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rfqLineItems.map((row, index) => {
              return (
                <tr key={index} className="listRow">
                  <td className="column2" style={{ paddingLeft: 10 }}>
                    {row.intAssetID ? row.intAssetID.strName:""}
                  </td>
                  <td className="column2" >
                    {row.strDescription}
                  </td>
                  <td className="column2">
                    <input
                      className="item"
                      type="Text"
                      value={row.intQty}
                      onBlur={() => updateData(row.key)}
                      onChange={(event) => {
                        rfqLineItems[row.key].intQty = event.target.value;
                        dispatch(editLIneItem(rfqLineItems));
                      }}
                    />
                  </td>
                  <td className="column2">
                    <input
                      className="item"
                      type="Text"
                      value={row.intQtyQuoted ? row.intQtyQuoted:''}
                      onBlur={() => updateData(row.key)}
                      onChange={(event) => {
                        rfqLineItems[row.key].intQtyQuoted = event.target.value;
                        dispatch(editLIneItem(rfqLineItems));
                      }}
                    />
                  </td>
                
                  <td className="column2">
                    <input
                      className="item"
                      type="Text"
                      value={row.intUnitPrice ? row.intUnitPrice:''}
                      onBlur={() => updateData(row.key)}
                      onChange={(event) => {
                        rfqLineItems[row.key].intUnitPrice = event.target.value;
                        dispatch(editLIneItem(rfqLineItems));
                      }}
                    />
                  </td>
                 
                  <td className="column3" style={{textAlign:'left'}}>
                    $ 
                    {(
                      parseInt(row.intQtyQuoted?row.intQtyQuoted:0) *
                      parseFloat(row.intUnitPrice ? row.intUnitPrice : 0)
                    ).toFixed(2)}
                    {/* {row.lineSubTotal} */}
                  </td>        
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
          onClick={() => {setPurchaseRequestModalActive(true);setpageSate("Add")}}
        >
          <img src={newAddImg}></img>
        </span>
      </div>
     
      <RfqLineItemModal
        onCancel={handleCancel}
        visible={purchaseRequestModalActive}
        title="RFQ LINE ITEM"
        pageState={pageSate}
        bolAddedDirectlyToPurchaseOrder={true}
        // intPurchaseOrderID={rfqId}
        selectedRfqId={rfqId}
      ></RfqLineItemModal>
    </>
    // </div>
  );
}
