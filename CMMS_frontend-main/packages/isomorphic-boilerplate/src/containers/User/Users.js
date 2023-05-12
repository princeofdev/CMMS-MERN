import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
// import notification from '@iso/components/Notification';
import HelperText from '@iso/components/utility/helper-text';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Button from '@iso/components/uielements/button';
// import invoiceActions from '@iso/redux/invoice/actions';
import userActions from '../../redux/user/actions';
import userGroupActions from '../../redux/usergroup/actions';
import CardWrapper, { Box } from './User.styles';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import clone from 'clone';
import fakeData from './data';

const dataList = new fakeData(10);

const { initUserData } = userActions;
const { initData } = userGroupActions;
export default function Users() {
  // const [selected, setSelected] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 25,
  });

  const { users, isDeleteUser } = useSelector((state) => state.Users);
  const { usergroups } = useSelector((state) => state.UserGroup);
  const { groupName, setGroupName } = React.useState([]);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {
    dispatch(initUserData());
    dispatch(initData());
  }, []);

  React.useEffect(() => {
    setFiltered(users);
  }, [users]);
  //    React.useEffect(() => {
  //     if(Object.keys(usergroups).length !==0){
  //       var temp_array=[];
  //       for(let i = 0; i < usergroups.length; i++){

  //       }
  //     }
  //  }, [usergroups]);

  const columns = [
    {
      title: 'Email Address',
      dataIndex: 'strEmailAddress',
      key: 'strEmailAddress',
      width: '15%',
      render: (text, row) => {
        return <a href={`/dashboard/user/edit/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'Full Name',
      dataIndex: 'strFullName',
      key: 'strFullName',
      width: '15%',
      render: (text, row) => {
        return <a href={`/dashboard/user/edit/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'TelePhone',
      dataIndex: 'strTelephone',
      key: 'strTelephone',
      width: '15%',
      render: (text, row) => {
        return <a href={`/dashboard/user/edit/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'User Name',
      dataIndex: 'strUserName',
      key: 'strUserName',
      width: '15%',
      render: (text, row) => {
        return <a href={`/dashboard/user/edit/${row._id}`}>{text}</a>;
      },
    },
    {
      title: 'Groups',
      dataIndex: 'strUserName',
      key: 'strUserName',
      width: '15%',
      render: (text, row) => {
        var group_str = '';
        if (row.strGroupIds != undefined) {
          var temp_array = row.strGroupIds.split(',');
          for (var i = 0; i < temp_array.length; i++) {
            for (var k = 0; k < usergroups.length; k++) {
              if (temp_array[i] == usergroups[k].key) {
                group_str += usergroups[k].strFullName + ',';
              }
            }
          }
        }
        return <a href={`/dashboard/user/edit/${row._id}`}>{group_str}</a>;
      },
    },
  ];

  const sortColumns = [
    { ...columns[0], sorter: true },
    { ...columns[1], sorter: true },
    { ...columns[2], sorter: true },
    { ...columns[3], sorter: true },
    { ...columns[4], sorter: true },
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
      {/* <PageHeader>
        <IntlMessages id="sidebar.Users" />
      </PageHeader> */}
      <Box>
        <div className="isoInvoiceTableBtn">
          <Link to={`${match.path}/add`}>
            <Button type="primary" className="mateAddInvoiceBtn">
              Add User
            </Button>
          </Link>
        </div>

        <CardWrapper title="Users">
          {users.length === 0 ? (
            <HelperText text="No Users" />
          ) : (
            <div>
              <Scrollbars
                style={{ width: '100%', height: 'calc(100vh - 70px)' }}
              >
                <TableWrapper
                  // rowSelection={rowSelection}
                  dataSource={filtered}
                  columns={clone(sortColumns)}
                  onChange={onChange}
                  // pagination={true}
                  pagination={pagination}
                  className="isoSortingTable"
                />
              </Scrollbars>
            </div>
          )}
        </CardWrapper>
      </Box>
    </LayoutWrapper>
  );
}
