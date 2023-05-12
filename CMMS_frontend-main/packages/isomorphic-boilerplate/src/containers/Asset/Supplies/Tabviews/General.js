import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import Checkbox from '@iso/components/uielements/checkbox';
import EquipmentPartModal from '../../../../component/EquipmentPartModal';
import EquipmentLocatedModal from '../../../../component/EquipmentLocatedModal';
import AccountsModal from '../../../../component/AccountsModal';
import ChargeDepartmentModal from '../../../../component/ChargeDepartmentModal';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};
const formItemEquipment = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 0 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const formItemAccount = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};
const formItemCharge = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const formItemAddress = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 21 },
  },
};

const formItemCheckbox = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 1 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 23 },
  },
};
const formItem1 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  },
};
const colStyle = {
  marginBottom: '2px',
};
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
export default function (props) {
  const { asset, pageState } = props; 
  const [accountsModalActive, setAccountsModalActive] = React.useState(false);
  const [chargeDepartModalActive, setChargeDepartModalActive] = React.useState(
    false
  ); 
  const [strAccount, setStrAccount] = React.useState('');
  const [intAccountID, setIntAccountID] = React.useState('');
  const [strChargeDepartment, setStrChargeDepartment] = React.useState('');
  const [strAisle, setStrAisle] = React.useState('');
  const [strRow, setStrRow] = React.useState('');
  const [strBinNumber, setStrBinNumber] = React.useState('');
  const [strMake, setStrMake] = React.useState('');
  const [strModel, setStrModel] = React.useState('');
  const [strSerialNumber, setStrSerialNumber] = React.useState('');
  const [strBarcode, setStrBarcode] = React.useState('');
  const [strUnspcCode, setStrUnspcCode] = React.useState('');
  const [strNotes, setStrNotes] = React.useState('');

  const [strInventoryCode, setStrInventoryCode]=React.useState('');
  const [dblLastPrice,setDblLastPrice]=React.useState(null);

  const handleCancel = () => {  
    setAccountsModalActive(false);
    setChargeDepartModalActive(false);
  }; 

  const selectedAccount = (row) => {
    setStrAccount('(' + row.strCode + ')' + row.strDescription);
    setIntAccountID(row._id);
    props.selectedAccount(row);
  };
  const selectedChargeDepart = (row) => {
    props.selectedChargeDepartment(row);
    setStrChargeDepartment('(' + row.strCode + ')' + row.strDescription);
  };
 
  React.useEffect(() => {
    var generalInf = {};
    generalInf.strAisle = strAisle;
    generalInf.strRow = strRow;
    generalInf.strBinNumber = strBinNumber;

    generalInf.strMake = strMake;
    generalInf.strModel = strModel;
    generalInf.strSerialNumber = strSerialNumber;
    generalInf.strBarcode = strBarcode;
    generalInf.strUnspcCode = strUnspcCode;
    generalInf.strNotes = strNotes;
    generalInf.strInventoryCode = strInventoryCode;
    generalInf.dblLastPrice = dblLastPrice;
    props.generalInf(generalInf);
  }, [strMake, strModel, strSerialNumber, strBarcode, strUnspcCode, strNotes, strInventoryCode, dblLastPrice]);
 
  React.useEffect(() => {
    if (pageState == 'edit') {
      if (Object.keys(asset).length === 0) return;
      // setStrAisle(asset.asset.strAisle);
      // setStrRow(asset.asset.strRow);
      // setStrBinNumber(asset.asset.strBinNumber);
      setStrNotes(asset.asset.strNotes);
      setStrMake(asset.asset.strMake);
      setStrModel(asset.asset.strModel);
      setStrSerialNumber(asset.asset.strSerialNumber);
      setStrBarcode(asset.asset.strBarcode);
      setStrUnspcCode(asset.asset.strUnspcCode);
      setStrInventoryCode(asset.asset.strInventoryCode);
      setDblLastPrice(asset.asset.dblLastPrice);
      if (Object.keys(asset.account).length !== 0)
        setStrAccount(
          '(' + asset.account.strCode + ')' + asset.account.strDescription
        );
      if (Object.keys(asset.chargeDepartment).length !== 0)
        setStrChargeDepartment(
          '(' +
            asset.chargeDepartment.strCode +
            ')' +
            asset.chargeDepartment.strDescription
        );     
    }
  }, [asset]);
  return (
    <div className="PageContent">
      <InputGroup size="large" style={{ marginBottom: '15px' }}>
       
        <Row
          style={rowStyle}
          gutter={16}
          style={{
            background: '#e8edf0',
            padding: '5px 0 3px 10px',
            marginBottom: '15px',
          }}
        >
          <Col md={24} sm={24} xs={24}>
            <div style={{ color: '#738796' }}>General Information</div>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={6} sm={6} xs={24}>
            <Form>
              <FormItem {...formItemAccount} label="Account">
                <Input
                  placeholder="Account"
                  value={strAccount}
                  onChange={() => {
                    setAccountsModalActive(true);
                  }}
                />
              </FormItem>
            </Form>
          </Col>
          <Col md={1} sm={1} xs={1} style={{ paddingLeft: '0px' }}>
            <i
              className="ionicons ion-arrow-down-b"
              onClick={() => {
                setAccountsModalActive(true);
              }}
              style={{ fontSize: '25px', cursor: 'pointer' }}
            ></i>
          </Col>

          <Col md={8} sm={8} xs={24} >
            <Form>
              <FormItem {...formItemCharge} label="Charge Department">
                <Input
                  placeholder="Charge Department"
                  value={strChargeDepartment}
                  onChange={() => {
                    setChargeDepartModalActive(true);
                  }}
                />
              </FormItem>
            </Form>
          </Col>
          <Col md={1} sm={1} xs={1} style={{ paddingLeft: '0px' }}>
            <i
              className="ionicons ion-arrow-down-b"
              onClick={() => {
                setChargeDepartModalActive(true);
              }}
              style={{ fontSize: '25px', cursor: 'pointer' }}
            ></i>
          </Col>
        </Row>
        
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={24}>
            <label>Notes</label>
            <Textarea
              placeholder="Notes"
              value={strNotes}
              onChange={(event) => {
                setStrNotes(event.target.value);
              }}             
              style={{ height: 'auto' }}
              rows={13}
            />
          </Col>
          <Col md={8} sm={8} xs={24}>
            <div>
              <label>Make</label>
              <Input
                placeholder=""
                value={strMake}
                onChange={(event) => {
                  setStrMake(event.target.value);
                }}               
                style={{ marginBottom: '15px' }}
              />
            </div>
            <div>
              <label>Model</label>
              <Input
                placeholder=""
                value={strModel}
                onChange={(event) => {
                  setStrModel(event.target.value);
                }}               
                style={{ marginBottom: '15px' }}
              />
            </div>
            <div>
              <label>Inventory Code</label>
              <Input
                placeholder=""
                value={strInventoryCode}
                onChange={(event) => {
                  setStrInventoryCode(event.target.value);
                }}
               
                style={{ marginBottom: '15px' }}
              />
            </div>
            <div>
              <label>Barcode</label>
              <Input
                placeholder=""
                value={strBarcode}
                onChange={(event) => {
                  setStrBarcode(event.target.value);
                }}              
                style={{ marginBottom: '15px' }}
              />
            </div>
            <div>
              <label>Unspc Code</label>
              <Input
                placeholder=""
                value={strUnspcCode}
                onChange={(event) => {
                  setStrUnspcCode(event.target.value);
                }}
               
                style={{ marginBottom: '15px' }}
              />
            </div>
            <div>
              <label>Last Price</label>
              <Input
                placeholder=""
                value={dblLastPrice}
                onChange={(event) => {
                  setDblLastPrice(event.target.value);
                }}                
                style={{ marginBottom: '15px' }}
              />
            </div>
          </Col>
        </Row>
      </InputGroup>
      {/* customize modal start */}   
  
      <AccountsModal
        visible={accountsModalActive}
        onCancel={handleCancel}
        title="ACCOUNTS"
        selectedAccount={selectedAccount}
      ></AccountsModal>
      <ChargeDepartmentModal
        visible={chargeDepartModalActive}
        onCancel={handleCancel}
        title="CHARGE DEPARTMENTS"
        selectedChargeDepart={selectedChargeDepart}
        // okText={article.key ? 'Update Article' : 'Add Article'}
        // onOk={() => handleRecord('insert', article)}
      ></ChargeDepartmentModal>
      {/* customize modal end */}
    </div>
  );
}
