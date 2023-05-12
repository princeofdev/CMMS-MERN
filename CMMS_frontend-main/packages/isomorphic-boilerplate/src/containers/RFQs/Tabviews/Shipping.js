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

const FormItem = Form.Item;
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginBottom: '20px',
};

export default function (props) {
  const { pageState, rfq, } = props;
  const [intSupplierID, setIntSupplierID] = React.useState(null);
  const [strSupplierName, setStrSupplierName] = React.useState('');
  const [businessModalActive, setBusinessModalActive] = React.useState(false);

  const [
    shipToLocationModalActive,
    setShipToLocationModalActive,
  ] = React.useState(false);
  const [intShipToID, setIntShipToID] = React.useState(null);
  const [strShipeToName, setStrShipeToName] = React.useState('');

  const [strSupplierAddress, setStrSupplierAddress] = React.useState('');
  const [strShipToAddress, setStrShipToAddress] = React.useState('');

  const [strSupplierCity, setStrSupplierCity] = React.useState('');
  const [strShipToCity, setStrShipToCity] = React.useState('');

  const [strSupplierProvince, setStrSupplierProvince] = React.useState('');
  const [strShipToProvince, setStrShipToProvince] = React.useState('');

  const [strSupplierPostalCode, setStrSupplierPostalCode] = React.useState('');
  const [strShipToPostalCode, setStrShipToPostalCode] = React.useState('');
  const [strBillToPostalCode, setStrBillToPostalCode] = React.useState('');

  const [strSupplierCountry, setStrSupplierCountry] = React.useState(
    ''
  );
  
  const [strShipToCountry, setStrShipToCountry] = React.useState('');

  const onCancel = () => {
    setBusinessModalActive(false);
    setShipToLocationModalActive(false);

  };
  const selectBusiness = (row) => {
    console.log(row);
    setStrSupplierName(row.strName);
    setIntSupplierID(row._id);
  };
  const selectedShipLocation = (row) => {
    setStrShipeToName(row.strName + '(' + row.strCode + ')');
    setIntShipToID(row._id.toString());
  };

  React.useEffect(() => {
    stateChange();
  }, [
    intSupplierID,
    strSupplierName,
    intShipToID,
    strSupplierAddress,
    strShipToAddress,
    strSupplierCity,
    strShipToCity,
    strSupplierProvince,
    strShipToProvince,
    strSupplierPostalCode,
    strShipToPostalCode,
    strSupplierCountry,
    strShipToCountry,
  ]);
  const stateChange = (info) => {
    var shippingInfo = {};
    shippingInfo.intSupplierID = intSupplierID;
    shippingInfo.intShipToID = intShipToID;
    shippingInfo.strSupplierName = strSupplierName;
    shippingInfo.strSupplierAddress = strSupplierAddress;
    shippingInfo.strShipToAddress = strShipToAddress;
    shippingInfo.strSupplierCity = strSupplierCity;
    shippingInfo.strShipToCity = strShipToCity;
    shippingInfo.strSupplierProvince = strSupplierProvince;
    shippingInfo.strShipToProvince = strShipToProvince;
    shippingInfo.strSupplierPostalCode = strSupplierPostalCode;
    shippingInfo.strShipToPostalCode = strShipToPostalCode;
    shippingInfo.strBillToPostalCode = strBillToPostalCode;
    shippingInfo.strSupplierCountry = strSupplierCountry;
    shippingInfo.strShipToCountry = strShipToCountry;

    props.shippingInfo(shippingInfo);
  };
  React.useEffect(() => {
    if (pageState == 'Edit' && rfq != null) {
      console.log(rfq, 'purchase order');
      setIntSupplierID(
        rfq.intSupplierID ? rfq.intSupplierID._id : null
      );
      setStrSupplierName(rfq.intSupplierID ? rfq.intSupplierID.strName:"");
      setStrShipeToName(
        rfq.intShipToID
          ? rfq.intShipToID.strName +
          '(' +
          rfq.intShipToID.strCode +
          ')'
          : ''
      );
      setIntShipToID(
        rfq.intShipToID
          ? rfq.intShipToID._id.toString()
          : null
      );

      setStrSupplierAddress(rfq.strSupplierAddress);
      setStrShipToAddress(rfq.strShipToAddress);


      setStrSupplierCity(rfq.strSupplierCity);
      setStrShipToCity(rfq.strShipToCity);

      setStrSupplierProvince(rfq.strSupplierProvince);
      setStrShipToProvince(rfq.strShipToProvince);
      setStrSupplierPostalCode(rfq.strSupplierPostalCode);
      setStrShipToPostalCode(rfq.strShipToPostalCode);
      setStrSupplierCountry(rfq.strSupplierCountry);
      setStrShipToCountry(rfq.strShipToCountry);
    

    }
  }, [pageState, rfq]);

  return (
    <div className="PageContent">
      {/* <InputGroup size="large" style={{ marginBottom: "15px" }}>              */}

      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={6} sm={6} xs={22} style={{ marginLeft: '5px' }}>
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
        <Col md={6} sm={6} xs={22} style={{ marginLeft: '5px' }}>
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
      </Row>
      <Row style={rowStyle} gutter={16} justify="start">
        <Col md={5} sm={5} xs={22} style={{ marginLeft: '5px' }}>
          <Form>
            <Fieldset>
              <Label>Country</Label>
              <Input
                value={strSupplierCountry}
                onChange={(event) =>
                  setStrSupplierCountry(event.target.value)
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
                value={strShipToCountry}
                onChange={(event) =>
                  setStrShipToCountry(event.target.value)
                }
              />
            </Fieldset>
          </Form>
        </Col>
      </Row>

      {/* </InputGroup>      */}

      <BusinessModal
        visible={businessModalActive}
        title="Business"
        selectBusiness={selectBusiness}
        onCancel={onCancel}
      />
      <ShipToLocationModal
        visible={shipToLocationModalActive}
        title="FACILITIES"
        selectedAsset={selectedShipLocation}
        onCancel={onCancel}
        filter="Facilities"
      ></ShipToLocationModal>

    </div>
  );
}
