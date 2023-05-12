import React from 'react';
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
import BusinessModal from '../../../component/BusinessModal';
import ShipToLocationModal from '../../../component/AssetFilterModal';
import BillToModal from '../../../component/AssetFilterModal';

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
const rowStyle1 = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
export default function (props) {
  const { pageState, purchaseOrder, supplier} = props;
  const [intSupplierID, setIntSupplierID] = React.useState(null);
  const [supplierModalActive, setSupplierModalActive] = React.useState(false);
  const [businessModalActive, setBusinessModalActive] = React.useState(false);

  const [
    shipToLocationModalActive,
    setShipToLocationModalActive,
  ] = React.useState(false);
  const [intShipToID, setIntShipToID] = React.useState(null);
  const [strShipeToName, setStrShipeToName] = React.useState('');

  const [intBillToID, setintBillToID] = React.useState(null);
  const [strBillToName, setStrBillToName] = React.useState('');
  const [billToModalActive, setBillToModalActive] = React.useState(false);

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

  const onCancel = () => {
    setBusinessModalActive(false);
    setShipToLocationModalActive(false);
    setBillToModalActive(false);
  };
  // const selectBusiness = (row) => {
  //   console.log(row);
  //   setStrSupplierName(row.strName);
  //   setIntSupplierID(row._id);
  // };
  const selectedShipLocation = (row) => {
    setStrShipeToName(row.strName + '(' + row.strCode + ')');
    setIntShipToID(row._id.toString());
  };
  const selectedBillTo = (row) => {
    setStrBillToName(row.strName + '(' + row.strCode + ')');
    setintBillToID(row._id.toString());
  };
  React.useEffect(() => {
    stateChange();
  }, [
    intSupplierID,
    intShipToID,
    intBillToID,
    strSupplierAddress,
    strShipToAddress,
    strBillToAddress,
    strSupplierCity,
    strShipToCity,
    strBillToCity,
    strSupplierProvince,
    strShipToProvince,
    strBillToProvince,
    strSupplierPostalCode,
    strShipToPostalCode,
    strBillToPostalCode,
    strSupplierCountryName,
    strShipToCountryName,
    strBillToCountryName,
  ]);
  const stateChange = (info) => {
    var shippingInfo = {};
    shippingInfo.intSupplierID = intSupplierID;
    shippingInfo.intShipToID = intShipToID;
    shippingInfo.intBillToID = intBillToID;
    shippingInfo.strSupplierAddress = strSupplierAddress;
    shippingInfo.strShipToAddress = strShipToAddress;
    shippingInfo.strBillToAddress = strBillToAddress;
    shippingInfo.strSupplierCity = strSupplierCity;
    shippingInfo.strShipToCity = strShipToCity;
    shippingInfo.strBillToCity = strBillToCity;
    shippingInfo.strSupplierProvince = strSupplierProvince;
    shippingInfo.strShipToProvince = strShipToProvince;
    shippingInfo.strBillToProvince = strBillToProvince;
    shippingInfo.strSupplierPostalCode = strSupplierPostalCode;
    shippingInfo.strShipToPostalCode = strShipToPostalCode;
    shippingInfo.strBillToPostalCode = strBillToPostalCode;
    shippingInfo.strSupplierCountryName = strSupplierCountryName;
    shippingInfo.strShipToCountryName = strShipToCountryName;
    shippingInfo.strBillToCountryName = strBillToCountryName;
    props.shippingInfo(shippingInfo);
  };
  React.useEffect(() => {
    if (pageState == 'Edit' && purchaseOrder != undefined) {
      console.log(purchaseOrder,'purchase order');
      setIntSupplierID(
        purchaseOrder.intSupplierID ? purchaseOrder.intSupplierID._id : null
      );

      setStrShipeToName(
        purchaseOrder.intShipToID
          ? purchaseOrder.intShipToID.strName +
              '(' +
              purchaseOrder.intShipToID.strCode +
              ')'
          : ''
      );
      setIntShipToID(
        purchaseOrder.intShipToID
          ? purchaseOrder.intShipToID._id.toString()
          : null
      );

      setStrBillToName(
        purchaseOrder.intBillToID
          ? purchaseOrder.intBillToID.strName +
              '(' +
              purchaseOrder.intBillToID.strCode +
              ')'
          : ''
      );
      setintBillToID(
        purchaseOrder.intBillToID
          ? purchaseOrder.intBillToID._id.toString()
          : null
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

      setStrSupplierCountryName(purchaseOrder.strSupplierCountryName);
      setStrShipToCountryName(purchaseOrder.strShipToCountryName);
      setStrBillToCountryName(purchaseOrder.strBillToCountryName);
     if( purchaseOrder.intSupplierID){
       setStrSupplierAddress(purchaseOrder.intSupplierID.strAddress);
       setStrSupplierCity(purchaseOrder.intSupplierID.strCity);
       setStrSupplierProvince(purchaseOrder.intSupplierID.strProvince);
       setStrSupplierPostalCode(purchaseOrder.intSupplierID.strPostalCode);
       setStrSupplierCountryName(purchaseOrder.intSupplierID.intCountryID);
     }
      
    }
  }, [pageState]);
  React.useEffect(() => {
    if (supplier!=null) {
      setStrSupplierAddress(supplier.strAddress);
      setStrSupplierCity(supplier.strCity);
      setStrSupplierProvince(supplier.strProvince);
      setStrSupplierPostalCode(supplier.strPostalCode);
      setStrSupplierCountryName(supplier.intCountryID);
    }
  }, [supplier]);  
  return (
    <div className="PageContent">
      {/* <InputGroup size="large" style={{ marginBottom: "15px" }}>              */}

      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
      
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Ship To</Label>
              <div style={{ position: 'relative' }}>
                <Input
                  label="Account"
                  placeholder=""
                  value={strShipeToName}
                  onChange={() => {
                    setShipToLocationModalActive(true);
                  }}
                  style={{ width: '90%' }}
                />
                <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setShipToLocationModalActive(true);
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
              <Label>Bill To</Label>
              <div style={{ position: 'relative' }}>
                <Input
                  label="Account"
                  placeholder=""
                  value={strBillToName}
                  onChange={() => {
                    setBillToModalActive(true);
                  }}
                  style={{ width: '90%' }}
                />
                <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setBillToModalActive(true);
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
      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Address</Label>
              <Textarea
                value={strSupplierAddress}
                onChange={(event) => setStrSupplierAddress(event.target.value)}
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label> Address</Label>
              <Textarea
                value={strShipToAddress}
                onChange={(event) => setStrShipToAddress(event.target.value)}
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label> Address</Label>
              <Textarea
                value={strBillToAddress}
                onChange={(event) => setStrBillToAddress(event.target.value)}
              />
            </Fieldset>
          </Form>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>City</Label>
              <Input
                value={strSupplierCity}
                onChange={(event) => setStrSupplierCity(event.target.value)}
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label> City</Label>
              <Input
                value={strShipToCity}
                onChange={(event) => setStrShipToCity(event.target.value)}
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label> City</Label>
              <Input
                value={strBillToCity}
                onChange={(event) => setStrBillToCity(event.target.value)}
              />
            </Fieldset>
          </Form>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Province</Label>
              <Input
                value={strSupplierProvince}
                onChange={(event) => setStrSupplierProvince(event.target.value)}
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label> Province</Label>
              <Input
                value={strShipToProvince}
                onChange={(event) => setStrShipToProvince(event.target.value)}
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label> Province</Label>
              <Input
                value={strBillToProvince}
                onChange={(event) => setStrBillToProvince(event.target.value)}
              />
            </Fieldset>
          </Form>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Postal Code/ZIP</Label>
              <Input
                value={strSupplierPostalCode}
                onChange={(event) =>
                  setStrSupplierPostalCode(event.target.value)
                }
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label> Postal Code/ZIP</Label>
              <Input
                value={strShipToPostalCode}
                onChange={(event) => setStrShipToPostalCode(event.target.value)}
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label> Postal Code/ZIP</Label>
              <Input
                value={strBillToPostalCode}
                onChange={(event) => setStrBillToPostalCode(event.target.value)}
              />
            </Fieldset>
          </Form>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Country</Label>
              <Input
                value={strSupplierCountryName}
                onChange={(event) =>
                  setStrSupplierCountryName(event.target.value)
                }
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label> Country</Label>
              <Input
                value={strShipToCountryName}
                onChange={(event) =>
                  setStrShipToCountryName(event.target.value)
                }
              />
            </Fieldset>
          </Form>
        </Col>
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '30px' }}>
          <Form>
            <Fieldset>
              <Label> Country</Label>
              <Input
                value={strBillToCountryName}
                onChange={(event) =>
                  setStrBillToCountryName(event.target.value)
                }
              />
            </Fieldset>
          </Form>
        </Col>
      </Row>

      {/* </InputGroup>      */}

      {/* <BusinessModal
        visible={businessModalActive}
        title="Business"
        selectBusiness={selectBusiness}
        onCancel={onCancel}
      /> */}
      <ShipToLocationModal
        visible={shipToLocationModalActive}
        title="FACILITIES"
        selectedAsset={selectedShipLocation}
        onCancel={onCancel}
        filter="Facilities"
      ></ShipToLocationModal>
      <BillToModal
        visible={billToModalActive}
        title="FACILITIES"
        selectedAsset={selectedBillTo}
        onCancel={onCancel}
        filter="Facilities"
      />
    </div>
  );
}
