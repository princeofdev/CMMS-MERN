import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';
import {
  Document,
  PDFDownloadLink,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer';
import Button from '@iso/components/uielements/button';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageWrapper from '../EntriesVessel/SinglePage.styles';
import Pdf from 'react-to-pdf';
import { PDFViewer } from '@react-pdf/renderer';
import moment from 'moment';
import ReactPDF from '@react-pdf/renderer';
// import qrCodePicture from '@iso/assets/images/qrcode/qrSample.png';
import qrCodePicture from '../../assets/images/qrSample.png';
// import equipProtect from '@iso/assets/images/equip/protectionEquip.jpg';
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

const MyDocument = ({ scheduleMaintenance }) => {
  //  console.log(props,'this is props');
  let projectName = ' ';
  let account = ' ';
  let chargeDepartment = ' ';
  let assignedUser = ' ';
  let strCode = ' ';
  let status = 'Active';
  if (scheduleMaintenance) {
    strCode = scheduleMaintenance.data.strCode;
    projectName = scheduleMaintenance.data.intProjectID
      ? scheduleMaintenance.data.intProjectID.strName
      : ' ';
    account = scheduleMaintenance.data.intAccountID
      ? '(' +
        scheduleMaintenance.data.intAccountID.strCode +
        ')' +
        scheduleMaintenance.data.intAccountID.strDescription
      : ' ';
    chargeDepartment = scheduleMaintenance.data.intChargeDepartmentID
      ? '(' +
        scheduleMaintenance.data.intChargeDepartmentID.strCode +
        ')' +
        scheduleMaintenance.data.intChargeDepartmentID.strDescription
      : ' ';
    assignedUser = scheduleMaintenance.data.intAssignedToUserID
      ? scheduleMaintenance.data.intAssignedToUserID.strFullName
      : ' ';
    status = scheduleMaintenance.data.intScheduledMaintenanceStatusID
      ? 'Active'
      : 'Non Active';
    console.log(scheduleMaintenance);
  }

  // let suggestCompleteData=workOrder?workOrder.workorder.dtmSuggestedCompletionDate:null;

  // let heading = props.workOrder.workorder;
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
          </View>
          <View style={styles.block} wrap={false}>
            <Text style={styles.item_name}>
              SCHEDULED MAINTENACE #{strCode}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                borderBottom: 1,
                borderBottomColor: '#03508c',
              }}
            >
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '5pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Code
                </Text>
                <Text style={styles.textCont1}>
                  {scheduleMaintenance ? scheduleMaintenance.data.strCode : ' '}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '45pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Project
                </Text>
                <Text style={styles.textCont1}>{projectName} </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '20pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Maintenance Type
                </Text>
                <Text style={styles.textCont1}>
                  {scheduleMaintenance
                    ? maintanceType_array[
                        scheduleMaintenance.data.intMaintenanceTypeID
                      ]
                    : ' '}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '17pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Priority{' '}
                </Text>
                <Text style={styles.textCont1}>
                  {scheduleMaintenance
                    ? priority[scheduleMaintenance.data.intPriorityID]
                    : ' '}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '15pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Next Trigger Date{' '}
                </Text>
                <Text style={styles.textCont1}></Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '45pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Status
                </Text>
                <Text style={styles.textCont1}>{status}</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '23pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Start As Work Order Status
                </Text>
                <Text style={styles.textCont1}>
                  {scheduleMaintenance
                    ? workorderStatus_array[
                        scheduleMaintenance.data.intStartAsWorkOrderStatusID
                      ]
                    : ' '}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View
                style={{
                  flexDirection: 'column',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '3pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Asset
                </Text>
                <Text style={styles.textCont1}>
                  {scheduleMaintenance
                    ? scheduleMaintenance.data.strAssets
                    : ' '}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.block} wrap={false}>
            <Text style={styles.section_title}>GENERAL</Text>
            <View
              style={{
                flexDirection: 'row',
                borderBottom: 1,
                borderBottomColor: '#03508c',
              }}
            >
              {/* <View style={styles.tableRow}>
            <Text style={{ paddingLeft: "10pt", width: "60%", fontSize: 12, fontfamily: "Times New Roman", fontStyle: "bold" }}>Account</Text>
            <Text style={{ width:"40%", fontSize:12, fontfamily:"Times New Roman", textAlign: "center", fontStyle:"normal"}}></Text>
          </View>
          <Text style={{ paddingLeft: "10pt", fontSize:12, fontFamily:"Lato", fontWeight:"bold", height:"20pt",}}>Summary of Issue:</Text>
          <Text style={{ paddingLeft: "10pt", fontSize: 12, fontfamily: "Times New Roman", fontWeight: "normal", height: "auto" }}>{workOrder ? workOrder.workorder.strDescription:""}</Text> */}
              <View
                style={{
                  width: '3%',
                  flexDirection: 'column',
                  textAlign: 'center',
                }}
              >
                <Text
                  style={{
                    top: '50%',
                    transform: 'rotate(-90deg)',
                    fontFamily: 'PT Sans',
                    fontWeight: 'bold',
                    fontSize: 10,
                    color: '#000000',
                    marginLeft: 5,
                  }}
                >
                  COST
                </Text>
              </View>
              <View
                style={{
                  width: '3%',
                  flexDirection: 'column',
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                  textAlign: 'center',
                }}
              >
                <Text
                  style={{
                    marginTop: 38,
                    transform: 'rotate(-90deg)',
                    fontFamily: 'PT Sans',
                    fontWeight: 'bold',
                    fontSize: 10,
                    color: '#000000',
                    marginRight: 2,
                  }}
                >
                  TRACKING
                </Text>
              </View>
              <View
                style={{
                  width: '65.8%',
                  flexDirection: 'column',
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '5pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Account:
                </Text>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    fontWeight: 'bold',
                    fontSize: 9,
                    color: '#000000',
                    paddingHorizontal: 5,
                    height: 40,
                  }}
                >
                  {account}
                </Text>
              </View>
              <View
                style={{
                  width: '28.2%',
                  flexDirection: 'column',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '5pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Charge Department
                </Text>
                <Text style={styles.textCont}>{chargeDepartment}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View
                style={{
                  width: '6%',
                  flexDirection: 'column',
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text
                  style={{
                    transform: 'rotate(-90deg)',
                    fontFamily: 'PT Sans',
                    fontWeight: 'bold',
                    fontSize: 10,
                    color: '#000000',
                    textAlign: 'center',
                    marginLeft: '6px',
                    width: '20px',
                    maxLines: 1,
                    top: '60%',
                  }}
                >
                  MAINTENACE
                </Text>
              </View>
              <View
                style={{
                  width: '94%',
                  flexDirection: 'column',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottom: 1,
                    borderBottomColor: '#03508c',
                  }}
                >
                  <View
                    style={{
                      width: '70%',
                      flexDirection: 'column',
                      borderRightColor: '#03508c',
                      borderRightWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'PT Sans',
                        paddingHorizontal: 5,
                        paddingBottom: '3pt',
                        paddingTop: '5pt',
                        paddingRight: '5pt',
                        textAlign: 'left',
                        fontSize: 8,
                        color: '#102f51',
                      }}
                    >
                      Summary of Issue:
                    </Text>
                    <Text style={styles.textCont1}>
                      {scheduleMaintenance
                        ? scheduleMaintenance.data.strDescription
                        : ' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '17%',
                      flexDirection: 'column',
                      borderRightColor: '#03508c',
                      borderRightWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'PT Sans',
                        paddingHorizontal: 5,
                        paddingBottom: '3pt',
                        paddingTop: '5pt',
                        paddingRight: '5pt',
                        textAlign: 'left',
                        fontSize: 8,
                        color: '#102f51',
                      }}
                    >
                      Assigned to User
                    </Text>
                    <Text style={styles.textCont}>{assignedUser}</Text>
                  </View>
                  <View
                    style={{
                      width: '13%',
                      flexDirection: 'column',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'PT Sans',
                        paddingHorizontal: 5,
                        paddingBottom: '3pt',
                        paddingTop: '5pt',
                        paddingRight: '5pt',
                        textAlign: 'left',
                        fontSize: 8,
                        color: '#102f51',
                      }}
                    >
                      Estimated Labor
                    </Text>
                    <Text style={styles.textCont}>
                      {scheduleMaintenance
                        ? scheduleMaintenance.data.dblTimeEstimatedHours
                        : ' '}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text
                      style={{
                        fontFamily: 'PT Sans',
                        paddingHorizontal: 5,
                        paddingBottom: '3pt',
                        paddingTop: '5pt',
                        paddingRight: '5pt',
                        textAlign: 'left',
                        fontSize: 8,
                        color: '#102f51',
                      }}
                    >
                      Work Instructions:
                    </Text>
                    <Text style={styles.textCont}>
                      {scheduleMaintenance
                        ? scheduleMaintenance.data.strWorkInstruction
                        : ' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.block} wrap={false}>
            <Text style={styles.section_title}>SCHEDULING</Text>
            <View style={styles.tableRow}>
              <View
                style={{
                  width: '18%',
                  flexDirection: 'column',
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                  textAlign: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    fontWeight: 'bold',
                    fontSize: 11,
                    color: '#000000',
                    padding: 4,
                  }}
                >
                  GENERATE WORK ORDER WHEN
                </Text>
              </View>
              <View
                style={{
                  width: '82%',
                  flexDirection: 'column',
                }}
              >
                <View style={styles.tableRow}>
                  <View
                    style={{
                      flex: 0.333,
                      flexDirection: 'column',
                      borderRightColor: '#03508c',
                      borderRightWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'PT Sans',
                        paddingHorizontal: 5,
                        paddingBottom: '3pt',
                        paddingTop: '5pt',
                        textAlign: 'left',
                        fontSize: 8,
                        color: '#102f51',
                      }}
                    >
                      Trigger Description
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.333,
                      flexDirection: 'column',
                      borderRightColor: '#03508c',
                      borderRightWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'PT Sans',
                        paddingHorizontal: 5,
                        paddingBottom: '3pt',
                        paddingTop: '5pt',
                        textAlign: 'left',
                        fontSize: 8,
                        color: '#102f51',
                      }}
                    >
                      Current Asset Reading
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.333,
                      flexDirection: 'column',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'PT Sans',
                        paddingHorizontal: 5,
                        paddingBottom: '3pt',
                        paddingTop: '5pt',
                        textAlign: 'left',
                        fontSize: 8,
                        color: '#102f51',
                      }}
                    >
                      Next Trigger Threshold
                    </Text>
                  </View>
                </View>

                {scheduleMaintenance ? (
                  <>
                    {scheduleMaintenance.SchedulTrigger.map((row, index) => {
                      return (
                        <View style={styles.tableRow} key={index}>
                          <View
                            style={{
                              flex: 0.333,
                              flexDirection: 'column',
                              borderRightColor: '#03508c',
                              borderRightWidth: 1,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: 'PT Sans',
                                fontWeight: 'bold',
                                fontSize: 9,
                                color: '#000000',
                                paddingHorizontal: 5,
                                paddingBottom: 5,
                              }}
                            >
                              {row.strScheduleDescription}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 0.333,
                              flexDirection: 'column',
                              borderRightColor: '#03508c',
                              borderRightWidth: 1,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: 'PT Sans',
                                fontWeight: 'bold',
                                fontSize: 9,
                                color: '#000000',
                                paddingHorizontal: 5,
                                paddingBottom: 5,
                              }}
                            >
                              {' '}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 0.333,
                              flexDirection: 'column',
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: 'PT Sans',
                                fontWeight: 'bold',
                                fontSize: 9,
                                color: '#000000',
                                paddingHorizontal: 5,
                                paddingBottom: 5,
                              }}
                            >
                              {row.strthreshold
                                ? row.strthreshold.split(',')[0]
                                : ''}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </>
                ) : null}
              </View>
            </View>
          </View>

          <View style={styles.block} wrap={false}>
            <Text style={styles.section_title}>LABOR TASKS</Text>
            <View style={styles.tableRow}>
              <View
                style={{
                  flex: 0.4,
                  flexDirection: 'column',
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Description
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'column',
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Asset
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  flexDirection: 'column',
                  borderRightColor: '#03508c',
                  borderRightWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Assigned To
                </Text>
              </View>
              <View
                style={{
                  flex: 0.1,
                  flexDirection: 'column',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Hrs. Estimate
                </Text>
              </View>
            </View>
            {scheduleMaintenance ? (
              <>
                {scheduleMaintenance.scheduledTask.map((row, index) => {
                  return (
                    <View style={{ flexDirection: 'row' }} key={index}>
                      <View
                        style={{
                          flex: 0.4,
                          flexDirection: 'column',
                          borderRightColor: '#03508c',
                          borderRightWidth: 1,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: 'PT Sans',
                            fontWeight: 'bold',
                            fontSize: 9,
                            color: '#000000',
                            paddingHorizontal: 5,
                            paddingBottom: 3,
                          }}
                        >
                          {row.strDescription}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.3,
                          flexDirection: 'column',
                          borderRightColor: '#03508c',
                          borderRightWidth: 1,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: 'PT Sans',
                            fontWeight: 'bold',
                            fontSize: 9,
                            color: '#000000',
                            paddingHorizontal: 5,
                            paddingBottom: 3,
                          }}
                        >
                          {row.intAssetID
                            ? row.intAssetID.strName +
                              ' (' +
                              row.intAssetID.strCode +
                              ')'
                            : ' '}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.2,
                          flexDirection: 'column',
                          borderRightColor: '#03508c',
                          borderRightWidth: 1,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: 'PT Sans',
                            fontWeight: 'bold',
                            fontSize: 9,
                            color: '#000000',
                            paddingHorizontal: 5,
                            paddingBottom: 3,
                          }}
                        >
                          {row.intAssignedToUserID
                            ? row.intAssignedToUserID.strFullName
                            : ''}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.1,
                          flexDirection: 'column',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: 'PT Sans',
                            fontWeight: 'bold',
                            fontSize: 9,
                            color: '#000000',
                            paddingHorizontal: 5,
                            paddingBottom: 3,
                          }}
                        >
                          {row.dblTimeEstimatedHours
                            ? row.dblTimeEstimatedHours + ' hours'
                            : ' '}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </>
            ) : null}
          </View>

          {/* {
          workOrder ?
          <>{
            workOrder.business.length!=0?          
        <View style={styles.block}>
          <Text style={styles.section_title}>Businesses</Text>
          <View style={styles.tableheader}>
            <Text style={{ paddingLeft: "10pt", fontSize: 12, fontFamily: "Lato", fontWeight: "bold", width: "25%" }}>Primary</Text>
            <Text style={{ paddingLeft: "10pt", fontSize: 12, fontFamily: "Lato", fontWeight: "bold", width: "35%" }}>Business</Text>
            <Text style={{ paddingLeft: "10pt", fontSize: 12, fontFamily: "Lato", fontWeight: "bold", width: "20%" }}>Business Group</Text>
            <Text style={{ paddingLeft: "10pt", fontSize: 12, fontFamily: "Lato", fontWeight: "bold", width: "20%" }}>Asset </Text>
          </View>
       {       
          workOrder.business.map((row,index)=>{
            return <View style={styles.tableRow} key={index}>
              <Text style={{ paddingLeft: "10pt", fontSize: 11, fontfamily: "Times New Roman", fontWeight: "normal", width: "25%" }}> </Text>
              <Text style={{ paddingLeft: "10pt", fontSize: 11, fontfamily: "Times New Roman", fontWeight: "normal", width: "35%" }}>{row.strBusinessName}</Text>
              <Text style={{ paddingLeft: "10pt", fontSize: 11, fontfamily: "Times New Roman", fontWeight: "normal", width: "20%" }}> {row.strBusinessGroupName}</Text>
              <Text style={{ paddingLeft: "10pt", fontSize: 11, fontfamily: "Times New Roman", fontWeight: "normal", width: "20%" }}>{row.strAssetName}</Text>
            </View>
          })} 
        </View>:<></>
            }</> : <></>} */}
          <View style={styles.block} wrap={false}>
            <Text style={styles.section_title}>APPROVAL</Text>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '90pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Department
                </Text>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingVertical: '5px',
                    width: '70%',
                    marginBottom: 3,
                    paddingTop: '20px',
                    marginLeft: '5pt',
                    fontSize: 8,
                  }}
                ></Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '30pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Assigned to:
                </Text>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingVertical: '5px',
                    width: '70%',
                    marginBottom: 3,
                    paddingTop: '20px',
                    marginLeft: '5pt',
                    fontSize: 8,
                  }}
                ></Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '140pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Master:
                </Text>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingVertical: '5px',
                    width: '70%',
                    marginBottom: 3,
                    paddingTop: '20px',
                    marginLeft: '5pt',
                    fontSize: 8,
                    color: '#03508c',
                  }}
                >
                  signature_____________________________________
                </Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '5pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Approval Date:
                </Text>
                <Text
                  style={{
                    paddingVertical: '5px',
                    width: '70%',
                    marginBottom: 3,
                    paddingTop: '20px',
                    marginLeft: '5pt',
                    fontSize: 8,
                  }}
                ></Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
