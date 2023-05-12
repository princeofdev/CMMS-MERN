import React, { useEffect } from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import Scrollbars from '@iso/components/utility/customScrollBar';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import addDoubleImg from '../../../assets/images/new-group-inner-list.png';
import newAddImg from '../../../assets/images/new-inner-list.png';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';

import AddWorkOrderBusinessModal from '../../../component/AddWorkOrderBusinessModal';
import WorkorderBusinessAction from '../../../redux/workorderbusiness/actions';

const FormItem = Form.Item;

export default function (props) {
  const { workorderId } = props;

  const dispatch = useDispatch();

  const { getDatas, deleteData } = WorkorderBusinessAction;

  const [pageState1, setPageState1] = React.useState('add');

  const [addBusinessModalActive, setAddBusinessModalActive] = React.useState(
    false
  );

  const [businessDatas, setBusinessDatas] = React.useState([]);
  const [businessId, setBusinessId] = React.useState();
  const [businessName, setBusinessName] = React.useState('');
  const [businessGroupName, setBusinessGroupName] = React.useState('');

  const { workorderbusinesses, isDelete } = useSelector(
    (state) => state.WorkOrderBusiness
  );

  const handleCancel = () => {
    setAddBusinessModalActive(false);
  };

  React.useEffect(() => {
    dispatch(getDatas(workorderId));
  }, []);
  React.useEffect(() => {
    console.log(workorderbusinesses, 'workorderbusinesses');
  }, [workorderbusinesses]);

  React.useEffect(() => {
    if (isDelete) dispatch(getDatas(workorderId));
  }, [isDelete]);

  const goDetail = (row) => {
    setAddBusinessModalActive(true);
    setBusinessName(row.strBusinessName);
    setBusinessGroupName(row.strBusinessGroupName);
    setBusinessId(row._id);
    setPageState1('edit');
  };

  const columns = [
    // {
    //   title: "Business Type",
    //   dataIndex: "strEmailUserGuest",
    //   rowKey: "strEmailUserGuest",
    //   width: "10%",
    // },
    {
      title: 'Business',
      dataIndex: 'strBusinessName',
      rowKey: 'strBusinessName',
      width: '25%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    // {
    //   title: "Business Asset Number",
    //   dataIndex: "intWorkOrderStatusID",
    //   rowKey: "intWorkOrderStatusID",
    //   width: "15%",
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: 'Business Group',
      dataIndex: 'strBusinessGroupName',
      rowKey: 'strBusinessGroupName',
      width: '40%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Asset',
      dataIndex: 'strAssetName',
      rowKey: 'strAssetName',
      width: '35%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    // {
    //   title: "Catalog",
    //   dataIndex: "intWorkOrderStatusID",
    //   rowKey: "intWorkOrderStatusID",
    //   width: "15%",
    //   render: (text) => <span>{text}</span>,
    // },
    // {
    //   title: "Vendor Price",
    //   dataIndex: "intWorkOrderStatusID",
    //   rowKey: "intWorkOrderStatusID",
    //   width: "15%",
    //   render: (text) => <span>{text}</span>,
    // },
    // {
    //   title: "",
    //   dataIndex: "intWorkOrderStatusID",
    //   rowKey: "intWorkOrderStatusID",
    //   width: "*",
    //   render: (text, row) => {
    //     return <a onClick={() => goDetail(row)}>{text}</a>;
    //   },
    // },
    {
      title: '',
      dataIndex: 'delete',
      rowKey: 'delete',
      // width: "50%",
      render: (text, row) => {
        return (
          <Button
            onClick={() => {
              dispatch(deleteData(row._id));
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];
  return (
    <div className="isoInvoiceTable">
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
      <TableWrapper
        // rowSelection={rowSelection}
        dataSource={workorderbusinesses}
        columns={columns}
        pagination={false}
        className="isoSortingTable"
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
          style={{
            float: 'left',
            marginLeft: '4px',
            marginRight: '4px',
            cursor: 'pointer',
          }}
        >
          <img
            src={newAddImg}
            onClick={() => {
              setAddBusinessModalActive(true);
            }}
          ></img>
        </span>
      </div>
      <AddWorkOrderBusinessModal
        workorderId={props.workorderId}
        visible={addBusinessModalActive}
        onCancel={handleCancel}
        title={'ADD Business'}
        pageState={props.pageState}
        pageState1={pageState1}
        assetName={props.assetName}
        businessName={businessName}
        businessGroupName={businessGroupName}
        businessId={businessId}
      ></AddWorkOrderBusinessModal>
    </div>
  );
}
