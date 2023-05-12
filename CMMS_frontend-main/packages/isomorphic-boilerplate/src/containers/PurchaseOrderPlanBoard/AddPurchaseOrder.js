import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import { DatePicker } from 'antd';
import moment from 'moment';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import { TableTabsStyle } from '../Asset/Asset.styles';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import PageWrapper from './SingleWorkOrder.styles';
import notification from '@iso/components/Notification';
import Actions from '../../redux/purchaserequest/actions';
import PurchaseOrderAction from '../../redux/purchaseorder/actions';
import { Col, Row, Form } from 'antd';
import {
  General,
  LineItems,
  Shipping,
  Notification,
} from './Tabviews/Tabviews';

import BillingTermModal from '../../component/BillingTermModal';

import {
  Fieldset,
  // Form,
  Label,
  GeneralLine,
} from '../Asset/Facility/OnlineContent.styles';
const FormItem = Form.Item;

const { createdId } = Actions;
const { addPurchaseOrder } = PurchaseOrderAction;
function callback(key) {}
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '16px',
};
const gutter = 16;

export default function (props) {
  const dispatch = useDispatch();
  const { redirectPath } = props;
  const [activeKey, setActiveKey] = React.useState('2');
  const { createdPurcaseId, isDelete } = useSelector(
    (state) => state.purchaseRequest
  );
  const [dtmDateExpectedDelivery, setDtmDateExpectedDelivery] = React.useState(
    null
  );
  const [billingTermModalActive, setBillingTermModalActive] = React.useState(
    false
  );
  const [intBillingTermID, setIntBillingTermID] = React.useState(null);
  const [strBillingTermName, setStrBillingTermName] = React.useState('');
  const [strConfirmation, setstrConfirmation] = React.useState('');
  const [intChargeDepartmentID, setIntChargeDepartmentID] = React.useState(
    null
  );
  const [intAccountID, setIntAccountID] = React.useState(null);
  const [strPurchaseCurrencyName, setStrPurchaseCurrencyName] = React.useState(
    ''
  );
  const [
    strPurchaseOrderReference,
    setStrPurchaseOrderReference,
  ] = React.useState('');

  const [intSupplierID, setIntSupplierID] = React.useState(null);
  const [intShipToID, setIntShipToID] = React.useState(null);
  const [intBillToID, setintBillToID] = React.useState(null);

  const [strSupplierAddress, setStrSupplierAddress] = React.useState('');
  const [strShipToAddress, setStrShipToAddress] = React.useState('');
  const [strBillToAddress, setStrBillToAddress] = React.useState('');

  const [strSupplierCity, setStrSupplierCity] = React.useState('');
  const [strShipToCity, setStrShipToCity] = React.useState('');
  const [strBillToCity, setStrBillToCity] = React.useState('');

  const [strSupplierProvince, setStrSupplierProvince] = React.useState('');
  const [strShipToProvince, setStrShipToProvince] = React.useState('');
  const [strBillToProvince, setStrBillToProvince] = React.useState('');

  const [strSupplierPostalCode, setStrSupplierPostalCode] = React.useState('');
  const [strShipToPostalCode, setStrShipToPostalCode] = React.useState('');
  const [strBillToPostalCode, setStrBillToPostalCode] = React.useState('');

  const [strSupplierCountryName, setStrSupplierCountryName] = React.useState(
    ''
  );
  const [strShipToCountryName, setStrShipToCountryName] = React.useState('');
  const [strBillToCountryName, setStrBillToCountryName] = React.useState('');

  const [strName, setStrName] = React.useState('');
  const [strDescription, setStrDescription] = React.useState('');
  const onSave = () => {
    if (!intSupplierID) {
      notification(
        'info',
        'This PO requires a Supplier/Vendor to be attached.'
      );
      setActiveKey('2');
      return;
    }

    var sendData = {};
    sendData.intBillingTermID = intBillingTermID;
    sendData.dtmDateExpectedDelivery = new Date(dtmDateExpectedDelivery);
    sendData.strConfirmation = strConfirmation;
    sendData.intAccountID = intAccountID;
    sendData.intChargeDepartmentID = intChargeDepartmentID;
    sendData.strPurchaseCurrencyName = strPurchaseCurrencyName;
    sendData.strPurchaseOrderReference = strPurchaseOrderReference;
    sendData.intSupplierID = intSupplierID;
    sendData.intShipToID = intShipToID;
    sendData.intBillToID = intBillToID;
    sendData.strSupplierAddress = strSupplierAddress;
    sendData.strShipToAddress = strShipToAddress;
    sendData.strBillToAddress = strBillToAddress;
    sendData.strSupplierCity = strSupplierCity;
    sendData.strShipToCity = strShipToCity;
    sendData.strBillToCity = strBillToCity;
    sendData.strSupplierProvince = strSupplierProvince;
    sendData.strShipToProvince = strShipToProvince;
    sendData.strBillToProvince = strBillToProvince;
    sendData.strSupplierPostalCode = strSupplierPostalCode;
    sendData.strShipToPostalCode = strShipToPostalCode;
    sendData.strBillToPostalCode = strBillToPostalCode;
    sendData.strSupplierCountryName = strSupplierCountryName;
    sendData.strShipToCountryName = strShipToCountryName;
    sendData.strBillToCountryName = strBillToCountryName;
    console.log(sendData);
    dispatch(addPurchaseOrder(sendData));
  };

  const handleCancel = () => {
    setBillingTermModalActive(false);
  };
  const selectBillingTerm = (row) => {
    setIntBillingTermID(row._id);
    setStrBillingTermName(row.strName);
  };
  const onChange = (value, dateString) => {
    setDtmDateExpectedDelivery(dateString == '' ? null : dateString);
  };
  React.useEffect(() => {
    dispatch(createdId());
  }, []);
  React.useEffect(() => {
    console.log(createdPurcaseId);
  }, [createdPurcaseId]);
  const generalInfo = (info) => {
    setIntAccountID(info.intAccountID);
    setIntChargeDepartmentID(info.intChargeDepartmentID);
    setStrPurchaseCurrencyName(info.strPurchaseCurrencyName);
    setStrPurchaseOrderReference(info.strPurchaseOrderReference);
  };
  const shippingInfo = (info) => {
    setIntSupplierID(info.intSupplierID);
    setIntShipToID(info.intShipToID);
    setintBillToID(info.intBillToID);
    setStrSupplierAddress(info.strSupplierAddress);
    setStrShipToAddress(info.strShipToAddress);
    setStrBillToAddress(info.strBillToAddress);
    setStrSupplierCity(info.strSupplierCity);
    setStrShipToCity(info.strShipToCity);
    setStrBillToCity(info.strBillToCity);
    setStrSupplierProvince(info.strSupplierProvince);
    setStrShipToProvince(info.strShipToProvince);
    setStrBillToProvince(info.strBillToProvince);
    setStrSupplierPostalCode(info.strSupplierPostalCode);
    setStrShipToPostalCode(info.strShipToPostalCode);
    setStrBillToPostalCode(info.strBillToPostalCode);
    setStrSupplierCountryName(info.strSupplierCountryName);
    setStrShipToCountryName(info.strShipToCountryName);
    setStrBillToCountryName(info.strBillToCountryName);
  };
  return (
    <LayoutWrapper style={{ overflow: 'initial' }}>
      <div className="PageHeader">
        <Link to={'/dashboard/purchase_orders'}>
          <Button color="primary">
            <span>Back</span>
          </Button>
        </Link>

        <Button type="primary" onClick={onSave} className="saveBtn">
          <span>Save</span>
        </Button>
      </div>
      <TableTabsStyle className="isoLayoutContentAsset">
        <h4 style={{ marginBottom: '15px' }}>Purchase Order:</h4>
        <PageWrapper className="editView">
          <div className="PageContent">
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={4} sm={4} xs={24} style={colStyle}></Col>
              <Col md={6} sm={6} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Billing Term</Label>
                    <div style={{ position: 'relative' }}>
                      <Input
                        label="Work Order Status"
                        placeholder=""
                        value={strBillingTermName}
                        onChange={() => {
                          setBillingTermModalActive(true);
                        }}
                        style={{ width: '90%' }}
                      />
                      <i
                        className="ionicons ion-arrow-down-b"
                        onClick={() => {
                          setBillingTermModalActive(true);
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
              <Col md={4} sm={4} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Expected Delivery Date</Label>

                    <DatePicker
                      showTime={true}
                      value={
                        dtmDateExpectedDelivery != null
                          ? moment(
                              dtmDateExpectedDelivery,
                              'YYYY-MM-DD HH:mm:ss'
                            )
                          : ''
                      }
                      onChange={onChange}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={3} sm={3} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label> Confirmation #</Label>
                    <Input
                      label="Confirmation"
                      placeholder=""
                      value={strConfirmation}
                      onChange={(event) => {
                        setstrConfirmation(event.target.value);
                      }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
          </div>
        </PageWrapper>
        <Tabs
          defaultActiveKey="1"
          className="isoTableDisplayTab"
          onChange={callback}
          // activeKey={activeKey}
          style={{ overflow: 'initial' }}
        >
          <TabPane tab="Line Items" key="1">
            <LineItems purcaseOrderId={createdPurcaseId}></LineItems>
          </TabPane>
          <TabPane tab="General" key="2">
            <General generalInfo={generalInfo} pageState={'Add'}></General>
          </TabPane>
          <TabPane tab="Shipping/Receiving" key="3">
            <Shipping shippingInfo={shippingInfo} pageState={'Add'}></Shipping>
          </TabPane>
          <TabPane tab="Notification" key="4">
            <Notification
              purcaseOrderId={createdPurcaseId}
              pageState={'Add'}
            ></Notification>
          </TabPane>
        </Tabs>
      </TableTabsStyle>
      <BillingTermModal
        visible={billingTermModalActive}
        title="BILLING TERMS"
        onCancel={handleCancel}
        selectedItem={selectBillingTerm}
      ></BillingTermModal>
    </LayoutWrapper>
  );
}
