import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link,useHistory,useParams } from "react-router-dom";
import moment from 'moment';
// import { EditTable } from '@iso/components/Invoice/InvoiceTable';
import OrderStatus from '@iso/components/Invoice/OrderStatus';
import { DrillTable } from '../../component/CrewTable/DrillTable';
import notification from '@iso/components/Notification';
import Button from '@iso/components/uielements/button';
import Input, { Textarea } from '@iso/components/uielements/input';
import DatePicker from '@iso/components/uielements/datePicker';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageWrapper from './SinglePage.styles';
import { stringToPosetiveInt } from '@iso/lib/helpers/utility';

// import { orderStatusOptions } from './config';
import EntriesDrillAction from '../../redux/EntriesDrill/actions';
const { deleteData,editCrewData,updateData,getById } = EntriesDrillAction;
const StatusOptions = ['Draft', 'Completed', 'Approved','Printed'];
export default function(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();
  // const { editableInvoice, isNewInvoice, redirectPath, toggleView } = props;
  const { drillLists,drillList, isNewCrew,isDelete } = useSelector((state) => state.EntriesDrill);
  const [orderDate,setOrderDate]=React.useState(new Date());
  const [orderStatus,setOrderStatus]=React.useState("Draft");
  const onSave = () => { 
    var sendData={};
    sendData.orderDate=moment(orderDate).format("YYYY-MM-DD");;
    sendData.orderStatus=orderStatus;
    sendData.entryDrills=JSON.stringify(drillLists);
    dispatch(updateData(sendData,id));  
  };
  const onDelete=()=>{
    dispatch(deleteData(id));
  }
  React.useEffect(() => {      
      dispatch(getById(id));     
  },[]);
  React.useEffect(() => {
    if(Object.keys(drillList).length !==0){
     setOrderStatus(drillList.orderStatus);
     setOrderDate(drillList.orderDate);
    }
  },[drillList]);

  React.useEffect(() => { 
    if(isDelete){
      history.push("/dashboard/entries_drill");
    }    
  }, [isDelete]);

  function handleChange(value) {   
    setOrderStatus(value);   
  }
  const goPrint=(id)=>{
    history.push(`/dashboard/entries_drill/edit/${id}`);
  }

  return (
    <LayoutWrapper>
      <Box>
        <PageWrapper className="editView">          
          <div className="PageContent">
          <div className="PageHeader">     
              <Link to={"/dashboard/entries_drill"}>
                <Button color="primary">
                  <span>Cancel</span>
                </Button>
              </Link>      
            <Button type="primary" onClick={onSave} className="saveBtn">
              <span>Save</span>
            </Button>
            <Link to={`/dashboard/entries_drill/print/${id}`}>
              <Button type="primary" className="saveBtn">
                <span>PDF</span>
              </Button>
              </Link>             
            <Button type="danger" onClick={onDelete} className="saveBtn">
              <span>Delete</span>
            </Button>
          </div>
          <div className="RightSideContent">
                <div className="RightSideStatus">
                  <span className="RightSideStatusSpan"> Status: </span>
                  <OrderStatus
                    value={orderStatus}
                    name="orderStatus"
                    onChange={handleChange}
                    orderStatusOptions={StatusOptions}
                    className="RightStatusDropdown"
                  />                  
                </div>
                <div className="RightSideDate" style={{marginTop:"20px",marginBottom:"20px"}}>
                  Order date:{' '}
                  <DatePicker
                    allowClear={false}
                    value={moment(orderDate)}
                    onChange={val => {
                      setOrderDate(val.toDate().getTime())
                     // console.log(val.toDate().getTime())
                      // editableInvoice.orderDate = val.toDate().getTime();
                      // dispatch(editInvoice(editableInvoice));
                    }}
                    format="MMMM Do YYYY"
                    animateYearScrolling={true}
                  />
                </div>
            </div>
            <div className="InvoiceTable editInvoiceTable">
              <DrillTable
                editableData={drillLists}
                editCrew={e => dispatch(editCrewData(e))}
                // updateValues={updateValues}
              />
              <div className="InvoiceTableBtn">
              <Button
                  onClick={() => {
                    drillLists.push({
                      key: drillLists.length + 1,
                      strDate:new Date(),
                      strTime:null,
                      strLocation:'',
                      strDescription:''
                    });
                    dispatch(editCrewData(drillLists));
                  }}
                  type="primary"
                >
                  Add Item
                </Button>
              </div>             
            </div>
            <div className="ButtonWrapper" />
          </div>
        </PageWrapper>
      </Box>
    </LayoutWrapper>
  );
}
