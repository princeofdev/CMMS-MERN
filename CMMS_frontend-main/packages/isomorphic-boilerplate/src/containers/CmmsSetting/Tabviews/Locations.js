import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import TableWrapper from '../../../component/CrewTable/TableStyle';
import Modal from '@iso/components/Feedback/Modal';
import { Form } from 'antd';
import { Fieldset, Label } from '../Asset.styles';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import LocationAction from '../../../redux/location/actions';

import newAddImg from '../../../assets/images/new-inner-list.png';
import clone from 'clone';
import fakeData from './data';
import { set } from 'nprogress';

const dataList = new fakeData(10);
const { initData, addLocation, deleteData, updateData } = LocationAction;
export default function (props) {
  const dispatch = useDispatch();
  const [filtered, setFiltered] = React.useState([]);
  const [modalActive, setModalActive] = React.useState(false);

  const [pageStatus, setPageStatus] = useState('add');
  const [strName, setStrName] = useState('');
  const [strDescription, setStrDescription] = useState('');
  const [intLocationId, setIntLocationId] = useState(null);
  // const { isSaved, isDelete } = useSelector((state) => state.Location);
  const { locations } = useSelector((state) => state.Location);

  const columns = [
    {
      title: 'Location Name',
      dataIndex: 'strName',
      key: 'strName',
      width: "50%",
      render: (text, row) => <a onClick={() => goDetail(row)}>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'strDescription',
      key: 'strDescription',
      width: "40%",
      render: (text, row) => <a onClick={() => goDetail(row)}>{text}</a>,
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',

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
  const goDetail = (row) => {
    setIntLocationId(row._id);
    setStrName(row.strName);
    setStrDescription(row.strDescription);
    setPageStatus("edit");
    setModalActive(true)
  };
  useEffect(() => {
    dispatch(initData());
  }, []);

  useEffect(() => {
    setFiltered(locations);
  }, [locations]);

  const onSave = () => {
    var sendDate = {};
    sendDate.strName = strName;
    sendDate.strDescription = strDescription;
  
    if (pageStatus == 'add') dispatch(addLocation(sendDate));
    else dispatch(updateData(sendDate, intLocationId));
    setModalActive(false);
  };

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
            onClick={() => { setModalActive(true); setStrName(""); setStrDescription(""); setPageStatus("add") }}
          ></img>
        </span>
      </div>
      <Modal
        visible={modalActive}
        title="LOCATION"
        onOk={onSave}
        okText="Save"
        onCancel={() => {
          setModalActive(false);
        }}
      >
        <Form>
          <Fieldset>
            <Label>Location Name</Label>
            <Input
              placeholder=""
              value={strName}
              onChange={(event) => {
                setStrName(event.target.value);
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
