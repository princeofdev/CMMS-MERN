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
import moment from 'moment';
import PurchaseOrderAction from '../../redux/purchaseorder/actions';
import CardWrapper, { Box, StatusTag } from '../Asset/Asset.styles';
import TableWrapper from '../../component/AntTables.styles';
import clone from 'clone';

import fakeData from './data';

const dataList = new fakeData(10);

const { getPurchaseOrderData, deleteData } = PurchaseOrderAction;
export default function (props) {
  // const { pageState, purchaseOrder}=props;
  const [filtered, setFiltered] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const { purchaseOrders, isDelete } = useSelector(
    (state) => state.purchaseOrder
  );

  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {
    console.log('init data ass');
    dispatch(getPurchaseOrderData());
  }, []);

  const columns = [
    {
      title: 'Code',
      dataIndex: '_id',
      key: '_id',
      width: '10%',
      render: (text, row) => {
        return (
          <a href={`/dashboard/purchase_orders/${row._id}`}>{'PR#' + text}</a>
        );
      },
    },
    {
      title: 'Supplier',
      dataIndex: 'intSupplierID',
      key: 'intSupplierID',
      width: '15%',
      render: (text, row) => {
        return (
          <a href={`/dashboard/purchase_orders/${row._id}`}>
            {text ? text.strName : ''}
          </a>
        );
      },
    },
    {
      title: 'Line Items',
      dataIndex: 'strName',
      key: 'strName',
      width: '10%',
      render: (text, row) => {
        return <a href={`/dashboard/purchase_orders/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'Received',
      dataIndex: 'strName',
      key: 'strName',
      width: '10%',
      render: (text, row) => {
        return <a href={`/dashboard/purchase_orders/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'Total',
      dataIndex: 'strName',
      key: 'strName',
      width: '10%',
      render: (text, row) => {
        return <a href={`/dashboard/purchase_orders/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'Expected Delivery',
      dataIndex: 'dtmDateExpectedDelivery',
      key: 'dtmDateExpectedDelivery',
      width: '20%',
      render: (text, row) => {
        return (
          <a href={`/dashboard/purchase_orders/${row._id}`}>
            {text ? moment(text).format('MMMM DD YYYY, h:mm:ss a') : ''}
          </a>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'strName',
      key: 'strName',
      width: '10%',
      render: (text, row) => {
        return <span>{'Draft'}</span>;
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

  return (
    <LayoutWrapper>
      {/* <PageHeader>
        <IntlMessages id="sidebar.Project" />
      </PageHeader> */}
      <Box>
        <div className="isoInvoiceTableBtn">
          <Link to={`${match.path}/add`}>
            <Button type="primary" className="mateAddInvoiceBtn">
              New
            </Button>
          </Link>
        </div>

        <CardWrapper title="Assets">
          <div>
            <Scrollbars style={{ width: '100%', height: 'calc(100vh - 70px)' }}>
              <TableWrapper
                // rowSelection={rowSelection}
                dataSource={purchaseOrders}
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
    </LayoutWrapper>
  );
}
