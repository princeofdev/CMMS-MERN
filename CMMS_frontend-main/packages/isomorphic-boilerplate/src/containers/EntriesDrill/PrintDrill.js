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
// import ReactPDF from '@react-pdf/renderer';
import fontBankB from '../../assets/fonts/bankgothic_bold.ttf';
import fontBankR from '../../assets/fonts/BankGothic-Regular.ttf';
import fontTimeB from '../../assets/fonts/TimesNewerRoman-Bold.ttf';
import fontTimeN from '../../assets/fonts/TimesNewerRoman-Regular.ttf';
// import workorderAction from "../../redux/workorder/actions";
import EntriesDrillAction from '../../redux/EntriesDrill/actions';

import markImage from '../../assets/images/image001.png';

// Font.register({
//   family: 'Lato',
//   fonts: [
//     {
//       src: LatoR
//     },
//     {
//       src: LatoB,
//       fontWeight: 'bold'
//     }
//   ]
// })
// Font.register({
//   family: 'Lato Bold',
//   src: LatoB,
//   fontWeight: 'bold',
//   format: "truetype",

// });

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
const MyDocumen1t = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text>Section #1</Text>
        </View>
        <View>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};
const MyDocument = ({ drillLists }) => {
  const trList = () => {
    let tr_array = [];
    for (let i = 0; i < drillLists.length; i++) {
      tr_array.push(
        <View style={styles.table_row} key={i}>
          <Text
            style={{
              width: '90pt',
              paddingTop: '15pt',
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Times New Roman',
              borderStyle: 'solid',
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {drillLists[i].strDate
              ? moment(drillLists[i].strDate).format('DD/MM/YYYY')
              : ' '}
          </Text>
          <Text
            style={{
              width: '85.5pt',
              paddingTop: '15pt',
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Times New Roman',
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {drillLists[i].strTime
              ? moment(drillLists[i].strTime).format('HH:mm')
              : ' '}
          </Text>
          <Text
            style={{
              width: '126pt',
              paddingTop: '15pt',
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Times New Roman',
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {drillLists[i].strLocation}
          </Text>
          <Text
            style={{
              width: '238.5pt',
              paddingLeft: '4pt',
              paddingTop: '5pt',
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Times New Roman',
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {drillLists[i].strDescription}{' '}
          </Text>
        </View>
      );
    }
    return tr_array;
  };

  const blankTrList = () => {
    let tr_array = [];
    for (let i = drillLists.length; i < 12; i++) {
      tr_array.push(
        <View style={styles.table_blank_row} key={i}>
          <Text
            style={{
              width: '90pt',
              paddingTop: '15pt',
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Times New Roman',
              borderStyle: 'solid',
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {' '}
          </Text>
          <Text
            style={{
              width: '85.5pt',
              paddingTop: '15pt',
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Times New Roman',
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {' '}
          </Text>
          <Text
            style={{
              width: '126pt',
              paddingTop: '15pt',
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Times New Roman',
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {' '}
          </Text>
          <Text
            style={{
              width: '238.5pt',
              paddingLeft: '4pt',
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Times New Roman',
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {' '}
          </Text>
        </View>
      );
    }
    return tr_array;
  };
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={true}>
        <View style={styles.pageMargin}>
          <View style={styles.block}>
            <Image style={styles.img} src={markImage} />
            <Text style={styles.brand}>M/V Grand Luxe</Text>
            <Text style={styles.description}>
              ENTRIES RELATING TO DRILLS AND INSPECTIONS
            </Text>
          </View>

          {/* Here goes the Crew Complement */}
          <View style={styles.table}>
            <View style={styles.table_head_row}>
              <Text
                style={{
                  width: '90pt',
                  paddingVertical: '5pt',
                  textAlign: 'center',
                  fontFamily: 'Times New Roman',
                  fontSize: 12,
                  borderStyle: 'solid',
                  borderWidth: 1,
                }}
              >
                DATE{'\n'}[MM/DD/YY]
              </Text>
              <Text
                style={{
                  width: '85.5pt',
                  paddingVertical: '5pt',
                  textAlign: 'center',
                  fontFamily: 'Times New Roman',
                  fontSize: 12,
                  borderStyle: 'solid',
                  borderTopWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                TIME{'\n'}(LOCAL)
              </Text>
              <Text
                style={{
                  width: '126pt',
                  paddingTop: '15pt',
                  textAlign: 'center',
                  fontFamily: 'Times New Roman',
                  fontSize: 12,
                  borderStyle: 'solid',
                  borderTopWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                LOCATION
              </Text>
              <Text
                style={{
                  width: '238.5pt',
                  textAlign: 'left',
                  paddingLeft: '5pt',
                  paddingTop: '2pt',
                  fontSize: 11,
                  fontFamily: 'Times New Roman',
                  borderStyle: 'solid',
                  borderTopWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                TYPE OF DRILL OR INSPECTION. CONDITION {'\n'} OF EQUPMENT WITH
                DEFECTS AND {'\n'}CORRECTIVE ACTIONS NOTED.{' '}
              </Text>
            </View>

            {trList()}
            {blankTrList()}
          </View>

          {/* Here goes the Master Sign */}
          <View style={{ marginTop: '25t', flexDirection: 'row' }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Times New Roman',
                fontSize: 12,
                width: '60pt',
              }}
            >
              Revision #:{' '}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 10,
                width: '70pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
              }}
            ></Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Times New Roman',
                fontSize: 12,
                width: '100pt',
              }}
            >
              Revision Date:
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 10,
                width: '80pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
              }}
            ></Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Times New Roman',
                fontSize: 12,
                width: '60pt',
              }}
            ></Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Times New Roman',
                fontSize: 12,
                width: '100pt',
              }}
            >
              Master’s Signature:
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 10,
                width: '80pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
              }}
            ></Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function (props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { getById } = EntriesDrillAction;
  // let history = useHistory();
  const { drillLists } = useSelector((state) => state.EntriesDrill);
  React.useEffect(() => {
    dispatch(getById(id));
  }, []);

  React.useEffect(() => {
    console.log(drillLists, 'this is workorder');
  }, [drillLists]);

  return (
    <div>
      <LayoutWrapper>
        <Box>
          <PageWrapper className="editView">
            <Link to={`/dashboard/entries_drill`}>
              <Button color="primary">
                <span>Cancel</span>
              </Button>
            </Link>
            <Button color="primary">
              <PDFDownloadLink
                document={<MyDocument drillLists={drillLists} />}
                fileName="ENTRIES RELATING TO DRILLS AND INSPECTIONS.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download'
                }
              </PDFDownloadLink>
            </Button>
          </PageWrapper>
          <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
            {drillLists.length > 0 ? (
              <PDFViewer style={{ width: '100%', height: '650px' }}>
                <MyDocument drillLists={drillLists} />
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
    paddingTop: '30pt',
    paddingBottom: '20pt',
  },
  pageMargin: {
    marginTop: '20pt',
    marginBottom: '30pt',
    marginLeft: '30pt',
    marginRight: '20pt',
  },
  brand: {
    fontSize: '24.0pt',
    textAlign: 'center',
    marginBottom: '10pt',
    fontFamily: 'BankGothic',
    fontWeight: 'bold',
  },
  img: {
    marginVertical: '10px',
    alignSelf: 'center',
    width: '60px',
    height: '60px',
  },
  description: {
    fontSize: 11,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10pt',
  },
  block: {
    flexDirection: 'column',
    marginBottom: '5pt',
  },
  table: {
    alignSelf: 'center',
    // marginVertical: "20pt",
    flexDirection: 'column',
  },
  table_header: {
    textAlign: 'center',
    paddingVertical: '5pt',
    fontSize: 12,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  table_head_row: {
    alignSelf: 'center',
    flexDirection: 'row',
    height: '48pt',
  },
  table_row: {
    alignSelf: 'center',
    flexDirection: 'row',
    minHeight: '41pt',
    height: 'auto',
    // justifyContent:'center',
    // textAlign:'center',
    // alignContent:'center',
    // alignItems:'center'
  },
  table_blank_row: {
    alignSelf: 'center',
    flexDirection: 'row',
    minHeight: '41pt',   
    // justifyContent:'center',
    // textAlign:'center',
    // alignContent:'center',
    // alignItems:'center'
  },
});
