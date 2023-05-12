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

import SupplierModal from '../../component/SupplierModal';
import MaintenanceTypeModal from '../../component/MaintenanceTypeModal';
import ProjectModal from '../../component/ProjectModal';
import AssetModal from '../../component/AssetModal';
import OtherAssetModal from '../../component/AssetModal';
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
  const [data, setData] = React.useState([]);
  const columns = [
    {
      title: 'Asset',
      dataIndex: 'strEmailUserGuest',
      rowKey: 'strEmailUserGuest',
      width: '15%',
    },
    {
      title: 'Unit Price',
      dataIndex: 'intPriorityID',
      rowKey: 'intPriorityID',
      width: '15%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Qty Received',
      dataIndex: 'intWorkOrderStatusID',
      rowKey: 'intWorkOrderStatusID',
      width: '15%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Previously received',
      dataIndex: 'intWorkOrderStatusID',
      rowKey: 'intWorkOrderStatusID',
      width: '*',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Received To',
      dataIndex: 'intWorkOrderStatusID',
      rowKey: 'intWorkOrderStatusID',
      width: '*',
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
  const dispatch = useDispatch();
  const { redirectPath, addreceiptId } = props;
  let history = useHistory();
  const { receiptId, isSaved } = useSelector((state) => state.Workorders);
  const [SuggestedDate, setSuggestedDate] = React.useState(new Date());
  const [statusModalActive, setStatusModalActive] = React.useState(false);
  const [maintainTypeModalActive, setMaintainTypeModalActive] = React.useState(
    false
  );
  const [maintanaceTypeId, setMaintanaceTypeId] = React.useState('');
  const [maintanaceTypeTxt, setMaintanaceTypeTxt] = React.useState('');
  // const [priorityId,setPriorityId]=React.useState('');
  const [priorityTxt, setPriorityTxt] = React.useState('');
  const [priorityModalActive, setPriorityModalActive] = React.useState(false);
  const [projectModalActive, setProjectModalActive] = React.useState(false);
  const [lineItemModalActive, setLineItemModalActive] = React.useState(false);
  // const [selectedStatusId,setSelectedStatusId]=React.useState('');
  const [selectedStatusText, setSelectedStatusText] = React.useState('Open');
  const [intPriorityID, setIntPriorityID] = React.useState('');
  const [intWorkOrderStatusID, setIntWorkOrderStatusID] = React.useState(4);
  const [intSiteID, setIntSiteID] = React.useState(1);
  const [intRequestedByUserID, setIntRequestedByUserID] = React.useState('');
  const [strEmailUserGuest, setStrEmailUserGuest] = React.useState('');
  const [dtmDateCreated, setDtmDateCreated] = React.useState('');
  const [dtmDateCompleted, setDtmDateCompleted] = React.useState(new Date());
  const [intCompletedByUserID, setIntCompletedByUserID] = React.useState(null);
  const [strDescription, setStrDescription] = React.useState('');
  const [strWorkInstruction, setStrWorkInstruction] = React.useState('');
  const [strNameUserGuest, setStrNameUserGuest] = React.useState('');
  const [
    dtmSuggestedCompletionDate,
    setDtmSuggestedCompletionDate,
  ] = React.useState(null);
  const [estimatedCompletionTime, setEstimatedCompletionTime] = React.useState(
    '08:00:00'
  );
  const [strPhoneUserGuest, setStrPhoneUserGuest] = React.useState('');
  const [strCode, setStrCode] = React.useState('');
  const [strCompletionNotes, setStrCompletionNotes] = React.useState('');
  const [intMaintenanceTypeID, setIntMaintenanceTypeID] = React.useState('');
  const [dtmDateLastModified, setDtmDateLastModified] = React.useState('');
  const [strAdminNotes, setStrAdminNotes] = React.useState('');
  const [intRCAActionID, setIntRCAActionID] = React.useState('');
  const [intRCACauseID, setIntRCACauseID] = React.useState('');
  const [intRCAProblemID, setIntRCAProblemID] = React.useState('');
  const [strProjectTxt, setStrProjectTxt] = React.useState('');
  const [intProjectId, setIntProjectId] = React.useState('');
  const [strAssignedUsers, setStrAssignedUsers] = React.useState('');
  const [assetModalActive, setAssetModalActive] = React.useState(false);
  const [assetName, setAssetName] = React.useState('');
  const [strAssetIds, setStrAssetIds] = React.useState('');
  const [intAssignedUserId, setIntAssignedUserId] = React.useState(null);
  const [otherAssetModalActive, setOtherAssetModalActive] = React.useState(
    false
  );
  const [strAssets, setStrAssets] = React.useState('');
  const [strEstimatedHour, setStrEstimatedHours] = React.useState('');
  const [strActualHour, setStrActualHours] = React.useState('');
  const [dtmEstimatedStartDate, setDtmEstimatedStartDate] = React.useState('');
  const [dtmEstimatedStartTime, setDtmEstimatedStartTime] = React.useState('');
  const [strReference, setStrReference] = React.useState('');

  const [problem, setProblem] = React.useState('');
  const [rootCause, setRootCause] = React.useState('');
  const [solution, setSolution] = React.useState('');
  const [tabKey, setTabKey] = React.useState(1);
  const [filtered, setFiltered] = React.useState([]);

  const validate = () => {
    let res = true;
    if (assetName == '') res = false;
    if (SuggestedDate == null) res = false;
    if (strDescription == '') res = false;
    if (strAssignedUsers == '') res = false;
    if (strEstimatedHour == '') res = false;
    if (dtmEstimatedStartDate == null) res = false;
    if (tabKey == 2 && strCompletionNotes == '') res = false;
    if (strWorkInstruction == undefined || strWorkInstruction == '')
      res = false;
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
      dtmDateCreated: dtmDateCreated,
      dtmDateCompleted: dtmDateCompleted,
      dtmEstimatedStartDate: dtmEstimatedStartDate,
      dtmEstimatedStartTime: dtmEstimatedStartTime,
      intCompletedByUserID: intCompletedByUserID,
      strDescription: strDescription,
      intEstimatedHour: strEstimatedHour,
      intActualHour: strActualHour,
      strNameUserGuest: strNameUserGuest,
      dtmSuggestedCompletionDate: dtmSuggestedCompletionDate,
      strPhoneUserGuest: strPhoneUserGuest,
      strCode: strCode,
      strCompletionNotes: strCompletionNotes,
      intMaintenanceTypeID: intMaintenanceTypeID,
      dtmDateLastModified: dtmDateLastModified,
      strAdminNotes: strAdminNotes,
      intRCAActionID: intRCAActionID,
      intRCACauseID: intRCACauseID,
      intRCAProblemID: intRCAProblemID,
      strAssignedUsers: strAssignedUsers,
      strAssetIds: strAssetIds,
      intProjectId: intProjectId,
      intAssignedUserId: intAssignedUserId,
      strAssets: strAssets,
      estimatedCompletionTime: estimatedCompletionTime,
      strCompletionNotes: strCompletionNotes,
      problem: problem,
      rootCause: rootCause,
      solution: solution,
      strWorkInstruction: strWorkInstruction,
      strReference: strReference,
    };
    dispatch(add(sendData, receiptId));
  };
  const selectStatus = (sel) => {
    if (sel.intSysCode == 7 || sel.intSysCode == 9) {
      notification('info', 'Close could not selected.');
      return;
    }
    // workOrder status
    setIntWorkOrderStatusID(sel.intSysCode);
    setSelectedStatusText(sel.strName);
  };
  const selectMaintenanceType = (id, txt) => {
    // console.log(txt);
    // console.log(id);
    setMaintanaceTypeTxt(txt);
    setIntMaintenanceTypeID(id);
  };
  const selectedPriority = (id, txt) => {
    setPriorityTxt(txt);
    setIntPriorityID(id);
  };
  const selectProject = (row) => {
    setStrProjectTxt(row.strName);
    setIntProjectId(row._id);
  };
  const handleCancel = () => {
    setStatusModalActive(false);
    setMaintainTypeModalActive(false);
    setPriorityModalActive(false);
    setProjectModalActive(false);
    setAssetModalActive(false);
    setOtherAssetModalActive(false);
    setLineItemModalActive(false);
  };
  const strDescriptionChange = (txt) => {
    setStrDescription(txt);
  };
  const strWorkInstructionChange = (txt) => {
    setStrWorkInstruction(txt);
  };
  const selectAssignedUser = (row) => {
    setStrAssignedUsers(row.strFullName);
    setIntAssignedUserId(row._id);
  };
  const selectCompletedUser = (row) => {
    setIntCompletedByUserID(row._id);
  };
  const selectcompltedDate = (val) => {
    setDtmDateCompleted(val);
  };
  const selectedAsset = (row) => {
    setAssetName(row.strName);
    setStrAssets(row.strName + '(' + row.strCode + ')');
    setStrAssetIds(row._id.toString());
  };
  const completionInf = (info) => {
    setStrCompletionNotes(info.strCompletionNotes);
    setProblem(info.problem);
    setRootCause(info.rootCause);
    setSolution(info.solution);
  };
  const selectedOtherAsset = (row) => {
    if (strAssetIds != '') {
      var curAssetIds = strAssetIds.toString();
      var strAsset_tmp = strAssets;
      var idsArray = curAssetIds.split(',');
      if (idsArray.indexOf(row._id.toString()) == -1) {
        curAssetIds = curAssetIds + ',' + row._id;
        strAsset_tmp =
          strAsset_tmp + ',' + row.strName + '(' + row.strCode + ')';
      }
      setStrAssetIds(curAssetIds);
      setStrAssets(strAsset_tmp);
    }
  };
  const removeOtherAsset = (id, asset, index) => {
    var ids_temp = strAssetIds.split(',');
    var assets_temp = strAssets.split(',');
    ids_temp.splice(index, 1);
    assets_temp.splice(index, 1);

    if (ids_temp.length == 1) {
      setAssetName(assets_temp[0]);
    }
    setStrAssetIds(ids_temp.join(','));
    setStrAssets(assets_temp.join(','));
  };
  const onChange = (value, dateString) => {
    setDtmSuggestedCompletionDate(dateString);
  };
  const callback = (key) => {
    setTabKey(key);
  };
  React.useEffect(() => {
    if (isSaved) {
      history.push('/dashboard/workorder');
    }
  }, [isSaved]);
  React.useEffect(() => {
    console.log('work order id', receiptId);
  }, [receiptId]);
  React.useEffect(() => {
    dispatch(createReceiptId());
  }, []);
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
                            onClick={() =>
                              removeOtherAsset(row, assets_array[index], index)
                            }
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
                            label="Set Offline By User"
                            placeholder=""
                            value={selectedStatusText}
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
                              dtmSuggestedCompletionDate == null
                                ? 'error'
                                : 'success'
                            }
                            help={
                              dtmSuggestedCompletionDate == null
                                ? 'this field is require'
                                : ''
                            }
                            style={{ width: '100%' }}
                          >
                            <DatePicker
                              value={
                                dtmSuggestedCompletionDate != null
                                  ? moment(
                                      dtmSuggestedCompletionDate,
                                      'YYYY-MM-DD HH:mm:ss'
                                    )
                                  : ''
                              }
                              onChange={onChange}
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
                              dtmSuggestedCompletionDate == null
                                ? 'error'
                                : 'success'
                            }
                            help={
                              dtmSuggestedCompletionDate == null
                                ? 'this field is require'
                                : ''
                            }
                            style={{ width: '100%' }}
                          >
                            <DatePicker
                              value={
                                dtmSuggestedCompletionDate != null
                                  ? moment(
                                      dtmSuggestedCompletionDate,
                                      'YYYY-MM-DD HH:mm:ss'
                                    )
                                  : ''
                              }
                              onChange={onChange}
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
                            // value={strProjectTxt}
                            style={{ width: '90%' }}
                            // onChange={() => {
                            //   setProjectModalActive(true);
                            // }}
                          />
                          {/* <i
                            className="ionicons ion-arrow-down-b"
                            onClick={() => {
                              setProjectModalActive(true);
                            }}
                            style={{
                              fontSize: '25px',
                              cursor: 'pointer',
                              position: 'absolute',
                              marginLeft: '5px',
                            }}
                          ></i> */}
                        </div>
                      </Fieldset>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="isoInvoiceTable">
              {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
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
      <SupplierModal
        visible={statusModalActive}
        selectStatus={selectStatus}
        title="Supplier"
        onCancel={handleCancel}
      ></SupplierModal>

      <AssetModal
        visible={assetModalActive}
        title="ASSETS"
        selectedAsset={selectedAsset}
        onCancel={handleCancel}
      ></AssetModal>

      <OtherAssetModal
        visible={otherAssetModalActive}
        title="WORK ORDER ASSETS"
        selectedAsset={selectedOtherAsset}
        onCancel={handleCancel}
      ></OtherAssetModal>

      <MaintenanceTypeModal
        visible={maintainTypeModalActive}
        selectMaintenanceType={selectMaintenanceType}
        title="MAINTENACE TYPES"
        onCancel={handleCancel}
      ></MaintenanceTypeModal>

      <ProjectModal
        visible={projectModalActive}
        selectProject={selectProject}
        title="PROJECTES"
        onCancel={handleCancel}
      ></ProjectModal>

      <LineItemModal
        visible={lineItemModalActive}
        title="Receipt Line Item"
        onCancel={handleCancel}
      ></LineItemModal>
    </LayoutWrapper>
  );
}
