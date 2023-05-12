import React from 'react';
// import TableWrapper from "../../../component/CrewTable/TableStyle";
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { Form } from 'antd';
import Button from '@iso/components/uielements/button';
import Modal from '@iso/components/Feedback/Modal';
import notification from '@iso/components/Notification';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea } from '@iso/components/uielements/input';
import newAddImg from '../../../assets/images/new-inner-list.png';
import { Fieldset, Label } from '../Asset.styles';
import Actions from '../../../redux/itemtype/actions';
import CodeTypeActions from '../../../redux/codetype/actions';
import clone from 'clone';
import fakeData from './data';

const dataList = new fakeData(10);


const Option = SelectOption;
const { add, initItemData, updateData, deleteData } = Actions;
const { initCodeData } = CodeTypeActions;

export default function (props) {
  const dispatch = useDispatch();
  const [filtered, setFiltered] = React.useState([]);

  const { itemTypes } = useSelector((state) => state.ItemType);
  const { codeTypes } = useSelector((state) => state.CodeType);

  const [modalActive, setModalActive] = React.useState(false);
  const [pageStatus, setPageStatus] = React.useState('add');
  const [strItem, setStrItem] = React.useState('');
  const [strDescription, setStrDescription] = React.useState('');
  const [intItemTypeId, setIntItemTypeId] = React.useState(null);
  const [intCodeTypeId, setIntCodeTypeId] = React.useState(null);

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
    },
    {
      title: 'Item(NUMBER)',
      dataIndex: 'strItem',
      key: 'strItem',
      width: '30%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Code Type',
      dataIndex: 'strCode',
      key: 'strCode',
      width: '20%',
      render: (text, row) => {
        return (
          <a onClick={() => goDetail(row)}>
            {row.intCodeTypeId == undefined ? '' : row.intCodeTypeId.strCode}
          </a>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'strDescription',
      key: 'strDescription',
      width: '30%',
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
  };

  const onSave = () => {
    if (intCodeTypeId == null) {
      notification('info', 'Please select a Code Type.');
      return;
    }

    var sendDate = {};
    sendDate.strItem = strItem;
    sendDate.strDescription = strDescription;
    sendDate.intCodeTypeId = intCodeTypeId;
    if (pageStatus == 'add') dispatch(add(sendDate));
    else dispatch(updateData(sendDate, intItemTypeId));
  };

  React.useEffect(() => {
    dispatch(initItemData());
    dispatch(initCodeData());
  }, []);

  React.useEffect(() => {
    setModalActive(false);
    console.log(itemTypes, 'itemTypes');
  }, [itemTypes]);

  React.useEffect(() => {
    setFiltered(itemTypes);
  }, [itemTypes]);

  const addItem = () => {
    setPageStatus('add');
    setModalActive(true);
    setStrDescription('');
    setStrItem('');
    setIntCodeTypeId(null);
  };

  const goDetail = (row) => {
    setModalActive(true);
    setPageStatus('edit');
    setStrItem(row.strItem);
    setStrDescription(row.strDescription);
    setIntItemTypeId(row._id);
    setIntCodeTypeId(
      row.intCodeTypeId == undefined ? null : row.intCodeTypeId._id
    );
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
        title="ITEM"
        onOk={onSave}
        okText="Save"
        onCancel={() => {
          setModalActive(false);
        }}
      >
        <Form>
          <Fieldset>
            <Label>Code Type</Label>
            <Select
              defaultValue={3}
              value={intCodeTypeId}
              onChange={(value) => {
                setIntCodeTypeId(value);
              }}
            >
              {codeTypes.map((row) => {
                return (
                  <Option key={row._id} value={row._id}>
                    {row.strCode}
                  </Option>
                );
              })}
            </Select>
          </Fieldset>
          <Fieldset>
            <Label>Item Name</Label>
            <Input
              placeholder="Item (NUMBER)"
              value={strItem}
              onChange={(event) => {
                setStrItem(event.target.value);
              }}
            />
          </Fieldset>
          <Fieldset>
            <Label>Description</Label>
            <Textarea
              placeholder=""
              rows={3}
              value={strDescription}
              onChange={(event) => {
                setStrDescription(event.target.value);
              }}
            />
          </Fieldset>
        </Form>
      </Modal>
    </div>
  );
}
