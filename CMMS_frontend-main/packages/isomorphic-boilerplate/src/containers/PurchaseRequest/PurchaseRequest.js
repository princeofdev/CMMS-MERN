import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
// import notification from '@iso/components/Notification';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Button from '@iso/components/uielements/button';
import clone from 'clone';
import moment from 'moment';
import Actions from '../../redux/purchaserequest/actions';
import CardWrapper, { Box, StatusTag } from '../Asset/Asset.styles';
import TableWrapper from '../../component/AntTables.styles';

import fakeData from './data';
import PurchaseRequestModal from '../../component/PurchaseRequestModal';
const dataList = new fakeData(10);

const { getDatas, deleteData } = Actions;
export default function Workorders() {
  const [filtered, setFiltered] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [purchaseRequestModalActive, setPurchaseRequestModalActive]=React.useState(false);
  const { purchaseItems, isDelete } = useSelector((state) => state.purchaseRequest);
  const [selectedPR,setSelectedPR]=React.useState(null);
  const [pageSate, setPageSate]=React.useState("Add");

  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {   
    dispatch(getDatas());
  }, []);

  // React.useEffect(() => {
  //   if (isDelete) {
  //     dispatch(initData());
  //   }
  // }, [isDelete]);

  React.useEffect(() => {
    console.log(purchaseItems)
  }, [purchaseItems]);

  const columns = [
    {
      title: 'Code',
      dataIndex: '_id',
      key: '_id',
      width: '10%',
      render: (text, row) => {
         return <a onClick={() => { goEditPR(row) }}>{"PR#"+text}</a>;
      },
    },
    {
      title: 'Requested Item',
      dataIndex: 'strName',
      key: 'strName',
      width: '20%',
      render: (text, row) => {
        var itemName="";
        if (row.bolEquipmentCon){
          itemName = row.intSourceAssetID ? row.intSourceAssetID.strName:"";
        }
        else{
          itemName = row.strNotInventory;
        }
        return <a onClick={()=>{goEditPR(row)}}>{itemName}</a>;
      },
    },
    {
      title: 'Source',
      dataIndex: 'strName',
      key: 'strName',
      width: '15%',
      render: (text, row) => {
        var sourceName = row.intSourceWorkOrderID ? row.intSourceWorkOrderID.strCode:localStorage.getItem("user_name");
        return <a onClick={() => { goEditPR(row) }}>{sourceName}</a>;
      },
    },
    {
      title: 'Req Qty',
      dataIndex: 'qtyOnOrder',
      key: 'qtyOnOrder',
      width: '15%',
      render: (text, row) => {
        var qty="";
        if (row.bolEquipmentCon) {
          qty = row.qtyOnOrder;          
        }
        else{
          qty = row.qtyOnOrder2;
        }
        return <a onClick={() => { goEditPR(row) }}>{qty}</a>;
      },
    },
    {
      title: 'Need By',
      dataIndex: 'dtmRequiredByDate',
      key: 'dtmRequiredByDate',
      width: '10%',
      render: (text, row) => {
        var needBy = text ? moment(text).format("MMM DD YYYY"):"";
        return <a onClick={() => { goEditPR(row) }} >{needBy}</a>;
      },
    },
    {
      title: 'Requested By User',
      dataIndex: 'intRequestedByUserID',
      key: 'intRequestedByUserID',
      width: '15%',
      render: (text, row) => {
        return <a onClick={() => { goEditPR(row) }}>{row.intRequestedByUserID ? row.intRequestedByUserID.strFullName:""}</a>;
      },
    },
    {
      title: 'Purchase Order',
      dataIndex: 'strName',
      key: 'strName',
      width: '15%',
      render: (text, row) => {
        return <a onClick={() => { goEditPR(row) }}>{text}</a>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'strName',
      key: 'strName',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => { goEditPR(row) }}>{text}</a>;
      },
    },
    {
      title: '',
      dataIndex: 'strName',
      key: 'strName',
      width: '*',
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

  const sortColumns = [
    { ...columns[0], sorter: true },
    { ...columns[1], sorter: true },
  ];

  const onChange = (pagination, filters, sorter) => {
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey, filtered);
      } else {
        dataList.getSortDesc(sorter.columnKey, filtered);
      }
      setFiltered(filtered);
    }
    // setPagination(pagination);
  };
  const handleCancel=()=>{
    setPurchaseRequestModalActive(false);
  }
  const goEditPR=(row)=>{
    setPageSate('Edit');
    setSelectedPR(row);
    setPurchaseRequestModalActive(true)  
  }
  return (
    <LayoutWrapper>
      {/* <PageHeader>
        <IntlMessages id="sidebar.Project" />
      </PageHeader> */}
      <Box>
        <div className="isoInvoiceTableBtn">
          {/* <Link to={`${match.path}/add`}> */}
          <Button type="primary" onClick={() => {setPurchaseRequestModalActive(true);setPageSate('Add')}} className="mateAddInvoiceBtn">
              New
            </Button>
          {/* </Link> */}
        </div>

        <CardWrapper title="Assets">
         
            <div>
              <Scrollbars
                style={{ width: '100%', height: 'calc(100vh - 70px)' }}
              >
                <TableWrapper
                  // rowSelection={rowSelection}
                dataSource={purchaseItems}
                columns={columns}
                  pagination={false}
                  className="isoSortingTable"
                  onChange={onChange}
                  defaultCurrent={3}
                />
              </Scrollbars>
            </div>
         
        </CardWrapper>
      </Box>
      <PurchaseRequestModal
        onCancel={handleCancel}
        visible={purchaseRequestModalActive}
        title="PURCHASE REQUEST"
        pageState={pageSate}
        intPurchaseOrderID={null}
        bolAddedDirectlyToPurchaseOrder={false}
        selectedPR={selectedPR}
      >
      </PurchaseRequestModal>
    </LayoutWrapper>
  );
}
