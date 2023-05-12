import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import moment from 'moment';
import { Tooltip } from 'antd';
import workOrderActions from "../redux/workorder/actions";
import userAction from '../redux/user/actions';
import { Col, Row } from "antd";
import './table.css'


const maintanceType_color_array = {
  1: '#2d61ae',
  2: '#cc4140',
  3: '#74bc50',
  4: '#FF9900',
  5: '#6fae9c',
  6: '#d2ca4e',
  7: '#967855',
  8: '#638582',
  9: '#7F7F7F',
  10: '#d36e87',
};
const { initData } = workOrderActions;
const { getAllUserData } = userAction;
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginTop: "-20px",
  background: "#e0e7ed",
  height: "38px",
  marginLeft: "2px",
  borderBottom: "1px solid rgb(174,193,208)"
};
export default function (props) {
  const {  visible,title} = props; 
  const dispatch = useDispatch();
  const { workorders, isDelete } = useSelector((state) => state.Workorders);
  const { users } = useSelector((state) => state.Users);
  const [filtered, setFiltered] = React.useState([]);
  const [strSearchVal,setStrSearchVal]=React.useState("");
 
  const columns = [
    {
      title: 'Code',
      dataIndex: 'strCode',
      key: 'strCode',
      width: '10%',
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              selectedWO(row);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'strDescription',
      key: 'strDescription',
      ellipsis: {
        showTitle: false,
      },
      width: '25%',
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              selectedWO(row);
            }}
          >
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          </a>
        );
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priorityName',
      key: 'priorityName',
      width: '10%',
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              selectedWO(row);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Assets',
      dataIndex: 'strAssets',
      key: 'strAssets',
      width: '25%',
      ellipsis: {
        showTitle: false,
      },
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              selectedWO(row);
            }}
          >
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          </a>
        );
      },
    },
    {
      title: 'Assigned Users',
      dataIndex: 'assignedUser',
      key: 'assignedUser',
      width: '20%',
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              selectedWO(row);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'workOrderStatus',
      key: 'workOrderStatus',
      width: '15%',
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              selectedWO(row);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'maintenanceTypeName',
      key: 'maintenanceTypeName',
      width: '15%',
      render: (text, row) => (
        <div
          style={{
            width: '100%',
            color: maintanceType_color_array[row.intMaintenanceTypeID],
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Completed By User',
      dataIndex: 'completedByUser',
      key: 'completedByUser',
      width: '20%',
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              selectedWO(row);
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: 'Created Date',
      dataIndex: 'dtmDateCreated',
      key: 'dtmDateCreated',
      width: '15%',
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              selectedWO(row);
            }}
          >
            {moment(text).format('YYYY-MM-DD')}
          </a>
        );
      },
    },
    {
      title: 'Suggested Completion Date',
      dataIndex: 'dtmSuggestedCompletionDate',
      key: 'dtmSuggestedCompletionDate',
      width: '25%',
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              selectedWO(row);
            }}
          >
            {moment(text).format('YYYY-MM-DD')}
          </a>
        );
      },
    },

  ];
  // const [newModalActive, setNewModalActive] = React.useState(false);

 React.useEffect(() => {
   dispatch(initData());
   dispatch(getAllUserData());
}, [visible]);
  React.useEffect(() => {
    let tmp = [];
    workorders.forEach((item) => {
      if (item.intWorkOrderStatusID != 7 && item.intWorkOrderStatusID != 9) {
        tmp.push(item);
      }
    });
    setFiltered(tmp);
  }, [workorders]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      props.selectWorkOrder(record);
      props.onCancel();
    },
  };
  const selectedWO=(row)=>{
    props.selectWorkOrder(row);
    props.onCancel();
  }
  const onSave=()=>{
    console.log('on save');
  }
 return (
   <div>
      <Modal
      visible={visible}
      onClose={props.onCancel}
     okText="Save"
      title={title}  
      width={window.innerWidth-200}
      // onOk={onSave}
      onCancel={props.onCancel}
      footer={null}
    >
    <div>
      <Row style={rowStyle} gutter={16} justify="start">
          <Col md={20} sm={20} xs={24} >           
          </Col>
          <Col md={4} sm={4} xs={24}>
          <InputSearch
              value={strSearchVal}
              // onChange={(event)=>goSearch(event)}
                placeholder="input search text"                      
                style={{ width: "100%" }}
              />
          </Col>
      </Row>
    </div>
      <div style={{marginTop:"3px",height: "430px"}}>    
          
              <Scrollbars style={{ width: "100%", height: "430px" }}>                       
                {/* <TableWrapper                
                  dataSource={assetsTree}
                  columns={columns}           
                  rowSelection={{ ...rowSelection, type:"radio" }}
                  pagination={{ pageSize:5 }}
                  className="invoiceListTable"
                />    */}
                 
                <TableWrapper
                  // rowSelection={rowSelection}
                  dataSource={filtered}
                  columns={columns}       
                  rowSelection={{ ...rowSelection, type:"radio" }}
                  pagination={{ pageSize: 5 }}
                  className="invoiceListTable"
                />
             
              </Scrollbars>
        
      </div>
      </Modal>     
  </div>
 )
}