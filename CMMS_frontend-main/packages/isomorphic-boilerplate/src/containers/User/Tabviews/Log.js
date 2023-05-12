import React from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Col, Row, Form } from "antd";
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import addDoubleImg from '../../../../assets/images/new-group-inner-list.png';
// import newAddImg from '../../../../assets/images/new-inner-list.png';
import Actions from "../../../redux/lognotification/actions";
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
const maintanceType_array = {
  1: 'Preventive',
  2: 'Damage',
  3: 'Corrective',
  4: 'Safety',
  5: 'Upgrade',
  6: 'Electrical',
  7: 'Project',
  8: 'Inspection',
  9: 'Meter_Reading',
  10: 'Other',
};
export default function(props) {   
  const { getLogsById } = Actions;
  let history = useHistory();
  const { workOrderLogs,logs } = useSelector((state) => state.logNotification);
   const [data, setData] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 25,
  });
  const dispatch = useDispatch();
   const rowStyle = {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
  };
   const columns = [
    {
      title: "Maintenance Type",
      dataIndex: "intMaintenanceTypeID",
      rowKey: "intMaintenanceTypeID",
      width: "15%",
       render: (text, row) => {
         return (
           <a
             onClick={() => {
               goDetail(row._id);
             }}
           >
             {maintanceType_array[text]}
           </a>
         );
       },
    },
    {
      title: "Work Order Status",
      dataIndex: "intWorkOrderStatusID",
      rowKey: "intWorkOrderStatusID",
      width: "15%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {workorderStatus_array[text]}
          </a>
        );
      },
    },
    {
      title: "Code",
      dataIndex: "strCode",
      rowKey: "strCode",
      width: "10%",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text}
          </a>
        );
      },
    },    
    {
      title: "Description",
      dataIndex: "strDescription",
      rowKey: "strDescription",
      width: "*",
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            <span>{text}</span>
          </a>
        );
      },
    },    
   
  ];
  const columns2 = [   
    {
      title: "Subject",
      dataIndex: "strSubject",
      rowKey: "strSubject",
      width: "*",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Date Created",
      dataIndex: "dtmDateCreated",
      rowKey: "dtmDateCreated",
      width: "20%",
      render: (text) => <span>{moment(text).format("MMMM Do YYYY, h:mm:ss a")}</span>,
    },

  ];
  const goDetail = (id) => {  
    history.push(`/dashboard/workorder/${id}`);
  };
  React.useEffect(() => {
    dispatch(getLogsById(props.userId));
  }, []);
  React.useEffect(() => {
    console.log(workOrderLogs,'this is workOrderLogs');
  }, [workOrderLogs]);
  const onChange2 = (pagination, filters, sorter) => {    
    setPagination(pagination);
  };
  return (
    <div className="isoInvoiceTable">
     <Row style={rowStyle} gutter={16} style={{background: "#e8edf0", padding: "5px 0 3px 0px",marginBottom:'5px'}}>
         <Col md={24} sm={24} xs={24} >
          <div style={{ color: "#738796", marginLeft: "10px" }}>Assigned Work Orders</div>
          </Col>
    </Row>
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
        <TableWrapper
          // rowSelection={rowSelection}
        dataSource={workOrderLogs}
          columns={columns}
          pagination={false}
          className="isoGroupTable"
        />
      {/* </Scrollbars> */}
      <Row style={rowStyle} gutter={16} style={{ background: "#e8edf0", padding: "5px 0 3px 0px",marginTop:'30px', marginBottom: '5px' }}>
        <Col md={24} sm={24} xs={24} >
          <div style={{ color: "#738796", marginLeft: "10px" }}>Logs</div>
        </Col>
      </Row>
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
      <TableWrapper
        // rowSelection={rowSelection}
        dataSource={logs}
        columns={columns2}
        pagination={pagination}
        onChange={onChange2}
        className="isoGroupTable"
      />
      {/* </Scrollbars> */}
     
  </div>
  );
}
