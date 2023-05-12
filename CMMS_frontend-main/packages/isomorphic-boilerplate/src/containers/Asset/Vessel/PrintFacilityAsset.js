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
import PageWrapper from '../../EntriesVessel/SinglePage.styles';
import Pdf from 'react-to-pdf';
import { PDFViewer } from '@react-pdf/renderer';
import moment from 'moment';
import ReactPDF from '@react-pdf/renderer';
// import qrCodePicture from '@iso/assets/images/qrcode/qrSample.png';
import qrCodePicture from '../../../assets/images/qrSample.png';
// import equipProtect from '@iso/assets/images/equip/protectionEquip.jpg';
import fontBankB from '../../../assets/fonts/bankgothic_bold.ttf';
import fontBankR from '../../../assets/fonts/BankGothic-Regular.ttf';
import fontTimeB from '../../../assets/fonts/TimesNewerRoman-Bold.ttf';
import fontTimeN from '../../../assets/fonts/TimesNewerRoman-Regular.ttf';
// import fontBankB from '@iso/assets/fonts/bankgothic_bold.ttf';
// import fontBankR from '@iso/assets/fonts/BankGothic-Regular.ttf';
// import fontTimeB from '@iso/assets/fonts/TimesNewerRoman-Bold.otf';
// import fontTimeN from '@iso/assets/fonts/TimesNewerRoman-Regular.otf';

import workorderAction from '../../../redux/workorder/actions';
import assetAction from '../../../redux/asset/actions';
// import latoBold from "@iso/assets/fonts/Lato-Bold.ttf"
import LatoR from '../../../assets/fonts/Lato-Regular.ttf';
import LatoB from '../../../assets/fonts/Lato-Bold.ttf';

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

// const ref = React.createRef();

