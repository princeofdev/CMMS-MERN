import React from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import { DatePicker, Space, TimePicker } from 'antd';
import moment from 'moment';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import { TableTabsStyle } from '../Asset/Asset.styles';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import PageWrapper from './SingleWorkOrder.styles';
// import Checkbox from '@iso/components/uielements/checkbox';
import Actions from '../../redux/purchaserequest/actions';
import PurchaseOrderAction from '../../redux/purchaseorder/actions';
import BusinessModal from '../../component/BusinessModal';
import { Col, Row, Form } from 'antd';
import {
  General,
  LineItems,
  Shipping,
  Notification,
  AdditionalCost,
} from './Tabviews/Tabviews';
import BillingTermModal from '../../component/BillingTermModal';

import {
  Fieldset,
  // Form,
  Label,
  GeneralLine,
} from '../Asset/Facility/OnlineContent.styles';
const FormItem = Form.Item;

// const { getById } = Actions;
const { getById, updateData } = PurchaseOrderAction;
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
  const { id } = useParams();
  const { redirectPath } = props;
  const {
    getPurchaseBoards,
    updatePurchaseBoardData,
    editLIneItem,
    deleteData,
  } = Actions;
  const { planBoards, isDelete, purchaseItems } = useSelector(
    (state) => state.purchaseRequest
  );

  console.log(
    '111111111111111111111111111111111111111111111111',
    purchaseItems
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

  const selectBusiness = (row) => {
    console.log('sdfsdf=========', row);
    setStrSupplierName(row.strName);
    setIntSupplierID(row._id);
  };
  const [intSupplierID, setIntSupplierID] = React.useState(null);
  const [intShipToID, setIntShipToID] = React.useState(null);
  const [intBillToID, setintBillToID] = React.useState(null);

  const [strSupplierAddress, setStrSupplierAddress] = React.useState('');
  const [strShipToAddress, setStrShipToAddress] = React.useState('');
  const [strBillToAddress, setStrBillToAddress] = React.useState('');
  const [strSupplierName, setStrSupplierName] = React.useState('');

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
  const [businessModalActive, setBusinessModalActive] = React.useState(false);

  const [intPurchaseOrderId, setIntPurchaseOrderId] = React.useState(null);

  const onSave = () => {
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
    dispatch(updateData(sendData, intPurchaseOrderId));
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
    dispatch(getById(id));
  }, []);
  React.useEffect(() => {
    dispatch(getPurchaseBoards());
  }, []);
  React.useEffect(() => {
    dispatch(getPurchaseBoards());
  }, [purchaseItems]);
  // React.useEffect(() => {
  //   console.log(purchaseOrder);
  //   if (Object.keys(purchaseOrder).length !== 0) {
  //     setIntBillingTermID(
  //       purchaseOrder.intBillingTermID
  //         ? purchaseOrder.intBillingTermID._id
  //         : null
  //     );
  //     setStrBillingTermName(
  //       purchaseOrder.intBillingTermID
  //         ? purchaseOrder.intBillingTermID.strName
  //         : ''
  //     );
  //     setDtmDateExpectedDelivery(purchaseOrder.dtmDateExpectedDelivery);
  //     setstrConfirmation(purchaseOrder.strConfirmation);
  //     setIntPurchaseOrderId(purchaseOrder._id);

  //     setIntAccountID(
  //       purchaseOrder.intAccountID ? purchaseOrder.intAccountID._id : null
  //     );
  //     setIntChargeDepartmentID(
  //       purchaseOrder.intChargeDepartmentID
  //         ? purchaseOrder.intChargeDepartmentID._id
  //         : null
  //     );
  //     setStrPurchaseOrderReference(purchaseOrder.strPurchaseOrderReference);

  //     setIntSupplierID(
  //       purchaseOrder.intSupplierID ? purchaseOrder.intSupplierID._id : null
  //     );

  //     setIntShipToID(
  //       purchaseOrder.intShipToID
  //         ? purchaseOrder.intShipToID._id.toString()
  //         : null
  //     );

  //     setintBillToID(
  //       purchaseOrder.intBillToID
  //         ? purchaseOrder.intBillToID._id.toString()
  //         : null
  //     );
  //     setStrSupplierName(
  //       purchaseOrder.intSupplierID ? purchaseOrder.intSupplierID.strName : ''
  //     );
  //     setStrSupplierAddress(purchaseOrder.strSupplierAddress);
  //     setStrShipToAddress(purchaseOrder.strShipToAddress);
  //     setStrBillToAddress(purchaseOrder.strBillToAddress);

  //     setStrSupplierCity(purchaseOrder.strSupplierCity);
  //     setStrShipToCity(purchaseOrder.strShipToCity);
  //     setStrBillToCity(purchaseOrder.strBillToCity);

  //     setStrSupplierProvince(purchaseOrder.strSupplierProvince);
  //     setStrShipToProvince(purchaseOrder.strShipToProvince);
  //     setStrBillToProvince(purchaseOrder.strBillToProvince);

  //     setStrSupplierPostalCode(purchaseOrder.strSupplierPostalCode);
  //     setStrShipToPostalCode(purchaseOrder.strShipToPostalCode);
  //     setStrBillToPostalCode(purchaseOrder.strBillToPostalCode);
  //   }
  // }, [purchaseOrder]);
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
              <Col md={20} sm={20} xs={24} style={colStyle}>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Supplier</Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            label="Account"
                            placeholder=""
                            value={strSupplierName}
                            onChange={() => {
                              setBusinessModalActive(true);
                            }}
                            style={{ width: '90%' }}
                          />
                          <i
                            className="ionicons ion-arrow-down-b"
                            onClick={() => {
                              setBusinessModalActive(true);
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
                  <Col md={6} sm={6} xs={12} style={colStyle}>
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
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={6} sm={6} xs={12} style={colStyle}>
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
                  <Col md={6} sm={6} xs={12} style={colStyle}>
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
              </Col>
            </Row>
          </div>
        </PageWrapper>
        <Tabs
          defaultActiveKey="2"
          className="isoTableDisplayTab"
          onChange={callback}
          style={{ overflow: 'initial' }}
        >
          <TabPane tab="General" key="2">
            <General
              generalInfo={generalInfo}
              // purchaseOrder={purchaseOrder}
              pageState={'Edit'}
            ></General>
          </TabPane>
          <TabPane tab="Line Items" key="1">
            <LineItems purcaseOrderId={intPurchaseOrderId}></LineItems>
          </TabPane>

          <TabPane tab="Additional Costs" key="3">
            <AdditionalCost
              purcaseOrderId={intPurchaseOrderId}
            ></AdditionalCost>
          </TabPane>
          <TabPane tab="Shipping/Receiving" key="4">
            <Shipping
              shippingInfo={shippingInfo}
              // purchaseOrder={purchaseOrder}
              pageState={'Edit'}
            ></Shipping>
          </TabPane>
          <TabPane tab="Notification" key="5">
            <Notification
              purcaseOrderId={intPurchaseOrderId}
              pageState={'edit'}
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
      <BusinessModal
        visible={businessModalActive}
        title="Business"
        selectBusiness={selectBusiness}
        onCancel={() => setBusinessModalActive(false)}
      />
    </LayoutWrapper>
  );
}
