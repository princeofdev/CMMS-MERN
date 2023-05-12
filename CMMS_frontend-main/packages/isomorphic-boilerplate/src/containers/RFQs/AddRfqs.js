import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import Actions from '../../redux/rfqs/actions';
import { Col, Row, Form } from 'antd';
import {
  LineItems,
  Shipping,
  Files,
} from './Tabviews/Tabviews';

import {
  Fieldset,
  // Form,
  Label,
  GeneralLine,
} from '../Asset/Facility/OnlineContent.styles';
const FormItem = Form.Item;

const { creatId, addRFQ} = Actions;
function callback(key) { }
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '16px',
  paddingRight: '20px'
};
const gutter = 16;

export default function (props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const { redirectPath } = props;
  const [activeKey, setActiveKey] = React.useState('2');
  const { createdRfqId, isChanged } = useSelector((state) => state.Rfq);
 
  const [strQuote, setStrQuote]=React.useState('');
  const [dtmExpectedResonseDate, setDtmExpectedResonseDate] = React.useState(null); 
  const [dtmDateExpectedDelivery, setDtmDateExpectedDelivery] = React.useState(
    null
  );
  const [strStatus, setStrStatus] = React.useState('Draft');
  const [intShipToID, setIntShipToID] = React.useState(null);
  const [intSupplierID, setIntSupplierID] = React.useState(null);
  const [strSupplierAddress, setStrSupplierAddress] = React.useState('');
  const [strSupplierCity, setStrSupplierCity] = React.useState('');
  const [strSupplierPostalCode, setStrSupplierPostalCode] = React.useState('');
  const [strSupplierProvince, setStrSupplierProvince] = React.useState('');
  const [strSupplierCountry, setStrSupplierCountry]=React.useState('');
  const [strShipToAddress, setStrShipToAddress] = React.useState('');
  const [strShipToCity, setStrShipToCity] = React.useState('');
  const [strShipToPostalCode, setStrShipToPostalCode] = React.useState('');
  const [strShipToProvince, setStrShipToProvince] = React.useState('');
  const [strShipToCountry, setStrShipToCountry]=React.useState('');
  const [strSupplierName, setStrSupplierName] = React.useState('');
  const [supplier, setSupplier] = React.useState(null);

  const onSave = () => {
    // if (intSupplierID === null) {
    //   notification(
    //     'info',
    //     'This PO requires a Supplier/Vendor to be attached.'
    //   );
    //   setActiveKey('2');
    //   return;
    // }

    var sendData = {};
  
    sendData.dtmDateExpectedDelivery = dtmDateExpectedDelivery
      ? new Date(dtmDateExpectedDelivery)
      : new Date();
    // sendData.strConfirmation = strConfirmation;
  
    sendData.strQuote = strQuote;    
    sendData.dtmExpectedResonseDate = dtmExpectedResonseDate;
    sendData.intSupplierID = intSupplierID;
    sendData.intShipToID = intShipToID;
    sendData.strSupplierAddress = strSupplierAddress;
    sendData.strShipToAddress = strShipToAddress;
    sendData.strSupplierCity = strSupplierCity;
    sendData.strShipToCity = strShipToCity; 
    sendData.strSupplierProvince = strSupplierProvince;
    sendData.strShipToProvince = strShipToProvince; 
    sendData.strSupplierPostalCode = strSupplierPostalCode;
    sendData.strShipToPostalCode = strShipToPostalCode;  
    sendData.strSupplierCountry = strSupplierCountry;
    sendData.strShipToCountry = strShipToCountry;
  dispatch(addRFQ(sendData));
  };

  const handleCancel = () => {

  };
 
  const onChange = (value, dateString) => {
    setDtmDateExpectedDelivery(dateString == '' ? null : dateString);
  };
  const onChangeDate = (value, dateString) => {
    setDtmExpectedResonseDate(dateString == '' ? null : dateString);
  };
  React.useEffect(() => {
    dispatch(creatId());
  }, []);
  React.useEffect(() => {
    console.log(createdRfqId, 'fgfg');
  }, [createdRfqId]);

  const shippingInfo = (info) => {
    setIntSupplierID(info.intSupplierID);
    setIntShipToID(info.intShipToID);
    setStrSupplierAddress(info.strSupplierAddress);
    setStrShipToAddress(info.strShipToAddress);
    setStrSupplierCity(info.strSupplierCity);
    setStrShipToCity(info.strShipToCity);
    setStrSupplierProvince(info.strSupplierProvince);
    setStrShipToProvince(info.strShipToProvince);
    setStrSupplierPostalCode(info.strSupplierPostalCode);
    setStrShipToPostalCode(info.strShipToPostalCode);
   setStrSupplierCountry(info.strSupplierCountry);
     setStrShipToCountry(info.strShipToCountry);  
  };
  React.useEffect(() => {
    if (isChanged) history.push('/dashboard/rfqs');
  }, [isChanged]);
  return (
    <LayoutWrapper style={{ overflow: 'initial' }}>
      <div className="PageHeader">
        <Link to={'/dashboard/rfqs'}>
          <Button color="primary">
            <span>Back</span>
          </Button>
        </Link>

        <Button type="primary" onClick={onSave} className="saveBtn">
          <span>Save</span>
        </Button>
      </div>
      <TableTabsStyle className="isoLayoutContentAsset">
        <h4 style={{ marginBottom: '15px' }}>RFQ:</h4>
        <PageWrapper className="editView">
          <div className="PageContent">
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={4} sm={4} xs={24} style={colStyle}></Col>
              <Col md={20} sm={20} xs={24} style={colStyle}>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label> Quote #</Label>
                        <Input
                          label="Confirmation"
                          placeholder=""
                          value={strQuote}
                          style={{ width: '95%' }}
                          onChange={(event) => {
                            setStrQuote(event.target.value);
                          }}
                        />
                      </Fieldset>
                    </Form>
                  </Col>

                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Created By User</Label>
                        <Label>{localStorage.getItem('user_name')}</Label>
                      </Fieldset>
                    </Form>
                  </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Expected Quote Response Date</Label>

                        <DatePicker
                          showTime={true}
                          value={
                            dtmExpectedResonseDate != null
                              ? moment(
                                dtmExpectedResonseDate,
                                'YYYY-MM-DD HH:mm:ss'
                              )
                              : ''
                          }
                          onChange={onChangeDate}
                          style={{ width: '95%' }}
                        />
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
              </Col>
            </Row>
          </div>
        </PageWrapper>
        <Tabs
          defaultActiveKey="2"
          className="isoTableDisplayTab"
          onChange={callback}
          // activeKey={activeKey}
          style={{ overflow: 'initial' }}
        >

          <TabPane tab="Line Items" key="1">
            {
              createdRfqId ? <LineItems rfqId={createdRfqId}></LineItems>:null
            }
           
          </TabPane>
          <TabPane tab="Shipping/Receiving" key="4">
            <Shipping
              supplier={supplier}
              shippingInfo={shippingInfo} pageState={'Add'}></Shipping>
          </TabPane>
          <TabPane tab="File" key="6">
            <Files rfqId={createdRfqId} pageState={'Add'}></Files>
          </TabPane>
        </Tabs>
      </TableTabsStyle>

  
    </LayoutWrapper>
  );
}
