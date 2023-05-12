import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import Button from '@iso/components/uielements/button';
import Input from '@iso/components/uielements/input';
// import DateTimePicker from "react-datetime-picker";
import { DatePicker, Space, TimePicker } from 'antd';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import { TableTabsStyle } from './Asset.styles';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import PageWrapper from './SingleWorkOrder.styles';
// import Checkbox from '@iso/components/uielements/checkbox';
import workorderAction from '../../redux/workorder/actions';
import WorkOrderTaskAction from '../../redux/workordertask/actions';
import { direction } from '@iso/lib/helpers/rtl';
import notification from '@iso/components/Notification';
import { Col, Row, Form } from 'antd';
import moment from 'moment';
import {
  General,
  LaborTask,
  Business,
  Completion,
  Files,
  Notification,
} from './Tabviews/Tabviews';
import WorkOrderStatusModal from '../../component/WorkOrderStatusModal';
import MaintenanceTypeModal from '../../component/MaintenanceTypeModal';
import PriorityModal from '../../component/PriorityModal';
import ProjectModal from '../../component/ProjectModal';
import AssetModal from '../../component/AssetModal';
import OtherAssetModal from '../../component/AssetModal';
import PrintSettingModal from '../../component/PrintSettingModal';
import newInnerImg from '../../assets/images/new-inner-list.png';

import { BillingFormWrapper, InputBoxWrapper } from './Checkout.styles';
import Select, { SelectOption } from '@iso/components/uielements/select';

