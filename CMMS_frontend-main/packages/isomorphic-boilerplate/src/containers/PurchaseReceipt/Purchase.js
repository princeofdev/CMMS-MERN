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
import Actions from '../../redux/project/actions';
import CardWrapper, { Box, StatusTag } from '../Asset/Asset.styles';
import TableWrapper from '../../component/AntTables.styles';
import clone from 'clone';

import fakeData from './data';

const dataList = new fakeData(10);

const { initData, deleteData } = Actions;
export default function Workorders() {
  const [filtered, setFiltered] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const { projects, isDelete } = useSelector((state) => state.Project);

  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {
    console.log('init data ass');
    // dispatch(initData());
  }, []);

  // React.useEffect(() => {
  //   if (isDelete) {
  //     dispatch(initData());
  //   }
  // }, [isDelete]);

  // React.useEffect(() => {
  //   if (projects.length !== 0) {
  //     let data = [];
  //     projects.map((item) => {
  //       data.push(item);
  //     });
  //     setFiltered(data);
  //   }
  // }, [projects]);

  const columns = [
    {
      title: 'Code',
      dataIndex: 'strName',
      key: 'strName',
      width: '10%',
      render: (text, row) => {
        return <a href={`/dashboard/project/edit/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'Supplier',
      dataIndex: 'strName',
      key: 'strName',
      width: '20%',
      render: (text, row) => {
        return <a href={`/dashboard/project/edit/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'Line Items',
      dataIndex: 'strName',
      key: 'strName',
      width: '15%',
      render: (text, row) => {
        return <a href={`/dashboard/project/edit/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'Received',
      dataIndex: 'strName',
      key: 'strName',
      width: '10%',
      render: (text, row) => {
        return <a href={`/dashboard/project/edit/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'Total',
      dataIndex: 'strName',
      key: 'strName',
      width: '10%',
      render: (text, row) => {
        return <a href={`/dashboard/project/edit/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'Expected Delivery',
      dataIndex: 'strName',
      key: 'strName',
      width: '20%',
      render: (text, row) => {
        return <a href={`/dashboard/project/edit/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'strName',
      key: 'strName',
      width: '10%',
      render: (text, row) => {
        return <a href={`/dashboard/project/edit/${row._id}`}>{text}</a>;
      },
    },
  ];

  const sortColumns = [
    { ...columns[0], sorter: true },
    { ...columns[1], sorter: true },
    { ...columns[2], sorter: true },
    { ...columns[3], sorter: true },
    { ...columns[4], sorter: true },
    { ...columns[5], sorter: true },
    { ...columns[6], sorter: true },
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
                dataSource={filtered}
                columns={clone(sortColumns)}
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
