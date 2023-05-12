import React, { useEffect } from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import Scrollbars from '@iso/components/utility/customScrollBar';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Button from '@iso/components/uielements/button';
import newAddImg from '../../../../assets/images/new-inner-list.png';
import { useDispatch, useSelector } from 'react-redux';

import AssetBusinessAction from '../../../../redux/assetbusiness/actions';
// import AddAssetBusinesModal from '../../../../component/AssetBusinessModal';
import SupplierBusinesModal from '../../../../component/SupplierBusinessModal';

const FormItem = Form.Item;

const businessTypes = {
  1: 'Supplier',
  2: 'Manufacture',
  3: 'Service Provider',
  4: 'Owner',
  5: 'Customer',
};

export default function (props) {
  const { assetName, assetId } = props;

  const dispatch = useDispatch();

  const { getData, deleteData} = AssetBusinessAction;

  const [data, setData] = React.useState([]);

  const [modalActive, setModalActive] = React.useState(false);
  const [pageState, setPageState] = React.useState('add');
  const [businessName, setBusinessName] = React.useState('');
  const [businessGroupName, setBusinessGroupName] = React.useState('');
  const [businessAssetNumber, setBusinessAssetNumber] = React.useState('');
  const [assetBusinessId, setAssetBusinessId] = React.useState('');
  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 25,
  });
  const goDetail = (row) => {
    setPageState('edit');
    setBusinessName(row.strBusinessName);
    setBusinessGroupName(row.strBusinessGroupName);
    setBusinessAssetNumber(row.intBusinessId);
    setAssetBusinessId(row._id);
    setModalActive(true);
  };

  const addData = () => {
    setModalActive(true);
    setPageState('add');
  };

  const columns = [
    {
      title: 'Business',
      dataIndex: 'strBusinessName',
      rowKey: 'strBusinessName',
      width: '25%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Business Group',
      dataIndex: 'strBusinessGroupName',
      rowKey: 'strBusinessGroupName',
      width: '30%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Business Asset Number',
      dataIndex: 'intBusinessId',
      rowKey: 'intBusinessId',
      width: '15%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '50%',
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

  const { assetBusinesses, isDelete } = useSelector(
    (state) => state.AssetBusiness
  );

  const handleCancel = () => {
    setModalActive(false);
    setBusinessName('');
    setBusinessGroupName('');
  };
  const onChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };
  React.useEffect(() => {
    dispatch(getData(assetId));
  }, []);
  React.useEffect(() => {
    if (isDelete)
    dispatch(getData(assetId));
  }, [isDelete]);
  
  return (
    <div className="isoInvoiceTable">
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
      <TableWrapper
        // rowSelection={rowSelection}
        dataSource={assetBusinesses}
        columns={columns}
        pagination={true}
        pagination={pagination}
        onChange={onChange}
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
          <img src={newAddImg} onClick={addData}></img>
        </span>
      </div>

      <SupplierBusinesModal
        workorderId={props.workorderId}
        visible={modalActive}
        onCancel={handleCancel}
        title={'ADD Business'}
        assetName={assetName}
        businessId={assetId}
        pageState={pageState}
        businessName={businessName}
        businessGroupName={businessGroupName}
        assetBusinessId={assetBusinessId}
      ></SupplierBusinesModal>
    </div>
  );
}
