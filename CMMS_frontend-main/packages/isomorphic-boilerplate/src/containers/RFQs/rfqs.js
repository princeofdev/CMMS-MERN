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
import RfqsAction from '../../redux/rfqs/actions';
import CardWrapper, { Box, StatusTag } from '../Asset/Asset.styles';
import TableWrapper from '../../component/AntTables.styles';
import clone from 'clone';

import fakeData from './data';

const dataList = new fakeData(10);

const { getRFQs } = RfqsAction;
export default function (props) {
  // const { pageState, purchaseOrder}=props;
  const [filtered, setFiltered] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const { rfqs } = useSelector(
    (state) => state.Rfq
  );
  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {
    dispatch(getRFQs());
  }, []);

  const columns = [
    {
      title: 'Code',
      dataIndex: '_id',
      key: '_id',
      width: '5%',
      render: (text, row) => {
        return (
          <a href={`/dashboard/rfqs/${row._id}`}>{'RFQ#' + text}</a>
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
          <a href={`/dashboard/rfqs/${row._id}`}>
            {text ? text.strName : ''}
          </a>
        );
      },
    },  
    {
      title: 'Date Required Response',
      dataIndex: 'dtmDateExpectedDelivery',
      key: 'dtmDateExpectedDelivery',
      width: '20%',
      render: (text, row) => {
        return (
          <a href={`/dashboard/rfqs/${row._id}`}>
            {text ? moment(text).format('MMMM DD YYYY, h:mm:ss a') : ''}
          </a>
        );
      },
    },
    {
      title: 'Date Sent',
      dataIndex: 'dtmDateCreated',
      key: 'dtmDateCreated',
      width: '20%',
      render: (text, row) => {
        return (
          <a href={`/dashboard/rfqs/${row._id}`}>
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
      <PageHeader>
        <IntlMessages id="sidebar.rfqs" />
      </PageHeader>
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
                dataSource={rfqs}
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
