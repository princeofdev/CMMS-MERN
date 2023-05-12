import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';
import moment from 'moment';
import Button from '@iso/components/uielements/button';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageWrapper from '../EntriesVessel/SinglePage.styles';
// import Pdf from "react-to-pdf";
import { PDFViewer } from '@react-pdf/renderer';
import markImage from '../../assets/images/image001.png';
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

import fontBankB from '../../assets/fonts/bankgothic_bold.ttf';
import fontBankR from '../../assets/fonts/BankGothic-Regular.ttf';
import fontTimeB from '../../assets/fonts/TimesNewerRoman-Bold.ttf';
import fontTimeN from '../../assets/fonts/TimesNewerRoman-Regular.ttf';

import EntriesCrewAction from '../../redux/EntriesCrew/actions';

const ref = React.createRef();

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

const MyDocument = (crewLists) => {
  console.log(crewLists.crewLists.length, 'crewLIst');
  var list = crewLists.crewLists;
  const trList = () => {
    let tr_array = [];
    for (let i = 0; i < list.length; i++) {
      var index = i + 1;
      tr_array.push(
        <View style={styles.table_row} key={i}>
          <Text
            style={{
              width: '153pt',
              paddingVertical: '10pt',
              paddingLeft: '10pt',
              fontFamily: 'Times New Roman',
              textAlign: 'left',
              fontSize: 12,
              borderStyle: 'solid',
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {index}. {list[i].strNameSeaman}
          </Text>
          <Text
            style={{
              width: '63pt',
              paddingVertical: '10pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {list[i].strLicensed}
          </Text>
          <Text
            style={{
              width: '62pt',
              paddingVertical: '10pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {list[i].strMMD}
          </Text>
          <Text
            style={{
              width: '100pt',
              paddingVertical: '5pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {list[i].strCapacityEngaged}
          </Text>
          <Text
            style={{
              width: '60pt',
              paddingVertical: '5pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {list[i].strConduct}
          </Text>
          <Text
            style={{
              width: '55pt',
              paddingVertical: '5pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {list[i].strAbility}
          </Text>
          <Text
            style={{
              width: '45pt',
              padding: '5pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {list[i].strSeaPage}
          </Text>
        </View>
      );
    }
    return tr_array;
  };
  const trBlankList = () => {
    let tr_array = [];
    for (let i = list.length; i < 9; i++) {
      tr_array.push(
        <View style={styles.table_row} key={i}>
          <Text
            style={{
              width: '153pt',
              paddingVertical: '10pt',
              paddingLeft: '10pt',
              fontFamily: 'Times New Roman',
              textAlign: 'left',
              fontSize: 12,
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
              width: '63pt',
              paddingVertical: '10pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {' '}
          </Text>
          <Text
            style={{
              width: '62pt',
              paddingVertical: '10pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {' '}
          </Text>
          <Text
            style={{
              width: '100pt',
              padding: '5pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {' '}
          </Text>
          <Text
            style={{
              width: '60pt',
              paddingVertical: '5pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {' '}
          </Text>
          <Text
            style={{
              width: '55pt',
              paddingVertical: '5pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
              borderStyle: 'solid',
              borderRightWidth: 1,
              borderBottomWidth: 1,
            }}
          >
            {' '}
          </Text>
          <Text
            style={{
              width: '45pt',
              padding: '5pt',
              fontFamily: 'Times New Roman',
              textAlign: 'center',
              fontSize: 12,
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
          {/* Here goes the title */}
          <View style={styles.block}>
            <Image style={styles.img} src={markImage} />
            <Text style={styles.brand}>M/V Grand Luxe</Text>
            <Text style={styles.description}>
              LIST OF CREW & REPORT OF CHARACTER
            </Text>
          </View>

          {/* Here goes the Crew Complement */}
          <View style={styles.table}>
            <View style={styles.table_row_header}>
              <Text
                style={{
                  width: '153pt',
                  height: '51pt',
                  fontFamily: 'Times New Roman',
                  paddingVertical: '15pt',
                  textAlign: 'center',
                  fontSize: 12,
                  borderStyle: 'solid',
                  borderWidth: 1,
                }}
              >
                NAME OF SEAMAN
              </Text>
              <Text
                style={{
                  width: '63pt',
                  height: '51pt',
                  fontFamily: 'Times New Roman',
                  paddingVertical: '5pt',
                  textAlign: 'center',
                  fontSize: 10,
                  borderStyle: 'solid',
                  borderTopWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                LISENCED{'\n'}YES OR {'\n'} NO
              </Text>
              <Text
                style={{
                  width: '62pt',
                  height: '51pt',
                  fontFamily: 'Times New Roman',
                  paddingVertical: '15pt',
                  textAlign: 'center',
                  fontSize: 12,
                  borderStyle: 'solid',
                  borderTopWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                MMD#
              </Text>
              <Text
                style={{
                  width: '100pt',
                  height: '51pt',
                  fontFamily: 'Times New Roman',
                  paddingVertical: '7pt',
                  textAlign: 'center',
                  fontSize: 12,
                  borderStyle: 'solid',
                  borderTopWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                CAPACITY{'\n'}ENGAGED
              </Text>
              <View style={{ flexDirection: 'column', height: '45pt' }}>
                <Text
                  style={{
                    width: '115pt',
                    paddingTop: '4pt',
                    textAlign: 'center',
                    fontFamily: 'Times New Roman',
                    fontSize: 11,
                    borderStyle: 'solid',
                    borderTopWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                  }}
                >
                  REPORT OF{'\n'}CHARACTER
                </Text>

                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      width: '60pt',
                      textAlign: 'center',
                      fontFamily: 'Times New Roman',
                      fontSize: 10,
                      borderStyle: 'solid',
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }}
                  >
                    CONDUCT
                  </Text>
                  <Text
                    style={{
                      width: '55pt',
                      textAlign: 'center',
                      fontFamily: 'Times New Roman',
                      fontSize: 10,
                      borderStyle: 'solid',
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                    }}
                  >
                    ABILITY
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  width: '45pt',
                  height: '51pt',
                  padding: '5pt',
                  fontFamily: 'Times New Roman',
                  textAlign: 'center',
                  fontSize: 12,
                  borderStyle: 'solid',
                  borderTopWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                SEE{'\n'}PAGE
              </Text>
            </View>
            {trList()}
            {trBlankList()}
          </View>

          <View style={{ marginTop: '15t', flexDirection: 'row' }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Times New Roman',
                fontSize: 10,
                width: '60pt',
              }}
            >
              Revision #:{' '}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Times New Roman',
                fontSize: 10,
                width: '60pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
              }}
            ></Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Times New Roman',
                fontSize: 10,
                width: '100pt',
              }}
            >
              Revision Date:
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Times New Roman',
                fontSize: 10,
                width: '60pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
              }}
            ></Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Times New Roman',
                fontFamily: 'Times New Roman',
                fontSize: 10,
                width: '60pt',
              }}
            ></Text>
            <Text style={{ textAlign: 'center', fontSize: 10, width: '100pt' }}>
              Master’s Signature:
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Times New Roman',
                fontSize: 10,
                width: '80pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
              }}
            ></Text>
          </View>

          <View style={{ marginTop: '15t', flexDirection: 'column' }}>
            <Text
              style={{
                marginBottom: '10pt',
                marginTop: '15pt',
                fontFamily: 'Times New Roman',
                textAlign: 'center',
                fontSize: 10,
                width: '150pt',
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
              }}
            ></Text>
            <Text
              style={{
                textAlign: 'left',
                fontFamily: 'Times New Roman',
                fontSize: 10,
              }}
            >
              (1) VG for Very Good, G for Good, M for Middling, I for
              Indifferent. The master may also insert particulars of ability or
              conduct or performance of duties. If he declines to give any
              opinion, he must so state opposite the crew member’s name.
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontFamily: 'Times New Roman',
                fontSize: 10,
              }}
            >
              (2) If there is any entry in the Ship’s Log relating in any way to
              a member of the crew, the page number where the entry appears
              should be written in the column opposite the crew member’s name.{' '}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function (props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();
  const { deleteData, editCrewData, updateData, getById } = EntriesCrewAction;
  const { crewLists, crewList } = useSelector((state) => state.EntriesCrew);
  React.useEffect(() => {
    console.log(id);
    dispatch(getById(id));
  }, []);
  React.useEffect(() => {
    console.log(crewLists, 'crewLists333');
  }, [crewLists]);
  const MyDocumen1t = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text>Section #1</Text>
          </View>
        </Page>
      </Document>
    );
  };
  return (
    <div>
      <LayoutWrapper>
        <Box>
          <PageWrapper className="editView">
            <Link to={`/dashboard/entries_crew`}>
              <Button color="primary">
                <span>Cancel</span>
              </Button>
            </Link>
            <Button color="primary">
              <PDFDownloadLink
                document={<MyDocument crewLists={crewLists} />}
                fileName="LIST OF CREW & REPORT OF CHARACTER.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download'
                }
              </PDFDownloadLink>
            </Button>
          </PageWrapper>
          <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
            {crewLists.length > 0 ? (
              <PDFViewer style={{ width: '100%', height: '600px' }}>
                <MyDocument crewLists={crewLists} />
              </PDFViewer>
            ) : null}
            {/* <PDFViewer style={{ width: "100%", height: "600px" }}>
              <MyDocument  />
            </PDFViewer> */}
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
    marginBottom: '13.5pt',
    marginLeft: '30pt',
    marginRight: '30pt',
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
    // marginBottom: "5pt",
  },
  table: {
    alignSelf: 'center',
    marginVertical: '10pt',
    flexDirection: 'column',
  },
  table_header: {
    textAlign: 'center',
    paddingVertical: '5pt',
    fontSize: 12,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  table_row_header: {
    alignSelf: 'center',
    flexDirection: 'row',
    // height: "41pt"
    // height: "auto"
  },
  table_row: {
    alignSelf: 'center',
    flexDirection: 'row',
    minHeight: '40pt',
    height: 'auto',
  },
});
