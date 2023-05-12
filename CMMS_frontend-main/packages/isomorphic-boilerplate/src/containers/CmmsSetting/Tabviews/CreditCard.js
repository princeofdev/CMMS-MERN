import React from 'react';
// import TableWrapper from '../../../component/CrewTable/TableStyle';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { Form } from 'antd';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Button from '@iso/components/uielements/button';
import Modal from '@iso/components/Feedback/Modal';
import { DatePicker, Space, TimePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import newAddImg from '../../../assets/images/new-inner-list.png';
import { Fieldset, Label } from '../Asset.styles';
import Actions from '../../../redux/creditcard/actions';
import clone from 'clone';
import fakeData from './data';
import CurrencyModal from '../../../component/CurrencyModal';
import moment from 'moment';
import siteConfig from '@iso/config/site.config';
import axios from 'axios';
import FilesAction from '../../../redux/Files/actions';

const dataList = new fakeData(10);
const Option = SelectOption;

const FormItem = Form.Item;

const { add, getcreditcards, updateData, deleteData, createdId } = Actions;
const { getFilesByCreditCard } = FilesAction;
export default function (props) {
  const [filtered, setFiltered] = React.useState([]);
  // const scroll = { x: '90vw' };
  const dispatch = useDispatch();
  const [strFrontDescription, setStrFrontDescription] = React.useState('');
  const [strBackDescription, setStrBackDescription] = React.useState('');
  const [strSignatureDescription, setStrSignatureDescription] = React.useState(
    ''
  );
  const [currencyModalActive, setCurrencyModalActive] = React.useState(false);
  const { createdCreditCardId, creditCards } = useSelector(
    (state) => state.CreditCard
  );
  const [modalActive, setModalActive] = React.useState(false);
  const [pageStatus, setPageStatus] = React.useState('add');
  const [strCardType, setStrCardType] = React.useState('');
  const [strCurrency, setStrCurrency] = React.useState('');
  const [intCurrencyId, setIntCurrencyId] = React.useState('');
  const [intCreditCardId, setIntCreditCardId] = React.useState(null);
  const [strCardHolderName, setStrCardHoldName] = React.useState('');
  const [strCardNickName, setStrCardNickName] = React.useState('');
  const [intCardNumber, setintCardNumber] = React.useState('');
  const [strZipCode, setStrZipCode] = React.useState('');
  const [strCardImage, setStrCardImage] = React.useState('');
  const [dtmExpirationDate, setdtmExpirationDate] = React.useState(null);
  const [bolImageUploaded, setBolImageUploaded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const customRequest = async ({ onSuccess, onError, file, onProgress }) => {
    // if (!file.type.includes('image') && file.type !== 'application/pdf') {
    //   message.error(`${file.name} is not a image file`);
    //   return Upload.LIST_IGNORE
    // }
    // else if (  file.type !== 'application/pdf'){
    //   message.error(`${file.name} is not a image file`);
    //   return Upload.LIST_IGNORE
    // }

    const fmData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: localStorage.getItem('id_token'),
      },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        // setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append('file', file);
    fmData.append('strDescription', strFrontDescription);
    fmData.append('intCreditCardID', intCreditCardId);
    fmData.append('strCardImage', strCardImage);
    // fmData.append("intAssetID", intAssetId);
    // fmData.append("intPurchaseOrderID", intPurchaseOrderID);
    try {
      // dispatch(submitFile(fmData,config));
      // axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
      const res = await axios.post(
        `${siteConfig.apiUrl}/file/upload`,
        fmData,
        config
      );

      if (res.status == 200) {
        onSuccess('Ok');
        message.success(`File uploaded successfully`);
        setBolImageUploaded(true);
        // props.loadSuccess();
      } else {
        message.error(`File upload failed.`);
      }
      // onSuccess("Ok");
      // console.log("server res: ",res);
    } catch (err) {
      console.log('Eroor: ', err);
      message.error(`File upload failed.`);
      const error = new Error('Some error');
      onError({ err });
    }
  };
  const selectedCurrency = (row) => {
    setIntCurrencyId(row._id);
    setStrCurrency(row.strCurrency);
  };
  const onRowClick = (row) => {
    props.onCancel();
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'bolImageUploaded',
      key: 'bolImageUploaded',
      width: '2%',
      render: (text, row) => {
        return <input type="checkbox" checked={text} disabled />;
      },
    },
    {
      title: 'Card Type',
      dataIndex: 'strCardType',
      key: 'strCardType',
      width: '4%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      width: '4%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'CardNickName',
      dataIndex: 'strCardNickName',
      key: 'strCardNickName',
      width: '6%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'CardHolderName',
      dataIndex: 'strCardHolderName',
      key: 'strcardHolderName',
      width: '6%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'CardNumber',
      dataIndex: 'intCardNumber',
      key: 'intCardNumber',
      width: '5%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'ExpirationDate',
      dataIndex: 'dtmExpirationDate',
      key: 'dtmExpirationDate',
      width: '6%',
      render: (text, row) => {
        return (
          <a onClick={() => goDetail(row)}>
            {text ? moment(text).format('MMMM YYYY') : ''}
          </a>
        );
      },
    },
    {
      title: 'ZipCode',
      dataIndex: 'strZipCode',
      key: 'strZipCode',
      width: '5%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '1%',
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
    { ...columns[4], sorter: false },
    { ...columns[5], sorter: false },
    { ...columns[6], sorter: false },
    { ...columns[7], sorter: false },
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
  const onDate = (value, dateString) => {
    // console.log(moment(value).format('YYYY'));
    setdtmExpirationDate(dateString == '' ? null : dateString);
  };

  const onSave = () => {
    var sendDate = {};
    sendDate.strCardType = strCardType;
    sendDate.intCurrencyId = intCurrencyId;
    sendDate.strCardHolderName = strCardHolderName;
    sendDate.strCardNickName = strCardNickName;
    sendDate.intCardNumber = intCardNumber;
    sendDate.dtmExpirationDate = new Date(dtmExpirationDate);
    sendDate.strZipCode = strZipCode;
    sendDate.bolImageUploaded = bolImageUploaded;
    if (pageStatus == 'add') dispatch(add(sendDate));
    else dispatch(updateData(sendDate, intCreditCardId));
    setModalActive(false);
  };

  React.useEffect(() => {
    dispatch(getcreditcards());
  }, []);

  React.useEffect(() => {
    setModalActive(false);
  }, [creditCards]);
  React.useEffect(() => {
    dispatch(createdId());
  }, []);
  React.useEffect(() => {
    setFiltered(creditCards);
  }, [creditCards]);

  const addItem = () => {
    setPageStatus('add');
    setModalActive(true);
    setStrCurrency('');
    setStrCardType('');
    setIntCreditCardId(createdCreditCardId);
  };
  const goDetail = (row) => {
    setModalActive(true);
    setPageStatus('edit');
    setStrCardType(row.strCardType);
    setStrCurrency(row.currency);
    setStrCardHoldName(row.strCardHolderName);
    setStrCardNickName(row.strCardNickName);
    setintCardNumber(row.intCardNumber);
    setdtmExpirationDate(row.dtmExpirationDate);
    setStrZipCode(row.strZipCode);
    setIntCreditCardId(row._id);
  };

  return (
    <div className="isoInvoiceTable">
      <TableWrapper
        // rowSelection={rowSelection}
        dataSource={filtered}
        columns={clone(sortColumns)}
        onChange={onChange}
        pagination={false}
        className="isoSortingTable"
        // scroll={scroll}
      />
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
        title="CREDIT CARD"
        onOk={onSave}
        okText="Save"
        onCancel={() => {
          setModalActive(false);
        }}
      >
        <Form>
          <Fieldset>
            <Label>Card Type</Label>
            <Select
              style={{ width: '100%', textAlign: 'left' }}
              value={strCardType}
              onChange={(value) => {
                setStrCardType(value);
              }}
            >
              <Option value={'MasterCard'}>MasterCard</Option>
              <Option value={'VISA'}>VISA</Option>
              <Option value={'Discover'}>Discover</Option>
              <Option value={'AMEX'}>AMEX</Option>
            </Select>
          </Fieldset>
        </Form>
        <Form>
          <Fieldset>
            <Label>Currency</Label>
            <div style={{ position: 'relative' }}>
              <Input
                placeholder=""
                value={strCurrency}
                onChange={() => {
                  setCurrencyModalActive(true);
                }}
                style={{ width: '90%' }}
              />
              <i
                className="ionicons ion-arrow-down-b"
                onClick={() => {
                  setCurrencyModalActive(true);
                }}
                style={{
                  fontSize: '25px',
                  cursor: 'pointer',
                  position: 'absolute',
                  marginLeft: '5px',
                }}
              ></i>
            </div>
          </Fieldset>
        </Form>
        <Form>
          <Fieldset>
            <Label>CardNickName</Label>
            <div style={{ position: 'relative' }}>
              <Input
                placeholder=""
                value={strCardNickName}
                onChange={(event) => setStrCardNickName(event.target.value)}
                style={{ width: '90%' }}
              />
            </div>
          </Fieldset>
        </Form>
        <Form>
          <Fieldset>
            <Label>CardHoderName</Label>
            <div style={{ position: 'relative' }}>
              <Input
                placeholder=""
                value={strCardHolderName}
                onChange={(event) => setStrCardHoldName(event.target.value)}
                style={{ width: '90%' }}
              />
            </div>
          </Fieldset>
        </Form>
        <Form>
          <Fieldset>
            <Label>CardNumber</Label>
            <div style={{ position: 'relative' }}>
              <Input
                placeholder=""
                value={intCardNumber}
                onChange={(event) => setintCardNumber(event.target.value)}
                style={{ width: '90%' }}
              />
            </div>
          </Fieldset>
        </Form>
        <Form>
          <Fieldset>
            <Label>ExpirationDate</Label>
            <div style={{ position: 'relative' }}>
              <DatePicker
                value={
                  dtmExpirationDate != null
                    ? moment(dtmExpirationDate, 'YYYY-MM')
                    : ''
                }
                onChange={onDate}
                style={{ width: '90%' }}
              />
            </div>
          </Fieldset>
        </Form>
        <Form>
          <Fieldset>
            <Label>ZipCode</Label>
            <div style={{ position: 'relative' }}>
              <Input
                placeholder=""
                value={strZipCode}
                onChange={(event) => setStrZipCode(event.target.value)}
                style={{ width: '90%' }}
              />
            </div>
          </Fieldset>
        </Form>
        <Form>
          <Label>Front Image</Label>
          <Input
            label="Description"
            placeholder="Description"
            value={strFrontDescription}
            onChange={(event) => {
              setStrFrontDescription(event.target.value);
            }}
          />
          <Upload
            //  fileList={fileList}
            accept="image/*, application/pdf"
            //  onChange={onChange}
            //  beforeUpload={beforeUpload}
            defaultFileList={[]}
            //  fileList={[]}
            customRequest={customRequest}
          >
            <Button
              icon={<UploadOutlined />}
              style={{ marginTop: '10px' }}
              onClick={() => setStrCardImage('front')}
            >
              Click to Upload
            </Button>
          </Upload>
        </Form>
        <Form>
          <Label>Back Image</Label>
          <Input
            label="Description"
            placeholder="Description"
            value={strBackDescription}
            onChange={(event) => {
              setStrBackDescription(event.target.value);
            }}
          />
          <Upload
            //  fileList={fileList}
            accept="image/*, application/pdf"
            //  onChange={onChange}
            //  beforeUpload={beforeUpload}
            defaultFileList={[]}
            //  fileList={[]}
            customRequest={customRequest}
          >
            <Button
              icon={<UploadOutlined />}
              style={{ marginTop: '10px' }}
              onClick={() => setStrCardImage('back')}
            >
              Click to Upload
            </Button>
          </Upload>
        </Form>
        <Form>
          <Label>Signature</Label>
          <Input
            label="Description"
            placeholder="Description"
            value={strSignatureDescription}
            onChange={(event) => {
              setStrSignatureDescription(event.target.value);
            }}
          />
          <Upload
            //  fileList={fileList}
            accept="image/*, application/pdf"
            //  onChange={onChange}
            //  beforeUpload={beforeUpload}
            defaultFileList={[]}
            //  fileList={[]}
            customRequest={customRequest}
          >
            <Button
              icon={<UploadOutlined />}
              style={{ marginTop: '10px' }}
              onClick={() => setStrCardImage('signature')}
            >
              Click to Upload
            </Button>
          </Upload>
        </Form>
      </Modal>

      <CurrencyModal
        onCancel={() => setCurrencyModalActive(false)}
        title={'Currency'}
        selectedCurrency={selectedCurrency}
        visible={currencyModalActive}
        onRowClick={onRowClick}
      ></CurrencyModal>
    </div>
  );
}
