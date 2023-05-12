import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
// import notification from '@iso/components/Notification';
import Input, { InputSearch } from '@iso/components/uielements/input';
// import HelperText from "@iso/components/utility/helper-text";
// import Select, { SelectOption } from '@iso/components/uielements/select';
import { Tooltip } from 'antd';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
// import Scrollbars from "@iso/components/utility/customScrollBar";
import Button from '@iso/components/uielements/button';
import { Col, Row } from 'antd';
import moment from 'moment';
import Actions from '../../redux/auditreport/actions';
import userAction from '../../redux/user/actions';
import CardWrapper, { Box } from './Asset.styles';
import TableWrapper from '../../component/AntTables.styles';
import sortFunction from './data';
const dataList = new sortFunction();

const { initData } = Actions;
const { getAllUserData } = userAction;

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
  const { auditReports, isDelete } = useSelector((state) => state.AuditReport);
  const { users } = useSelector((state) => state.Users);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  React.useEffect(() => {
    dispatch(initData());
  }, []);
  React.useEffect(() => {
    if (isDelete) {
      dispatch(initData());
    }
  }, [isDelete]);
  React.useEffect(() => {
    // let tmp = audits.map((item, index) => {
    //   let res = item.aSmsAuditPlan;
    //   res._id = item._id;
    //   res.key = index;
    //   res.strCode = item.strCode;
    //   res.strStatus = item.strStatus;
    //   res.strDepartmentVessel = item.strDepartmentVessel;
    //   res.strAuditor = item.strAuditor;
    //   res.strAuditee = item.strAuditee;
    //   res.strTitle = item.strTitle;
    //   return res;
    // });
    // setFiltered(tmp);
  }, [auditReports]);

  const columns = [
    {
      title: 'NCR Number',
      dataIndex: '_id',
      key: '_id',
      width: '10%',
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {'AR#' + text}
          </a>
        );
      },
    },
    {
      title: 'Internal SMS Audit Report',
      dataIndex: 'strInternalSmsAuditReport',
      key: 'strInternalSmsAuditReport',
      ellipsis: {
        showTitle: true,
      },
      width: '25%',
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
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
      title: 'Date',
      dataIndex: 'aDate',
      key: 'aDate',
      width: '10%',
      ellipsis: {
        showTitle: false,
      },
      render: (text, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {text ? moment(text).format('YYYY-MM-DD') : ''}
          </a>
        );
      },
    },
    {
      title: 'Department/Vessel',
      dataIndex: 'intDepartmentVessel',
      key: 'intDepartmentVessel',
      width: '20%',
      render: (value, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {value ? value.strName : ''}
          </a>
        );
      },
    },
    {
      title: 'Auditor',
      dataIndex: 'intAuditor',
      key: 'intAuditor',
      width: '10%',
      ellipsis: {
        showTitle: false,
      },
      render: (value, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {value ? value.strFullName : ''}
          </a>
        );
      },
    },
    // {
    //   title: 'NCR/CAR No',
    //   dataIndex: 'strNCRCARNo',
    //   key: 'strNCRCARNo',
    //   width: '10%',
    //   render: (text, row) => {
    //     return { text };
    //   },
    // },
    {
      title: 'Auditor/Auditee',
      dataIndex: 'intAuditorAuditee',
      key: 'intAuditorAuditee',
      width: '10%',
      render: (value, row) => {
        return (
          <a
            onClick={() => {
              goDetail(row._id);
            }}
          >
            {value ? value.strFullName : ''}
          </a>
        );
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
  const goDetail = (id) => {
    history.push(`/dashboard/auditreport/edit/${id}`);
  };

  const onChange = (pagination, filters, sorter) => {
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey, filtered);
      } else {
        dataList.getSortDesc(sorter.columnKey, filtered);
      }
      setFiltered(filtered);
    }
  };
  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.AuditReport" />
      </PageHeader>
      <Box>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={12}></Col>
          <Col md={12} sm={12} xs={24}></Col>
          <Col md={4} sm={4} xs={12}>
            <Link to={`${match.path}/add`}>
              <Button type="primary" className="mateAddInvoiceBtn">
                New
              </Button>
            </Link>
          </Col>
        </Row>
        <TableWrapper
          dataSource={auditReports}
          // columns={clone(sortColumns)}
          columns={columns}
          pagination={false}
          // onChange={onChange}
          className="isoSortingTable"
        />
      </Box>
    </LayoutWrapper>
  );
}
