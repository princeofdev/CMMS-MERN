import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import { GeneralLine } from "./UsersContentModal.styles";
import workOrderAction from '../../../redux/workorder/actions';
import scheduleMaintenaceAction from '../../../redux/scheduledmaintenance/actions';
const FormItem = Form.Item;
const workorderStatus_array = {
  2: 'Requested',
  3: 'Assigned',
  4: 'Open',
  5: 'Work In Progress',
  6: 'On Hold',
  7: 'Closed, Completed',
  8: 'Draft',
  9: 'Closed, Incomplete',
  10: 'Other',
};
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginBottom: '20px',
};
export default function(props) {   
  const dispatch = useDispatch();
  let history = useHistory();
  const { smId}=props;
  const { getWorkOrderBySMId,  } = workOrderAction;
  const { getSMLogsData }=scheduleMaintenaceAction;
   const [data, setData] = React.useState([]);
  const { workOrderLogs, } = useSelector(
    (state) => state.Workorders
  );
  const { smLogs } = useSelector((state) => state.ScheduledMaintenance);

   const columns = [
    {
      title: "Code",
      dataIndex: "_id",
       rowKey: "_id",
      width: "15%",  
       render: (text, row) => <a onClick={() => goWorkOrder(row._id)}>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "strDescription",
      rowKey: "strDescription",
      width: "25%",
      style:{color:'red'},
      render: (text, row) => <a onClick={() => goWorkOrder(row._id)}><div style={{
        width: "380px",
        maxWidth: "500px",
        whiteSpacing: "nowrap",
        textAlign: "left",
        textOverflow: "ellipsis",
       overflow: "hidden"}}>{text}</div></a>,
    },
    {
      title: "Work Order Status",
      dataIndex: "intWorkOrderStatusID",
      rowKey: "intWorkOrderStatusID",
      width: "15%",
      render: (text,row) => <a onClick={() => goWorkOrder(row._id)}>{workorderStatus_array[text]}</a>,
    },    
    {
      title: "Date Created",
      dataIndex: "dtmDateCreated",
      rowKey: "dtmDateCreated",
      width: "15%",
      render: (text,row) => <a onClick={() => goWorkOrder(row._id)}>{moment(text).format("MMMM Do YYYY, h:mm:ss a")}</a>,
    },    
   
  ];
  const columns2 = [
    {
      title: "Date",
      dataIndex: "dtmDate",
      rowKey: "dtmDate",
      width: "15%",
      render: (text) => <span>{moment(text).format("MMMM Do YYYY, h:mm:ss a")}</span>,
    },
    {
      title: "Log Type",
      dataIndex: "strLogType",
      rowKey: "strLogType",
      width: "25%",     
    },
    {
      title: "Status",
      dataIndex: "strStatus",
      rowKey: "strStatus",
      width: "10%", 
      render:(text)=><span style={{color:'green'}}>{text}</span>     
    },
    {
      title: "User",
      dataIndex: "intUserId",
      rowKey: "intUserId",
      width: "15%",
      render: (text, row) => <span>{text ? text.strFullName:""}</span>,
    },
    {
      title: "Notes",
      dataIndex: "strNote",
      rowKey: "strNote",
      width: "*",      
    },

  ];
  const goWorkOrder = (id) => {
    history.push(`/dashboard/workorder/${id}`);
  };
  React.useEffect(() => {
    dispatch(getWorkOrderBySMId(smId));
    dispatch(getSMLogsData(smId));
  }, []);
  React.useEffect(() => {
    console.log(smLogs)
  }, [smLogs]);
  return (
    <div className="isoInvoiceTable">
     
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
      <Row
        style={rowStyle}
        gutter={16}
        style={{
          background: '#e8edf0',
          padding: '5px 0 3px 10px',
          marginBottom: '15px',
        }}
      >
        <Col md={24} sm={24} xs={24}>
          <div style={{ color: '#738796' }}>Work Orders Created</div>
        </Col>
      </Row>
        <TableWrapper
          // rowSelection={rowSelection}
        dataSource={workOrderLogs}
          columns={columns}
          pagination={false}
          className="isoGroupTable"
        />
      <Row
        style={rowStyle}
        gutter={16}
        style={{
          background: '#e8edf0',
          padding: '5px 0 3px 10px',
          marginTop: '15px',
          marginBottom:'15px'
        }}
      >
        <Col md={24} sm={24} xs={24}>
          <div style={{ color: '#738796' }}>Activity Log</div>
        </Col>
      </Row>
      <TableWrapper
        // rowSelection={rowSelection}
        dataSource={smLogs}
        columns={columns2}
        pagination={false}
        className="isoGroupTable"
      />
      {/* </Scrollbars> */}
    
  </div>
  );
}
