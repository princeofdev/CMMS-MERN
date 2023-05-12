import React from 'react';
// import TableWrapper from '../../../component/CrewTable/TableStyle';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { Form } from 'antd';
import Button from '@iso/components/uielements/button';
import Modal from '@iso/components/Feedback/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import notification from '@iso/components/Notification';
import newAddImg from '../../../assets/images/new-inner-list.png';
import { Fieldset, Label } from '../Asset.styles';
import Actions from '../../../redux/country/actions';
import clone from 'clone';
import fakeData from './data';

const dataList = new fakeData(10);

const FormItem = Form.Item;

const { addCountry, getCountryData, updateData, deleteData } = Actions;
export default function (props) {
  const [filtered, setFiltered] = React.useState([]);

  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.Country);

  const [modalActive, setModalActive] = React.useState(false);
  const [pageStatus, setPageStatus] = React.useState('add');
  const [strLoCode, setStrLoCode] = React.useState('');
  const [strCountryName, setStrCountryName]=React.useState('');
  const [intCountryId, setIntCountryId]=React.useState(null);

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
    },
    {
      title: 'ISO 3166-1',
      dataIndex: 'strLoCode',
      key: 'strLoCode',
      width: '30%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Country Name',
      dataIndex: 'strCountryName',
      key: 'strCountryName',
      width: '50%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '50%',
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
    { ...columns[3], sorter: false },
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

  const onSave = () => {
    if (strLoCode == '' ){
      notification('error', 'Please put the Country Prefix');
      return;
    }
    if (strCountryName ==''){
      notification('error', 'Please put the Country Name');
      return;
    }
    var sendDate = {};
    sendDate.strLoCode = strLoCode;
    sendDate.strCountryName = strCountryName;  
  if (pageStatus == 'add')
     dispatch(addCountry(sendDate));
    else dispatch(updateData(sendDate, intCountryId));
  };

  React.useEffect(() => {
    dispatch(getCountryData());
  }, []);

  React.useEffect(() => {
    setModalActive(false);
    setFiltered(countries);
  }, [countries]);

  const addItem = () => {
    setPageStatus('add');
    setModalActive(true);
    setStrLoCode('');
    setStrCountryName('');
    setIntCountryId(null);
    
  };

  const goDetail = (row) => {
    setModalActive(true);
    setPageStatus('edit');   
    setStrLoCode(row.strLoCode);
    setStrCountryName(row.strCountryName);
    setIntCountryId(row._id);
    
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
        title="COUNTRY"
        onOk={onSave}
        okText="Save"
        onCancel={() => {
          setModalActive(false);
        }}
      >
        <Form>
          <Fieldset>
            <Label>ISO 3166-1	(Country Prefix)</Label>
            <Input
              placeholder="Country Prefix"
              value={strLoCode}
              onChange={(event) => {
                setStrLoCode(event.target.value);
              }}
            />
          </Fieldset>
          <Fieldset>
            <Label>Country Name</Label>
            <Input
              placeholder="Country Name"
              value={strCountryName}
              onChange={(event) => {
               setStrCountryName(event.target.value);
              }}
            />
          </Fieldset>
        </Form>
      </Modal>
    </div>
  );
}
