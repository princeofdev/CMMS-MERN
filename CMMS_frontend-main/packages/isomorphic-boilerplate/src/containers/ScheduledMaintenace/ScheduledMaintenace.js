import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
// import notification from '@iso/components/Notification';
// import HelperText from "@iso/components/utility/helper-text";
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import Button from '@iso/components/uielements/button';
import { Tooltip } from 'antd';
import Actions from '../../redux/scheduledmaintenance/actions';
import CardWrapper, { Box } from './Asset.styles';
import TableWrapper from '../../component/AntTables.styles';
import onlineImg from '../../assets/images/running-small.png';
import offlineImg from '../../assets/images/paused-small.png';
import clone from 'clone';
import fakeData from './data';

const dataList = new fakeData(10);

const { initSMData } = Actions;
const priority = {
  1: 'Hightest',
  2: 'High',
  3: 'Medium',
  4: 'Low',
  5: 'Lowest',
};
// const workorderStatus_array={
//   2:"Requested",3:"Assigned",4:"Open",
//   5:"Work In Progress",
//   6:"On Hold",
//   7:"Closed, Completed",
//   8:"Draft",
//   9:"Closed, Incomplete",
//   10:"Other"
// }
const maintanceType_array = {
  1: 'Preventive',
  2: 'Damage',
  3: 'Corrective',
  4: 'Safety',
  5: 'Upgrade',
  6: 'Electrical',
  7: 'Project',
  8: 'Inspection',
  9: 'Meter_Reading',
  10: 'Other',
};
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

export default function ScheduledMaintenace() {
  const [selected, setSelected] = React.useState([]);
  const { isDelete, scheduledmaintenances } = useSelector(
    (state) => state.ScheduledMaintenance
  );
  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 25,
  });
  const [filtered, setFiltered] = React.useState([]);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {
    dispatch(initSMData());
  }, []);

  React.useEffect(() => {
    if (isDelete) {
      dispatch(initSMData());
    }
  }, [isDelete]);

  // React.useEffect(() => {
  // console.log(scheduledmaintenances,'scheduledmaintenances');
  // }, [scheduledmaintenances]);

  const columns = [
    {
      title: 'SM Status',
      dataIndex: 'intScheduledMaintenanceStatusID',
      key: 'intScheduledMaintenanceStatusID',
      width: '10%',

      render: (text, row) => {
        let statueImg;
        if (text === 1) {
          statueImg = onlineImg;
        } else {
          statueImg = offlineImg;
        }
        return (
          <img style={{ width: '16px', height: '10px' }} src={statueImg}></img>
        );
      },
    },
    {
      title: 'Code',
      dataIndex: 'strCode',
      key: 'strCode',
      width: '10%',
      render: (text, row) => {
        return (
          <a href={`/dashboard/scheduledmaintenance/${row._id}`}>{text}</a>
        );
      },
    },

    {
      title: 'Priority',
      dataIndex: 'intPriorityID',
      key: 'intPriorityId',
      width: '12%',
      render: (text, row) => {
        return (
          <a href={`/dashboard/scheduledmaintenance/${row._id}`}>
            {priority[text]}
          </a>
        );
      },
    },
    {
      title: 'Assets',
      dataIndex: 'strAssets',
      key: 'strAssets',
      ellipsis: {
        showTitle: false,
      },
      width: '25%',
      render: (text, row) => {
        return (
          <a href={`/dashboard/scheduledmaintenance/${row._id}`}>
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          </a>
        );
      },
    },
    {
      title: 'Assigned Users',
      dataIndex: 'intAssignedToUserID',
      key: 'intAssignedToUserId',
      width: '15%',
      render: (text, row) => {
        let fullName = '';
        if (
          row.intAssignedToUserID != undefined &&
          row.intAssignedToUserID != null
        ) {
          fullName = row.intAssignedToUserID.strFullName;
        }
        return (
          <a href={`/dashboard/scheduledmaintenance/${row._id}`}>{fullName}</a>
        );
      },
    },
    {
      title: 'Time Estimated Hours',
      dataIndex: 'dblTimeEstimatedHours',
      key: 'dblTimeEstimatedHour',
      width: '15%',
      render: (text, row) => {
        return (
          <a href={`/dashboard/scheduledmaintenance/${row._id}`}>{text}</a>
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'intMaintenanceTypeID',
      key: 'intMaintenanceTypeId',
      width: '10%',
      render: (text, row) => (
        <div style={{ width: '100%', color: maintanceType_color_array[text] }}>
          {maintanceType_array[text]}
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'strDescription',
      key: 'strDescription',
      width: '15%',
      ellipsis: {
        showTitle: false,
      },
      render: (text, row) => {
        return (
          <a href={`/dashboard/scheduledmaintenance/${row._id}`}>
            <Tooltip placement="topLeft" title={text}>
              {text}
            </Tooltip>
          </a>
        );
      },
    },
  ];
  const sortColumns = [
    { ...columns[0], sorter: false },
    { ...columns[1], sorter: true },
    { ...columns[2], sorter: true },
    { ...columns[3], sorter: true },
    { ...columns[4], sorter: true },
    { ...columns[5], sorter: true },
    { ...columns[6], sorter: true },
    { ...columns[7], sorter: true },
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

  useEffect(() => {
    let temp = [];
    scheduledmaintenances.map((data) => {
      temp.push(data);
    });
    setFiltered(temp);
  }, [scheduledmaintenances]);

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="header.ScheduledMaintenanceList" />
      </PageHeader>
      <Box>
        <div className="isoInvoiceTableBtn">
          <Link to={`${match.path}/add`}>
            <Button type="primary" className="mateAddInvoiceBtn">
              New
            </Button>
          </Link>
        </div>

        {/* <CardWrapper title="Assets">
          <Scrollbars style={{ width: "100%", height: "calc(80vh - 70px)" }}> */}
        <TableWrapper
          // rowSelection={rowSelection}
          dataSource={filtered}
          columns={clone(sortColumns)}
          // pagination={true}
          defaultCurrent={3}
          pagination={pagination}
          onChange={onChange}
          className="isoSortingTable"
        />
        {/* </Scrollbars>
        </CardWrapper> */}
      </Box>
    </LayoutWrapper>
  );
}