const MyDocument = ({ printData }) => {
  //  console.log(props,'this is props');
  let assetName = ' ';
  let assetCode = ' ';
  let assetDescription = ' ';
  let assetCategory = ' ';
  let locationPart = 'Location'; //"Location":"Part"
  let locationPartName = ' ';
  let strAccount = ' ';
  let strChargeDepartment = ' ';
  let strWorkInstruction = ' ';

  let strMake = ' ';
  let strModel = ' ';
  let strSerialNumber = ' ';
  let strBarcode = ' ';
  let strUnspcCode = ' ';

  let strAddress = ' ';
  let strCity = ' ';
  let strPostalCode = ' ';
  let strProvince = ' ';
  let strCountryName = ' ';

  if (printData) {
    assetName = printData.asset.strName;
    assetCode = printData.asset.strCode;
    assetDescription =
      printData.asset.strDescription != ''
        ? printData.asset.strDescription
        : ' ';
    // strAsile = printData.asset.strAisle != "" ? printData.asset.strAisle : ' ';
    // strRow = printData.asset.strRow != "" ? printData.asset.strRow : ' ';
    // strBinNumber = printData.asset.strBinNumber != "" ? printData.asset.strBinNumber : ' ';
    strAddress =
      printData.asset.strAddress != '' ? printData.asset.strAddress : ' ';
    strCity = printData.asset.strCity != '' ? printData.asset.strCity : ' ';
    strPostalCode =
      printData.asset.strPostalCode != '' ? printData.asset.strPostalCode : ' ';
    strProvince =
      printData.asset.strProvince != '' ? printData.asset.strProvince : ' ';
    strCountryName =
      printData.asset.strCountryName != ''
        ? printData.asset.strCountryName
        : ' ';

    strWorkInstruction =
      printData.asset.strNotes != '' ? printData.asset.strNotes : ' ';
    strMake = printData.asset.strMake != '' ? printData.asset.strMake : ' ';
    strModel = printData.asset.strModel != '' ? printData.asset.strModel : ' ';
    strSerialNumber =
      printData.asset.strSerialNumber != ''
        ? printData.asset.strSerialNumber
        : ' ';
    strBarcode =
      printData.asset.strBarcode != '' ? printData.asset.strBarcode : ' ';
    strUnspcCode =
      printData.asset.strUnspcCode != '' ? printData.asset.strUnspcCode : ' ';

    if (Object.keys(printData.assetCategory).length != 0)
      assetCategory = printData.assetCategory.strName;
    if (printData.asset.intAssetParentID != 0) {
      locationPart = 'Part';
      locationPartName = printData.parentAsset.strName;
    } else {
      locationPart = 'Location';
      locationPartName = printData.parentAsset.strName;
    }
    if (Object.keys(printData.account).length != 0)
      strAccount =
        '(' +
        printData.account.strCode +
        ')' +
        printData.account.strDescription;
    if (Object.keys(printData.chargeDepartment).length !== 0)
      strChargeDepartment =
        '(' +
        printData.chargeDepartment.strCode +
        ')' +
        printData.chargeDepartment.strDescription;
  }

  // let heading = props.workOrder.workorder;
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={true}>
        <View style={styles.pageMargin}>
          <View style={styles.block}>
            <Text style={styles.brand}>M/V Grand Luxe</Text>
            <Text style={styles.item_name}>ASSET #{assetCode}</Text>
          </View>
          <View style={styles.tableRow}>
            <View
              style={{ width: '20%', borderStyle: 'solid', borderWidth: 0 }}
            >
              {/* <Image style={{paddingVertical: "5px", alignSelf: "center", width:"60%",height:"120pt"}} src={equipProtect} />
            <Text style={{paddingTop:"5px", textAlign: "center", height:"30pt",borderStyle:"solid",borderTopWidth:1, fontSize:11, fontfamily:"Times New Roman",}}>Fire Protection Equipment</Text>
            <Text style={{paddingTop:"5px", textAlign: "center", height:"30pt",borderStyle:"solid",borderTopWidth:1, fontSize:11,  fontfamily:"Times New Roman",}}>Sprinkler System</Text> */}
            </View>
            <View style={{ width: '25%', paddingLeft: '10px' }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Lato',
                  fontWeight: 'bold',
                  height: '30pt',
                }}
              >
                Asset Name{' '}
              </Text>
              <Text style={{ fontSize: 12, height: '30pt' }}>{assetName}</Text>
              {/* <Image  style={{ paddingVertical: '5px', alignSelf: 'right' }}  src={qrCodePicture} /> */}
            </View>
            <View style={{ width: '55%', paddingLeft: '10px' }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Lato',
                  fontWeight: 'bold',
                  height: '30pt',
                }}
              >
                Description{' '}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  height: 'auto',
                  fontfamily: 'Times New Roman',
                  fontWeight: 'normal',
                }}
              >
                {' '}
                {assetDescription}
              </Text>
            </View>
          </View>
          <View style={[styles.tableRow, { marginTop: 25 }]}>
            <View
              style={{ width: '20%', borderStyle: 'solid', borderWidth: 0 }}
            ></View>
            <View style={{ width: '30%', paddingLeft: '10px' }}>
              <Image
                style={{
                  paddingVertical: '5px',
                  alignSelf: 'right',
                  width: 90,
                  height: 100,
                }}
                src={qrCodePicture}
              />
            </View>
            <View style={{ width: '50%', paddingLeft: '10px' }}>
              <Text
                style={{ fontSize: 12, fontFamily: 'Lato', fontWeight: 'bold' }}
              >
                Code{' '}
              </Text>
              <Text style={{ fontSize: 12, height: 'auto', marginBottom: 15 }}>
                {assetCode}
              </Text>
              <Text
                style={{ fontSize: 12, fontFamily: 'Lato', fontWeight: 'bold' }}
              >
                Category{' '}
              </Text>
              <Text style={{ fontSize: 12, height: 'auto' }}>
                {assetCategory}
              </Text>
            </View>
          </View>
          <View style={styles.block}>
            <Text style={styles.section_title}>General</Text>
            <Text
              style={{
                paddingLeft: '10pt',
                fontSize: 13,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              Location Of Asset
            </Text>
            {locationPart == 'Part' ? (
              <View style={styles.tableRow}>
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      paddingLeft: '10pt',
                      fontSize: 12,
                      fontFamily: 'Lato',
                      fontWeight: 'bold',
                      height: '20pt',
                    }}
                  >
                    This Facility is part of :
                  </Text>
                  <Text
                    style={{
                      paddingLeft: '10pt',
                      fontSize: 12,
                      fontfamily: 'Times New Roman',
                      fontStyle: 'bold',
                    }}
                  >
                    {locationPartName}
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}
            {locationPart == 'Location' ? (
              <>
                <View style={styles.tableRow}>
                  <View style={{ width: '100%' }}>
                    <Text
                      style={{
                        paddingLeft: '10pt',
                        fontSize: 12,
                        fontFamily: 'Lato',
                        fontWeight: 'bold',
                        height: '20pt',
                      }}
                    >
                      This facility is not part of another location, and is
                      located at :
                    </Text>
                    <Text
                      style={{
                        paddingLeft: '10pt',
                        fontSize: 12,
                        fontfamily: 'Times New Roman',
                        fontStyle: 'bold',
                      }}
                    >
                      {locationPartName}
                    </Text>
                    <View style={styles.tableRow}>
                      <Text
                        style={{
                          paddingLeft: '20pt',
                          fontSize: 12,
                          fontFamily: 'Lato',
                          fontWeight: 'bold',
                          height: '20pt',
                        }}
                      >
                        Address:
                      </Text>
                      <Text
                        style={{
                          paddingLeft: '10pt',
                          fontSize: 12,
                          fontfamily: 'Times New Roman',
                          fontStyle: 'bold',
                        }}
                      >
                        {strAddress}
                      </Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text
                        style={{
                          paddingLeft: '20pt',
                          fontSize: 12,
                          fontFamily: 'Lato',
                          fontWeight: 'bold',
                          height: '20pt',
                        }}
                      >
                        City:
                      </Text>
                      <Text
                        style={{
                          paddingLeft: '10pt',
                          fontSize: 12,
                          fontfamily: 'Times New Roman',
                          fontStyle: 'bold',
                        }}
                      >
                        {strCity}
                      </Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text
                        style={{
                          paddingLeft: '20pt',
                          fontSize: 12,
                          fontFamily: 'Lato',
                          fontWeight: 'bold',
                          height: '20pt',
                        }}
                      >
                        Province:
                      </Text>
                      <Text
                        style={{
                          paddingLeft: '10pt',
                          fontSize: 12,
                          fontfamily: 'Times New Roman',
                          fontStyle: 'bold',
                        }}
                      >
                        {strProvince}
                      </Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text
                        style={{
                          paddingLeft: '20pt',
                          fontSize: 12,
                          fontFamily: 'Lato',
                          fontWeight: 'bold',
                          height: '20pt',
                        }}
                      >
                        Postal Code:
                      </Text>
                      <Text
                        style={{
                          paddingLeft: '10pt',
                          fontSize: 12,
                          fontfamily: 'Times New Roman',
                          fontStyle: 'bold',
                        }}
                      >
                        {strPostalCode}
                      </Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text
                        style={{
                          paddingLeft: '20pt',
                          fontSize: 12,
                          fontFamily: 'Lato',
                          fontWeight: 'bold',
                          height: '20pt',
                        }}
                      >
                        Country:
                      </Text>
                      <Text
                        style={{
                          paddingLeft: '10pt',
                          fontSize: 12,
                          fontfamily: 'Times New Roman',
                          fontStyle: 'bold',
                        }}
                      >
                        {strCountryName}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <></>
            )}
            <Text
              style={{
                paddingLeft: '10pt',
                fontSize: 13,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              General Information
            </Text>
            <View style={styles.tableRow}>
              <View style={{ width: '60%' }}>
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    height: '20pt',
                  }}
                >
                  Account:
                </Text>
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontfamily: 'Times New Roman',
                    fontStyle: 'bold',
                  }}
                >
                  {strAccount}
                </Text>
              </View>
              <View style={styles.block}>
                <Text
                  style={{
                    width: '40%',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    textAlign: 'left',
                    fontWeight: 'bold',
                  }}
                >
                  Charge Department
                </Text>
                <Text style={{ width: '40%', fontSize: 12, textAlign: 'left' }}>
                  {strChargeDepartment}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={{ width: '60%' }}>
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    height: '20pt',
                  }}
                >
                  Work Instructions:
                </Text>
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontfamily: 'Times New Roman',
                    fontWeight: 'normal',
                    height: 'auto',
                    paddingRight: 20,
                  }}
                >
                  {strWorkInstruction}
                </Text>
              </View>
              <View style={{ width: '40%' }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Lato',
                    marginTop: 5,
                    textAlign: 'left',
                    fontWeight: 'bold',
                  }}
                >
                  Barcode
                </Text>
                <Text style={{ fontSize: 12, textAlign: 'left' }}>
                  {strBarcode}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.block}>
            <Text style={styles.section_title}>Metering/Events</Text>
            <Text
              style={{
                paddingLeft: '10pt',
                fontSize: 13,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              Most Recent Meter Readings
            </Text>
            <View style={styles.block}>
              <View
                style={[styles.tableheader, { width: '70%', marginBottom: 5 }]}
              >
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    width: '33%',
                  }}
                >
                  Unit
                </Text>
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    width: '33%',
                  }}
                >
                  Last Reading
                </Text>
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    width: '34%',
                  }}
                >
                  Date Submitted
                </Text>
              </View>
              {printData ? (
                <>
                  {printData.meterReading.length > 0 ? (
                    <>
                      {printData.meterReading.map((row, index) => {
                        return (
                          <View
                            style={[styles.tableRow, { width: '70%' }]}
                            key={index}
                          >
                            <Text
                              style={{
                                paddingLeft: '10pt',
                                fontSize: 12,
                                fontfamily: 'Times New Roman',
                                fontStyle: 'normal',
                                width: '33%',
                              }}
                            >
                              {row.dblMeterReading}{' '}
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '10pt',
                                fontSize: 12,
                                fontfamily: 'Times New Roman',
                                fontStyle: 'normal',
                                width: '33%',
                              }}
                            >
                              {row.intMeterReadingUnitsID.strSymbol}
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '10pt',
                                fontSize: 12,
                                fontfamily: 'Times New Roman',
                                fontStyle: 'normal',
                                width: '34%',
                              }}
                            >
                              {moment(row.dtmDateSubmitted).format(
                                'YYYY-MM-DD'
                              )}
                            </Text>
                          </View>
                        );
                      })}
                    </>
                  ) : (
                    <View style={{ width: '70%', height: 5 }}>
                      <Text
                        style={{
                          paddingLeft: '10pt',
                          fontSize: 12,
                          fontfamily: 'Times New Roman',
                          fontStyle: 'normal',
                          width: '100%',
                        }}
                      >
                        {' '}
                      </Text>
                    </View>
                  )}
                </>
              ) : null}
            </View>
            <Text
              style={{
                paddingLeft: '10pt',
                fontSize: 13,
                paddingTop: 2,
                paddingBottom: 5,
              }}
            >
              Most Recent Asset Events
            </Text>
            <View style={styles.block}>
              <View
                style={[styles.tableheader, { width: '70%', marginBottom: 5 }]}
              >
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    width: '20%',
                  }}
                ></Text>
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    width: '46%',
                  }}
                >
                  Event
                </Text>
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    width: '34%',
                  }}
                >
                  Date Submitted
                </Text>
              </View>

              {printData ? (
                <>
                  {printData.assetEvent.length > 0 ? (
                    <>
                      {printData.assetEvent.map((row, index) => {
                        return (
                          <View
                            style={[styles.tableRow, { width: '70%' }]}
                            key={index}
                          >
                            <Text
                              style={{
                                paddingLeft: '10pt',
                                fontSize: 12,
                                fontfamily: 'Times New Roman',
                                fontStyle: 'normal',
                                width: '20%',
                              }}
                            >
                              {' '}
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '10pt',
                                fontSize: 12,
                                fontfamily: 'Times New Roman',
                                fontStyle: 'normal',
                                width: '46%',
                              }}
                            >
                              {row.intAssetEventTypeID.strEventCode +
                                '-' +
                                row.intAssetEventTypeID.strEventName}
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '10pt',
                                fontSize: 12,
                                fontfamily: 'Times New Roman',
                                fontStyle: 'normal',
                                width: '34%',
                              }}
                            >
                              {moment(row.dtmDateSubmitted).format(
                                'YYYY-MM-DD'
                              )}
                            </Text>
                          </View>
                        );
                      })}
                    </>
                  ) : (
                    <View style={{ width: '70%', height: 5 }}>
                      <Text
                        style={{
                          paddingLeft: '10pt',
                          fontSize: 12,
                          fontfamily: 'Times New Roman',
                          fontStyle: 'normal',
                          width: '100%',
                        }}
                      >
                        {' '}
                      </Text>
                    </View>
                  )}
                </>
              ) : null}
            </View>
          </View>
          <View style={styles.block}>
            <Text style={styles.section_title}>Personal</Text>
            <View style={styles.block}>
              <View
                style={[styles.tableheader, { width: '70%', marginBottom: 5 }]}
              >
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    width: '33%',
                  }}
                >
                  User
                </Text>
              </View>

              {printData ? (
                <>
                  {printData.assetUser.length > 0 ? (
                    <>
                      {printData.assetUser.map((row, index) => {
                        return (
                          <View
                            style={[styles.tableRow, { width: '70%' }]}
                            key={index}
                          >
                            <Text
                              style={{
                                paddingLeft: '10pt',
                                fontSize: 12,
                                fontfamily: 'Times New Roman',
                                fontStyle: 'normal',
                                width: '100%',
                              }}
                            >
                              {row.intUserID.strFullName}{' '}
                            </Text>
                          </View>
                        );
                      })}
                    </>
                  ) : (
                    <View style={{ width: '70%', height: 5 }}>
                      <Text
                        style={{
                          paddingLeft: '10pt',
                          fontSize: 12,
                          fontfamily: 'Times New Roman',
                          fontStyle: 'normal',
                          width: '100%',
                        }}
                      >
                        {' '}
                      </Text>
                    </View>
                  )}
                </>
              ) : null}
            </View>
          </View>
          <View style={styles.block}>
            <Text style={styles.section_title}>Businesses</Text>
            <View style={styles.block}>
              <View
                style={[styles.tableheader, { width: '100%', marginBottom: 5 }]}
              >
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    width: '33%',
                  }}
                >
                  Business
                </Text>
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    width: '33%',
                  }}
                >
                  Business Group
                </Text>
                <Text
                  style={{
                    paddingLeft: '10pt',
                    fontSize: 12,
                    fontFamily: 'Lato',
                    fontWeight: 'bold',
                    width: '34%',
                  }}
                >
                  Business Asset Number
                </Text>
              </View>
              {printData ? (
                <>
                  {printData.assetBusiness.length > 0 ? (
                    <>
                      {printData.assetBusiness.map((row, index) => {
                        return (
                          <View
                            style={[styles.tableRow, { width: '100%' }]}
                            key={index}
                          >
                            <Text
                              style={{
                                paddingLeft: '10pt',
                                fontSize: 12,
                                fontfamily: 'Times New Roman',
                                fontStyle: 'normal',
                                width: '33%',
                              }}
                            >
                              {row.strBusinessName}{' '}
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '10pt',
                                fontSize: 12,
                                fontfamily: 'Times New Roman',
                                fontStyle: 'normal',
                                width: '33%',
                              }}
                            >
                              {row.strBusinessGroupName}
                            </Text>
                            <Text
                              style={{
                                paddingLeft: '10pt',
                                fontSize: 12,
                                fontfamily: 'Times New Roman',
                                fontStyle: 'normal',
                                width: '34%',
                              }}
                            >
                              {row.intBusinessId}
                            </Text>
                          </View>
                        );
                      })}
                    </>
                  ) : (
                    <View style={{ width: '70%', height: 10 }}>
                      <Text
                        style={{
                          paddingLeft: '10pt',
                          fontSize: 12,
                          fontfamily: 'Times New Roman',
                          fontStyle: 'normal',
                          width: '100%',
                        }}
                      >
                        {' '}
                      </Text>
                    </View>
                  )}
                </>
              ) : null}
            </View>
          </View>
          <View style={styles.block}>
            <Text style={styles.section_title}>Sign Off</Text>
            <View style={styles.tableEndRow}>
              <Text
                style={{
                  paddingVertical: '5px',
                  paddingLeft: '11pt',
                  fontSize: 11,
                  fontfamily: 'Times New Roman',
                  fontStyle: 'normal',
                  width: '45%',
                }}
              >
                Crew Member Signoff:
              </Text>
              <Text
                style={{
                  paddingVertical: '5px',
                  borderBottomStyle: 'solid',
                  borderBottomWidth: 1,
                  width: '40%',
                }}
              ></Text>
            </View>
            <View style={styles.tableRow}>
              <Text
                style={{
                  paddingVertical: '5px',
                  paddingLeft: '11pt',
                  fontSize: 11,
                  fontfamily: 'Times New Roman',
                  fontStyle: 'normal',
                  width: '45%',
                }}
              >
                Master or Licensed Crew Member Signoff:
              </Text>
              <Text
                style={{
                  paddingVertical: '5px',
                  borderBottomStyle: 'solid',
                  borderBottomWidth: 1,
                  width: '40%',
                }}
              ></Text>
            </View>
            <View style={styles.tableRow}>
              <Text
                style={{
                  paddingVertical: '5px',
                  paddingLeft: '11pt',
                  fontSize: 11,
                  fontfamily: 'Times New Roman',
                  fontStyle: 'normal',
                  width: '45%',
                }}
              >
                Signoff Date:
              </Text>
              <Text
                style={{
                  paddingVertical: '5px',
                  borderBottomStyle: 'solid',
                  borderBottomWidth: 1,
                  width: '40%',
                }}
              ></Text>
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
          <Text>Section #3</Text>
        </View>
      </Page>
    </Document>
  );
};
export default function (props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getPrintData } = assetAction;
  let history = useHistory();
  const { printData } = useSelector((state) => state.Assets);
  const [workOrder, setWorkOrder] = React.useState(null);
  React.useEffect(() => {
    dispatch(getPrintData(id));
  }, []);

  return (
    <div>
      <LayoutWrapper>
        <Box>
          <PageWrapper className="editView">
            <Link to={`/dashboard/asset`}>
              <Button color="primary">
                <span>Cancel</span>
              </Button>
            </Link>
            <Button color="primary">
              <PDFDownloadLink
                document={<MyDocument printData={printData} />}
                fileName={`A-${id}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download'
                }
              </PDFDownloadLink>
            </Button>
          </PageWrapper>
          <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
            {/* {printData ? (
              <PDFViewer style={{ width: '100%', height: '600px' }}>
                <MyDocument workOrder={printData} />
              </PDFViewer>
            ) : null} */}
            <PDFViewer style={{ width: '100%', height: '600px' }}>
              <MyDocument printData={printData} />
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
    marginTop: '20pt',
    marginBottom: '13.5pt',
    marginLeft: '30pt',
    marginRight: '30pt',
  },
  brand: {
    fontSize: 24,
    fontFamily: 'BankGothic',
    // fontfamily: 'Lato Bold',
    // fontStyle: "normal",
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10pt',
  },
  item_name: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10pt',
  },
  block: {
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
    marginBottom: '4pt',
    flexDirection: 'row',
  },
  tableEndRow: {
    marginBottom: '7pt',
    flexDirection: 'row',
    marginTop: '4pt',
  },
  tableCol: {
    padding: '1pt',
    flexDirection: 'column',
  },
  tableCell: {
    alignContent: 'center',
    paddingVertical: '50px',
  },
  section_title: {
    fontSize: '13pt',
    paddingLeft: '10pt',
    paddingVertical: '3pt',
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    marginBottom: '2px',
  },
});
