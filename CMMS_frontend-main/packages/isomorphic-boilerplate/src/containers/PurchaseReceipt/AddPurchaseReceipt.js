import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
// import DateTimePicker from "react-datetime-picker";
import { DatePicker, TimePicker } from 'antd';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import { TableTabsStyle } from './Asset.styles';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import PageWrapper from './SinglePurchaseReceipt.styles';
import { direction } from '@iso/lib/helpers/rtl';
import notification from '@iso/components/Notification';
// import Checkbox from '@iso/components/uielements/checkbox';
import receiptAction from '../../redux/purchasereceipt/actions';
import { Col, Row, Form } from 'antd';
import moment from 'moment';
import Scrollbars from '@iso/components/utility/customScrollBar';

import BusinessModal from '../../component/BusinessModal';
import LineItemModal from '../../component/LineItemModal';
import newInnerImg from '../../assets/images/new-inner-list.png';
import TableWrapper from '../../component/AntTables.styles';
import newAddImg from '../../assets/images/new-inner-list.png';

// import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import Select, { SelectOption } from '@iso/components/uielements/select';

import {
  Fieldset,
  // Form,
  Label,
} from '../Asset/Facility/OnlineContent.styles';
const FormItem = Form.Item;
const Option = SelectOption;

const { updateData, add, createReceiptId } = receiptAction;
function callback(key) {}

const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '16px',
};
const gutter = 16;
const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};
const tdStyle = {
  maxWidth: '110px',
  width: '170px',
  whiteSpace: 'nowrap',
  textAlign: 'left',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};
