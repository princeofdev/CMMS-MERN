import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import Scrollbars from "@iso/components/utility/customScrollBar";
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Actions from '../redux/port/actions';
import { Col, Row } from "antd";
import clone from 'clone';
import fakeData from './data';
import './table.css'

const { getPortData } = Actions;
const dataList = new fakeData(10);
export default function (props) {
  const { visible, title, } = props;
  const dispatch = useDispatch();
  const { ports } = useSelector((state) => state.Port);
  const [filtered, setFiltered] = React.useState([]);

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: '5%',
    },
    {
      title: 'Port Name',
      dataIndex: 'strPortName',
      key: 'strPortName',
      width: '20%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Country Prefix',
      dataIndex: 'strCountryPrefix',
      key: 'strCountryPrefix',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Country Name',
      dataIndex: 'strCountryName',
      key: 'strCountryName',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'LOCODE',
      dataIndex: 'strLoCode',
      key: 'strLoCode',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'strName',
      key: 'strName',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'NameWoDiacritics',
      dataIndex: 'strNameWoDiacritics',
      key: 'strNameWoDiacritics',
      width: '15%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'SubDiv',
      dataIndex: 'strSubDiv',
      key: 'strSubDiv',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Function',
      dataIndex: 'strFunction',
      key: 'strFunction',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'strStatus',
      key: 'strStatus',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },

    {
      title: 'Date',
      dataIndex: 'strDate',
      key: 'strDate',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'IATA',
      dataIndex: 'strIATA',
      key: 'strIATA',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Coordinates',
      dataIndex: 'strCoordinates',
      key: 'strCoordinates',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Remarks',
      dataIndex: 'strRemarks',
      key: 'strRemarks',
      width: '10%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
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
    { ...columns[6], sorter: true },
    { ...columns[7], sorter: true },
    { ...columns[8], sorter: true },
    { ...columns[9], sorter: true },
    { ...columns[10], sorter: true },
    { ...columns[11], sorter: true },
    { ...columns[12], sorter: true },
    { ...columns[13], sorter: true }
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

  React.useEffect(() => {
    setFiltered(ports);
  }, [ports]);

  React.useEffect(() => {
    dispatch(getPortData());
  }, [visible]);

  const goDetail = (row) => {
    props.onCancel();
    props.selectPort(row);
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      props.selectedAsset(record);
      props.onCancel();
    },
  };

  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        // okText="New"
        title={title}
        width={window.innerWidth - 200}
        // onOk={() =>{setNewModalActive(true)}}
        onCancel={props.onCancel}
        footer={null}
      >
        <div>
          {/* <Row style={rowStyle} gutter={16} justify="start">
          <Col md={20} sm={20} xs={24} >           
          </Col>
          <Col md={4} sm={4} xs={24}>
          <InputSearch
              value={strSearchVal}
              onChange={(event)=>goSearch(event)}
                placeholder="input search text"                      
                style={{ width: "100%" }}
              />
          </Col>
      </Row> */}
        </div>
        <div >

          <Scrollbars style={{ width: "100%", height: "30vh" }}>
            <TableWrapper
              // rowSelection={rowSelection}
              dataSource={filtered}
              columns={clone(sortColumns)}
              onChange={onChange}
              pagination={false}
              className="isoSortingTable"
            />
          </Scrollbars>
        </div>
      </Modal>
    </div>
  )
}