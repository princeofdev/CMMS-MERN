import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';
import moment from 'moment';
import Button from '@iso/components/uielements/button';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageWrapper from './SinglePage.styles';
import {
  Document,
  PDFDownloadLink,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  PDFViewer,
} from '@react-pdf/renderer';
import qrCodePicture from '../../assets/images/qrSample.png';
import EntriesVesselAction from '../../redux/EntriesVessel/actions';
import fontBankB from '../../assets/fonts/bankgothic_bold.ttf';
import fontBankR from '../../assets/fonts/BankGothic-Regular.ttf';
import fontTimeB from '../../assets/fonts/TimesNewerRoman-Bold.ttf';
import fontTimeN from '../../assets/fonts/TimesNewerRoman-Regular.ttf';
import fontMontserrat from '../../assets/fonts/Montserrat-SemiBold.ttf';
import PT_SansA from '../../assets/fonts/PT_Sans-Web-Regular.ttf';
import PT_SansB from '../../assets/fonts/PT_Sans-Web-Bold.ttf';
// import fontBankB from '@iso/assets/fonts/bankgothic_bold.ttf';
// import fontBankR from '@iso/assets/fonts/BankGothic-Regular.ttf';
// import fontTimeB from '@iso/assets/fonts/TimesNewerRoman-Bold.otf';
// import fontTimeN from '@iso/assets/fonts/TimesNewerRoman-Regular.otf';

import workorderAction from '../../redux/workorder/actions';
import sheduleAction from '../../redux/scheduledmaintenance/actions';
// import latoBold from "@iso/assets/fonts/Lato-Bold.ttf"
import LatoR from '../../assets/fonts/Lato-Regular.ttf';
import LatoB from '../../assets/fonts/Lato-Bold.ttf';
import { render } from 'nprogress';
const ref = React.createRef();
const { getById } = EntriesVesselAction;
var weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

// Font.register({
//   family: 'Open Sans',
//   fonts: [
//     { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
//     { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
//   ]
// });

// Font.register({
//   family: 'Lato',
//   fonts: [
//     {
//       src: `https://github.com/diegomura/react-pdf/blob/master/examples/resume/fonts/fonts/Lato/Lato-Regular.ttf`
//     },
//     {
//       src: `https://github.com/diegomura/react-pdf/blob/master/examples/resume/fonts/fonts/Lato/Lato-Bold.ttf`,
//       fontWeight: 'bold'
//     }
//   ]
// })
Font.register({
  family: 'Lato',
  fonts: [
    {
      src: fontTimeN,
    },
    {
      src: fontTimeB,
      fontWeight: 'bold',
    },
  ],
});
Font.register({
  family: 'Lato Bold',
  src: LatoB,
  fontWeight: 'bold',
  format: 'truetype',
});

Font.register({
  family: 'Times New Roman',
  fonts: [
    {
      src: fontTimeN,
      format: 'truetype',
    },
    {
      src: fontTimeB,
      fontWeight: 'bold',
      format: 'truetype',
    },
  ],
});
Font.register({
  family: 'BankGothic',
  fonts: [
    { src: fontBankR },
    { src: fontBankB, fontWeight: 'bold' },
    // {src: fontBankR,fontWeight:"normal"},
  ],
});
Font.register({
  family: 'Montserrat',
  fonts: [{ src: fontMontserrat }],
});
Font.register({
  family: 'PT Sans',
  fonts: [{ src: PT_SansA }, { src: PT_SansB, fontWeight: 'bold' }],
});
const workorderStatus_array = {
  2: 'Requested',
  3: 'Assigned',
  4: 'Open',
  5: 'Work In Progress',
  6: 'On Hold',
  7: 'Closed, Completed',
  8: 'Draft',
  9: 'Closed, Incomplete',
  10: 'Other',
};
const maintanceType_array = {
  1: 'Preventive',
  2: 'Damage',
  3: 'Corrective',
  4: 'Safety',
  5: 'Upgrade',
  6: 'Electrical',
  7: 'Project',
  8: 'Inspection',
  9: 'Meter_Reading',
  10: 'Other',
};
const priority = {
  1: 'Hightest',
  2: 'High',
  3: 'Medium',
  4: 'Low',
  5: 'Lowest',
};
// const ref = React.createRef();