const lineBar = {
  textAlign: 'left',
  height: '32px',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  background: '#e8edf0',
  padding: '5px 0 3px 10px',
  color: '#738796',
  /* font-family: arial; */
  marginBottom: 20,
  fontSize: '13px',
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

export default function (props) {
  const { pageState, purchaseReceipt } = React.useState();
  const [data, setData] = React.useState([]);
  const columns = [
    {
      title: 'Asset',
      dataIndex: 'strEmailUserGuest',
      rowKey: 'strEmailUserGuest',
      width: '20%',
    },
    {
      title: 'Qty Received',
      dataIndex: 'intWorkOrderStatusID',
      rowKey: 'intWorkOrderStatusID',
      width: '10%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Previously received',
      dataIndex: 'intWorkOrderStatusID',
      rowKey: 'intWorkOrderStatusID',
      width: '15%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Unit Price',
      dataIndex: 'intPriorityID',
      rowKey: 'intPriorityID',
      width: '10%',
      render: (
        <div style={{ position: 'relative' }}>
          <Input
            label="Set Offline By User"
            placeholder=""
            value=""
            style={{ width: '90%' }}
          />
          <i
            className="ionicons ion-arrow-down-b"
            style={{
              fontSize: '25px',
              cursor: 'pointer',
              position: 'absolute',
              marginLeft: '5px',
            }}
          ></i>
        </div>
      ),
    },
    {
      title: 'Received To',
      dataIndex: 'intWorkOrderStatusID',
      rowKey: 'intWorkOrderStatusID',
      width: '25%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '',
      dataIndex: 'intWorkOrderStatusID',
      rowKey: 'intWorkOrderStatusID',
      width: '15% ',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Related Purchase Request',
      dataIndex: 'intWorkOrderStatusID',
      rowKey: 'intWorkOrderStatusID',
      width: '*',
      render: (text) => <span>{text}</span>,
    },
  ];
  const { purchaseReceipts, isDelete } = useSelector(
    (state) => state.purchaseOrder
  );
  const dispatch = useDispatch();
  let history = useHistory();
  const { receiptId, isSaved } = useSelector((state) => state.Workorders);
  const [SuggestedDate, setSuggestedDate] = React.useState(new Date());
  const [statusModalActive, setStatusModalActive] = React.useState(false);
  const [intSupplierID, setIntSupplierID] = React.useState(null);
  const [strSupplierName, setStrSupplierName] = React.useState('');

  const [lineItemModalActive, setLineItemModalActive] = React.useState(false);
  const [intPriorityID, setIntPriorityID] = React.useState('');
  const [intWorkOrderStatusID, setIntWorkOrderStatusID] = React.useState(4);
  const [intSiteID, setIntSiteID] = React.useState(1);
  const [strEmailUserGuest, setStrEmailUserGuest] = React.useState('');
  const [intCompletedByUserID, setIntCompletedByUserID] = React.useState(null);
  const [strDescription, setStrDescription] = React.useState('');
  const [strNameUserGuest, setStrNameUserGuest] = React.useState('');

  const [receiptReceivedDate, setReceiptReceivedDate] = React.useState(null);
  const [receiptOrderedDate, setReceiptOrderedDate] = React.useState(null);
  const [strPhoneUserGuest, setStrPhoneUserGuest] = React.useState('');
  const [strCode, setStrCode] = React.useState('');
  const [strCompletionNotes, setStrCompletionNotes] = React.useState('');
  const [strAssignedUsers, setStrAssignedUsers] = React.useState('');
  const [assetModalActive, setAssetModalActive] = React.useState(false);
  const [assetName, setAssetName] = React.useState('');
  const [strAssetIds, setStrAssetIds] = React.useState('');
  const [otherAssetModalActive, setOtherAssetModalActive] = React.useState(
    false
  );
  const [strAssets, setStrAssets] = React.useState('');

  const [strPackingSlip, setStrPackingSlip] = React.useState('');

  const validate = () => {
    let res = true;
    if (assetName == '') res = false;
    if (SuggestedDate == null) res = false;
    if (strDescription == '') res = false;
    if (strAssignedUsers == '') res = false;
    if (!res) notification('error', 'Please input all required fields!');
    return res;
  };
  const onSave = () => {
    if (!validate()) return;
    var sendData = {
      intPriorityID: intPriorityID,
      intWorkOrderStatusID: intWorkOrderStatusID,
      intSiteID: intSiteID,
      intRequestedByUserID: localStorage.getItem('user_id'),
      strEmailUserGuest: strEmailUserGuest,
      intCompletedByUserID: intCompletedByUserID,
      strDescription: strDescription,
      strNameUserGuest: strNameUserGuest,
      receiptReceivedDate: receiptReceivedDate,
      receiptOrderedDate: receiptOrderedDate,
      strPhoneUserGuest: strPhoneUserGuest,
      strCode: strCode,
      strCompletionNotes: strCompletionNotes,
      strAssignedUsers: strAssignedUsers,
      strAssetIds: strAssetIds,
      strAssets: strAssets,
      strCompletionNotes: strCompletionNotes,
    };
    dispatch(add(sendData, receiptId));
  };
  const selectBusiness = (row) => {
    console.log(row);
    setStrSupplierName(row.strName);
    setIntSupplierID(row._id);
  };
  const handleCancel = () => {
    setStatusModalActive(false);
    setAssetModalActive(false);
    setOtherAssetModalActive(false);
    setLineItemModalActive(false);
  };
  const onChange1 = (value, dateString) => {
    setReceiptReceivedDate(dateString);
  };
  const onChange2 = (value, dateString) => {
    setReceiptOrderedDate(dateString);
  };
  React.useEffect(() => {
    if (isSaved) {
      history.push('/dashboard/purchase_receipts');
    }
  }, [isSaved]);
  React.useEffect(() => {
    console.log('work order id', receiptId);
  }, [receiptId]);
  React.useEffect(() => {
    dispatch(createReceiptId());
  }, []);
  React.useEffect(() => {
    if (pageState == 'Edit' && purchaseReceipts != undefined) {
      setStrSupplierName(
        purchaseReceipts.intSupplierID
          ? purchaseReceipts.intSupplierID.strName
          : ''
      );
      setIntSupplierID(
        purchaseReceipts.intSupplierID
          ? purchaseReceipts.intSupplierID._id
          : null
      );

      // setStrSupplierAddress(purchaseReceipts.strSupplierAddress);
    }
  }, [pageState]);
  const multiAssets = () => {
    if (strAssetIds != null && strAssetIds != '') {
      var assetList = null;
      var strAssetIds_tmp = strAssetIds.toString();
      var ids_array = strAssetIds_tmp.split(',');
      var assets_array = strAssets.split(',');
      if (ids_array.length > 1) {
        var assetList = (
          <div style={{ height: '200px', overflow: 'auto' }}>
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                {ids_array.map((row, index) => {
                  return (
                    <tr key={row}>
                      <td style={tdStyle}>
                        <span>
                          <a title={assets_array[index]}>
                            {assets_array[index]}
                          </a>
                        </span>
                      </td>
                      <td style={{ paddingLeft: '10px' }}>
                        <span>
                          <a
                            // onClick={() =>
                            //   // removeOtherAsset(row, assets_array[index], index)
                            // }
                            title="Remove"
                            style={{ color: 'black' }}
                          >
                            X
                          </a>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }

      return (
        <div style={{ height: '100%', position: 'relative' }}>
          <div style={{ padding: '5px', paddingTop: '15px' }}>{assetList}</div>
          <div
            style={{
              position: 'absolute',
              cursor: 'pointer',
              width: '100%',
              height: '30px',
              bottom: '10px',
              padding: '0px 5px',
            }}
          >
            <img
              style={{ width: '13px', height: '12px' }}
              src={newInnerImg}
            ></img>
            <span
              style={{
                paddingLeft: '5px',
                fontSize: '11px',
                fontWeight: 'bold',
              }}
              onClick={() => setOtherAssetModalActive(true)}
            >
              Add another asset
            </span>
          </div>
        </div>
      );
    }
  };
  return (
    <LayoutWrapper>
      <div className="PageHeader">
        <Link to={`dashboard/purchase_receipts`} style={margin}>
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
      <TableTabsStyle className="isoLayoutContentAsset">
        <h4 style={{ marginBottom: '15px' }}>Purchase Receipt:</h4>
        <PageWrapper className="editView">
          <div className="PageContent">
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={4} sm={4} xs={24} style={colStyle}>
                {multiAssets()}
              </Col>
              <Col md={20} sm={20} xs={24} style={colStyle}>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Supplier</Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            label="Supplier"
                            placeholder=""
                            value={strSupplierName}
                            onChange={() => {
                              setStatusModalActive(true);
                            }}
                            style={{ width: '90%' }}
                          />
                          <i
                            className="ionicons ion-arrow-down-b"
                            onClick={() => {
                              setStatusModalActive(true);
                            }}
                            style={{
                              fontSize: '25px',
                              cursor: 'pointer',
                              position: 'absolute',
                              marginLeft: '5px',
                            }}
                          ></i>
                        </div>
                      </Fieldset>
                    </Form>
                  </Col>
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Date Ordered</Label>
                        <div style={{ position: 'relative' }}>
                          <FormItem
                            validateStatus={
                              receiptOrderedDate == null ? 'error' : 'success'
                            }
                            help={
                              receiptOrderedDate == null
                                ? 'this field is require'
                                : ''
                            }
                            style={{ width: '100%' }}
                          >
                            <DatePicker
                              value={
                                receiptOrderedDate != null
                                  ? moment(
                                      receiptOrderedDate,
                                      'YYYY-MM-DD HH:mm:ss'
                                    )
                                  : ''
                              }
                              onChange={onChange2}
                              style={{ width: '100%' }}
                            />
                          </FormItem>
                        </div>
                      </Fieldset>
                    </Form>
                  </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Date Received</Label>
                        <div style={{ position: 'relative' }}>
                          <FormItem
                            validateStatus={
                              receiptReceivedDate == null ? 'error' : 'success'
                            }
                            help={
                              receiptReceivedDate == null
                                ? 'this field is require'
                                : ''
                            }
                            style={{ width: '100%' }}
                          >
                            <DatePicker
                              value={
                                receiptReceivedDate != null
                                  ? moment(
                                      receiptReceivedDate,
                                      'YYYY-MM-DD HH:mm:ss'
                                    )
                                  : ''
                              }
                              onChange={onChange1}
                              style={{ width: '100%' }}
                            />
                          </FormItem>
                        </div>
                      </Fieldset>
                    </Form>
                  </Col>
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Packing slip</Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            label="Set Offline By User"
                            placeholder=""
                            value={strPackingSlip}
                            style={{ width: '90%' }}
                          />
                        </div>
                      </Fieldset>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="isoInvoiceTable">
              {/* <Scrollbars
                style={{ height: "100%", width: "calc(100vh - 70px)" }}
              > */}
              <TableWrapper
                // rowSelection={rowSelection}
                dataSource={data}
                columns={columns}
                pagination={false}
                className="isoGroupTable"
              />
              {/* </Scrollbars> */}
              <div
                style={{
                  color: 'rgb(102, 115, 136)',
                  fontSize: '10pt',
                  background: '#f7f7f7',
                  border: '1px solid rgb(241, 243, 246)',
                  height: '25px',
                }}
              >
                <span
                  style={{
                    float: 'left',
                    marginLeft: '4px',
                    marginRight: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={newAddImg}
                    onClick={() => {
                      setLineItemModalActive(true);
                    }}
                  ></img>
                </span>
              </div>
            </div>
          </div>
        </PageWrapper>
      </TableTabsStyle>
      <BusinessModal
        visible={statusModalActive}
        selectBusiness={selectBusiness}
        title="Supplier"
        onCancel={handleCancel}
      ></BusinessModal>

      <LineItemModal
        visible={lineItemModalActive}
        title="Receipt Line Item"
        onCancel={handleCancel}
      ></LineItemModal>
    </LayoutWrapper>
  );
}
