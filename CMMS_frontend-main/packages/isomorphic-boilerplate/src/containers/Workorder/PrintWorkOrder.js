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

const MyDocument = ({ workOrder }) => {
  //  console.log(props,'this is props');
  let projectName = ' ';
  let completeByUser = ' ';
  let compltedDate = ' ';
  let completionNote = ' ';
  let problem = ' ';
  let rootCase = ' ';
  let solution = ' ';
  let workOrderInstruction = '';
  if (workOrder) {
    console.log(workOrder);
    projectName = workOrder.project ? workOrder.project.strName : ' ';
    completeByUser = workOrder.completedUser
      ? workOrder.completedUser.strFullName
      : ' ';
    compltedDate = moment(workOrder.workorder.dtmDateCompleted).format(
      'MMMM Do, YYYY'
    );
    completionNote = workOrder.workorder.strCompletionNotes
      ? workOrder.workorder.strCompletionNotes
      : ' ';
    problem = workOrder.workorder.strProblem
      ? workOrder.workorder.strProblem
      : ' ';
    rootCase = workOrder.workorder.strRootCause
      ? workOrder.workorder.strRootCause
      : ' ';
    solution = workOrder.workorder.strSolution
      ? workOrder.workorder.strSolution
      : ' ';
    workOrderInstruction = workOrder.workorder.strWorkInstruction
      ? workOrder.workorder.strWorkInstruction
      : ' ';
  }
  let suggestCompleteData = workOrder
    ? workOrder.workorder.dtmSuggestedCompletionDate
    : null;

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
            {/* <Text style={styles.item_name}>
              WORK ORDER {workOrder ? workOrder.workorder.strCode : ''}
            </Text> */}
          </View>
          <View style={styles.block}>
            <Text style={styles.item_name}>
              WORK ORDER: {workOrder ? workOrder.workorder.strCode : ''}
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
                  {workOrder ? workOrder.workorder._id : ''}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '26pt',
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
                    paddingRight: '15pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Maintenance Type
                </Text>
                <Text style={styles.textCont1}>
                  {workOrder
                    ? maintanceType_array[
                        workOrder.workorder.intMaintenanceTypeID
                      ]
                    : ''}
                </Text>
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
                  Priority{' '}
                </Text>
                <Text style={styles.textCont1}>
                  {workOrder ? priority[workOrder.workorder.intPriorityID] : ''}
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
                <Text style={styles.textCont1}>
                  {workOrder ? priority[workOrder.workorder.intPriorityID] : ''}
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
                  Work Order Status
                </Text>
                <Text style={styles.textCont1}>
                  {workOrder
                    ? workorderStatus_array[
                        workOrder.workorder.intWorkOrderStatusID
                      ]
                    : 'Open'}
                </Text>
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
                  Suggested Completion Date
                </Text>
                <Text style={styles.textCont1}>
                  {moment(suggestCompleteData).format(
                    'MMMM Do YYYY, h:mm:ss A'
                  )}
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
                  {workOrder ? workOrder.workorder.strAssets : ''}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.block} wrap={false}>
            <Text style={styles.section_title}>GENERAL</Text>
            {/* <View
              style={
                (styles.tableRow,
                  { borderStyle: 'solid', borderBottomWidth: 1 })
              }
            >
              <Text
                style={{
                  paddingLeft: '10pt',
                  width: '60%',
                  fontSize: 12,
                  fontfamily: 'Times New Roman',
                  fontStyle: 'bold',
                }}
              >
                {workOrder ? workOrder.workorder.strAssets : ''}
              </Text>
              <Text
                style={{
                  width: '40%',
                  fontSize: 12,
                  fontfamily: 'Times New Roman',
                  textAlign: 'center',
                  fontStyle: 'normal',
                }}
              >
                {' '}
              </Text>
            </View> */}
            <View style={{ flexDirection: 'column' }}>
              <View
                style={{
                  borderStyle: 'solid',
                  paddingTop: 8,
                  borderBottom: 1,
                  borderBottomColor: '#03508c',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingLeft: '5pt',
                    fontSize: 8,
                    height: '15pt',
                    color: '#102f51',
                    textAlign: 'left',
                  }}
                >
                  Summary of Issue:
                </Text>
                <Text
                  style={{
                    paddingLeft: '5pt',
                    fontSize: 10,
                    fontFamily: 'PT Sans',
                    fontWeight: 'bold',
                    paddingBottom: '5pt',
                  }}
                >
                  {workOrder ? workOrder.workorder.strDescription : ''}
                </Text>
              </View>
              <View
                style={{
                  borderStyle: 'solid',
                  paddingTop: 8,
                  borderBottom: 1,
                  borderBottomColor: '#03508c',
                }}
              >
                <Text
                  style={{
                    paddingLeft: '5pt',
                    fontSize: 8,
                    fontFamily: 'PT Sans',
                    height: '20pt',
                    color: '#102f51',
                  }}
                >
                  Work Instructions:
                </Text>
                <Text
                  style={{
                    paddingLeft: '5pt',
                    fontSize: 10,
                    fontFamily: 'PT Sans',
                    fontWeight: 'bold',
                    paddingBottom: '5pt',
                  }}
                >
                  {workOrderInstruction}
                </Text>
              </View>
              <View style={styles.tableRow}>
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
                    Assigned to User
                  </Text>
                  <Text style={styles.textCont}>
                    {workOrder ? workOrder.workorder.strAssignedUsers : ''}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text
                    style={{
                      fontFamily: 'PT Sans',
                      paddingHorizontal: 5,
                      paddingBottom: '3pt',
                      paddingTop: '5pt',
                      paddingRight: '10pt',
                      textAlign: 'left',
                      fontSize: 8,
                      color: '#102f51',
                    }}
                  >
                    Estimated Labor(hrs)
                  </Text>
                  <Text style={styles.textCont}>
                    {workOrder ? workOrder.workorder.intEstimatedHour : ''}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text
                    style={{
                      fontFamily: 'PT Sans',
                      paddingHorizontal: 5,
                      paddingBottom: '3pt',
                      paddingTop: '5pt',
                      paddingRight: '10pt',
                      textAlign: 'left',
                      fontSize: 8,
                      color: '#102f51',
                    }}
                  >
                    Actual Labor(hrs)
                  </Text>
                  <Text style={styles.textCont}>
                    {workOrder ? workOrder.workorder.intActualHour : '0'} hours
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text
                    style={{
                      fontFamily: 'PT Sans',
                      paddingHorizontal: 5,
                      paddingBottom: '3pt',
                      paddingTop: '5pt',
                      paddingRight: '60pt',
                      textAlign: 'left',
                      fontSize: 8,
                      color: '#102f51',
                    }}
                  >
                    Completed By
                  </Text>
                  <Text style={styles.textCont}>{completeByUser}</Text>
                </View>
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
                      paddingRight: '5pt',
                      textAlign: 'left',
                      fontSize: 8,
                      color: '#102f51',
                    }}
                  >
                    Date Completed
                  </Text>
                  <Text style={styles.textCont}>{compltedDate}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.block} wrap={false}>
            <Text style={styles.section_title}>COMPLETION</Text>
            {/* <Text style={{ paddingLeft: "10pt", fontSize:12, fontStyle:"bold"}}>Cost Tracking</Text>    */}
            <View style={{ flexDirection: 'column' }}>
              <View
                style={{
                  borderStyle: 'solid',
                  paddingTop: 8,
                  borderBottom: 1,
                  borderBottomColor: '#03508c',
                }}
              >
                {/* <Text style={{ paddingLeft: "10pt", fontSize:12, fontfamily:"Times New Roman", fontStyle:"bold"}}>Account</Text>
              <Text style={{ paddingLeft: "15pt", fontSize:12, fontfamily:"Times New Roman", fontStyle:"normal"}}>Vessel Maintenance </Text> */}
                <Text
                  style={{
                    paddingLeft: '5pt',
                    fontSize: 8,
                    fontFamily: 'PT Sans',
                    height: '20pt',
                    color: '#102f51',
                  }}
                >
                  Completion Notes
                </Text>
                <Text
                  style={{
                    paddingLeft: '5pt',
                    fontSize: 10,
                    fontFamily: 'PT Sans',
                    fontWeight: 'normal',
                    paddingBottom: '5pt',
                  }}
                >
                  {completionNote}{' '}
                </Text>
              </View>
              <View
                style={{
                  borderStyle: 'solid',
                  paddingTop: 8,
                  borderBottom: 1,
                  borderBottomColor: '#03508c',
                }}
              >
                <Text
                  style={{
                    paddingLeft: '5pt',
                    fontSize: 8,
                    fontFamily: 'PT Sans',
                    height: '20pt',
                    color: '#102f51',
                  }}
                >
                  Problem (briefly outline the problem if any){' '}
                </Text>
                <Text
                  style={{
                    paddingLeft: '5pt',
                    fontSize: 10,
                    fontFamily: 'PT Sans',
                    fontWeight: 'normal',
                    paddingBottom: '5pt',
                  }}
                >
                  {problem}
                </Text>
              </View>
              <View
                style={{
                  borderStyle: 'solid',
                  paddingTop: 8,
                  borderBottom: 1,
                  borderBottomColor: '#03508c',
                }}
              >
                <Text
                  style={{
                    paddingLeft: '5pt',
                    fontSize: 8,
                    fontFamily: 'PT Sans',
                    height: '20pt',
                    color: '#102f51',
                  }}
                >
                  Root Cause (short description of the root cause)
                </Text>
                <Text
                  style={{
                    paddingLeft: '5pt',
                    fontSize: 10,
                    fontFamily: 'PT Sans',
                    fontWeight: 'normal',
                    paddingBottom: '5pt',
                  }}
                >
                  {rootCase}
                </Text>
              </View>
              <View
                style={{
                  borderStyle: 'solid',
                  paddingTop: 8,
                  borderBottom: 1,
                  borderBottomColor: '#03508c',
                }}
              >
                <Text
                  style={{
                    paddingLeft: '5pt',
                    fontSize: 8,
                    fontFamily: 'PT Sans',
                    height: '20pt',
                    color: '#102f51',
                  }}
                >
                  Solution (short description of the solution if any){' '}
                </Text>
                <Text
                  style={{
                    paddingLeft: '5pt',
                    fontSize: 10,
                    fontFamily: 'PT Sans',
                    fontWeight: 'normal',
                    paddingBottom: '5pt',
                  }}
                >
                  {solution}
                </Text>
              </View>
              <View style={styles.tableRow}>
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
                    Assigned to User
                  </Text>
                  <Text style={styles.textCont}>
                    {workOrder ? workOrder.workorder.strAssignedUsers : ''}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text
                    style={{
                      fontFamily: 'PT Sans',
                      paddingHorizontal: 5,
                      paddingBottom: '3pt',
                      paddingTop: '5pt',
                      paddingRight: '10pt',
                      textAlign: 'left',
                      fontSize: 8,
                      color: '#102f51',
                    }}
                  >
                    Estimated Labor(hrs)
                  </Text>
                  <Text style={styles.textCont}>
                    {workOrder ? workOrder.workorder.intEstimatedHour : ''}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text
                    style={{
                      fontFamily: 'PT Sans',
                      paddingHorizontal: 5,
                      paddingBottom: '3pt',
                      paddingTop: '5pt',
                      paddingRight: '10pt',
                      textAlign: 'left',
                      fontSize: 8,
                      color: '#102f51',
                    }}
                  >
                    Actual Labor(hrs)
                  </Text>
                  <Text style={styles.textCont}>
                    {workOrder ? workOrder.workorder.intActualHour : '0'} hours
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text
                    style={{
                      fontFamily: 'PT Sans',
                      paddingHorizontal: 5,
                      paddingBottom: '3pt',
                      paddingTop: '5pt',
                      paddingRight: '60pt',
                      textAlign: 'left',
                      fontSize: 8,
                      color: '#102f51',
                    }}
                  >
                    Completed By
                  </Text>
                  <Text style={styles.textCont}>{completeByUser}</Text>
                </View>
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
                      paddingRight: '5pt',
                      textAlign: 'left',
                      fontSize: 8,
                      color: '#102f51',
                    }}
                  >
                    Date Completed
                  </Text>
                  <Text style={styles.textCont}>{compltedDate}</Text>
                </View>
              </View>
              {/* <View style={{ width: '45%', flexDirection: 'column' }}>
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontfamily: 'Times New Roman',
                    fontStyle: 'bold',
                  }}
                >
                  {' '}
                </Text>
                <Text
                  style={{
                    paddingLeft: '15pt',
                    fontSize: 12,
                    fontfamily: 'Times New Roman',
                    fontStyle: 'normal',
                  }}
                >
                  {' '}
                </Text>
              </View> */}
            </View>
          </View>
          {workOrder ? (
            <>
              {workOrder.laborTask.length != 0 ? (
                <View style={styles.block} wrap={false}>
                  <Text style={styles.section_title}>LABOR TASKS</Text>
                  {workOrder.laborTask.map((col, index) => {
                    return (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            borderBottom: 1,
                            borderBottomColor: '#03508c',
                          }}
                        >
                          <View
                            style={{
                              flex: 0.7,
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
                              Description
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '5pt',
                                fontSize: 9,
                                fontFamily: 'PT Sans',
                                fontWeight: 'bold',
                                paddingBottom: '5pt',
                              }}
                            >
                              {col.strDescription}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 0.1,
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
                              Result
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '5pt',
                                fontSize: 9,
                                fontFamily: 'PT Sans',
                                fontWeight: 'bold',
                                paddingBottom: '5pt',
                              }}
                            >
                              {col.intTaskType == 3 ? col.strResult : ''}{' '}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 0.2,
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
                              Asset
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '5pt',
                                fontSize: 9,
                                fontFamily: 'PT Sans',
                                fontWeight: 'bold',
                                paddingBottom: '5pt',
                              }}
                            >
                              {col.intAssetID
                                ? col.intAssetID.strName +
                                  ' (' +
                                  col.intAssetID.strCode +
                                  ')'
                                : ' '}
                            </Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <View
                            style={{
                              flex: 0.7,
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
                              Assigned To
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '5pt',
                                fontSize: 9,
                                fontFamily: 'PT Sans',
                                fontWeight: 'bold',
                                paddingBottom: '5pt',
                              }}
                            >
                              {col.intAssignedToUserID
                                ? col.intAssignedToUserID.strFullName
                                : ''}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 0.1,
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
                              Hrs. Estimate
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '5pt',
                                fontSize: 9,
                                fontFamily: 'PT Sans',
                                fontWeight: 'normal',
                                paddingBottom: '5pt',
                              }}
                            >
                              {col.intTaskType == 3
                                ? ''
                                : col.dblTimeEstimatedHours
                                ? col.dblTimeEstimatedHours + ' hours'
                                : ''}{' '}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 0.2,
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
                              Hrs. Spent
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '5pt',
                                fontSize: 9,
                                fontFamily: 'PT Sans',
                                fontWeight: 'normal',
                                paddingBottom: '5pt',
                              }}
                            >
                              {col.intTaskType == 3
                                ? ''
                                : col.dblTimeSpentHours
                                ? col.dblTimeSpentHours + ' hours'
                                : ''}{' '}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          {workOrder ? (
            <>
              {workOrder.business.length != 0 ? (
                <View style={styles.block} wrap={false}>
                  <Text style={styles.section_title}>BUSINESSES</Text>
                  <View style={styles.tableheader}>
                    <View
                      style={{
                        flex: 0.25,
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
                        Primary
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.25,
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
                        Business
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.25,
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
                        Business Group
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.25,
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
                        Asset{' '}
                      </Text>
                    </View>
                  </View>
                  {workOrder.business.map((row, index) => {
                    return (
                      <View style={styles.tableRow} key={index}>
                        <View
                          style={{
                            flex: 0.25,
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
                              padding: 5,
                            }}
                          >
                            {' '}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 0.25,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: 'PT Sans',
                              fontWeight: 'bold',
                              fontSize: 9,
                              color: '#000000',
                              padding: 5,
                            }}
                          >
                            {row.strBusinessName}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 0.25,
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
                              padding: 5,
                            }}
                          >
                            {' '}
                            {row.strBusinessGroupName}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 0.25,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: 'PT Sans',
                              fontWeight: 'bold',
                              fontSize: 9,
                              color: '#000000',
                              padding: 5,
                            }}
                          >
                            {row.strAssetName}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          <View style={styles.block} wrap={false}>
            <Text style={styles.section_title}>SIGN OFF</Text>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '70pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Crew Member Signoff:
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
                    color: '#102f51',
                  }}
                >
                  signature________________________________
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    fontFamily: 'PT Sans',
                    paddingHorizontal: 5,
                    paddingBottom: '3pt',
                    paddingTop: '5pt',
                    paddingRight: '80pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Date
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
                    paddingRight: '10pt',
                    textAlign: 'left',
                    fontSize: 8,
                    color: '#102f51',
                  }}
                >
                  Master or Licensed Crew Member Signoff:
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
                    color: '#102f51',
                  }}
                >
                  signature__________________________________
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
                  Signoff Date:
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
  const { getPrintData } = workorderAction;
  let history = useHistory();
  const { printData } = useSelector((state) => state.Workorders);
  const [workOrder, setWorkOrder] = React.useState(null);
  React.useEffect(() => {
    dispatch(getPrintData(id));
  }, []);

  React.useEffect(() => {
    setWorkOrder(printData);
    console.log(printData, 'this is workorder');
  }, [printData]);
  return (
    <div>
      <LayoutWrapper>
        <Box>
          <PageWrapper className="editView">
            <Link to={`/dashboard/workorder`}>
              <Button color="primary">
                <span>Cancel</span>
              </Button>
            </Link>
            <Button color="primary">
              <PDFDownloadLink
                document={<MyDocument workOrder={printData} />}
                fileName={`WO-${id}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download'
                }
              </PDFDownloadLink>
            </Button>
          </PageWrapper>
          <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
            {printData ? (
              <PDFViewer style={{ width: '100%', height: '600px' }}>
                <MyDocument workOrder={printData} />
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
});