const MyDocument = ({ dailyO, crew, weather, log }) => {
  //  console.log(dailyO, crew, weather, log ,'this is props');
  let timePeriod = dailyO.timePeriod;
  return (
    <Document>
      <Page size="Letter" style={styles.page} wrap={true}>
        <View style={styles.pageMargin}>
          <View style={styles.tableheaderRow}>
            <View style={{ marginTop: '15px', textAlign: 'center' }}>
              <Text style={styles.brand}>M/V Grand Luxe</Text>
            </View>
            <View style={{ width: '12.5%', marginLeft: '190px' }}>
              <Image src={qrCodePicture} />
            </View>
            {/* <Text style={styles.item_name}>
              WORK ORDER {workOrder ? workOrder.workorder.strCode : ''}
            </Text> */}
          </View>
          <View style={styles.block}>
            <Text style={styles.item_name}>
              ENTRIES RELATING TO DAILY VESSEL OPERATIONS
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 0.333,
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text style={styles.field_title}> Time Period</Text>
                <Text style={styles.textCont}> {timePeriod}</Text>
              </View>
              <View
                style={{
                  flex: 0.333,
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text style={styles.field_title}> Day</Text>
                <Text style={styles.textCont}> {dailyO.weekDay}</Text>
              </View>
              <View style={{ flex: 0.333 }}>
                <Text style={styles.field_title}> Date </Text>
                <Text style={styles.textCont}> {dailyO.orderDate}</Text>
              </View>
            </View>
          </View>

          <View style={styles.block} wrap={false}>
            <Text style={styles.section_title}>CREW COMPLEMENT</Text>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 0.1,
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text style={styles.timePeriod}>No</Text>
              </View>
              <View
                style={{
                  flex: 0.6,
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text style={styles.timePeriod}>Name</Text>
              </View>
              <View
                style={{
                  flex: 0.15,
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text style={styles.timePeriod}>Hours on {'\n'} Duty</Text>
              </View>
              <View style={{ flex: 0.15 }}>
                <Text style={styles.timePeriod}>Hours {'\n'} Total</Text>
              </View>
            </View>
            {crew.map((row, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderTopColor: '#03508c',
                  }}
                >
                  <View
                    style={{
                      flex: 0.1,
                      borderRightColor: '#03508c',
                      borderRightWidth: 1,
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={styles.textCont}>{++index}</Text>
                  </View>
                  <View
                    style={{
                      flex: 0.6,
                      borderRightColor: '#03508c',
                      borderRightWidth: 1,
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={styles.textCont}>{row.strName}</Text>
                  </View>
                  <View
                    style={{
                      flex: 0.15,
                      borderRightColor: '#03508c',
                      borderRightWidth: 1,
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={styles.textCont}>{row.strHoursOnDuty}</Text>
                  </View>
                  <View style={{ flex: 0.15, paddingVertical: 5 }}>
                    <Text style={styles.textCont}>{row.strHoursTotal}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.block} wrap={false}>
            <Text style={styles.section_title}>WEATHER</Text>
            {weather.map((row, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderTopColor: '#03508c',
                  }}
                >
                  <View
                    style={{
                      flex: 0.1,
                      borderRightColor: '#03508c',
                      borderRightWidth: 1,
                      paddingVertical: 3,
                    }}
                  >
                    <Text style={styles.textCont}>
                      {row.weatherTime != null
                        ? moment(row.weatherTime).format('HH:mm')
                        : ''}
                    </Text>
                  </View>
                  <View style={{ flex: 0.9, paddingVertical: 4 }}>
                    <Text style={styles.textCont}>{row.weather}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.block} wrap={false}>
            <Text style={styles.section_title}>LOG ENTRIES</Text>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flex: 0.15,
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text style={styles.field_title}>Time</Text>
              </View>
              <View
                style={{
                  flex: 0.15,
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text style={styles.field_title}>Code (Letter)</Text>
              </View>
              <View
                style={{
                  flex: 0.15,
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text style={styles.field_title}>Item (Number)</Text>
              </View>
              <View style={{ flex: 0.55 }}>
                <Text style={styles.field_title}>
                  Explanation Of Each Entry
                </Text>
              </View>
            </View>
            {log.map((row, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderTopColor: '#03508c',
                  }}
                >
                  <View
                    style={{
                      flex: 0.15,
                      borderRightColor: '#03508c',
                      borderRightWidth: 1,
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={styles.textCont}>
                      {row.strTime != null
                        ? moment(row.strTime).format('HH:mm')
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.15,
                      borderRightColor: '#03508c',
                      borderRightWidth: 1,
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={styles.textCont}>{row.strCode}</Text>
                  </View>
                  <View
                    style={{
                      flex: 0.15,
                      borderRightColor: '#03508c',
                      borderRightWidth: 1,
                      paddingVertical: 4,
                    }}
                  >
                    <Text style={styles.textCont}>{row.strItem}</Text>
                  </View>
                  <View style={{ flex: 0.55, paddingVertical: 5 }}>
                    <Text style={styles.textCont}>{row.strExplanation}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};
// const EmptyDocument = () => {
//   return <Document>
//           <Page size="A4" style={styles.page}>
//       <View >
//         <Text style={{ fontFamily: 'Open Sans', fontWeight: '600' }}>Section #1</Text>
//             </View>
//       <View >
//         <Text style={{ fontFamily: 'BankGothic Md BT', fontWeight: 'bold' }}>Section #2</Text>
//       </View>
//       <View style={{ fontFamily: 'Lato', fontWeight: 'bold' }}>
//         <Text style={{ fontFamily: 'Lato', fontWeight: 'bold' }}>Section #3</Text>
//       </View>

//          </Page>
//       </Document>
// }
export default function (props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();
  // const { editableInvoice, isNewInvoice, redirectPath, toggleView } = props;
  const {
    crewComplimentLists,
    isDelete,
    logEntryLists,
    vesselList,
    weatherLists,
  } = useSelector((state) => state.EntriesVessel);
  const [timePeriod, setTimePeriod] = React.useState('');
  const [weekDay, setWeekDay] = React.useState('');
  const [orderDate, setOrderDate] = React.useState('');

  React.useEffect(() => {
    dispatch(getById(id));
  }, []);
  React.useEffect(() => {
    if (Object.keys(vesselList).length !== 0) {
      setTimePeriod(vesselList.timePeriod);
      const day = new Date(vesselList.orderDate).getDay();
      setWeekDay(weekday[day]);
      setOrderDate(
        moment(vesselList.orderDate).format('MMMM Do YYYY') + '    '
      );
    }
  }, [vesselList]);
  const DownloadPdf = () => {
    return useMemo(
      () => (
        <PDFDownloadLink
          document={
            <MyDocument
              dailyO={vesselList}
              crew={crewComplimentLists}
              weather={weatherLists}
              log={logEntryLists}
            />
          }
          fileName="ENTRIES RELATING TO DAILY VESSEL OPERATIONS.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download'
          }
        </PDFDownloadLink>
      ),
      []
    );
  };
  // const { id } = useParams();
  // const dispatch = useDispatch();
  // const { getPrintData } = workorderAction;
  // let history = useHistory();
  // const { printData } = useSelector((state) => state.Workorders);
  // const [workOrder, setWorkOrder] = React.useState(null);
  // React.useEffect(() => {
  //   dispatch(getPrintData(id));
  // }, []);

  // React.useEffect(() => {
  //   setWorkOrder(printData);
  //   console.log(printData, 'this is workorder');
  // }, [printData]);
  return (
    <div>
      <LayoutWrapper>
        <Box>
          <PageWrapper className="editView">
            <Link to={`/dashboard/entries_vessel/edit/${id}`}>
              <Button color="primary">
                <span>Cancel</span>
              </Button>
            </Link>
            <Button color="primary">
              <DownloadPdf></DownloadPdf>
            </Button>
          </PageWrapper>
          <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
            <PDFViewer style={{ width: '100%', height: '650px' }}>
              <MyDocument
                dailyO={vesselList}
                crew={crewComplimentLists}
                weather={weatherLists}
                log={logEntryLists}
              />
            </PDFViewer>
          </div>
        </Box>
      </LayoutWrapper>
    </div>
  );
}

const styles = StyleSheet.create({
  page: {
    // backgroundColor: '#ffffff',
    paddingTop: '30pt',
    paddingBottom: '10pt',
  },
  pageMargin: {
    marginTop: '15pt',
    marginBottom: '15pt',
    marginLeft: '45pt',
    marginRight: '30pt',
  },
  brand: {
    fontSize: 32,
    fontFamily: 'BankGothic',
    // fontfamily: 'Lato Bold',
    // fontStyle: "normal",
    fontWeight: 'bold',
    color: '#03508c',
    // textAlign: "center",
    // marginBottom: "5pt",
  },
  item_name: {
    fontSize: '14pt',
    paddingLeft: '4pt',
    paddingVertical: '5pt',
    fontWeight: 'bold',
    backgroundColor: '#03508c',
    color: 'white',
    fontFamily: 'Montserrat',
  },
  block: {
    borderStyle: 'solid',
    borderColor: '#03508c',
    borderWidth: 1,
    flexDirection: 'column',
    marginBottom: '5pt',
  },
  tableheader: {
    flexDirection: 'row',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#03508c',
  },
  tableheaderRow: {
    marginBottom: '4pt',
    flexDirection: 'row',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableEndRow: {
    marginBottom: '7pt',
    flexDirection: 'row',
    marginTop: '4pt',
  },
  tableCol: {
    // borderStyle: "solid",
    // borderWidth: 1,
    flexDirection: 'column',
    borderRightColor: '#03508c',
    borderRightWidth: 1,
  },
  tableCell: {
    alignContent: 'center',
    paddingVertical: '50px',
  },
  section_title: {
    fontSize: '11pt',
    paddingLeft: '4pt',
    paddingVertical: '5pt',
    fontWeight: 'bold',
    backgroundColor: '#03508c',
    color: 'white',
    fontFamily: 'Montserrat',
  },
  timePeriod: {
    paddingHorizontal: 5,
    paddingBottom: '3pt',
    paddingTop: '5pt',
    textAlign: 'left',
    fontSize: 8,
    color: '#102f51',
  },
  textCont1: {
    fontFamily: 'PT Sans',
    fontWeight: 'bold',
    fontSize: 9,
    color: '#000000',
    paddingHorizontal: 5,
    paddingBottom: 15,
  },
  textCont: {
    fontFamily: 'PT Sans',
    fontWeight: 'bold',
    fontSize: 9,
    color: '#000000',
    paddingHorizontal: 5,
    paddingBottom: 3,
  },
  field_title: {
    fontFamily: 'PT Sans',
    paddingHorizontal: 5,
    paddingBottom: '3pt',
    paddingTop: '5pt',
    paddingRight: '5pt',
    textAlign: 'left',
    fontSize: 8,
    color: '#102f51',
  },
});
