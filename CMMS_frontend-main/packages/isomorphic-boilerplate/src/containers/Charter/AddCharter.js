import React from 'react';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import Box from '@iso/components/utility/box';
import BillingForm from './BillingForm';
import { CheckoutContents } from './Checkout.styles';
import Button from '@iso/components/uielements/button';
import { Link } from 'react-router-dom';
import { direction } from '@iso/lib/helpers/rtl';

import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import Select, { SelectOption } from '@iso/components/uielements/select';
// import Checkbox from '@iso/components/uielements/checkbox';
// import InputBox from './InputBox';
// import IntlMessages from '@iso/components/utility/intlMessages';
import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import { Form, DatePicker, TimePicker } from 'antd';
import Input, { Textarea } from '@iso/components/uielements/input';
import moment from 'moment';
import charterAction from '../../redux/charter/actions';
import { useDispatch, useSelector } from 'react-redux';
import notification from '@iso/components/Notification';
import InputNumber from '@iso/components/uielements/InputNumber';
import { CheckList } from './Tabviews/Tabviews';

const FormItem = Form.Item;

const { add } = charterAction;

const Option = SelectOption;

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

export default function () {
  const dispatch = useDispatch();
  const { charterId } = useSelector((state) => state.Charter);

  const [charter, setCharter] = React.useState('Charter');
  const [reference, setReference] = React.useState('');
  const [charterStatus, setCharterStatus] = React.useState('Live');
  const [clientStatus, setClientStatus] = React.useState('');
  const [ownerStatus, setOwnerStatus] = React.useState('');
  const [bookingCompany, setBookingCompany] = React.useState('');
  const [bookingBroker, setBookingBroker] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [finishDate, setFinishDate] = React.useState(null);
  const [cruisinArea, setCruisinArea] = React.useState('');
  const [pickupPort, setPickupPort] = React.useState('');
  const [dropOffPort, setDropOffPort] = React.useState('');
  const [vesselEntry, setVesselEntry] = React.useState('');
  const [slipNumber, setSlipNumber] = React.useState('');
  const [marinaContact, setMarinaContact] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [commission, setCommission] = React.useState('');
  const [netToOwner, setNetToOwner] = React.useState('');
  const [currency, setCurrency] = React.useState('Euros');
  const [numberOfGuests, setNumberOfGuests] = React.useState('');
  const [typeOfGuests, setTypeOfGuests] = React.useState('Corporate');
  const [previousCharter, setPreviousCharter] = React.useState('');
  const [ownersCharter, setOwnersCharter] = React.useState('');
  const [references, setReferences] = React.useState('');
  const [note, setNote] = React.useState('');

  const onStartDateChange = (value, dateString) => {
    setStartDate(dateString == '' ? null : dateString);
  };

  const onFinishDateChange = (value, dateString) => {
    setFinishDate(dateString);
  };

  const validate = () => {
    let res = true;
    if (charter == '') res = false;
    if (reference == null) res = false;
    if (charterStatus == '') res = false;
    if (clientStatus == '') res = false;
    if (ownerStatus == '') res = false;
    if (startDate == null) res = false;
    if (finishDate == null) res = false;
    if (!res) notification('error', 'Please input all required fields!');
    return res;
  };

  const onSave = () => {
    if (!validate()) return;

    var sendData = {
      charter: charter,
      reference: reference,
      charterStatus: charterStatus,
      clientStatus: clientStatus,
      ownerStatus: ownerStatus,
      bookingCompany: bookingCompany,
      bookingBroker: bookingBroker,
      startDate: new moment(startDate).toDate(),
      finishDate: new moment(finishDate).toDate(),
      cruisinArea: cruisinArea,
      pickupPort: pickupPort,
      dropOffPort: dropOffPort,
      vesselEntry: vesselEntry,
      slipNumber: slipNumber,
      marinaContact: marinaContact,
      rate: rate,
      commission: commission,
      netToOwner: netToOwner,
      currency: currency,
      numberOfGuests: numberOfGuests,
      typeOfGuests: typeOfGuests,
      previousCharter: previousCharter,
      ownersCharter: ownersCharter,
      references: references,
      note: note,
      intRequestedByUserID: localStorage.getItem('user_id'),
    };
    console.log('onSave');

    dispatch(add(sendData));
  };
  React.useEffect(() => {
    console.log(charterId,'charterIdsss');
  }, [charterId]);
  return (
    <CheckoutContents>
      <LayoutWrapper className="isoCheckoutPage">
        <Box>
          <div className="isoBillingAddressWrapper">
            <div className="isoSectionTitle">
              <Link to="/dashboard/charter" style={margin}>
                <Button color="primary">
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
            </div>
            <div className="isoBillingSection">
              <BillingFormWrapper className="isoBillingForm">
                <div className="isoInputFieldset">
                  <InputBoxWrapper className="isoInputBox">
                    <label>Charter/Trip</label>
                    <Select
                      size="large"
                      onChange={(event) => {
                        setCharter(event);
                      }}
                      value={charter}
                    >
                      <Option value="charter">Charter</Option>
                      <Option value="trip">Trip</Option>
                    </Select>
                  </InputBoxWrapper>
                  <InputBoxWrapper className="isoInputBox">
                    <FormItem
                      validateStatus={reference == '' ? 'error' : 'success'}
                      help={reference == '' ? 'this field is require' : ''}
                    >
                      <label>Reference</label>
                      <Input
                        size="large"
                        onChange={(event) => {
                          setReference(event.target.value);
                        }}
                        value={reference}
                      />
                    </FormItem>
                  </InputBoxWrapper>
                  <InputBoxWrapper className="isoInputBox">
                    <label>Number Of Guests</label>
                    <InputNumber
                      style={{
                        height: '42px',
                        borderRadius: 'unset',
                        width: '200px',
                      }}
                      onChange={(event) => {
                        setNumberOfGuests(event);
                      }}
                      value={numberOfGuests}
                    />
                    {/* <Input
                      size="large"
                      onChange={(event) => {
                        setNumberOfGuests(event.target.value);
                      }}
                      value={numberOfGuests}
                    /> */}
                  </InputBoxWrapper>
                </div>

                <div className="isoInputFieldset">
                  <InputBoxWrapper className="isoInputBox">
                    <FormItem
                      validateStatus={startDate == null ? 'error' : 'success'}
                      help={startDate == null ? 'this field is require' : ''}
                    >
                      <label>Start Date</label>
                      <DatePicker
                        style={{
                          height: '42px',
                          borderRadius: 'unset',
                          width: '100%',
                        }}
                        value={
                          startDate != null
                            ? moment(startDate, 'YYYY-MM-DD HH:mm:ss')
                            : ''
                        }
                        onChange={onStartDateChange}
                      />
                    </FormItem>
                  </InputBoxWrapper>
                  <InputBoxWrapper className="isoInputBox">
                    <FormItem
                      validateStatus={finishDate == null ? 'error' : 'success'}
                      help={finishDate == null ? 'this field is require' : ''}
                    >
                      <label>Finish Date</label>
                      <DatePicker
                        style={{
                          height: '42px',
                          borderRadius: 'unset',
                          width: '100%',
                        }}
                        value={
                          finishDate != null
                            ? moment(finishDate, 'YYYY-MM-DD HH:mm:ss')
                            : ''
                        }
                        onChange={onFinishDateChange}
                      />
                    </FormItem>
                  </InputBoxWrapper>
                  <InputBoxWrapper className="isoInputBox">
                    <label>Type Of Guests</label>
                    <Select
                      size="large"
                      onChange={(event) => {
                        setTypeOfGuests(event);
                      }}
                      value={typeOfGuests}
                    >
                      <Option value="corporate">Corporate</Option>
                      <Option value="couples">Couples</Option>
                      <Option value="family">Family</Option>
                      <Option value="group">Group</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </InputBoxWrapper>
                </div>

                <div className="isoInputFieldset">
                  <InputBoxWrapper className="isoInputBox">
                    <label>Charter Status</label>
                    <Select
                      size="large"
                      onChange={(event) => {
                        setCharterStatus(event);
                      }}
                      value={charterStatus}
                    >
                      <Option value="live">Live</Option>
                      <Option value="onHold">On Hold</Option>
                      <Option value="cancelled">Cancelled</Option>
                    </Select>
                  </InputBoxWrapper>
                  <InputBoxWrapper className="isoInputBox">
                    <label>Cruising Area</label>
                    <Select
                      size="large"
                      onChange={(event) => setCruisinArea(event)}
                    >
                      <Option value="argentina">Argentina</Option>
                      <Option value="australia">Australia</Option>
                      <Option value="brazil">Brazil</Option>
                      <Option value="france">France</Option>
                      <Option value="germany">Germany</Option>
                      <Option value="southafrica">South Africa</Option>
                      <Option value="spain">Spain</Option>
                      <Option value="unitedstate">United State</Option>
                      <Option value="unitedkingdom">United Kingdom</Option>
                    </Select>
                  </InputBoxWrapper>
                </div>

                <Tabs defaultActiveKey="1" className="isoTableDisplayTab">
                  <TabPane tab="General" key="1">
                    <div
                      style={{
                        paddingBottom: '30px',
                        textAlign: 'center',
                        fontSize: '20px',
                      }}
                    >
                      {' '}
                      General{' '}
                    </div>
                    <div className="isoInputFieldset">
                      <InputBoxWrapper className="isoInputBox">
                        <label>Pickup Port</label>
                        <Input
                          size="large"
                          onChange={(event) => {
                            setPickupPort(event.target.value);
                          }}
                          value={pickupPort}
                        />
                      </InputBoxWrapper>
                      <InputBoxWrapper className="isoInputBox">
                        <label>Drop Off Port</label>
                        <Input
                          size="large"
                          onChange={(event) => {
                            setDropOffPort(event.target.value);
                          }}
                          value={dropOffPort}
                        />
                      </InputBoxWrapper>

                      <InputBoxWrapper className="isoInputBox">
                        <label>Marina Contact</label>
                        <Input
                          size="large"
                          onChange={(event) => {
                            setMarinaContact(event.target.value);
                          }}
                          value={marinaContact}
                        />
                      </InputBoxWrapper>
                      <InputBoxWrapper className="isoInputBox">
                        <label>Slip Number</label>
                        <InputNumber
                          style={{
                            height: '42px',
                            borderRadius: 'unset',
                            width: '200px',
                          }}
                          onChange={(event) => {
                            setSlipNumber(event);
                          }}
                          value={slipNumber}
                        />
                        {/* <Input
                      size="large"
                      onChange={(event) => {
                        setSlipNumber(event.target.value);
                      }}
                    /> */}
                      </InputBoxWrapper>
                    </div>
                    <div className="isoInputFieldset">
                      <InputBoxWrapper className="isoInputBox">
                        <label>Vessel Entry</label>
                        <Input
                          size="large"
                          onChange={(event) => {
                            setVesselEntry(event.target.value);
                          }}
                          value={vesselEntry}
                        />
                      </InputBoxWrapper>
                    </div>
                    <div className="isoInputFieldset">
                      <InputBoxWrapper className="isoInputBox">
                        <label>Note</label>
                        <Textarea
                          rows={6}
                          onChange={(event) => {
                            setNote(event.target.value);
                          }}
                          value={note}
                        />
                      </InputBoxWrapper>
                    </div>
                  </TabPane>
                  <TabPane tab="Booking Info" key="2">
                    <div
                      style={{
                        paddingBottom: '30px',
                        textAlign: 'center',
                        fontSize: '20px',
                      }}
                    >
                      {' '}
                      Booking Info{' '}
                    </div>
                    <div className="isoInputFieldset">
                      <InputBoxWrapper className="isoInputBox">
                        <label>Booking Company</label>
                        <Input
                          size="large"
                          onChange={(event) => {
                            setBookingCompany(event.target.value);
                          }}
                          value={bookingCompany}
                        />
                      </InputBoxWrapper>
                      <InputBoxWrapper className="isoInputBox">
                        <label>Booking Broker</label>
                        <Input
                          size="large"
                          onChange={(event) => {
                            setBookingBroker(event.target.value);
                          }}
                          value={bookingBroker}
                        />
                      </InputBoxWrapper>
                      <InputBoxWrapper className="isoInputBox">
                        <FormItem
                          validateStatus={
                            clientStatus == '' ? 'error' : 'success'
                          }
                          help={
                            clientStatus == '' ? 'this field is require' : ''
                          }
                        >
                          <label>Client Status</label>
                          <Select
                            size="large"
                            onChange={(event) => {
                              setClientStatus(event);
                            }}
                            value={clientStatus}
                          >
                            {/* <Option value="none">None</Option> */}
                            <Option value="initialEnquiry">
                              Initial Enquiry
                            </Option>
                            <Option value="cvSent">Cv Sent</Option>
                            <Option value="contractIssued">
                              Contract Issued
                            </Option>
                            <Option value="booked">Booked</Option>
                            <Option value="declined">Declined</Option>
                          </Select>
                        </FormItem>
                      </InputBoxWrapper>
                      <InputBoxWrapper className="isoInputBox">
                        <FormItem
                          validateStatus={
                            ownerStatus == '' ? 'error' : 'success'
                          }
                          help={
                            ownerStatus == '' ? 'this field is require' : ''
                          }
                        >
                          <label>Owner Status</label>
                          <Select
                            size="large"
                            onChange={(event) => {
                              setOwnerStatus(event);
                            }}
                            value={ownerStatus}
                          >
                            {/* <Option value="none">None</Option> */}
                            <Option value="awaitingApproval">
                              Awaiting Approval
                            </Option>
                            <Option value="approved">Approved</Option>
                            <Option value="declined">Declined</Option>
                            <Option value="scheduleClash">
                              Schedule Clash
                            </Option>
                          </Select>
                        </FormItem>
                      </InputBoxWrapper>
                    </div>
                    <div className="isoInputFieldset">
                      <InputBoxWrapper className="isoInputBox">
                        <label>Owners Charter</label>
                        <Select
                          size="large"
                          onChange={(event) => {
                            setOwnersCharter(event);
                          }}
                          value={ownersCharter}
                        >
                          <Option value="unknown">Unknown</Option>
                          <Option value="yes">Yes</Option>
                          <Option value="no">No</Option>
                        </Select>
                      </InputBoxWrapper>

                      <InputBoxWrapper className="isoInputBox">
                        <label>References</label>
                        <Select
                          size="large"
                          onChange={(event) => {
                            setReferences(event);
                          }}
                          value={references}
                        >
                          <Option value="unknown">Unknown</Option>
                          <Option value="yes">Yes</Option>
                          <Option value="no">No</Option>
                        </Select>
                      </InputBoxWrapper>

                      <InputBoxWrapper className="isoInputBox">
                        <label>Previous Charter</label>
                        <Select
                          size="large"
                          onChange={(event) => {
                            setPreviousCharter(event);
                          }}
                          value={previousCharter}
                        >
                          <Option value="unknown">Unknown</Option>
                          <Option value="yes">Yes</Option>
                          <Option value="no">No</Option>
                        </Select>
                      </InputBoxWrapper>
                    </div>
                    <div className="isoInputFieldset">
                      <InputBoxWrapper className="isoInputBox">
                        <label>Currency</label>
                        <Select
                          size="large"
                          onChange={(event) => {
                            setCurrency(event);
                          }}
                          value={currency}
                        >
                          <Option value="euros">Euros</Option>
                          <Option value="usDollar">Us Dollar</Option>
                          <Option value="britishPound">British Pound</Option>
                          <Option value="australianDollar">
                            Australian Dollar
                          </Option>
                          <Option value="canadianDollar">
                            Canadian Dollar
                          </Option>
                          <Option value="costaRicanColon">
                            Costa Rican Colón
                          </Option>
                          <Option value="danishKrone">Danish Krone</Option>
                          <Option value="emiratiDirham">Emirati Dirham</Option>
                          <Option value="hongkongDollar">
                            Hong Kong Dollar
                          </Option>
                          <Option value="indonesianRupiah">
                            Indonesian rupiah
                          </Option>
                          <Option value="newZealandDollar">
                            New Zealand Dollar
                          </Option>
                          <Option value="norwegianKrone">
                            Norwegian Krone
                          </Option>
                          <Option value="qatariRiyal">Qatari Riyal</Option>
                          <Option value="seychellesRupee">
                            Seychelles Rupee
                          </Option>
                          <Option value="swedishKrona">Swedish Krona</Option>
                          <Option value="swissFranc">Swiss Franc</Option>
                          <Option value="thaiBaht">Thai Baht</Option>
                        </Select>
                      </InputBoxWrapper>
                      <InputBoxWrapper className="isoInputBox">
                        <label>Rate</label>
                        <Input
                          size="large"
                          onChange={(event) => {
                            setRate(event.target.value);
                          }}
                          value={rate}
                        />
                      </InputBoxWrapper>
                      <InputBoxWrapper className="isoInputBox">
                        <label>Commission</label>
                        <Input
                          size="large"
                          onChange={(event) => {
                            setCommission(event.target.value);
                          }}
                          value={commission}
                        />
                      </InputBoxWrapper>
                      <InputBoxWrapper className="isoInputBox">
                        <label>Net To Owner</label>
                        <Input
                          size="large"
                          onChange={(event) => {
                            setNetToOwner(event.target.value);
                          }}
                          value={netToOwner}
                        />
                      </InputBoxWrapper>
                    </div>
                  </TabPane>
                  <TabPane tab="Crew" key="3"></TabPane>
                  <TabPane tab="Passengers" key="4"></TabPane>
                  <TabPane tab="Checklists" key="5">
                    <CheckList intCharterId={charterId}></CheckList>
                  </TabPane>
                  <TabPane tab="Documents" key="6"></TabPane>
                  <TabPane tab="Notifications" key="7"></TabPane>
                  <TabPane tab="Log" key="8"></TabPane>
                  <TabPane tab="Weather" key="9"></TabPane>
                </Tabs>               
              </BillingFormWrapper>
            </div>
          </div>
        </Box>
      </LayoutWrapper>
    </CheckoutContents>
  );
}
