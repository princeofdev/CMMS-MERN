import React from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import { DatePicker, Space, TimePicker } from 'antd';
import { direction } from '@iso/lib/helpers/rtl';
import moment from 'moment';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import { TableTabsStyle } from '../Asset/Asset.styles';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import PageWrapper from './SingleWorkOrder.styles';
// import Checkbox from '@iso/components/uielements/checkbox';
import Actions from '../../redux/purchaserequest/actions';
import PurchaseOrderAction from '../../redux/purchaseorder/actions';
import BusinessModal from '../../component/BusinessModal';
import PdfMailSenderModal from '../../component/PdfMailSenderModal';
import CreditCardModal from '../../component/CreditCardModal';
import { Col, Row, Form } from 'antd';
import {
  General,
  LineItems,
  Shipping,
  Notification,
  AdditionalCost,
  Files,
} from './Tabviews/Tabviews';
import BillingTermModal from '../../component/BillingTermModal';

import {
  Fieldset,
  // Form,
  Label,
  GeneralLine,
} from '../Asset/Facility/OnlineContent.styles';
// const FormItem = Form.Item;

// const { getById } = Actions;
const { getById, updateData, deleteData } = PurchaseOrderAction;
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
const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};
const draftBar = {
  textAlign: 'left',
  height: '28px',
  verticalAlign: 'middle',
  background: '#818183',
  padding: '3px 0 2px 10px',
  color: '#FFFFFF',
  marginBottom: 5,
  fontSize: '13px',
  fontWeight: 'bold',
};
const approvalBar = {
  textAlign: 'left',
  height: '28px',
  verticalAlign: 'middle',
  background: '#ccbd4a',
  padding: '3px 0 2px 10px',
  color: '#FFFFFF',
  marginBottom: 5,
  fontSize: '13px',
  fontWeight: 'bold',
};
const approvedBar = {
  textAlign: 'left',
  height: '28px',
  verticalAlign: 'middle',
  background: '#7aa94a',
  padding: '3px 0 2px 10px',
  color: '#FFFFFF',
  marginBottom: 5,
  fontSize: '13px',
  fontWeight: 'bold',
};
export default function (props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const { id } = useParams();
  const { redirectPath } = props;
  const { purchaseOrder, isDelete } = useSelector(
    (state) => state.purchaseOrder
  );
  const [dtmDateExpectedDelivery, setDtmDateExpectedDelivery] = React.useState(
    null
  );
  const [billingTermModalActive, setBillingTermModalActive] = React.useState(
    false
  );
  const [creditCardModal, setCreditCardModal] = React.useState(false);
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

  const [supplier, setSupplier] = React.useState(null);

  const [intCreditCardID, setIntCreditCardID] = React.useState('');
  const [strCardType, setStrCardType] = React.useState('');
  const [strCurrency, setStrCurrency] = React.useState('');

  const selectBusiness = (row) => {
    setSupplier(row);
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
  const [strSupplierEmail, setStrSupplierEmail] = React.useState('');

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
  const [pdfMailModalActive, setPdfMailModalActive] = React.useState(false);
  const [strSupplierReference, setStrSupplierReference] = React.useState('');
  const [strTermsPaymentMethod, setStrTermsPaymentMethod] = React.useState('');
  const [pdfInf, setPdfInf] = React.useState(null);
  const [status, setStatus] = React.useState('Draft');

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
    sendData.strSupplierReference = strSupplierReference;
    sendData.strTermsPaymentMethod = strTermsPaymentMethod;
    sendData.intCreditCardID = intCreditCardID;

    sendData.strDispatchMethod = pdfInf.strDispatchMethod;
    sendData.strShipmentType = pdfInf.strShipmentType;
    sendData.strPortLoading = pdfInf.strPortLoading;
    sendData.strPortDistance = pdfInf.strPortDistance;
    sendData.strPlaceDateIssue = pdfInf.strPlaceDateIssue;
    sendData.strSignatoryCompany = pdfInf.strSignatoryCompany;
    sendData.intSignatoryName = pdfInf.intSignatoryName;
    sendData.strAdditionalInf = pdfInf.strAdditionalInf;
    sendData.strPurchaseOrderStatus = status;
    dispatch(updateData(sendData, intPurchaseOrderId));
  };

  const updateStatus = (val) => {
    var sendData = {};
    sendData.strPurchaseOrderStatus = val;
    dispatch(updateData(sendData, intPurchaseOrderId));
  };
  const onSendMail = () => {
    setPdfMailModalActive(true);
  };
  const handleCancel = () => {
    setBillingTermModalActive(false);
    setPdfMailModalActive(false);
    setCreditCardModal(false);
  };
  const selectBillingTerm = (row) => {
    setIntBillingTermID(row._id);
    setStrBillingTermName(row.strName);
  };
  const selectCreditCard = (row) => {
    setIntCreditCardID(row._id);
    setStrCardType(row.strCardType);
    setStrCurrency(row.strCurrency);
  };
  const onChange = (value, dateString) => {
    setDtmDateExpectedDelivery(dateString == '' ? null : dateString);
  };
  React.useEffect(() => {
    dispatch(getById(id));
  }, []);
  React.useEffect(() => {
    console.log(purchaseOrder, 'purchaseOrder');
  }, [purchaseOrder]);

  React.useEffect(() => {
    if (isDelete) history.push('/dashboard/purchase_orders');
  }, [isDelete]);

  React.useEffect(() => {
    // console.log(purchaseOrder);
    if (Object.keys(purchaseOrder).length !== 0) {
      setIntBillingTermID(
        purchaseOrder.intBillingTermID
          ? purchaseOrder.intBillingTermID._id
          : null
      );
      setStrBillingTermName(
        purchaseOrder.intBillingTermID
          ? purchaseOrder.intBillingTermID.strName
          : ''
      );
      setDtmDateExpectedDelivery(purchaseOrder.dtmDateExpectedDelivery);
      setstrConfirmation(purchaseOrder.strConfirmation);
      setIntPurchaseOrderId(purchaseOrder._id);

      setIntAccountID(
        purchaseOrder.intAccountID ? purchaseOrder.intAccountID._id : null
      );
      setIntChargeDepartmentID(
        purchaseOrder.intChargeDepartmentID
          ? purchaseOrder.intChargeDepartmentID._id
          : null
      );
      setStrPurchaseOrderReference(purchaseOrder.strPurchaseOrderReference);

      setIntSupplierID(
        purchaseOrder.intSupplierID ? purchaseOrder.intSupplierID._id : null
      );

      setIntShipToID(
        purchaseOrder.intShipToID
          ? purchaseOrder.intShipToID._id.toString()
          : null
      );

      setintBillToID(
        purchaseOrder.intBillToID
          ? purchaseOrder.intBillToID._id.toString()
          : null
      );
      setStrSupplierName(
        purchaseOrder.intSupplierID ? purchaseOrder.intSupplierID.strName : ''
      );
      setStrSupplierEmail(
        purchaseOrder.intSupplierID
          ? purchaseOrder.intSupplierID.strPrimaryEmail
          : ''
      );
      setStrCardType(
        purchaseOrder.intCreditCardID
          ? purchaseOrder.intCreditCardID.strCardType
          : ''
      );
      setStrSupplierAddress(purchaseOrder.strSupplierAddress);
      setStrShipToAddress(purchaseOrder.strShipToAddress);
      setStrBillToAddress(purchaseOrder.strBillToAddress);

      setStrSupplierCity(purchaseOrder.strSupplierCity);
      setStrShipToCity(purchaseOrder.strShipToCity);
      setStrBillToCity(purchaseOrder.strBillToCity);

      setStrSupplierProvince(purchaseOrder.strSupplierProvince);
      setStrShipToProvince(purchaseOrder.strShipToProvince);
      setStrBillToProvince(purchaseOrder.strBillToProvince);

      setStrSupplierPostalCode(purchaseOrder.strSupplierPostalCode);
      setStrShipToPostalCode(purchaseOrder.strShipToPostalCode);
      setStrBillToPostalCode(purchaseOrder.strBillToPostalCode);
      setStrSupplierReference(purchaseOrder.strSupplierReference);
      setStrTermsPaymentMethod(purchaseOrder.strTermsPaymentMethod);
      setIntCreditCardID(
        purchaseOrder.intCreditCardID ? purchaseOrder.intCreditCardID._id : null
      );
      setStatus(
        purchaseOrder.strPurchaseOrderStatus
          ? purchaseOrder.strPurchaseOrderStatus
          : 'Draft'
      );
    }
  }, [purchaseOrder]);
  const generalInfo = (info) => {
    setIntAccountID(info.intAccountID);
    setIntChargeDepartmentID(info.intChargeDepartmentID);
    setStrPurchaseCurrencyName(info.strPurchaseCurrencyName);
    setStrPurchaseOrderReference(info.strPurchaseOrderReference);
    setPdfInf(info);
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
  const loadSuccess = (val) => {
    setPdfMailModalActive(false);
  };
  const onDelete = () => {
    dispatch(deleteData(intPurchaseOrderId));
  };
  const onPrint = () => {
    history.push(`/dashboard/purchase_orders/print/${intPurchaseOrderId}`);
  };
  const buttonBar = () => {
    if (status == 'Waiting for Approval')
      return (
        <>
          <Button
            onClick={() => updateStatus('Approved')}
            color="primary"
            style={margin}
          >
            <span>Approve Purchase Order</span>
          </Button>
          <Button
            color="primary"
            onClick={() => updateStatus('Rejected')}
            style={margin}
          >
            <span>Reject Purchase Order</span>
          </Button>
          <Button
            type="primary"
            onClick={onSendMail}
            className="saveBtn"
            style={margin}
          >
            <span>Send To Supplier</span>
          </Button>
        </>
      );
    else if (status == 'Draft')
      return (
        <>
          <Button
            color="primary"
            onClick={() => updateStatus('Waiting for Approval')}
            style={margin}
          >
            <span>Submit For Approval</span>
          </Button>
          <Button
            type="primary"
            onClick={onSendMail}
            className="saveBtn"
            style={margin}
          >
            <span>Send To Supplier</span>
          </Button>
        </>
      );
    else if (status == 'Approved')
      return (
        <>
          <Button
            type="primary"
            onClick={onSendMail}
            className="saveBtn"
            style={margin}
          >
            <span>Send To Supplier</span>
          </Button>
        </>
      );
    else if (status == 'Draft')
      return (
        <>
          <Button
            color="primary"
            onClick={() => updateStatus('Waiting for Approval')}
            style={margin}
          >
            <span>Submit For Approval</span>
          </Button>
          <Button
            type="primary"
            onClick={onSendMail}
            className="saveBtn"
            style={margin}
          >
            <span>Send To Supplier</span>
          </Button>
        </>
      );
    else if (status == 'Rejected')
      return (
        <>
          <Button
            color="primary"
            onClick={() => updateStatus('Waiting for Approval')}
            style={margin}
          >
            <span>Submit For Approval</span>
          </Button>
        </>
      );
    //   return (<div style={approvedBar}>Status: Approved</div>);
    // else if (status == 'On Order')
    //   return (<div style={approvedBar}>Status: On Order</div>);
    // else
    //   return (<div style={draftBar}>Status: {status}</div>);
  };
  const statusBar = () => {
    if (status == 'Waiting for Approval')
      return <div style={approvalBar}>Status: Waiting for Approval</div>;
    else if (status == 'Approved')
      return <div style={approvedBar}>Status: Approved</div>;
    else if (status == 'On Order')
      return <div style={approvedBar}>Status: On Order</div>;
    else if (status == 'Rejected')
      return <div style={draftBar}>Status: Rejected</div>;
    else return <div style={draftBar}>Status: {status}</div>;
  };
  return (
    <LayoutWrapper style={{ overflow: 'initial' }}>
      <div className="PageHeader">
        <Link to={'/dashboard/purchase_orders'}>
          <Button color="primary" style={margin}>
            <span>Back</span>
          </Button>
        </Link>

        <Button
          type="primary"
          onClick={onSave}
          className="saveBtn"
          style={margin}
        >
          <span>Save</span>
        </Button>
        <Button
          type="primary"
          onClick={onPrint}
          className="saveBtn"
          style={margin}
        >
          <span>Print</span>
        </Button>
        {buttonBar()}
        <Button
          type="danger"
          className="saveBtn"
          onClick={onDelete}
          style={margin}
        >
          <span>Delete</span>
        </Button>
      </div>
      <TableTabsStyle className="isoLayoutContentAsset">
        <h4 style={{ marginBottom: '15px' }}>
          Purchase Order: {'PO#' + intPurchaseOrderId}
        </h4>
        <PageWrapper className="editView">
          <div className="PageContent">
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={4} sm={4} xs={24} style={colStyle}></Col>
              <Col md={20} sm={20} xs={24} style={colStyle}>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={18} sm={18} xs={24} style={colStyle}>
                    {statusBar()}
                  </Col>
                </Row>
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
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
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
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label> Supplier Reference</Label>
                        <Input
                          label="Confirmation"
                          placeholder=""
                          value={strSupplierReference}
                          onChange={(event) => {
                            setStrSupplierReference(event.target.value);
                          }}
                        />
                      </Fieldset>
                    </Form>
                  </Col>
                  {/* <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label> Terms / Method of Payment</Label>
                        <Input
                          label="Confirmation"
                          placeholder=""
                          value={strTermsPaymentMethod}
                          onChange={(event) => {
                            setStrTermsPaymentMethod(event.target.value);
                          }}
                        />
                      </Fieldset>
                    </Form>
                  </Col> */}
                  {strBillingTermName == 'Credit Card' && (
                    <Col md={6} sm={6} xs={12} style={colStyle}>
                      <Form>
                        <Fieldset>
                          <Label>Credit Card</Label>
                          <div style={{ position: 'relative' }}>
                            <Input
                              label="Credit Card"
                              placeholder=""
                              value={strCardType}
                              onChange={() => {
                                setCreditCardModal(true);
                              }}
                              style={{ width: '90%' }}
                            />
                            <i
                              className="ionicons ion-arrow-down-b"
                              onClick={() => {
                                setCreditCardModal(true);
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
                  )}
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
              purchaseOrder={purchaseOrder}
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
              supplier={supplier}
              shippingInfo={shippingInfo}
              purchaseOrder={purchaseOrder}
              pageState={'Edit'}
            ></Shipping>
          </TabPane>
          <TabPane tab="Notification" key="5">
            <Notification
              purcaseOrderId={intPurchaseOrderId}
              pageState={'edit'}
            ></Notification>
          </TabPane>
          <TabPane tab="File" key="6">
            <Files
              purcaseOrderId={intPurchaseOrderId}
              pageState={'edit'}
            ></Files>
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
      <CreditCardModal
        visible={creditCardModal}
        title="Credit Cards"
        onCancel={handleCancel}
        selectedItem={selectCreditCard}
      ></CreditCardModal>
      <PdfMailSenderModal
        visible={pdfMailModalActive}
        loadSuccess={loadSuccess}
        strSupplierName={strSupplierName}
        strSupplierEmail={strSupplierEmail}
        intPurchaseOrderID={intPurchaseOrderId}
        title="Send To Supplier"
        onCancel={handleCancel}
        markSent={() => {
          updateStatus('On Order');
          setPdfMailModalActive(false);
        }}
      ></PdfMailSenderModal>
    </LayoutWrapper>
  );
}
