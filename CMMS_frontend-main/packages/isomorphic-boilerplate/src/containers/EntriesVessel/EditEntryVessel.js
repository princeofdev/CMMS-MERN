import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { Col, Row } from 'antd';
// import { EditTable } from '@iso/components/Invoice/InvoiceTable';
import OrderStatus from '@iso/components/Invoice/OrderStatus';
import {
  CrewComplimentTable,
  LogEntriesTable,
  WeatherTable,
} from '../../component/CrewTable/CrewComplimentTable';
// import notification from '@iso/components/Notification';
import Button from '@iso/components/uielements/button';
import Input, { Textarea } from '@iso/components/uielements/input';
import DatePicker from '@iso/components/uielements/datePicker';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageWrapper from './SinglePage.styles';
// import { stringToPosetiveInt } from '@iso/lib/helpers/utility';

// import { orderStatusOptions } from './config';
import EntriesVesselAction from '../../redux/EntriesVessel/actions';
import {
  // Fieldset,
  Form,
  // Label,
  // GeneralLine
} from '../Asset/Facility/OnlineContent.styles';
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '16px',
};
const {
  deleteData,
  editCrewData,
  updateData,
  editLogData,
  getById,
  editWeatherdata,
} = EntriesVesselAction;
const StatusOptions = ['Draft', 'Completed', 'Approved', 'Printed'];
const FormItem = Form.Item;
export default function (props) {
  const { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  // const { editableInvoice, isNewInvoice, redirectPath, toggleView } = props;
  const {
    crewComplimentLists,
    isDelete,
    logEntryLists,
    vesselList,
    weatherLists,
  } = useSelector((state) => state.EntriesVessel);
  const [orderDate, setOrderDate] = React.useState(new Date());
  const [orderStatus, setOrderStatus] = React.useState('Draft');
  const [strWeather, setStrWeather] = React.useState('');
  const [timePeriod, setTimePeriod] = React.useState('');

  const onSave = () => {
    var sendData = {};
    sendData.orderDate = moment(orderDate).format('YYYY-MM-DD');
    sendData.orderStatus = orderStatus;
    sendData.crewComplement = JSON.stringify(crewComplimentLists);
    sendData.logEntries = JSON.stringify(logEntryLists);
    sendData.weather = JSON.stringify(weatherLists);
    sendData.timePeriod = timePeriod;
    dispatch(updateData(sendData, id));
  };
  React.useEffect(() => {
    dispatch(getById(id));
  }, []);
  React.useEffect(() => {
    if (Object.keys(vesselList).length !== 0) {
      setOrderStatus(vesselList.orderStatus);
      setOrderDate(vesselList.orderDate);
      //  setStrWeather(vesselList.weather);
      setTimePeriod(vesselList.timePeriod);
    }
    console.log(weatherLists, 'this is weatherLists');
  }, [vesselList]);

  function handleChange(value) {
    setOrderStatus(value);
  }
  const onDelete = () => {
    dispatch(deleteData(id));
  };
  React.useEffect(() => {
    if (isDelete) {
      history.push('/dashboard/entries_vessel');
    }
  }, [isDelete]);
  return (
    <LayoutWrapper>
      <Box>
        <PageWrapper className="editView">
          <div className="PageContent">
            <div className="PageHeader">
              <Link
                to={'/dashboard/entries_vessel/edit/${id}'}
                className="button-l"
              >
                <Button color="primary">
                  <span>Previous</span>
                </Button>
              </Link>
              <div className="button-r">
                <Link to={'/dashboard/entries_vessel'}>
                  <Button color="primary">
                    <span>Back</span>
                  </Button>
                </Link>
                <Button type="primary" onClick={onSave} className="saveBtn">
                  <span>Save</span>
                </Button>
                <Link to={`/dashboard/entries_vessel/print/${id}`}>
                  <Button type="primary" className="saveBtn">
                    <span>PDF</span>
                  </Button>
                </Link>
                <Button type="danger" onClick={onDelete} className="saveBtn">
                  <span>Delete</span>
                </Button>
                <Link to={`/dashboard/entries_vessel/edit/${id}`}>
                  <Button type="primary" className="saveBtn">
                    <span>Next</span>
                  </Button>
                </Link>
              </div>
            </div>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={4} sm={4} xs={12} style={colStyle}>
                <div className="RightSideStatus">
                  <span className="RightSideStatusSpan"> Status: </span>
                  <OrderStatus
                    value={orderStatus}
                    name="orderStatus"
                    onChange={handleChange}
                    orderStatusOptions={StatusOptions}
                    className="RightStatusDropdown"
                  />
                </div>
              </Col>
              <Col md={6} sm={6} xs={12} style={colStyle}>
                <div className="RightSideDate">
                  Order date:{' '}
                  <DatePicker
                    allowClear={false}
                    value={moment(orderDate)}
                    // onChange={val => {
                    //   setOrderDate(val.toDate())
                    // }}
                    format="YYYY-MM-DD"
                    animateYearScrolling={true}
                  />
                </div>
              </Col>
              <Col md={5} sm={5} xs={12} style={colStyle}>
                <div className="RightSideStatus">
                  <span className="RightSideStatusSpan"> Time Period: </span>
                  <Input
                    placeholder=""
                    className="RightStatusDropdown"
                    value={timePeriod}
                    onChange={(event) => {
                      setTimePeriod(event.target.value);
                    }}
                    style={{ width: '60%' }}
                  />
                </div>
              </Col>
            </Row>
            <div className="InvoiceTable editInvoiceTable">
              <CrewComplimentTable
                editableData={crewComplimentLists}
                editTable={(e) => dispatch(editCrewData(e))}
                // updateValues={updateValues}
              />
              <div className="InvoiceTableBtn">
                <Button
                  onClick={() => {
                    crewComplimentLists.push({
                      key: crewComplimentLists.length + 1,
                      strCrewPosition: '',
                      strName: '',
                      strHoursOnDuty: '',
                      strHoursTotal: '',
                    });
                    dispatch(editCrewData(crewComplimentLists));
                  }}
                  type="primary"
                >
                  Add Item
                </Button>
              </div>
            </div>
            <div className="InvoiceTable editInvoiceTable">
              <WeatherTable
                editableData={weatherLists}
                editTable={(e) => dispatch(editWeatherdata(e))}
                // updateValues={updateValues}
              />
              <div className="InvoiceTableBtn" style={{ marginBottom: '20px' }}>
                <Button
                  onClick={() => {
                    weatherLists.push({
                      key: weatherLists.length + 1,
                      weatherTime: null,
                      weather: '',
                    });
                    dispatch(editWeatherdata(weatherLists));
                  }}
                  type="primary"
                >
                  Add Item
                </Button>
              </div>
            </div>
            <div className="InvoiceTable editInvoiceTable">
              <LogEntriesTable
                editableData={logEntryLists}
                editTable={(e) => dispatch(editLogData(e))}
                // updateValues={updateValues}
              />
              <div className="InvoiceTableBtn">
                <Button
                  onClick={() => {
                    logEntryLists.push({
                      key: logEntryLists.length + 1,
                      strTime: null,
                      strCode: '',
                      strItem: '',
                      strExplanation: '',
                    });
                    dispatch(editLogData(logEntryLists));
                  }}
                  type="primary"
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </PageWrapper>
      </Box>
    </LayoutWrapper>
  );
}
