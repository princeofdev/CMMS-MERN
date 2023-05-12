import React from 'react';
// import TableWrapper from '../../../component/CrewTable/TableStyle';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { Form } from 'antd';
import Button from '@iso/components/uielements/button';
import Modal from '@iso/components/Feedback/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import newAddImg from '../../../assets/images/new-inner-list.png';
import { Fieldset, Label } from '../Asset.styles';
import Actions from '../../../redux/currency/actions';
import clone from 'clone';
import fakeData from './data';
const dataList = new fakeData(10);
const FormItem = Form.Item;
const { addCurrency, getCurrencyData, updateData, deleteData } = Actions;
export default function (props) {
  const [filtered, setFiltered] = React.useState([]);
  const dispatch = useDispatch();
  const { currencies } = useSelector((state) => state.Currency);
  const [modalActive, setModalActive] = React.useState(false);
  const [pageStatus, setPageStatus] = React.useState('add');
  const [strCurrency, setStrCurrency] = React.useState('');
  const [strName, setStrName] = React.useState('');
  const [strISOCode, setStrISOCode] = React.useState('');
  const [intCurrencyId, setIntCurrencyId] = React.useState(null);
  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 25,
  });

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
    },
    {
      title: 'Currency',
      dataIndex: 'strCurrency',
      key: 'strCurrency',
      width: '15%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'strName',
      key: 'strName',
      width: '30%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'ISO Code',
      dataIndex: 'strISOCode',
      key: 'strISOCode',
      width: '35%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '10%',
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
    { ...columns[2], sorter: true },
    { ...columns[3], sorter: true },
    { ...columns[4], sorter: false },
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

  const onSave = () => {
    var sendDate = {};
    sendDate.strCurrency = strCurrency;
    sendDate.strName = strName;
    sendDate.strISOCode = strISOCode;
    if (pageStatus == 'add') dispatch(addCurrency(sendDate));
    else dispatch(updateData(sendDate, intCurrencyId));
  };

  React.useEffect(() => {
    dispatch(getCurrencyData());
  }, []);

  React.useEffect(() => {
    setFiltered(currencies);
    setModalActive(false);
  }, [currencies]);

  const addItem = () => {
    setPageStatus('add');
    setModalActive(true);
    setIntCurrencyId(null);
    setStrCurrency('');
    setStrName('');
    setStrISOCode('');
  };

  const goDetail = (row) => {
    setModalActive(true);
    setPageStatus('edit');
    setIntCurrencyId(row._id);
    setStrCurrency(row.strCurrency);
    setStrName(row.strName);
    setStrISOCode(row.strISOCode);
  };

  return (
    <div className="isoInvoiceTable">
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
      <TableWrapper
        // rowSelection={rowSelection}
        dataSource={filtered}
        columns={clone(sortColumns)}
        pagination={pagination}
        onChange={onChange}
        pagination={false}
        className="isoSortingTable"
      />
      {/* </Scrollbars> */}
      <div
        style={{
          color: 'rgb(102, 115, 136)',
          fontSize: '10pt',
          background: '#f7f7f7',
          border: '1px solid rgb(241, 243, 246)',
          height: '25px',
          marginTop: '40px',
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
            onClick={() => {
              addItem();
            }}
          ></img>
        </span>
      </div>

      <Modal
        visible={modalActive}
        title="Currency"
        onOk={onSave}
        okText="Save"
        onCancel={() => {
          setModalActive(false);
        }}
      >
        <Form>
          <Fieldset>
            <Label>Currency</Label>
            <Input
              placeholder=""
              value={strCurrency}
              onChange={(event) => {
                setStrCurrency(event.target.value);
              }}
            />
          </Fieldset>
          <Fieldset>
            <Label>Name</Label>
            <Input
              placeholder=""
              value={strName}
              onChange={(event) => {
                setStrName(event.target.value);
              }}
            />
          </Fieldset>
          <Fieldset>
            <Label>ISO Code</Label>
            <Input
              placeholder=""
              value={strISOCode}
              onChange={(event) => {
                setStrISOCode(event.target.value);
              }}
            />
          </Fieldset>
        </Form>
      </Modal>
    </div>
  );
}
