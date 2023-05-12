import React from 'react';
// import TableWrapper from "../../../component/CrewTable/TableStyle";
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { Form } from 'antd';
import Button from '@iso/components/uielements/button';
import Modal from '@iso/components/Feedback/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
// import Scrollbars from "@iso/components/utility/customScrollBar";
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import addDoubleImg from "../../../assets/images/new-group-inner-list.png";
import newAddImg from '../../../assets/images/new-inner-list.png';
import { Fieldset, Label } from '../Asset.styles';
import Actions from '../../../redux/drillcategory/actions';
import clone from 'clone';
import fakeData from './data';

const dataList = new fakeData(10);

const FormItem = Form.Item;

const { add, initData, updateData, deleteData } = Actions;

export default function (props) {
  const [filtered, setFiltered] = React.useState([]);
  const dispatch = useDispatch();
  const { drillCategories } = useSelector((state) => state.DrillCategory);

  const [modalActive, setModalActive] = React.useState(false);
  const [pageStatus, setPageStatus] = React.useState('add');
  const [strDrillCategoryName, setStrDrillCategoryName] = React.useState('');
  const [strDescription, setStrDescription] = React.useState('');
  const [intDrillCategoryId, setIntDrillCategoryId] = React.useState(null);
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
    },
    {
      title: 'Drill Category',
      dataIndex: 'strDrillCategoryName',
      key: 'strDrillCategoryName',
      width: '30%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'strDescription',
      key: 'strDescription',
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
    var sendDate = {};
    sendDate.strDrillCategoryName = strDrillCategoryName;
    sendDate.strDescription = strDescription;
    if (pageStatus == 'add') dispatch(add(sendDate));
    else dispatch(updateData(sendDate, intDrillCategoryId));
  };

  React.useEffect(() => {
    dispatch(initData());
  }, []);

  React.useEffect(() => {
    setModalActive(false);
  }, [drillCategories]);

  React.useEffect(() => {
    setFiltered(drillCategories);
  }, [drillCategories]);

  const addItem = () => {
    setPageStatus('add');
    setModalActive(true);
    setStrDescription('');
    setStrDrillCategoryName('');
  };

  const goDetail = (row) => {
    setModalActive(true);
    setPageStatus('edit');
    setStrDrillCategoryName(row.strDrillCategoryName);
    setStrDescription(row.strDescription);
    setIntDrillCategoryId(row._id);
  };

  return (
    <div>
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
      <TableWrapper
        // rowSelection={rowSelection}
        dataSource={filtered}
        columns={clone(sortColumns)}
        pagination={false}
        onChange={onChange}
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
        title="DRILL CATEGORY"
        onOk={onSave}
        okText="Save"
        onCancel={() => {
          setModalActive(false);
        }}
      >
        <Form>
          <Fieldset>
            <Label>Drill Category Name</Label>
            <Input
              label="Drill Category Name"
              placeholder=""
              value={strDrillCategoryName}
              onChange={(event) => {
                setStrDrillCategoryName(event.target.value);
              }}
            />
          </Fieldset>
          <Fieldset>
            <Label>Description</Label>
            <Textarea
              label="Description"
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
