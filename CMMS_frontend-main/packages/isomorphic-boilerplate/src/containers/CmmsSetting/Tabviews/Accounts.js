import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import TableWrapper from '../../../component/CrewTable/TableStyle';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import AccountsModal from '../../../component/AccountsModal';
import Button from '@iso/components/uielements/button';
import CmmsAccount from '../../../redux/cmmsaccount/actions';
import AccountAction from '../../../redux/account/actions';

import newAddImg from '../../../assets/images/new-inner-list.png';
import clone from 'clone';
import fakeData from './data';

const dataList = new fakeData(10);

const { addAccount, getAccount } = CmmsAccount;
const { initData, deleteData } = AccountAction;

export default function (props) {
  const dispatch = useDispatch();
  const [filtered, setFiltered] = React.useState([]);

  const [data, setData] = useState([]);
  const [accountsModalActive, setAccountsModalActive] = useState(false);

  const [strCode, setStrCode] = useState('');
  const [strDescription, setStrDescription] = useState('');
  const [cmmsAccountId, setCmmsAccountId] = useState();

  const { isSaved, isDelete } = useSelector((state) => state.CmmsAccount);

  const { accounts } = useSelector((state) => state.Account);

  const columns = [
    {
      title: 'Code',
      dataIndex: 'strCode',
      key: 'strCode',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'strDescription',
      key: 'strDescription',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      // width: "50%",
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
    { ...columns[2], sorter: false },
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
  };

  const handleCancel = () => {
    setAccountsModalActive(false);
  };

  const selectedAccount = (row) => {
    // let sendData = {
    //   strCode: row.strCode,
    //   strDescription: row.strDescription,
    // };
    // dispatch(addAccount(sendData));
  };

  useEffect(() => {
    dispatch(getAccount());
  }, [isSaved, isDelete]);

  useEffect(() => {
    dispatch(initData());
  }, []);

  useEffect(() => {
    setFiltered(accounts);
  }, [accounts]);

  return (
    <div className="isoInvoiceTable">
      <TableWrapper
        dataSource={filtered}
        columns={clone(sortColumns)}
        onChange={onChange}
        pagination={false}
        className="isoSortingTable"
      />
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
          <img
            src={newAddImg}
            onClick={() => setAccountsModalActive(true)}
          ></img>
        </span>
      </div>
      <AccountsModal
        visible={accountsModalActive}
        onCancel={handleCancel}
        title="ACCOUNTS"
        selectedAccount={selectedAccount}
      />
    </div>
  );
}
