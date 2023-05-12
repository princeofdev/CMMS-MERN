import React, { useState } from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import moment from 'moment';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import { useDispatch, useSelector } from 'react-redux';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import Checkbox from '@iso/components/uielements/checkbox';
// import DateTimePicker from 'react-datetime-picker';
import {
  Fieldset,
  // Form,
  Label,
  GeneralLine,
} from '../../Asset/Facility/OnlineContent.styles';
// import EquipmentPartModal from '../../../../component/EquipmentPartModal';
import AccountsModal from '../../../component/AccountsModal';
import ChargeDepartmentModal from '../../../component/ChargeDepartmentModal';
import UsersContentModal from '../../../component/UsersContentModal';
import PortLoadingModal from '../../../component/PortModal';
import PortDischageModal from '../../../component/PortModal';

import Actions from '../../../redux/currency/actions';
const { getCurrencyData, } = Actions;
const FormItem = Form.Item;
const Option = SelectOption;
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
  const dispatch = useDispatch();
  // const [strName, setStrName] = React.useState('');
  const { currencies } = useSelector((state) => state.Currency);
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

  const [strDispatchMethod, setStrDispatchMethod] = React.useState('');
  const [strShipmentType, setStrShipmentType] = React.useState('');
  const [strPortLoading, setStrPortLoading] = React.useState('');
  const [strPortDistance, setStrPortDistance] = React.useState('');
  const [strSignatoryCompany, setStrSignatoryCompany] = React.useState('');
  const [intSignatoryName, setIntSignatoryName] = React.useState(null);
  const [strSignatoryName, setStrSignatoryName] = React.useState('');
  const [userModalActive, setUserModalActive] = React.useState(false);
  const [strAdditionalInf, setStrAdditionalInf] = React.useState('');
  const [strPlaceDateIssue, setStrPlaceDateIssue] = React.useState('');
  const [createdUserName, setCreatedUserName] = React.useState(
    localStorage.getItem('user_name')
  );
  const [portLoadingModalActive, setPortLoadingModalActive] = React.useState(false);
  const [portDischargeModalActive, setPortDischargeModalActive] = React.useState(false);

  const handleCancel = () => {
    setChargeDepartmentModalActive(false);
    setAccountModalActive(false);
    setUserModalActive(false);
    setPortLoadingModalActive(false)
    setPortDischargeModalActive(false)
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
    generalInfo.strDispatchMethod = strDispatchMethod;
    generalInfo.strShipmentType = strShipmentType;
    generalInfo.strPortLoading = strPortLoading;
    generalInfo.strPortDistance = strPortDistance;
    generalInfo.strPlaceDateIssue = strPlaceDateIssue;
    generalInfo.strSignatoryCompany = strSignatoryCompany;
    generalInfo.intSignatoryName = intSignatoryName;
    generalInfo.strAdditionalInf = strAdditionalInf;
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

      setStrDispatchMethod(purchaseOrder.strDispatchMethod);
      setStrShipmentType(purchaseOrder.strShipmentType);
      setStrPortLoading(purchaseOrder.strPortLoading);
      setStrPortDistance(purchaseOrder.strPortDistance);
      setStrSignatoryCompany(purchaseOrder.strSignatoryCompany);
      setIntSignatoryName(
        purchaseOrder.intSignatoryName
          ? purchaseOrder.intSignatoryName._id
          : null
      );
      setStrSignatoryName(
        purchaseOrder.intSignatoryName
          ? purchaseOrder.intSignatoryName.strFullName
          : null
      );
      setStrAdditionalInf(purchaseOrder.strAdditionalInf);
      setStrPlaceDateIssue(purchaseOrder.strPlaceDateIssue);
      setCreatedUserName(
        purchaseOrder.intCreatedByUserID
          ? purchaseOrder.intCreatedByUserID.strFullName
          : createdUserName
      );
    }
  }, [pageState, purchaseOrder]);
  React.useEffect(() => {
    stateChange();
  }, [
    intChargeDepartmentID,
    intAccountID,
    strPurchaseCurrencyName,
    strPurchaseOrderReference,
    strDispatchMethod,
    strShipmentType,
    strPortLoading,
    strPortDistance,
    strSignatoryCompany,
    intSignatoryName,
    strAdditionalInf,
    strPlaceDateIssue,
  ]);

  const selectAssignedUser = (row) => {
    setStrSignatoryName(row.strFullName);
    setIntSignatoryName(row._id);
    setUserModalActive(false);

  }
  React.useEffect(() => {
    dispatch(getCurrencyData());
  }, []);
  const selectPortLoading=(row)=>{
    console.log(row);
    setStrPortLoading(row.strPortName);
  }
  const selectPortDischarge=(row)=>{
    setStrPortDistance(row.strPortName);
    console.log(row);
  }
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
              <Select
              value={strPurchaseCurrencyName}
              onChange={(value) => {
                setStrPurchaseCurrencyName(value);
              }}
              >
                {currencies.map((row) => {
                  return (
                    <Option key={row._id} value={row.strName}>
                      {row.strName}
                    </Option>
                  );
                })}
              </Select>
            </Fieldset>
          </Form>
        </Col>
        {/* <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
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
        </Col> */}
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Method of Dispatch</Label>
              {/* <Input
                label="Account"
                placeholder=""
                value={strDispatchMethod}
                onChange={(event) => {
                  setStrDispatchMethod(event.target.value);
                }}
                style={{ width: '90%' }}
              /> */}
              <Select
              value={strDispatchMethod}
              onChange={(value) => {
                setStrDispatchMethod(value);
              }}
              >
                <Option value={'Sea'}>Sea</Option>
                <Option value={'Air'}>Air</Option>
                <Option value={'Road'}>Road</Option>
                <Option value={'Rail'}>Rail</Option>

              </Select>
            </Fieldset>
          </Form>
        </Col>
        <Col md={8} sm={8} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Type of Shipment</Label>         
              <Select
              value={strShipmentType}
              onChange={(value) => {
                setStrShipmentType(value);
              }}
              >
                <Option value={'Sea  ... FCL'}>Sea  ... FCL</Option>
                <Option value={'LCL Break Bulk Road Type of Shipment FTL'}>LCL Break Bulk Road Type of Shipment FTL</Option>
                <Option value={'LTL Courier Types Overnight Air Second Day Air'}>LTL Courier Types Overnight Air Second Day Air</Option>
                <Option value={'Ground'}>Ground</Option>
                <Option value={'Local'}>Local</Option>

              </Select>
            </Fieldset>
          </Form>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={6} sm={6} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Port of Loading</Label>
              <div style={{ position: 'relative' }}>
              <Input
                placeholder=""
                value={strPortLoading}
                onChange={(event) => {
                  setPortLoadingModalActive(true);
                }}
                style={{ width: '90%' }}
              />
              <i
                className="ionicons ion-arrow-down-b"
                onClick={() => {
                  setPortLoadingModalActive(true);
                }}
                style={{
                  fontSize: '25px',
                  cursor: 'pointer',
                  position: 'absolute',
                  marginLeft: '4px',
                }}
              ></i>
            </div>
            </Fieldset>
            
          </Form>
        </Col>
        <Col md={6} sm={6} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label>Port of Discharge</Label>
              <div style={{ position: 'relative' }}>
              <Input
                placeholder=""
                value={strPortDistance}
                onChange={(event) => {
                  setPortDischargeModalActive(true);
                }}
              />
               <i
                className="ionicons ion-arrow-down-b"
                onClick={() => {
                  setPortDischargeModalActive(true);
                }}
                style={{
                  fontSize: '25px',
                  cursor: 'pointer',
                  position: 'absolute',
                  marginLeft: '4px',
                }}
              ></i>
            </div>
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label>Place and Date of Issue</Label>
              <Input
                placeholder=""
                value={strPlaceDateIssue}
                onChange={(event) => {
                  setStrPlaceDateIssue(event.target.value);
                }}
              />
            </Fieldset>
          </Form>
        </Col>
        
      </Row>
      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={7} sm={7} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Additional Information</Label>
              <Textarea
                placeholder=""
                style={{ height: 'auto' }}
                rows={6}
                value={strAdditionalInf}
                onChange={(event) => {
                  setStrAdditionalInf(event.target.value);
                }}
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label>Name of Authorized Signatory</Label>
              <div style={{ position: 'relative' }}>
                <Input
                  placeholder=""
                  style={{ marginBottom: '10px' }}
                  value={strSignatoryName}
                  onChange={() => setUserModalActive(true)}
                />
                <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setUserModalActive(true);
                  }}
                  style={{
                    fontSize: '25px',
                    cursor: 'pointer',
                    position: 'absolute',
                    marginLeft: '4px',
                  }}
                ></i>
              </div>
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label>Signatory Company</Label>
              <Input
                label="Account"
                placeholder=""
                value={strSignatoryCompany}
                onChange={(event) => {
                  setStrSignatoryCompany(event.target.value);
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
              <span>{localStorage.getItem('user_name')}</span>
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
      <UsersContentModal
        visible={userModalActive}
        title="Users"
        group="user"
        selectUser={selectAssignedUser}
        onCancel={handleCancel}
      ></UsersContentModal>

      <PortLoadingModal
        visible={portLoadingModalActive}
        selectPort={selectPortLoading}
        title="Port"
        onCancel={handleCancel}
      >
      </PortLoadingModal>
      <PortDischageModal
        visible={portDischargeModalActive}
        selectPort={selectPortDischarge}
        title="Port"
        onCancel={handleCancel}
      >
      </PortDischageModal>
    </div>
  );
}
