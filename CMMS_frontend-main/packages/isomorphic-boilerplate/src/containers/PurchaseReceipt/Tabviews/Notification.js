import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from '@iso/components/utility/customScrollBar';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import addDoubleImg from '../../../assets/images/new-group-inner-list.png';
import newAddImg from '../../../assets/images/new-inner-list.png';
import WorkorderNotificationModal from '../../../component/WorkorderNotificationModal';
import workOrderNotificationAction from '../../../redux/workordernotification/actions';
export default function (props) {
  const dispatch = useDispatch();
  const { intWorkOrderId } = props;
  const [data, setData] = React.useState([]);
  const { getDatas } = workOrderNotificationAction;
  const { workordernotifications, isDelete } = useSelector(
    (state) => state.workOrderNotification
  );
  const [notificationModalActive, setNotificationModalActive] = React.useState(
    false
  );
  const [bolAssign, setBolAssign] = React.useState(false);
  const [bolStatusChange, setBolStatusChange] = React.useState(false);
  const [bolWorkOrderCompletion, setBolWorkOrderCompletion] = React.useState(
    false
  );
  const [bolTaskCompletion, setBolTaskCompletion] = React.useState(false);
  const [bolAssetOnline, setBolAssetOnline] = React.useState(false);
  const [schedulenotification, setSchedulenotification] = React.useState(null);
  const [workOrderNotication, setWorkOrderNotication] = React.useState(null);
  const [pageState, setPageState] = React.useState('Add');
  const columns = [
    {
      title: 'Techinican',
      dataIndex: 'intUserId',
      rowKey: 'intUserId',
      width: '40%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text.strFullName}</a>;
      },
    },

    {
      title: 'Assignment',
      dataIndex: 'bolAssign',
      rowKey: 'bolAssign',
      width: '12%',
      render: (val, row) => {
        return (
          <Checkbox
            checked={val}
            onChange={(event) => {
              goDetail(row);
            }}
          ></Checkbox>
        );
      },
    },
    {
      title: 'Status Change',
      dataIndex: 'bolStatusChange',
      rowKey: 'bolStatusChange',
      width: '12%',
      render: (val, row) => {
        return (
          <Checkbox
            checked={val}
            onChange={(event) => {
              goDetail(row);
            }}
          ></Checkbox>
        );
      },
    },
    {
      title: 'Completion',
      dataIndex: 'bolWorkOrderCompletion',
      rowKey: 'bolWorkOrderCompletion',
      width: '12%',
      render: (val, row) => {
        return (
          <Checkbox
            checked={val}
            onChange={(event) => {
              goDetail(row);
            }}
          ></Checkbox>
        );
      },
    },
    {
      title: 'Task Completed',
      dataIndex: 'bolTaskCompletion',
      rowKey: 'bolTaskCompletion',
      width: '12%',
      render: (val, row) => {
        return (
          <Checkbox
            checked={val}
            onChange={(event) => {
              goDetail(row);
            }}
          ></Checkbox>
        );
      },
    },
    //  {
    //    title: "Online/Offline",
    //    dataIndex: "bolAssetOnline",
    //    rowKey: "bolAssetOnline",
    //    width: "12%",
    //    render: (val,row) => {
    //      return <Checkbox checked={val}
    //        onChange={(event) => { goDetail(row); }}
    //      ></Checkbox>
    //    },
    //  },
  ];
  const handleCancel = () => {
    setNotificationModalActive(false);
  };
  const goDetail = (row) => {
    setWorkOrderNotication(row);
    setPageState('edit');
    setNotificationModalActive(true);
  };
  React.useEffect(() => {
    dispatch(getDatas(intWorkOrderId));
  }, []);

  React.useEffect(() => {
    dispatch(getDatas(intWorkOrderId));
  }, [isDelete]);

  return (
    <div className="isoInvoiceTable">
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
      <TableWrapper
        // rowSelection={rowSelection}
        dataSource={workordernotifications}
        columns={columns}
        pagination={false}
        className="isoGroupTable"
      />
      {/* </Scrollbars> */}
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
          onClick={() => {
            setNotificationModalActive(true);
            setPageState('ADD');
          }}
          style={{
            float: 'left',
            marginLeft: '4px',
            marginRight: '4px',
            cursor: 'pointer',
          }}
        >
          <img src={newAddImg}></img>
        </span>
      </div>
      <WorkorderNotificationModal
        visible={notificationModalActive}
        onCancel={handleCancel}
        workOrderNotication={workOrderNotication}
        pageState={pageState}
        intWorkOrderId={intWorkOrderId}
        title="WORK ORDER USER"
      ></WorkorderNotificationModal>
    </div>
  );
}
