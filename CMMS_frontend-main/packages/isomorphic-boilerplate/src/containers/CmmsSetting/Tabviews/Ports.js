import React from 'react';
// import TableWrapper from '../../../component/CrewTable/TableStyle';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { Form } from 'antd';
import Button from '@iso/components/uielements/button';
import Modal from '@iso/components/Feedback/Modal';
import { Col, Row } from 'antd';
import notification from '@iso/components/Notification';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import newAddImg from '../../../assets/images/new-inner-list.png';
import { Fieldset, Label } from '../Asset.styles';
import Actions from '../../../redux/port/actions';
// import CountryAction from '../../../redux/country/actions';
import clone from 'clone';
import fakeData from './data';

const dataList = new fakeData(10);

const FormItem = Form.Item;
const Option = SelectOption;
const { addPort, getPortData, updateData, deleteData } = Actions;
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '5px',
};

// const { getCountryData} = CountryAction;
export default function (props) {
  const [filtered, setFiltered] = React.useState([]);

  const dispatch = useDispatch();
  const { ports } = useSelector((state) => state.Port);
  const [modalActive, setModalActive] = React.useState(false);
  const [pageStatus, setPageStatus] = React.useState('add');
  const [strCode, setStrCode] = React.useState('');
  const [strName, setStrName] = React.useState('');
  const [strDescription, setStrDescription] = React.useState('');
  const [intPortId, setIntPortId] = React.useState(null);
  const [intCountryId, setIntCountryId] = React.useState(null);

  const [strCountryPrefix, setStrCountryPrefix] = React.useState('');
  const [strCountryName, setStrCountryName] = React.useState('');
  const [strLoCode, setStrLoCode] = React.useState('');
  const [strNameWoDiacritics, setStrNameWoDiacritics] = React.useState('');
  const [strSubDiv, setStrSubDiv] = React.useState('');
  const [strFunction, setStrFunction] = React.useState('');
  const [strStatus, setStrStatus] = React.useState('');
  const [strDate, setStrDate] = React.useState('');
  const [strIATA, setStrIATA] = React.useState('');
  const [strCoordinates, setStrCoordinates] = React.useState('');
  const [strRemarks, setStrRemarks] = React.useState('');
  const [strPortName, setStrPortName]=React.useState('');


  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: '5%',
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
    { ...columns[4], sorter: true },
    { ...columns[5], sorter: true },
    { ...columns[6], sorter: true },
    { ...columns[7], sorter: true },
    { ...columns[8], sorter: true },
    { ...columns[9], sorter: true },
    { ...columns[10], sorter: true },
    { ...columns[11], sorter: true },
    { ...columns[12], sorter: true },
    { ...columns[13], sorter: true },
    { ...columns[14], sorter: false },
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
  
    if (strPortName == '') {
      notification('error', 'Please put the port name.');
      return;
    }

    var sendDate = {};
    sendDate.strName = strName;
    sendDate.strCountryPrefix = strCountryPrefix;
    sendDate.strCountryName = strCountryName;
    sendDate.strLoCode = strLoCode;
    sendDate.strNameWoDiacritics = strNameWoDiacritics;
    sendDate.strSubDiv = strSubDiv;
    sendDate.strFunction = strFunction;
    sendDate.strStatus = strStatus;
    sendDate.strDate = strDate;
    sendDate.strIATA = strIATA;
    sendDate.strCoordinates = strCoordinates;
    sendDate.strRemarks = strRemarks;
    sendDate.strPortName = strPortName;
 
    if (pageStatus == 'add') dispatch(addPort(sendDate));
    else dispatch(updateData(sendDate, intPortId));
  };

  React.useEffect(() => {
    dispatch(getPortData());   
  }, []);

  React.useEffect(() => {
    setModalActive(false);
    setFiltered(ports);
  }, [ports]);


  const addItem = () => {
    setPageStatus('add');
    setModalActive(true);
    setIntPortId(null);
    setStrName('');
    setStrCountryPrefix('');
    setStrCountryName('');
    setStrLoCode('');
    setStrNameWoDiacritics('');
    setStrSubDiv('');
    setStrFunction('');
    setStrStatus('');
    setStrDate('');
    setStrIATA('');
    setStrCoordinates('');
    setStrRemarks('');
    setStrPortName('');

  };

  const goDetail = (row) => {
    setModalActive(true);
    setPageStatus('edit'); 
    setIntPortId(row._id);
    setStrName(row.strName);
    setStrCountryPrefix(row.strCountryPrefix);
    setStrCountryName(row.strCountryName);
    setStrLoCode(row.strLoCode);
    setStrNameWoDiacritics(row.strNameWoDiacritics);
    setStrSubDiv(row.strSubDiv);
    setStrFunction(row.strFunction);
    setStrStatus(row.strStatus);
    setStrDate(row.strDate);
    setStrIATA(row.strIATA);
    setStrCoordinates(row.strCoordinates);
    setStrRemarks(row.strRemarks);
    setStrPortName(row.strPortName);  
   
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
        title="PORT"
        onOk={onSave}
        okText="Save"
        onCancel={() => {
          setModalActive(false);
        }}
      >

        <Form>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>ISO 3166-1 (Country Prefix)</Label>
                <Input
                  placeholder=""
                  value={strCountryPrefix}
                  onChange={(event) => {
                    setStrCountryPrefix(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Country Name</Label>
                <Input
                  placeholder=""
                  value={strCountryName}
                  onChange={(event) => {
                    setStrCountryName(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>LOCODE</Label>
                <Input
                  placeholder=""
                  value={strLoCode}
                  onChange={(event) => {
                    setStrLoCode(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
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
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>NameWoDiacritics</Label>
                <Input
                  placeholder=""
                  value={strNameWoDiacritics}
                  onChange={(event) => {
                    setStrNameWoDiacritics(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>SubDiv</Label>
                <Input
                  placeholder=""
                  value={strSubDiv}
                  onChange={(event) => {
                    setStrSubDiv(event.target.value);
                  }}
                />
              </Fieldset>
             </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Function</Label>
                <Input
                  placeholder=""
                  value={strFunction}
                  onChange={(event) => {
                   setStrFunction(event.target.value);
                  }}
                />
              </Fieldset>
             </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Status</Label>
                <Input
                  placeholder=""
                  value={strStatus}
                  onChange={(event) => {
                    setStrStatus(event.target.value);
                  }}
                />
              </Fieldset>
             </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Date</Label>
                <Input
                  placeholder=""
                  value={strDate}
                  onChange={(event) => {
                    setStrDate(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>IATA</Label>
                <Input
                  placeholder=""
                  value={strIATA}
                  onChange={(event) => {
                    setStrIATA(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Coordinates</Label>
                <Input
                  placeholder=""
                  value={strCoordinates}
                  onChange={(event) => {
                    setStrCoordinates(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Remarks</Label>
                <Input
                  placeholder=""
                  value={strRemarks}
                  onChange={(event) => {
                    setStrRemarks(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Port Name</Label>
                <Input
                  placeholder=""
                  value={strPortName}
                  onChange={(event) => {
                    setStrPortName(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