import {
  Fieldset,
  // Form,
  Label,
} from '../Asset/Facility/OnlineContent.styles';
import { set } from 'nprogress';
const Option = SelectOption;
const priority = {
  1: 'Hightest',
  2: 'High',
  3: 'Medium',
  4: 'Low',
  5: 'Lowest',
};
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
const maintanceType_color_array = {
  1: '#2d61ae',
  2: '#cc4140',
  3: '#74bc50',
  4: '#FF9900',
  5: '#6fae9c',
  6: '#d2ca4e',
  7: '#967855',
  8: '#638582',
  9: '#7F7F7F',
  10: '#d36e87',
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

const { getById, updateData, deleteData } = workorderAction;
const { getDatas } = WorkOrderTaskAction;
// function callback(key) {console.log(key)}
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
export default function (props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const { id } = useParams();
  const { workorder, isDelete } = useSelector((state) => state.Workorders);
  const { workordertasks } = useSelector((state) => state.WorkOrderTask);
  const [SuggestedDate, setSuggestedDate] = React.useState(new Date());
  const [statusModalActive, setStatusModalActive] = React.useState(false);
  const [maintainTypeModalActive, setMaintainTypeModalActive] = React.useState(
    false
  );
  const [maintanaceTypeTxt, setMaintanaceTypeTxt] = React.useState('');
  // const [priorityId,setPriorityId]=React.useState('');
  const [priorityTxt, setPriorityTxt] = React.useState('');
  const [priorityModalActive, setPriorityModalActive] = React.useState(false);
  const [projectModalActive, setProjectModalActive] = React.useState(false);

  // const [selectedStatusId,setSelectedStatusId]=React.useState('');
  const [selectedStatusText, setSelectedStatusText] = React.useState('');
  const [intPriorityID, setIntPriorityID] = React.useState('');
  const [intWorkOrderStatusID, setIntWorkOrderStatusID] = React.useState('');
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
    ''
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
  const [intWorkOrderId, setIntWorkOrderId] = React.useState(null);
  const [otherAssetModalActive, setOtherAssetModalActive] = React.useState(
    false
  );
  const [strAssets, setStrAssets] = React.useState('');
  const [strEstimatedHour, setStrEstimatedHours] = React.useState('');
  const [strActualHour, setStrActualHours] = React.useState('');
  const [dtmEstimatedStartDate, setDtmEstimatedStartDate] = React.useState('');
  const [dtmEstimatedStartTime, setDtmEstimatedStartTime] = React.useState('');
  const [printSettingModalActive, setPrintSettingModalActive] = React.useState(
    false
  );
  const [workOrderTaskTree, setWorkOrderTaskTree] = React.useState([]);
  const [strReference, setStrReference] = React.useState('');
  // completion
  const [problem, setProblem] = React.useState('');
  const [rootCause, setRootCause] = React.useState('');
  const [solution, setSolution] = React.useState('');
  const [tabKey, setTabKey] = React.useState(1);
  const [
    intScheduledMaintenanceID,
    setIntScheduledMaintenanceID,
  ] = React.useState(null);
  //
  const validate = () => {
    let res = true;
    if (assetName == '') res = false;
    if (SuggestedDate == null) res = false;
    if (strDescription == '') res = false;
    if (strAssignedUsers == '') res = false;
    if (strEstimatedHour == '') res = false;
    if (dtmEstimatedStartDate == null) res = false;
    if (strWorkInstruction == undefined || strWorkInstruction == '')
      res = false;
    if (tabKey == 2 && strCompletionNotes == '') res = false;

    if (!res) notification('error', 'Please input all required fields!');
    return res;
  };
  const callback = (key) => {
    setTabKey(key);
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
      intCompletedByUserID: intCompletedByUserID,
      strDescription: strDescription,
      intEstimatedHour: strEstimatedHour,
      intActualHour: strActualHour,
      strNameUserGuest: strNameUserGuest,
      dtmSuggestedCompletionDate: new moment(
        dtmSuggestedCompletionDate
      ).toDate(),
      // dtmSuggestedCompletionDate:dtmSuggestedCompletionDate,
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
      dtmEstimatedStartDate: dtmEstimatedStartDate,
      //dtmEstimatedStartDate:new moment(dtmEstimatedStartDate).toDate(),
      dtmEstimatedStartTime: dtmEstimatedStartTime,
      estimatedCompletionTime: estimatedCompletionTime,
      strCompletionNotes: strCompletionNotes,
      problem: problem,
      rootCause: rootCause,
      solution: solution,
      strWorkInstruction: strWorkInstruction,
      strReference: strReference,
    };
    dispatch(updateData(sendData, id));
  };
  const selectStatus = (sel) => {
    // workOrder status
    if (sel.intSysCode == 7 || sel.intSysCode == 9) {
      var isComplete = false;
      for (var i = 0; i < workOrderTaskTree.length; i++) {
        if (
          workOrderTaskTree[i].intTaskType == 3 &&
          workOrderTaskTree[i].strResult != ''
        ) {
          isComplete = true;
          break;
        } else {
          if (workOrderTaskTree[i].children.length != 0) {
            isComplete = true;
            break;
          }
        }
      }
      if (strCompletionNotes == '') {
        notification('info', 'Please put the Complete Notes');
        return;
      } else if (intCompletedByUserID == null) {
        notification('info', "Please select a 'Completed By User'");
        return;
      }
      // else if (isComplete == false) {
      //   notification('info', 'The labor task must complete befor closing.');
      //   return;
      // }
    }
    setIntWorkOrderStatusID(sel.intSysCode);
    setSelectedStatusText(sel.strName);
  };
  const selectMaintenanceType = (id, txt) => {
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
    setPrintSettingModalActive(false);
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

  const makeTree = (arr) => {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;
    // First map the nodes of the array to an object -> create a hash table.
    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.key] = arrElem;
      mappedArr[arrElem.key]['children'] = [];
    }
    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentid) {
          delete mappedElem.children; //remove blank children
          mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
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
  const onBack = () => {
    history.goBack();
  };
  React.useEffect(() => {
    dispatch(getById(id));
    dispatch(getDatas(id));
  }, []);
  React.useEffect(() => {
    var temp_array = [];
    temp_array = workordertasks;
    var tree = makeTree(temp_array);
    setWorkOrderTaskTree(tree);
  }, [workordertasks]);

  React.useEffect(() => {
    if (Object.keys(workorder).length !== 0) {
      if (workorder.workorder._id != id) return;
      setIntWorkOrderId(workorder.workorder._id);
      setIntWorkOrderStatusID(workorder.workorder.intWorkOrderStatusID);
      setSelectedStatusText(
        workorderStatus_array[workorder.workorder.intWorkOrderStatusID]
      );
      setMaintanaceTypeTxt(
        maintanceType_array[workorder.workorder.intMaintenanceTypeID]
      );
      setIntMaintenanceTypeID(workorder.workorder.intMaintenanceTypeID);
      setPriorityTxt(priority[workorder.workorder.intPriorityID]);
      setIntPriorityID(workorder.workorder.intPriorityID);
      setStrCode(workorder.workorder.strCode);
      setStrAssets(
        workorder.workorder.strAssets != null
          ? workorder.workorder.strAssets
          : ''
      );
      setDtmSuggestedCompletionDate(
        workorder.workorder.dtmSuggestedCompletionDate
      );

      setAssetName(workorder.workorder.strAssets);
      setStrAssetIds(
        workorder.workorder.strAssetIds != null
          ? workorder.workorder.strAssetIds
          : ''
      );
      setStrDescription(workorder.workorder.strDescription);
      setStrWorkInstruction(
        workorder.workorder.strWorkInstruction
          ? workorder.workorder.strWorkInstruction
          : ''
      );
      setStrEstimatedHours(workorder.workorder.intEstimatedHour);
      setDtmEstimatedStartDate(workorder.workorder.dtmEstimatedStartDate);
      setDtmEstimatedStartTime(workorder.workorder.dtmEstimatedStartTime);
      setEstimatedCompletionTime(
        workorder.workorder.estimatedCompletionTime == undefined
          ? '08:00:00'
          : workorder.workorder.estimatedCompletionTime
      );
      setStrActualHours(workorder.workorder.intActualHour);
      setStrReference(workorder.workorder.strReference);
      setIntScheduledMaintenanceID(
        workorder.workorder.intScheduledMaintenanceID
      );
      if (Object.keys(workorder.project).length !== 0) {
        setStrProjectTxt(workorder.project.strName);
        setIntProjectId(workorder.project._id);
      }
    }
    console.log(workorder, 'workorder');
  }, [workorder]);

  const onDelete = () => {
    dispatch(deleteData(id));
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
    setDtmSuggestedCompletionDate(dateString == '' ? null : dateString);
  };
  const onPDF = () => {
    // setPrintSettingModalActive(true);
    history.push(`/dashboard/workorder/print/${id}`);
  };
  const goPdf = () => {
    setPrintSettingModalActive(false);
    history.push(`/dashboard/workorder/print/${id}`);
  };
  React.useEffect(() => {
    if (isDelete) {
      history.push('/dashboard/workorder');
    }
  }, [isDelete]);
  const completionInf = (info) => {
    setStrCompletionNotes(info.strCompletionNotes);
    setProblem(info.problem);
    setRootCause(info.rootCause);
    setSolution(info.solution);
  };
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
        {/* <Link to={redirectPath}> */}
        <Button color="primary" onClick={onBack} style={margin}>
          <span>Back</span>
        </Button>
        {/* </Link> */}

        <Button
          type="primary"
          onClick={onSave}
          className="saveBtn"
          style={margin}
        >
          <span>Save</span>
        </Button>
        <Button
          type="danger"
          className="saveBtn"
          onClick={onDelete}
          style={margin}
        >
          <span>Delete</span>
        </Button>

        <Button
          type="primary"
          onClick={onPDF}
          className="saveBtn"
          style={margin}
        >
          <span>Print</span>
        </Button>
      </div>
      <TableTabsStyle className="isoLayoutContentAsset">
        <h4 style={{ marginBottom: '15px' }}>
          Work Order Administration: {strCode}
        </h4>
        <PageWrapper className="editView">
          <div className="PageContent">
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={4} sm={4} xs={24} style={colStyle}>
                {multiAssets()}
              </Col>
              <Col md={20} sm={20} xs={24} style={colStyle}>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  {/* <Col md={3} sm={3} xs={12} style={colStyle}></Col> */}
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Work Order Status</Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            label="Work Order Status"
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
                        <Label>Asset</Label>
                        {strAssetIds.includes(',') ? null : (
                          <div style={{ position: 'relative' }}>
                            <Input
                              value={assetName}
                              placeholder=""
                              style={{ width: '90%' }}
                            />
                            <i
                              className="ionicons ion-arrow-down-b"
                              onClick={() => {
                                setAssetModalActive(true);
                              }}
                              style={{
                                fontSize: '25px',
                                cursor: 'pointer',
                                position: 'absolute',
                                marginLeft: '5px',
                              }}
                            ></i>
                          </div>
                        )}
                      </Fieldset>
                    </Form>
                  </Col>
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Scheduled Maintenace</Label>
                        <Label>
                          {intScheduledMaintenanceID
                            ? 'SM ' + intScheduledMaintenanceID
                            : ''}
                        </Label>
                      </Fieldset>
                    </Form>
                  </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  {/* <Col md={3} sm={3} xs={12} style={colStyle}></Col> */}
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Maintenance Type</Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            label="Maintenance Type"
                            placeholder=""
                            value={maintanaceTypeTxt}
                            style={{ width: '90%' }}
                          />
                          <i
                            className="ionicons ion-arrow-down-b"
                            onClick={() => {
                              setMaintainTypeModalActive(true);
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
                        <Label>Project</Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            label="Set Offline By User"
                            placeholder=""
                            value={strProjectTxt}
                            style={{ width: '90%' }}
                          />
                          <i
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
                          ></i>
                        </div>
                      </Fieldset>
                    </Form>
                  </Col>
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <InputBoxWrapper className="isoInputBox">
                      <label>References</label>
                      <Select
                        onChange={(event) => {
                          setStrReference(event);
                        }}
                        value={strReference}
                      >
                        <Option value="USCG S-ICR">USCG S-ICR</Option>
                        <Option value="SOLAS">SOLAS</Option>
                        <Option value="Manufacturer">Manufacturer</Option>
                      </Select>
                    </InputBoxWrapper>
                  </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                  {/* <Col md={3} sm={3} xs={12} style={colStyle}></Col> */}
                  <Col md={6} sm={6} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Priority</Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            label="Priority"
                            placeholder=""
                            value={priorityTxt}
                            style={{ width: '90%' }}
                          />
                          <i
                            className="ionicons ion-arrow-down-b"
                            onClick={() => {
                              setPriorityModalActive(true);
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
                  <Col md={5} sm={5} xs={12} style={colStyle}>
                    <Form>
                      <Fieldset>
                        <Label>Suggested Completion Date</Label>

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
                        />
                      </Fieldset>
                    </Form>
                  </Col>
                  <Col md={4} sm={4} xs={8}>
                    <Form>
                      <Fieldset style={{ paddingBottom: '10px' }}>
                        <Label>Time</Label>
                        <TimePicker
                          // defaultValue={"08:00:00"}
                          value={
                            estimatedCompletionTime == ''
                              ? null
                              : moment(estimatedCompletionTime, 'HH:mm:ss')
                          }
                          //defaultValue={null}
                          onChange={(value) => {
                            setEstimatedCompletionTime(
                              value == null
                                ? ''
                                : new moment(value).format('HH:mm:ss')
                            );
                          }}
                          style={{ width: '120px' }}
                        ></TimePicker>
                      </Fieldset>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </PageWrapper>
        <Tabs
          defaultActiveKey="1"
          className="isoTableDisplayTab"
          onChange={callback}
        >
          <TabPane tab="General" key="1">
            <General
              strDescriptionChange={strDescriptionChange}
              strWorkInstructionChange={strWorkInstructionChange}
              selectAssignedUser={selectAssignedUser}
              selectCompletedUser={selectCompletedUser}
              selectcompltedDate={selectcompltedDate}
              setStrEstimatedHours={setStrEstimatedHours}
              setStrActualHours={setStrActualHours}
              setEstimatedStartDate={setDtmEstimatedStartDate}
              setEstimatedStartTime={setDtmEstimatedStartTime}
              workorder={workorder}
              pageState={'edit'}
            ></General>
          </TabPane>
          <TabPane tab="Completion" key="2">
            <Completion
              completionInf={completionInf}
              data={workorder}
              pageState={'edit'}
            ></Completion>
          </TabPane>
          <TabPane tab="Labor Tasks" key="3">
            <LaborTask
              assetName={assetName}
              assetId={strAssetIds}
              workorderId={intWorkOrderId}
              strAssetIds={strAssetIds.split(',')}
              strAssets={strAssets.split(',')}
              workorder={workorder.workorder}
              pageState={'edit'}
            ></LaborTask>
          </TabPane>
          {/* <TabPane tab="Parts" key="4">
            Content of Tab Pane 3
          </TabPane> */}
          <TabPane tab="Businesses" key="5">
            <Business
              assetName={assetName}
              workorderId={intWorkOrderId}
              pageState={'edit'}
            ></Business>
          </TabPane>
          <TabPane tab="Files" key="6">
            <Files workorderId={intWorkOrderId}></Files>
          </TabPane>
          <TabPane tab="Notifications" key="7">
            <Notification
              intWorkOrderId={intWorkOrderId}
              pageState={'edit'}
              assetId={strAssetIds}
            ></Notification>
          </TabPane>
        </Tabs>
      </TableTabsStyle>
      {/* customize modal start */}
      <WorkOrderStatusModal
        visible={statusModalActive}
        selectStatus={selectStatus}
        title="WORK ORDER STATUS"
        onCancel={handleCancel}
      ></WorkOrderStatusModal>

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

      <PriorityModal
        visible={priorityModalActive}
        selectedPriority={selectedPriority}
        title="PRIORITIES"
        onCancel={handleCancel}
      ></PriorityModal>
      <ProjectModal
        visible={projectModalActive}
        selectProject={selectProject}
        title="PROJECTES"
        onCancel={handleCancel}
      ></ProjectModal>
      <PrintSettingModal
        visible={printSettingModalActive}
        title="PRINT SETTINGS"
        onCancel={handleCancel}
        goPdf={goPdf}
      ></PrintSettingModal>
      {/*  customize modal end*/}
    </LayoutWrapper>
  );
}
