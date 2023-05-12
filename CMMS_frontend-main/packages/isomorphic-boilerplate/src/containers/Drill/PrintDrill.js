import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import Box from '@iso/components/utility/box';
import PageWrapper from '../EntriesVessel/SinglePage.styles';
import Button from '@iso/components/uielements/button';
import { PDFViewer } from '@react-pdf/renderer';
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
import moment from 'moment';

import fontBankB from '../../assets/fonts/bankgothic_bold.ttf';
import fontBankR from '../../assets/fonts/BankGothic-Regular.ttf';
import fontTimeB from '../../assets/fonts/TimesNewerRoman-Bold.ttf';
import fontTimeN from '../../assets/fonts/TimesNewerRoman-Regular.ttf';

import qrCodePicture from '../../assets/images/qrSample.png';

import LatoB from '../../assets/fonts/Lato-Bold.ttf';

import drillAction from '../../redux/drill/actions';

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

const MyDocument = ({ drillData }) => {
  console.log(drillData);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={true}>
        <View style={styles.pageMargin}>
          <View style={styles.block}>
            <Text style={styles.brand}>M/V Grand Luxe</Text>
            <Text style={styles.item_name}>
              DRILL {drillData ? drillData.strCode : ''}
            </Text>
          </View>
          <View style={styles.block}>
            {/* <Image
              style={{ paddingVertical: "5px", alignSelf: "right" }}
              src={qrCodePicture}
            /> */}
          </View>
          <View style={styles.tableRow}>
            <View style={{ width: '30%', paddingLeft: '10px' }}>
              <Text
                style={{
                  fontSize: 12,
                  //   fontFamily: "Lato",
                  fontWeight: 'bold',
                  height: '30pt',
                }}
              >
                Code
              </Text>
              <Text style={{ fontSize: 12, height: '30pt' }}>
                {drillData ? drillData._id : ''}
              </Text>
              {/* <Image
                style={{ paddingVertical: "5px", alignSelf: "right" }}
                src={qrCodePicture}
              /> */}
            </View>
            <View style={{ width: '30%', paddingLeft: '10px' }}>
              <Text
                style={{
                  fontSize: 12,
                  //   fontFamily: "Lato",
                  fontWeight: 'bold',
                  height: '30pt',
                }}
              >
                Drill Category
              </Text>
              <Text style={{ fontSize: 12, height: '30pt' }}>
                {drillData ? drillData.strCategory : ''}
              </Text>
            </View>
            <View style={{ width: '40%', paddingLeft: '10px' }}>
              <Text
                style={{
                  fontSize: 12,
                  //   fontFamily: "Lato",
                  fontWeight: 'bold',
                  height: '30pt',
                }}
              >
                Drill Type
              </Text>
              <Text style={{ fontSize: 12, height: '30pt' }}>
                {drillData ? drillData.strType : ''}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={{ width: '30%', paddingLeft: '10px' }}>
              <Text
                style={{
                  fontSize: 12,
                  //   fontFamily: "Lato",
                  fontWeight: 'bold',
                  height: '30pt',
                }}
              >
                Drill Title
              </Text>
              <Text style={{ fontSize: 12, height: '30pt' }}>
                {drillData ? drillData.strTitle : ''}
              </Text>
            </View>
            <View style={{ width: '30%', paddingLeft: '10px' }}>
              <Text
                style={{
                  fontSize: 12,
                  //   fontFamily: "Lato",
                  fontWeight: 'bold',
                  height: '30pt',
                }}
              >
                Estimated Time
              </Text>
              <Text style={{ fontSize: 12, height: '30pt' }}>
                {drillData ? drillData.intEstimatedTime : ''}
              </Text>
            </View>
            <View style={{ width: '40%', paddingLeft: '10px' }}>
              <Text
                style={{
                  fontSize: 12,
                  //   fontFamily: "Lato",
                  fontWeight: 'bold',
                  height: '30pt',
                }}
              >
                Due Date
              </Text>
              <Text style={{ fontSize: 12, height: '30pt' }}>
                {drillData ? drillData.aDueDate : ''}
              </Text>
            </View>
          </View>
          <View style={styles.block}>
            <Text style={styles.section_title}>General</Text>
            <View style={styles.tableRow}>
              <View style={{ width: '20%', paddingLeft: '10px' }}>
                <Text
                  style={{
                    fontSize: 12,
                    //   fontFamily: "Lato",
                    fontWeight: 'bold',
                    height: '30pt',
                  }}
                >
                  Assignee
                </Text>
                <Text style={{ fontSize: 12, height: '30pt' }}>
                  {drillData ? drillData.strGeneralAssignee : ''}
                </Text>
              </View>
              <View style={{ width: '40%', paddingLeft: '10px' }}>
                <Text
                  style={{
                    fontSize: 12,
                    //   fontFamily: "Lato",
                    fontWeight: 'bold',
                    height: '30pt',
                  }}
                >
                  Description
                </Text>
                <Text style={{ fontSize: 12, height: '30pt' }}>
                  {drillData ? drillData.strGeneralDescription : ''}
                </Text>
              </View>
              <View style={{ width: '40%', paddingLeft: '10px' }}>
                <Text
                  style={{
                    fontSize: 12,
                    //   fontFamily: "Lato",
                    fontWeight: 'bold',
                    height: '30pt',
                  }}
                >
                  Participating Crew
                </Text>
                {/* <Text style={styles.block}>
                    {drillData
                    ? crewArr.map((data, index) => {
                        return (
                          <View style={styles.tableRow}>
                          <Text>{data}</Text>
                          </View>
                        );
                      })
                    : ""}
                  </Text> */}
                <Text style={{ fontSize: 12, height: '30pt' }}>
                  {drillData ? drillData.strCrewLists : ''}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.block}>
            <Text style={styles.section_title}>Action</Text>
            <View style={styles.tableRow}>
              <View style={{ width: '30%', paddingLeft: '10px' }}>
                <Text
                  style={{
                    fontSize: 12,
                    //   fontFamily: "Lato",
                    fontWeight: 'bold',
                    height: '30pt',
                  }}
                >
                  Assign Completion Date
                </Text>
                <Text style={{ fontSize: 12, height: '30pt' }}>
                  {drillData ? drillData.aActionAssignCompletionDate : ''}
                </Text>
              </View>
              <View style={{ width: '30%', paddingLeft: '10px' }}>
                <Text
                  style={{
                    fontSize: 12,
                    //   fontFamily: "Lato",
                    fontWeight: 'bold',
                    height: '30pt',
                  }}
                >
                  Narrative
                </Text>
                <Text style={{ fontSize: 12, height: '30pt' }}>
                  {drillData ? drillData.strActionNarrative : ''}
                </Text>
              </View>
              <View style={{ width: '40%', paddingLeft: '10px' }}>
                <Text
                  style={{
                    fontSize: 12,
                    //   fontFamily: "Lato",
                    fontWeight: 'bold',
                    height: '30pt',
                  }}
                >
                  Narrative of how to improve in the future
                </Text>
                <Text style={{ fontSize: 12, height: '30pt' }}>
                  {drillData ? drillData.strActionNarrativeFuture : ''}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.block}>
            <Text style={styles.section_title}>Documents Upload view</Text>
            <View style={styles.tableRow}>
              <View style={{ width: '60%', paddingLeft: '10px' }}>
                <Text
                  style={{
                    fontSize: 12,
                    //   fontFamily: "Lato",
                    fontWeight: 'bold',
                    height: '30pt',
                  }}
                >
                  File
                </Text>
                {/* <Text style={{ fontSize: 12, height: "30pt" }}>
                  {drillData ? drillData.strActionNarrativeFuture : ""}
                </Text> */}
              </View>
              <View style={{ width: '40%', paddingLeft: '10px' }}>
                <Text
                  style={{
                    fontSize: 12,
                    //   fontFamily: "Lato",
                    fontWeight: 'bold',
                    height: '30pt',
                  }}
                >
                  View
                </Text>
                {/* <Text style={{ fontSize: 12, height: "30pt" }}>
                  {drillData ? drillData.strActionNarrativeFuture : ""}
                </Text> */}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function (props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { drill } = useSelector((state) => state.Drill);
  const [drillData, setDrillData] = useState(null);

  const { getPrintData } = drillAction;

  useEffect(() => {
    dispatch(getPrintData(id));
  }, []);

  useEffect(() => {
    if (Object.keys(drill).length !== 0) setDrillData(drill);
  }, [drill]);

  return (
    <div>
      <LayoutWrapper>
        <Box>
          <PageWrapper className="editView">
            <Link to={`/dashboard/drill`}>
              <Button color="primary">
                <span>Cancel</span>
              </Button>
            </Link>
            <Button color="primary">
              <PDFDownloadLink
                document={<MyDocument drillData={drillData} />}
                fileName={`DL-${id}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download'
                }
              </PDFDownloadLink>
            </Button>
          </PageWrapper>
          <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
            {drill ? (
              <PDFViewer style={{ width: '100%', height: '600px' }}>
                <MyDocument drillData={drillData} />
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
    marginTop: '20pt',
    marginBottom: '13.5pt',
    marginLeft: '30pt',
    marginRight: '30pt',
  },
  brand: {
    fontSize: 24,
    // fontFamily: "BankGothic",
    // fontfamily: 'Lato Bold',
    // fontStyle: "normal",
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10pt',
  },
  item_name: {
    fontSize: 16,
    // fontFamily: "Lato",
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
    // fontFamily: "Lato",
    fontWeight: 'bold',
    marginBottom: '2px',
  },
});
