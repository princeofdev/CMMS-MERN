import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
// import notification from '@iso/components/Notification';
// import Input, { InputSearch } from '@iso/components/uielements/input';
// import HelperText from "@iso/components/utility/helper-text";
// import Select, { SelectOption } from '@iso/components/uielements/select';
import { Tooltip } from 'antd';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
// import Scrollbars from "@iso/components/utility/customScrollBar";
import Button from '@iso/components/uielements/button';
import { Col, Row } from 'antd';
import clone from 'clone';
import EntriesCrewAction from '../../redux/EntriesVessel/actions';
// import userAction from "../../redux/user/actions";
import CardWrapper, { Box } from './Asset.styles';
import TableWrapper from '../../component/AntTables.styles';
import sortFunction from './data';
const dataList = new sortFunction();

const { getEntriesData } = EntriesCrewAction;
// const {getAllUserData}=userAction;

const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  paddingBottom: '10px',
  // borderBottom: "1px solid rgb(174,193,208)"
};
// const Option = SelectOption;

export default function Audits() {
  const [filtered, setFiltered] = React.useState([]);
  let history = useHistory();
  const { entriesLists } = useSelector((state) => state.EntriesVessel);
  const { users } = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 25,
  });
  React.useEffect(() => {
    dispatch(getEntriesData());
  }, []);

  React.useEffect(() => {
    setFiltered(entriesLists);
    // console.log(entriesLists,'ll')
  }, [entriesLists]);

  const goDetail = (id) => {
    history.push(`/dashboard/entries_vessel/edit/${id}`);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
      // render: (text, row) => <span>{row.key}</span>,
      render: (text, row) => {
        return <a onClick={() => goDetail(row._id)}>{row._id}</a>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      width: '25%',
      render: (text, row) => {
        return (
          <a onClick={() => goDetail(row._id)}>
            {moment(text).format('YYYY-MM-DD')}
          </a>
        );
      },
    },
    {
      title: 'Date Revised',
      dataIndex: 'revisedDate',
      key: 'revisedDate',
      ellipsis: {
        showTitle: false,
      },
      width: '25%',
      render: (text, row) => {
        var revisedDate = text == undefined ? null : '';
        return (
          <a onClick={() => goDetail(row._id)}>
            {text != null ? moment(text).format('YYYY-MM-DD') : ''}
          </a>
        );
      },
    },
    {
      title: 'Date printed',
      dataIndex: 'printedDate',
      key: 'printedDate',
      width: '25%',
      ellipsis: {
        showTitle: false,
      },
      render: (text, row) => {
        let printedDate = text == undefined ? null : text;
        return (
          <a onClick={() => goDetail(row._id)}>
            {printedDate != null
              ? moment(printedDate).format('YYYY-MM-DD HH:mm:ss')
              : ''}
          </a>
        );
      },
    },
    {
      title: 'Status ',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      width: '15%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row._id)}>{text}</a>;
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
    setPagination(pagination);
  };

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.entriesVesselOperation" />
      </PageHeader>
      <Box>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={12}></Col>
          <Col md={12} sm={12} xs={24}></Col>
          <Col md={4} sm={4} xs={12}>
            {/* <Link to={`${match.path}/add`}>
              <Button type="primary" className="mateAddInvoiceBtn">
                New
              </Button>
            </Link> */}
          </Col>
        </Row>
        <TableWrapper
          dataSource={filtered}
          // dataSource={entriesLists}
          // columns={columns}
          columns={clone(sortColumns)}
          pagination={true}
          pagination={{ pageSize: 10 }}
          // columns={columns}
          onChange={onChange}
          pagination={pagination}
          className="isoSortingTable"
        />
      </Box>
    </LayoutWrapper>
  );
}
