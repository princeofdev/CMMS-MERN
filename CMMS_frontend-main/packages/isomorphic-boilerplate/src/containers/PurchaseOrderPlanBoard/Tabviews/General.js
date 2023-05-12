import React, { useState } from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import moment from 'moment';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import Checkbox from '@iso/components/uielements/checkbox';
import DateTimePicker from 'react-datetime-picker';
import {
  Fieldset,
  // Form,
  Label,
  GeneralLine,
} from '../../Asset/Facility/OnlineContent.styles';
// import EquipmentPartModal from '../../../../component/EquipmentPartModal';
import AccountsModal from '../../../component/AccountsModal';
import ChargeDepartmentModal from '../../../component/ChargeDepartmentModal';

const FormItem = Form.Item;

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
const lineBar = {
  textAlign: 'left',
  height: '32px',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  background: '#e8edf0',
  padding: '5px 0 3px 10px',
  color: '#738796',
  /* font-family: arial; */
  marginBottom: 20,
  fontSize: '13px',
};
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginBottom: '20px',
};

export default function (props) {
  const { pageState, purchaseOrder } = props;
  const [strName, setStrName] = React.useState('');
  const [intChargeDepartmentID, setIntChargeDepartmentID] = React.useState(
    null
  );
  const [strChargeDepartmentName, setstrChargeDepartmentName] = React.useState(
    ''
  );
  const [
    chargeDepartmentModalActive,
    setChargeDepartmentModalActive,
  ] = React.useState(false);
  const [intAccountID, setIntAccountID] = React.useState(null);
  const [strAccountName, setStrAccountName] = React.useState('');
  const [accountModalActive, setAccountModalActive] = React.useState(false);
  const [strPurchaseCurrencyName, setStrPurchaseCurrencyName] = React.useState(
    ''
  );
  const [
    strPurchaseOrderReference,
    setStrPurchaseOrderReference,
  ] = React.useState('');

  const onSend = () => {
    var send = {};

    // props.onChange(send);
  };
  const handleCancel = () => {
    setChargeDepartmentModalActive(false);
    setAccountModalActive(false);
  };
  const selectedChargeDepart = (row) => {
    setstrChargeDepartmentName('(' + row.strCode + ')' + row.strDescription);
    setIntChargeDepartmentID(row._id);
  };
  const selectedAccount = (row) => {
    setStrAccountName('(' + row.strCode + ')' + row.strDescription);
    setIntAccountID(row._id);
  };
  const stateChange = () => {
    var generalInfo = {};
    generalInfo.intChargeDepartmentID = intChargeDepartmentID;
    generalInfo.intAccountID = intAccountID;
    generalInfo.strPurchaseCurrencyName = strPurchaseCurrencyName;
    generalInfo.strPurchaseOrderReference = strPurchaseOrderReference;
    props.generalInfo(generalInfo);
  };
  React.useEffect(() => {
    if (pageState == 'Edit' && purchaseOrder != undefined) {
      setStrAccountName(
        purchaseOrder.intAccountID
          ? '(' +
              purchaseOrder.intAccountID.strCode +
              ')' +
              purchaseOrder.intAccountID.strDescription
          : ''
      );
      setIntAccountID(
        purchaseOrder.intAccountID ? purchaseOrder.intAccountID._id : null
      );
      setstrChargeDepartmentName(
        purchaseOrder.intChargeDepartmentID
          ? '(' +
              purchaseOrder.intChargeDepartmentID.strCode +
              ')' +
              purchaseOrder.intChargeDepartmentID.strDescription
          : ''
      );
      setIntChargeDepartmentID(
        purchaseOrder.intChargeDepartmentID
          ? purchaseOrder.intChargeDepartmentID._id
          : null
      );
      setStrPurchaseCurrencyName(purchaseOrder.strPurchaseCurrencyName);
      setStrPurchaseOrderReference(purchaseOrder.strPurchaseOrderReference);
    }
  }, [pageState]);
  React.useEffect(() => {
    stateChange();
  }, [
    intChargeDepartmentID,
    intAccountID,
    strPurchaseCurrencyName,
    strPurchaseOrderReference,
  ]);
  return (
    <div className="PageContent">
      <div style={lineBar}>Cost Tracking</div>
      {/* <InputGroup size="large" style={{ marginBottom: "15px" }}>              */}

      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Account</Label>
              <div style={{ position: 'relative' }}>
                <Input
                  label="Account"
                  placeholder=""
                  value={strAccountName}
                  onChange={() => {
                    setAccountModalActive(true);
                  }}
                  style={{ width: '90%' }}
                />
                <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setAccountModalActive(true);
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
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label>Charge Department</Label>
              <div style={{ position: 'relative' }}>
                <Input
                  label="Account"
                  placeholder=""
                  value={strChargeDepartmentName}
                  onChange={() => {
                    setChargeDepartmentModalActive(true);
                  }}
                  style={{ width: '90%' }}
                />
                <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setChargeDepartmentModalActive(true);
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
        </Col>
      </Row>
      <div style={lineBar}>General</div>
      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Purchase Currency</Label>
              <Input
                label="Account"
                placeholder=""
                value={strPurchaseCurrencyName}
                onChange={(event) => {
                  setStrPurchaseCurrencyName(event.target.value);
                }}
                style={{ width: '90%' }}
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label>PO Reference Number</Label>
              <Input
                label="Account"
                placeholder=""
                value={strPurchaseOrderReference}
                onChange={(event) => {
                  setStrPurchaseOrderReference(event.target.value);
                }}
              />
            </Fieldset>
          </Form>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Created By</Label>
              <span>Pavel Kal</span>
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label>Date Created</Label>
              <span>
                {moment(new Date()).format('MMMM DD YYYY, h:mm:ss a')}
              </span>
            </Fieldset>
          </Form>
        </Col>
      </Row>
      {/* </InputGroup>      */}
      <ChargeDepartmentModal
        visible={chargeDepartmentModalActive}
        onCancel={handleCancel}
        title="CHARGE DEPARTMENTS"
        selectedChargeDepart={selectedChargeDepart}
      />
      <AccountsModal
        visible={accountModalActive}
        onCancel={handleCancel}
        title="ACCOUNTS"
        selectedAccount={selectedAccount}
      />
    </div>
  );
}
