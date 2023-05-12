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
import Actions from '../../redux/formbuilder/actions';
import CardWrapper, { Box, StatusTag } from '../Asset/Asset.styles';
import TableWrapper from '../../component/AntTables.styles';
import clone from 'clone';

import fakeData from './data';

const dataList = new fakeData(10);

const { getDatas, deleteData } = Actions;
export default function Workorders() {
  const [filtered, setFiltered] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const { formDatas, isDelete } = useSelector((state) => state.formBuilder);

  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {
    dispatch(getDatas());
  }, []);

  React.useEffect(() => {
    console.log(formDatas);
  }, [formDatas]);

  const columns = [
    {
      title: 'Title',
      dataIndex: '_id',
      key: '_id',
      width: '30%',
      render: (text, row) => {
        var content = row.formData ? row.formData[0].content : null;
        var temp = null;
        if (content) {
          temp = content.replace('<p style="text-align:center;">', "");
          temp = temp.replace('<strong>', "");
          temp = temp.replace('</strong>', "");
        }
        return <a href={`/dashboard/formbuilder/${row._id}`}>{temp ? temp : "CheckList# " + text}</a>;
      },
    },
    {
      title: 'CheckList View',
      dataIndex: 'strDescription',
      key: 'strDescription',
      width: '55%',
      render: (text, row) => {
        return <a href={`/dashboard/checklist/${row._id}`}>View CheckList</a>;
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
          <TableWrapper
            // rowSelection={rowSelection}
            dataSource={formDatas}
            // dataSource={[]}
            // columns={clone(sortColumns)}
            columns={columns}
            pagination={false}
            className="isoSortingTable"
            onChange={onChange}
            defaultCurrent={3}
          />
        </CardWrapper>
      </Box>
    </LayoutWrapper>
  );
}
