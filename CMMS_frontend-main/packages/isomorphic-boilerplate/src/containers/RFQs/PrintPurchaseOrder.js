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
import workorderAction from '../../redux/workorder/actions';
import purchaseOrderAction from '../../redux/purchaseorder/actions';
// import latoBold from "@iso/assets/fonts/Lato-Bold.ttf"
import LatoR from '../../assets/fonts/Lato-Regular.ttf';
import LatoB from '../../assets/fonts/Lato-Bold.ttf';

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
const MyDocument = ({ purchaseOrder }) => {
  //  console.log(props,'this is props');
  let strCardType = '';
  let intBillingTermID = '';
  let purchaseOrderNumber = 'PO# '; //+id;
  let date = moment(new Date()).format('D MMMM YYYY');
  let deliverDate = '';
  let fromAddress = '';
  let toAddress = '';
  let strDispatchMethod = '';
  let strShipmentType = '';
  let strPortLoading = '';
  let strPortDistance = '';
  let strAdditionalInf = '';
  let strSignatoryCompany = '';
  let strSignatoryName = '';
  let strPlaceDateIssue = '';
  let strSupplierReference = '';
  let strTermsPaymentMethod = '';
  let totalQty = 0;
  let subTotalPrice = 0;
  let totalPrice = 0;

  if (purchaseOrder) {
    intBillingTermID = purchaseOrder.purchaseOrder.intBillingTermID.strName;
    purchaseOrderNumber = purchaseOrderNumber + purchaseOrder.purchaseOrder._id;
    deliverDate = moment(
      purchaseOrder.purchaseOrder.dtmDateExpectedDelivery
    ).format('D MMMM YYYY');
    fromAddress = purchaseOrder.purchaseOrder.strSupplierAddress;
    toAddress = purchaseOrder.purchaseOrder.strShipToAddress;
    strDispatchMethod = purchaseOrder.purchaseOrder.strDispatchMethod;
    strShipmentType = purchaseOrder.purchaseOrder.strShipmentType;
    strPortLoading = purchaseOrder.purchaseOrder.strPortLoading;
    strPortDistance = purchaseOrder.purchaseOrder.strPortDistance;
    strAdditionalInf = purchaseOrder.purchaseOrder.strAdditionalInf;
    strSignatoryCompany = purchaseOrder.purchaseOrder.strSignatoryCompany;
    strSignatoryName = purchaseOrder.purchaseOrder.intSignatoryName
      ? purchaseOrder.purchaseOrder.intSignatoryName.strFullName
      : '';
    strPlaceDateIssue = purchaseOrder.purchaseOrder.strPlaceDateIssue;
    strSupplierReference = purchaseOrder.purchaseOrder.strSupplierReference;
    strTermsPaymentMethod = purchaseOrder.purchaseOrder.intBillingTermID
      ? purchaseOrder.purchaseOrder.intBillingTermID.strName
      : '';
    let tax = 0;
    purchaseOrder.lineItem.map((row, index) => {
      totalQty = totalQty + parseInt(row.qtyOnOrder);
      subTotalPrice =
        subTotalPrice +
        parseInt(row.qtyOnOrder) *
          parseFloat(row.dblUnitPrice  ? row.dblUnitPrice : 0);
      tax =
        tax +
        parseInt(row.qtyOnOrder) *
          parseFloat(row.dblUnitPrice  ? row.dblUnitPrice : 0) *
          parseFloat(row.dblTaxRate ? row.dblTaxRate : 0) *
          0.01;
    });
    var sumCost = 0;
    purchaseOrder.additionalCost.map((row, index) => {
      sumCost = sumCost + parseFloat(row.intAmount ? row.intAmount : 0);
    });
    totalPrice =
      parseFloat(subTotalPrice) + parseFloat(sumCost) + parseFloat(tax);
  }

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
              PURCHASE ORDER: {purchaseOrderNumber}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                borderBottom: 1,
                borderBottomColor: '#03508c',
              }}
            >
              <View style={{ width: '50%', flexDirection: 'row' }}>
                <View style={[styles.tableCol, { width: '40%' }]}>
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
                    Purchase Order Number
                  </Text>
                  <Text style={styles.textCont1}>{purchaseOrderNumber}</Text>
                </View>
                <View style={[styles.tableCol, { width: '30%' }]}>
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
                    Date
                  </Text>
                  <Text style={styles.textCont1}>{date}</Text>
                </View>
                <View style={[styles.tableCol, { width: '30%' }]}>
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
                    Delivery Date
                  </Text>
                  <Text style={styles.textCont1}>{deliverDate}</Text>
                </View>
              </View>
              <View style={{ width: '50%', flexDirection: 'row' }}>
                <View style={[styles.tableCol, { width: '33%' }]}>
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
                    Supplier Reference{' '}
                  </Text>
                  <Text style={styles.textCont1}>{strSupplierReference}</Text>
                </View>
                <View style={[styles.tableCol, { width: '44%' }]}>
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
                    Terms / Method of Payment
                  </Text>
                  <Text style={styles.textCont1}>{strTermsPaymentMethod}</Text>
                </View>
                <View style={[{ width: '23%' }]}>
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
                    Pages
                  </Text>
                  <Text style={styles.textCont1}>1 of 1</Text>
                </View>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View
                style={[styles.tableCol, { width: '50%', minHeight: '70px' }]}
              >
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
                  From
                </Text>
                <Text style={[styles.textCont2]}>{fromAddress}</Text>
              </View>
              <View style={{ width: '50%' }}>
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
                  To
                </Text>
                <Text style={styles.textCont2}>{toAddress}</Text>
              </View>
            </View>
            <View
              style={[
                styles.tableRow,
                {
                  minHeight: '50px',
                  borderTopColor: '#03508c',
                  borderTopWidth: 1,
                  borderBottomColor: '#03508c',
                  borderBottomWidth: 1,
                },
              ]}
            >
              <View style={[{ width: '50%', flexDirection: 'row' }]}>
                <View style={[styles.tableCol, { width: '50%' }]}>
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
                    Method of Dispatch
                  </Text>
                  <Text style={styles.textCont2}>{strDispatchMethod}</Text>
                </View>
                <View style={[styles.tableCol, { width: '50%' }]}>
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
                    Type of Shipment
                  </Text>
                  <Text style={styles.textCont2}>{strShipmentType}</Text>
                </View>
              </View>
              <View style={{ width: '50%', flexDirection: 'row' }}>
                <View style={[styles.tableCol, { width: '50%' }]}>
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
                    Port of Loading
                  </Text>
                  <Text style={styles.textCont2}>{strPortLoading}</Text>
                </View>
                <View style={[{ width: '50%' }]}>
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
                    Port of Discharge
                  </Text>
                  <Text style={styles.textCont2}>{strPortDistance}</Text>
                </View>
              </View>
            </View>
            <View style={{ minHeight: '200px' }}>
              <View style={[styles.tableRow]}>
                <View style={[{ width: '50%', flexDirection: 'row' }]}>
                  <View style={[{ width: '45%' }]}>
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
                      Product Code
                    </Text>
                  </View>
                  <View style={[{ width: '55%' }]}>
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
                      Description of Goods
                    </Text>
                  </View>
                </View>
                <View style={[{ width: '50%', flexDirection: 'row' }]}>
                  <View style={[{ width: '29%' }]}>
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
                      Unit Quantity
                    </Text>
                  </View>
                  <View style={[{ width: '27%' }]}>
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
                      Unit Type
                    </Text>
                  </View>
                  <View style={[{ width: '23%' }]}>
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
                      Price
                    </Text>
                  </View>
                  <View style={[{ width: '23%' }]}>
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
                      Amount
                    </Text>
                  </View>
                </View>
              </View>
              {purchaseOrder
                ? purchaseOrder.lineItem.map((row, index) => {
                    var itemName = '';
                    if (row.bolEquipmentCon) {
                      itemName = row.intSourceAssetID
                        ? row.intSourceAssetID.strName
                        : '';
                    } else {
                      itemName = row.strNotInventory;
                    }

                    return (
                      <View style={[styles.tableRow]} key={index}>
                        <View style={[{ width: '50%', flexDirection: 'row' }]}>
                          <View style={[{ width: '45%' }]}>
                            <Text style={styles.textCont3}>{itemName}</Text>
                          </View>
                          <View style={[{ width: '55%' }]}>
                            <Text style={styles.textCont3}>
                              {row.strDescription}
                            </Text>
                          </View>
                        </View>
                        <View style={[{ width: '50%', flexDirection: 'row' }]}>
                          <View style={[{ width: '29%' }]}>
                            <Text style={styles.textCont3}>
                              {row.qtyOnOrder}
                            </Text>
                          </View>
                          <View style={[{ width: '27%' }]}>
                            <Text style={styles.textCont3}>{''}</Text>
                          </View>
                          <View style={[{ width: '23%' }]}>
                            <Text style={styles.textCont3}>
                              {row.dblUnitPrice}
                            </Text>
                          </View>
                          <View style={[{ width: '23%' }]}>
                            <Text style={styles.textCont3}>
                              {(
                                parseInt(row.qtyOnOrder) *
                                parseFloat(
                                  row.dblUnitPrice? row.dblUnitPrice : 0
                                )
                              ).toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })
                : null}

              {/* <View style={[styles.tableRow,]}>
                <View style={[{ width: '50%', flexDirection: 'row' }]}>
                  <View style={[{ width: '35%' }]}>
                    <Text style={styles.textCont3}>
                      HT71UT002
                    </Text>
                  </View>
                  <View style={[{ width: '65%' }]}>
                    <Text style={styles.textCont3}>
                      Current Sensor
                    </Text>
                  </View>
                </View>
                <View style={[{ width: '50%', flexDirection: 'row' }]}>
                  <View style={[{ width: '29%' }]}>
                    <Text style={styles.textCont3}>
                      2
                    </Text>
                  </View>
                  <View style={[{ width: '27%' }]}>
                    <Text style={styles.textCont3}>
                      Unit Type
                    </Text>
                  </View>
                  <View style={[{ width: '23%' }]}>
                    <Text style={styles.textCont3}>
                      Price
                    </Text>
                  </View>
                  <View style={[{ width: '23%' }]}>
                    <Text style={styles.textCont3}>
                      Amount
                    </Text>
                  </View>
                </View>
              </View> */}
            </View>
            <View
              style={[
                styles.tableRow,
                { borderTopColor: '#03508c', borderTopWidth: 1 },
              ]}
            >
              <View style={[styles.tableCol, { width: '50%' }]}>
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
                  Additional Information
                </Text>
                <Text style={styles.textCont2}>{strAdditionalInf}</Text>
              </View>

              <View style={[{ width: '50%', flexDirection: 'column' }]}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={[{ width: '65%', textAlign: 'right' }]}>
                    <Text
                      style={{
                        fontFamily: 'PT Sans',
                        paddingHorizontal: 5,
                        paddingBottom: '3pt',
                        paddingTop: '5pt',
                        paddingRight: '15pt',
                        textAlign: 'right',
                        fontSize: 8,
                        color: '#102f51',
                      }}
                    >
                      Total This Page
                    </Text>
                    <Text
                      style={[styles.textCont1, { paddingRight: '20pt' }]}
                    ></Text>
                  </View>
                  <View style={[{ width: '15%', textAlign: 'center' }]}>
                    <Text
                      style={{
                        fontFamily: 'PT Sans',
                        paddingHorizontal: 5,
                        paddingBottom: '3pt',
                        paddingTop: '5pt',
                        // paddingRight: '23pt',
                        fontSize: 8,
                        color: '#102f51',
                      }}
                    >
                      Qty
                    </Text>
                    <Text style={styles.textCont1}>
                      {totalQty == 0 ? '' : totalQty}
                    </Text>
                  </View>
                  <View style={[{ width: '15%' }]}>
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
                      Amount
                    </Text>
                    <Text style={styles.textCont1}>
                      {subTotalPrice != 0 ? subTotalPrice.toFixed(2) : '0.00'}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderTopColor: '#03508c',
                  }}
                >
                  <View style={[{ width: '65%', textAlign: 'right' }]}>
                    <Text
                      style={{
                        fontFamily: 'PT Sans',
                        paddingHorizontal: 5,
                        paddingBottom: '3pt',
                        paddingTop: '5pt',
                        paddingRight: '15pt',
                        textAlign: 'right',
                        fontSize: 8,
                        color: '#102f51',
                      }}
                    >
                      Consignment Total
                    </Text>
                  </View>
                  <View style={[{ width: '15%', textAlign: 'center' }]}>
                    <Text style={[styles.textCont1, { paddingTop: '5pt' }]}>
                      {totalQty == 0 ? '' : totalQty}
                    </Text>
                  </View>
                  <View style={[{ width: '15%' }]}>
                    <Text style={[styles.textCont1, { paddingTop: '5pt' }]}>
                      {subTotalPrice != 0 ? subTotalPrice.toFixed(2) : '0.00'}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderTopColor: '#03508c',
                  }}
                >
                  <View style={[{ width: '65%', textAlign: 'right' }]}>
                    <Text
                      style={{
                        fontFamily: 'PT Sans',
                        paddingHorizontal: 5,
                        paddingBottom: '3pt',
                        paddingTop: '5pt',
                        paddingRight: '15pt',
                        textAlign: 'right',
                        fontSize: 8,
                        color: '#102f51',
                      }}
                    >
                      Invoice Total (Incoterms® 2010)
                    </Text>
                  </View>
                  <View style={[{ width: '15%', textAlign: 'center' }]}>
                    <Text
                      style={[styles.textCont1, { paddingTop: '5pt' }]}
                    ></Text>
                  </View>
                  <View style={[{ width: '15%' }]}>
                    <Text style={[styles.textCont1, { paddingTop: '5pt' }]}>
                      {totalPrice != 0 ? totalPrice.toFixed(2) : '0.00'}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    height: '35pt',
                    borderTopWidth: 1,
                    borderTopColor: '#03508c',
                  }}
                >
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
                    Place and Date of Issue
                  </Text>
                  <Text style={styles.textCont1}>{strPlaceDateIssue}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    borderTopWidth: 1,
                    borderTopColor: '#03508c',
                  }}
                >
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
                    Signatory Company
                  </Text>
                  <Text style={styles.textCont1}>{strSignatoryCompany}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    borderTopWidth: 1,
                    borderTopColor: '#03508c',
                  }}
                >
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
                    Name of Authorized Signatory
                  </Text>
                  <Text style={styles.textCont1}>{strSignatoryName}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    height: '50pt',
                    borderTopWidth: 1,
                    borderTopColor: '#03508c',
                  }}
                >
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
                    Signature
                  </Text>
                  <Text style={styles.textCont1}></Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {intBillingTermID == 'Credit Card' && (
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
                ONE TIME CREDIT CARD AUTHORIZATION FORM
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottom: 1,
                  borderBottomColor: '#03508c',
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
                  Card Type
                </Text>
                <Text style={styles.textCont1}>{strCardType}</Text>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[styles.tableCol, { width: '50%', minHeight: '70px' }]}
                >
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
                    From
                  </Text>
                  <Text style={[styles.textCont2]}>{fromAddress}</Text>
                </View>
                <View style={{ width: '50%' }}>
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
                    To
                  </Text>
                  <Text style={styles.textCont2}>{toAddress}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.tableRow,
                  {
                    minHeight: '50px',
                    borderTopColor: '#03508c',
                    borderTopWidth: 1,
                    borderBottomColor: '#03508c',
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <View style={[{ width: '50%', flexDirection: 'row' }]}>
                  <View style={[styles.tableCol, { width: '50%' }]}>
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
                      Method of Dispatch
                    </Text>
                    <Text style={styles.textCont2}>{strDispatchMethod}</Text>
                  </View>
                  <View style={[styles.tableCol, { width: '50%' }]}>
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
                      Type of Shipment
                    </Text>
                    <Text style={styles.textCont2}>{strShipmentType}</Text>
                  </View>
                </View>
                <View style={{ width: '50%', flexDirection: 'row' }}>
                  <View style={[styles.tableCol, { width: '50%' }]}>
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
                      Port of Loading
                    </Text>
                    <Text style={styles.textCont2}>{strPortLoading}</Text>
                  </View>
                  <View style={[{ width: '50%' }]}>
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
                      Port of Discharge
                    </Text>
                    <Text style={styles.textCont2}>{strPortDistance}</Text>
                  </View>
                </View>
              </View>
              <View style={{ minHeight: '200px' }}>
                <View style={[styles.tableRow]}>
                  <View style={[{ width: '50%', flexDirection: 'row' }]}>
                    <View style={[{ width: '45%' }]}>
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
                        Product Code
                      </Text>
                    </View>
                    <View style={[{ width: '55%' }]}>
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
                        Description of Goods
                      </Text>
                    </View>
                  </View>
                  <View style={[{ width: '50%', flexDirection: 'row' }]}>
                    <View style={[{ width: '29%' }]}>
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
                        Unit Quantity
                      </Text>
                    </View>
                    <View style={[{ width: '27%' }]}>
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
                        Unit Type
                      </Text>
                    </View>
                    <View style={[{ width: '23%' }]}>
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
                        Price
                      </Text>
                    </View>
                    <View style={[{ width: '23%' }]}>
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
                        Amount
                      </Text>
                    </View>
                  </View>
                </View>
                {purchaseOrder
                  ? purchaseOrder.lineItem.map((row, index) => {
                      var itemName = '';
                      if (row.bolEquipmentCon) {
                        itemName = row.intSourceAssetID
                          ? row.intSourceAssetID.strName
                          : '';
                      } else {
                        itemName = row.strNotInventory;
                      }

                      return (
                        <View style={[styles.tableRow]} key={index}>
                          <View
                            style={[{ width: '50%', flexDirection: 'row' }]}
                          >
                            <View style={[{ width: '45%' }]}>
                              <Text style={styles.textCont3}>{itemName}</Text>
                            </View>
                            <View style={[{ width: '55%' }]}>
                              <Text style={styles.textCont3}>
                                {row.strDescription}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[{ width: '50%', flexDirection: 'row' }]}
                          >
                            <View style={[{ width: '29%' }]}>
                              <Text style={styles.textCont3}>
                                {row.qtyOnOrder}
                              </Text>
                            </View>
                            <View style={[{ width: '27%' }]}>
                              <Text style={styles.textCont3}>{''}</Text>
                            </View>
                            <View style={[{ width: '23%' }]}>
                              <Text style={styles.textCont3}>
                                {row.dblUnitPrice}
                              </Text>
                            </View>
                            <View style={[{ width: '23%' }]}>
                              <Text style={styles.textCont3}>
                                {(
                                  parseInt(row.qtyOnOrder) *
                                  parseFloat(
                                    row.dblUnitPrice 
                                      ? row.dblUnitPrice
                                      : 0
                                  )
                                ).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    })
                  : null}

                {/* <View style={[styles.tableRow,]}>
                <View style={[{ width: '50%', flexDirection: 'row' }]}>
                  <View style={[{ width: '35%' }]}>
                    <Text style={styles.textCont3}>
                      HT71UT002
                    </Text>
                  </View>
                  <View style={[{ width: '65%' }]}>
                    <Text style={styles.textCont3}>
                      Current Sensor
                    </Text>
                  </View>
                </View>
                <View style={[{ width: '50%', flexDirection: 'row' }]}>
                  <View style={[{ width: '29%' }]}>
                    <Text style={styles.textCont3}>
                      2
                    </Text>
                  </View>
                  <View style={[{ width: '27%' }]}>
                    <Text style={styles.textCont3}>
                      Unit Type
                    </Text>
                  </View>
                  <View style={[{ width: '23%' }]}>
                    <Text style={styles.textCont3}>
                      Price
                    </Text>
                  </View>
                  <View style={[{ width: '23%' }]}>
                    <Text style={styles.textCont3}>
                      Amount
                    </Text>
                  </View>
                </View>
              </View> */}
              </View>
              <View
                style={[
                  styles.tableRow,
                  { borderTopColor: '#03508c', borderTopWidth: 1 },
                ]}
              >
                <View style={[styles.tableCol, { width: '50%' }]}>
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
                    Additional Information
                  </Text>
                  <Text style={styles.textCont2}>{strAdditionalInf}</Text>
                </View>

                <View style={[{ width: '50%', flexDirection: 'column' }]}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={[{ width: '65%', textAlign: 'right' }]}>
                      <Text
                        style={{
                          fontFamily: 'PT Sans',
                          paddingHorizontal: 5,
                          paddingBottom: '3pt',
                          paddingTop: '5pt',
                          paddingRight: '15pt',
                          textAlign: 'right',
                          fontSize: 8,
                          color: '#102f51',
                        }}
                      >
                        Total This Page
                      </Text>
                      <Text
                        style={[styles.textCont1, { paddingRight: '20pt' }]}
                      ></Text>
                    </View>
                    <View style={[{ width: '15%', textAlign: 'center' }]}>
                      <Text
                        style={{
                          fontFamily: 'PT Sans',
                          paddingHorizontal: 5,
                          paddingBottom: '3pt',
                          paddingTop: '5pt',
                          // paddingRight: '23pt',
                          fontSize: 8,
                          color: '#102f51',
                        }}
                      >
                        Qty
                      </Text>
                      <Text style={styles.textCont1}>
                        {totalQty == 0 ? '0.00' : totalQty}
                      </Text>
                    </View>
                    <View style={[{ width: '15%' }]}>
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
                        Amount
                      </Text>
                      <Text style={styles.textCont1}>
                        {totalPrice != 0 ? totalPrice.toFixed(2) : '0.00'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderTopWidth: 1,
                      borderTopColor: '#03508c',
                    }}
                  >
                    <View style={[{ width: '65%', textAlign: 'right' }]}>
                      <Text
                        style={{
                          fontFamily: 'PT Sans',
                          paddingHorizontal: 5,
                          paddingBottom: '3pt',
                          paddingTop: '5pt',
                          paddingRight: '15pt',
                          textAlign: 'right',
                          fontSize: 8,
                          color: '#102f51',
                        }}
                      >
                        Consignment Total
                      </Text>
                    </View>
                    <View style={[{ width: '15%', textAlign: 'center' }]}>
                      <Text style={[styles.textCont1, { paddingTop: '5pt' }]}>
                        {totalQty}
                      </Text>
                    </View>
                    <View style={[{ width: '15%' }]}>
                      <Text style={[styles.textCont1, { paddingTop: '5pt' }]}>
                        {totalPrice != 0 ? totalPrice.toFixed(2) : '0.00'}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderTopWidth: 1,
                      borderTopColor: '#03508c',
                    }}
                  >
                    <View style={[{ width: '65%', textAlign: 'right' }]}>
                      <Text
                        style={{
                          fontFamily: 'PT Sans',
                          paddingHorizontal: 5,
                          paddingBottom: '3pt',
                          paddingTop: '5pt',
                          paddingRight: '15pt',
                          textAlign: 'right',
                          fontSize: 8,
                          color: '#102f51',
                        }}
                      >
                        Invoice Total (Incoterms® 2010)
                      </Text>
                    </View>
                    <View style={[{ width: '15%', textAlign: 'center' }]}>
                      <Text
                        style={[styles.textCont1, { paddingTop: '5pt' }]}
                      ></Text>
                    </View>
                    <View style={[{ width: '15%' }]}>
                      <Text
                        style={[styles.textCont1, { paddingTop: '5pt' }]}
                      > {totalPrice != 0 ? totalPrice.toFixed(2) : '0.00'}</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      height: '35pt',
                      borderTopWidth: 1,
                      borderTopColor: '#03508c',
                    }}
                  >
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
                      Place and Date of Issue
                    </Text>
                    <Text style={styles.textCont1}>{strPlaceDateIssue}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      borderTopWidth: 1,
                      borderTopColor: '#03508c',
                    }}
                  >
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
                      Signatory Company
                    </Text>
                    <Text style={styles.textCont1}>{strSignatoryCompany}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      borderTopWidth: 1,
                      borderTopColor: '#03508c',
                    }}
                  >
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
                      Name of Authorized Signatory
                    </Text>
                    <Text style={styles.textCont1}>{strSignatoryName}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      height: '50pt',
                      borderTopWidth: 1,
                      borderTopColor: '#03508c',
                    }}
                  >
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
                      Signature
                    </Text>
                    <Text style={styles.textCont1}></Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
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
  const { getPrintData } = purchaseOrderAction;
  let history = useHistory();
  const { printData } = useSelector((state) => state.purchaseOrder);
  const [purchaseOrder, setPurchaseOrder] = React.useState(null);
  React.useEffect(() => {
    dispatch(getPrintData(id));
  }, []);

  React.useEffect(() => {
    // setWorkOrder(printData);
    setPurchaseOrder(printData);
    console.log(printData, 'this is purcase');
  }, [printData]);
  return (
    <div>
      <LayoutWrapper>
        <Box>
          <PageWrapper className="editView">
            <Link to={`/dashboard/purchase_orders`}>
              <Button color="primary">
                <span>Cancel</span>
              </Button>
            </Link>
            <Button color="primary">
              <PDFDownloadLink
                document={<MyDocument purchaseOrder={printData} />}
                fileName={`WO-${id}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download'
                }
              </PDFDownloadLink>
            </Button>
          </PageWrapper>
          <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
            {/* {printData ? ( */}
            <PDFViewer style={{ width: '100%', height: '600px' }}>
              <MyDocument purchaseOrder={printData} />
            </PDFViewer>
            {/* ) : null} */}
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
    color: '#403f41',
    paddingHorizontal: 5,
    paddingBottom: 2,
  },
  textCont: {
    fontFamily: 'PT Sans',
    fontWeight: 'bold',
    fontSize: 9,
    color: '#000000',
    paddingHorizontal: 5,
    paddingBottom: 3,
  },
  textCont2: {
    fontFamily: 'PT Sans',
    fontWeight: 'bold',
    fontSize: 9,
    lineHeight: 1.5,
    color: '#403f41',
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  textCont3: {
    fontFamily: 'PT Sans',
    fontWeight: 'bold',
    fontSize: 9,
    lineHeight: 1,
    color: '#403f41',
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
});
