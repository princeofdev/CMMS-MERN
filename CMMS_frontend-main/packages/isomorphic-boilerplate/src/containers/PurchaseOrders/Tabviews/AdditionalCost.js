import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from '@iso/components/utility/customScrollBar';
import { Button } from 'antd';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import '../../../component/table.css';
// import addDoubleImg from '../../../assets/images/new-group-inner-list.png';
import newAddImg from '../../../assets/images/new-inner-list.png';
import PurchaseOrderCostTypeModal from '../../../component/PurchaseOrderCostTypeModal';
// import Actions from '../../../redux/purchaserequest/actions';
import Actions from '../../../redux/additionalcost/actions';
const FormItem = Form.Item;
const Option = SelectOption;
export default function (props) {
  const { purcaseOrderId } = props;
  const dispatch = useDispatch();
  // const { getDataByPOId, updateLineItemData, editLIneItem, deleteData } = Actions;
  const { addAdditionalCost, updateCostTypeData, getAdditionalCostData, editLIneItem, deleteData} = Actions;
  // const { lineItems, purchaseItems, isDelete } = useSelector((state) => state.AdditionalCost);
  const { additionalCosts, isDelete } = useSelector((state) => state.AdditionalCost);
  const { taxVal } = useSelector((state) => state.purchaseRequest);
  const [pageSate, setpageSate] = React.useState("Add");
  const [purchaseCostModalActive, setPurchaseCostModalActive] = React.useState(false);
  const [selectedPR, setSelectedPR] = React.useState(null);
  const [subTotal, setSubTotal] = React.useState(0);
  const [sumTax, setSumTax] = React.useState(0);
  const [costTypeArray,setCostTypeArray]=React.useState([]);
  const handleCancel = () => {
    setPurchaseCostModalActive(false);
  }
  React.useEffect(() => {
    dispatch(getAdditionalCostData(purcaseOrderId));
  }, []);
  React.useEffect(() => {
    if (isDelete)
    dispatch(getAdditionalCostData(purcaseOrderId));
  }, [isDelete]);
  
  React.useEffect(() => {
    // dispatch(getDataByPOId(purcaseOrderId));
    var temp=[];
    additionalCosts.map((row)=>{
      temp.push(row.intCostTypeId);
    })
    setCostTypeArray(temp);
    console.log('additionalCosts', additionalCosts)
  }, [additionalCosts]);
  const updateData = (key) => {
    var sendData = {};
    sendData.intPurchaseOrderID = purcaseOrderId;
    sendData.strNotes = additionalCosts[key].strNotes;
    sendData.intAmount = additionalCosts[key].intAmount;
    sendData.strShippingType = additionalCosts[key].strShippingType;   
    dispatch(updateCostTypeData(sendData, additionalCosts[key]._id));
  }
  // React.useEffect(() => {
  //   console.log(lineItems, 'lineItems')
  //   var sum = 0;
  //   var tax = 0;
  //   lineItems.map((row, index) => {
  //     sum = sum + parseInt(row.qtyOnOrder) * parseFloat(row.dblUnitPrice != "" ? row.dblUnitPrice : 0);
  //     tax = tax + (parseInt(row.qtyOnOrder) * parseFloat(row.dblUnitPrice != "" ? row.dblUnitPrice : 0)) * parseFloat(row.dblTaxRate != "" ? row.dblTaxRate : 0) * 0.01
  //   })
  //   setSubTotal(sum.toFixed(2));
  //   setSumTax(tax.toFixed(2));
  // }, [lineItems]);
  const selectedCostType=(row)=>{
    var sendData = {};
    sendData.intPurchaseOrderID = purcaseOrderId;
    sendData.strCostType = row.strName;
    sendData.intCostTypeId = row.id;
    sendData.intAmount = 0;
    dispatch(addAdditionalCost(sendData));
    console.log(row,'this is row');
  }
  const deleteRow=(id)=>{
    console.log(id);
    dispatch(deleteData(id));
  }
 
  
  return (
    // <div className="isoInvoiceTable">
    <>
      <Scrollbars
        style={{ height: "270px" }} //"calc(80vh - 300px)"
      >
        <table className="lineItem" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>
                <span className="listHeaderLabel35">Purchase Order Additional Cost Type</span>
              </th>
              <th style={{ width: '15%' }}>
                <span className="listHeaderLabel35">Notes</span>
              </th>
              <th style={{ width: '10%' }}>
                <span className="listHeaderLabel35"></span>
              </th>
              <th style={{ width: '10%' }}>
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
            <tr className="listRow" key="fee">
              <td className="column2" style={{ paddingLeft: 10 }}>
                Tax
              </td>
              <td className="column2" style={{ paddingLeft: 10 }}>
                <input className="item" type="Text"></input>
              </td>
              <td className="column4" >
                Tax is being calculated
              </td>
              <td className="column4" >
                <span style={{fontWeight:'bold'}}>$ {taxVal.toFixed(2)}</span>
              </td>
              <td className="column2" >
                
              </td>
              <td className="column2" >
                
              </td>
            </tr>
            {
              additionalCosts.map((row,index)=>{
                return(
                  <tr className="listRow" key={index}>
                    <td className="column2" style={{ paddingLeft: 10 }}>
                      {row.strCostType}
                    </td>
                    <td className="column2" style={{ paddingLeft: 10 }}>
                      <input className="item" type="Text"
                        value={row.strNotes}
                        onBlur={() => updateData(index)}
                        onChange={(event) => {                          
                          additionalCosts[index].strNotes = event.target.value; 
                          dispatch(editLIneItem(additionalCosts))
                        }}
                      
                      ></input>
                    </td>
                    <td className="column4" >  
                    {
                     row.intCostTypeId==1?
                        <Select style={{ textAlign: "left",width:'100%' }}
                           value={row.strShippingType}
                          onChange={value => {
                            additionalCosts[index].strShippingType = value;
                            dispatch(editLIneItem(additionalCosts))
                            updateData(index);
                          }}
                        >
                            <Option value={"Air"}>Air</Option>
                            <Option value={"Ground"}>Ground</Option>
                            <Option value={"Courier"}>Courier</Option>
                            <Option value={"Pickup"}>Pickup</Option>
                        </Select>:null
                    }                   
                    </td>
                    <td className="column4" >
                      <input className="item" type="Text"
                        value={row.intAmount}
                        onBlur={() => updateData(index)}
                        onChange={(event) => {
                          
                          additionalCosts[index].intAmount = event.target.value;
                          console.log(additionalCosts)
                          dispatch(editLIneItem(additionalCosts))
                        }}

                      ></input>
                    </td>                    
                    <td className="column2" >
                      <Button
                        className="DltBtn"
                        // icon="delete"
                        onClick={() => {
                          deleteRow(row._id);

                        }}
                      >
                        <i className="ion-android-delete" />
                      </Button>
                    </td>
                    <td className="column2" >
                    </td>
                  </tr>
                )
              })
            }
           
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
          onClick={() => setPurchaseCostModalActive(true)}
        >
          <img src={newAddImg}></img>
        </span>
      </div>  
      <PurchaseOrderCostTypeModal
        onCancel={handleCancel}
        visible={purchaseCostModalActive}
        title="SELECT PURCHASE ORDER COST TYPE"
        // pageState={pageSate}
        costTypeArray={costTypeArray}
        selectedCostType={selectedCostType}
        intPurchaseOrderID={purcaseOrderId}
        // selectedPR={selectedPR}
      >
      </PurchaseOrderCostTypeModal>
    </>
    // </div>
  );
}