const EmptyDocument = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text>Section #2</Text>
        </View>
        <View>
          <Text>Section #3</Text>
        </View>
      </Page>
    </Document>
  );
};
export default function (props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getPrintData } = sheduleAction;
  let history = useHistory();
  const { printData } = useSelector((state) => state.ScheduledMaintenance);
  const [scheduleMaintenance, setScheduleMaintenance] = React.useState(null);
  React.useEffect(() => {
    dispatch(getPrintData(id));
  }, []);

  React.useEffect(() => {
    setScheduleMaintenance(printData);
    console.log(printData, 'this is workorder');
  }, [printData]);
  return (
    <div>
      <LayoutWrapper>
        <Box>
          <PageWrapper className="editView">
            <Link to={`/dashboard/scheduledmaintenance`}>
              <Button color="primary">
                <span>Cancel</span>
              </Button>
            </Link>
            <Button color="primary">
              <PDFDownloadLink
                document={
                  <MyDocument scheduleMaintenance={scheduleMaintenance} />
                }
                fileName={`SM-${id}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download'
                }
              </PDFDownloadLink>
            </Button>
          </PageWrapper>
          <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
            {scheduleMaintenance ? (
              <PDFViewer style={{ width: '100%', height: '600px' }}>
                <MyDocument scheduleMaintenance={scheduleMaintenance} />
              </PDFViewer>
            ) : null}
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
    margin: '1pt',
    flexDirection: 'row',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
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
  tableheaderRow: {
    marginBottom: '4pt',
    flexDirection: 'row',
  },
});
