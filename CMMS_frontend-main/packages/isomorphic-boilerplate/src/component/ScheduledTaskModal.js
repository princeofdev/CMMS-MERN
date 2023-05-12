import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Input, { Textarea } from "@iso/components/uielements/input";
import Modal from "@iso/components/Feedback/Modal";
// import { DatePicker, Space } from 'antd';
import moment from "moment";
import { Col, Row, Form } from "antd";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import Button from "@iso/components/uielements/button";
import notification from "@iso/components/Notification";
import Select, { SelectOption } from "@iso/components/uielements/select";
import AssingedUserModal from "./UsersContentModal";
import MeterReadingAction from "../redux/meterreading/actions";
import ScheduledTaskAction from "../redux/scheduledtask/actions";
import WorkOrderAction from "../redux/workorder/actions";
import { Fieldset, Label, GeneralLine } from "./UsersContentModal.styles";

import WorkOrderStatusModal from './WorkOrderStatusModal';
import PriorityModal from './PriorityModal';
import MaintenanceTypeModal from './MaintenanceTypeModal';

const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginTop: "10px",
  marginBottom: "10px",
};
const rowFooterStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginTop: "10px",
};

const Option = SelectOption;
export default function (props) {
  const {
    visible,
    title,
    intScheduledMaintenanceID,
    pageState,
    assetName,
    assetId,
    scheduledTaskId,
    strAssetIds,
    scheduledmaintenance
  } = props;
  const { initData } = MeterReadingAction;
  const { addWorkOrder } = WorkOrderAction;
  const { add, getById, updateData, deleteData } = ScheduledTaskAction;
  const dispatch = useDispatch();
  const { meterreadingunits } = useSelector((state) => state.MeterReading);
  const { scheduledtask } = useSelector((state) => state.ScheduledTask);
  const [assingedUserModalActive, setAssingedUserModalActive] = React.useState(
    false
  );
  // const [completedUserModalActive,setCompletedUserModalActive]=React.useState(false);
  const [intTaskType, setIntTaskType] = React.useState(0);
  const [strDescription, setStrDescription] = React.useState("");
  const [intAssignedToUserID, setIntAssignedToUserID] = React.useState(null);
  const [assingedUserName, setAssingedUserName] = React.useState("");
  const [intMeterReadingUnitID, setIntMeterReadingUnitID] = React.useState(3);
  const [dblTimeEstimatedHours, setDblTimeEstimatedHours] = React.useState(
    null
  );
  const [bolPassNotify,setBolPassNotify]=React.useState(false);
  const [bolFailNotify,setBolFailNotify]=React.useState(false);
  const [strResult,setStrResult]=React.useState('');
  const [bolCreateWorkOrder, setBolCreateWorkOrder] = React.useState(false);
  const [selectedStatusText, setSelectedStatusText] = React.useState("");
  const [statusModalActive, setStatusModalActive] = React.useState(false);
  const [intWorkOrderStatusID, setIntWorkOrderStatusID] = React.useState(null);
  const [priorityTxt, setPriorityTxt] = React.useState("");
  const [intPriorityID, setIntPriorityID] = React.useState(null);
  const [priorityModalActive, setPriorityModalActive] = React.useState(false);
  const [maintainTypeModalActive, setMaintainTypeModalActive] = React.useState(
    false
  );
  const [maintanaceTypeTxt, setMaintanaceTypeTxt] = React.useState("");
  const [intMaintenanceTypeID, setIntMaintenanceTypeID] = React.useState(null);
  // const [intOrder, setIntOrder] = React.useState(null);

  React.useEffect(() => {
    dispatch(initData());
    if (pageState == "edit" && visible) {
      dispatch(getById(scheduledTaskId));
    }
  }, [visible]);

  React.useEffect(() => {
    if (Object.keys(scheduledtask).length != 0) {
      setIntTaskType(scheduledtask.intTaskType);
      setStrDescription(scheduledtask.strDescription);
      setIntAssignedToUserID(
        scheduledtask.intAssignedToUserID != null
          ? scheduledtask.intAssignedToUserID._id
          : null
      );
      setAssingedUserName(
        scheduledtask.intAssignedToUserID != null
          ? scheduledtask.intAssignedToUserID.strFullName
          : ""
      );
      setIntMeterReadingUnitID(scheduledtask.intMeterReadingUnitID);
      setDblTimeEstimatedHours(scheduledtask.dblTimeEstimatedHours);
      setBolPassNotify(scheduledtask.strResult=="Pass"?true:false);
      setBolFailNotify(scheduledtask.strResult=="Fail"?true:false);
    }
  }, [scheduledtask]);

  const handleCancel = () => {
    setAssingedUserModalActive(false);
    setStatusModalActive(false);
    setPriorityModalActive(false);
    setMaintainTypeModalActive(false)

  };

  const selectAssingUser = (row) => {
    setIntAssignedToUserID(row._id);
    setAssingedUserName(row.strFullName);
  };
  const selectStatus = (sel) => {
    if (sel.intSysCode == 7 || sel.intSysCode == 9) {
      notification('info', "Close could not be completed.");
      return;
    }
    setIntWorkOrderStatusID(sel.intSysCode);
    setSelectedStatusText(sel.strName);
  };
  const selectedPriority = (id, txt) => {
    setPriorityTxt(txt);
    setIntPriorityID(id);
  };
  const selectMaintenanceType = (id, txt) => {
    setMaintanaceTypeTxt(txt);
    setIntMaintenanceTypeID(id);
  };
  const onSave = () => {
    if (strDescription == "") {
      notification("info", "Please put the description.");
      return;
    }
    if (strDescription == "") {
      notification('info', "Please put the description.");
      return;
    }
    if (intTaskType == 3 && bolCreateWorkOrder) {
      if (intWorkOrderStatusID == null) {
        notification('info', "Please select a work order status.");
        return;
      }
      if (intPriorityID == null) {
        notification('info', "Please select a priority type.");
        return;
      }
    }

    var sendData = {};
    sendData.intTaskType = intTaskType;
    sendData.dblTimeEstimatedHours = dblTimeEstimatedHours;
    if(assetId=="All")
    sendData.intAssetID = strAssetIds;
    else
    sendData.intAssetID =assetId;
    sendData.intAssignedToUserID = intAssignedToUserID;
    sendData.intMeterReadingUnitID = intMeterReadingUnitID;
    sendData.intParentScheduledTaskID = 0;
    sendData.intScheduledMaintenanceID = intScheduledMaintenanceID;
    sendData.strDescription = strDescription;

    if(intTaskType==3){
      if(!bolPassNotify && !bolFailNotify)
      sendData.strResult="";
      else{
        sendData.strResult=bolPassNotify?"Pass":"Fail";
      }     
      sendData.bolInspection=bolPassNotify?true:false;
    }
    else{
      sendData.strResult="";
    }

    if (pageState == "edit") dispatch(updateData(sendData, scheduledTaskId));
    else dispatch(add(sendData));

    if (intTaskType == 3 && bolCreateWorkOrder) {
      var workOrder = {};
      workOrder.intRequestedByUserID = localStorage.getItem("user_id");
      workOrder.intWorkOrderStatusID = intWorkOrderStatusID;
      workOrder.intPriorityID = intPriorityID;
      workOrder.intMaintenanceTypeID = intMaintenanceTypeID;
      workOrder.intSiteID = 1;
      workOrder.strAssignedUsers = scheduledmaintenance.strAssignedUser;
      workOrder.intAssignedUserId = scheduledmaintenance.intAssignedToUserID ? scheduledmaintenance.intAssignedToUserID._id:null;
      workOrder.intEstimatedHour = scheduledmaintenance.intEstimatedHour;
      workOrder.strWorkInstruction = scheduledmaintenance.strWorkInstruction;
      workOrder.strDescription = strDescription;
      workOrder.strAssetIds = scheduledmaintenance.strAssetIds;
      workOrder.strAssets = scheduledmaintenance.strAssets;
      workOrder.dtmSuggestedCompletionDate = scheduledmaintenance.intEstimatedHour > 8 ? moment(new Date()).add('days', 1).format() : moment(new Date()).format();
      workOrder.dtmEstimatedStartDate = moment(new Date()).format();
      dispatch(addWorkOrder(workOrder));
    }

    props.onCancel();
  };
  const onDelete = () => {
    dispatch(deleteData(scheduledTaskId));
    props.onCancel();
  };
  const showMeterReadingUnit = () => {
    if (intTaskType == 2) {
      return (
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={24} style={{ marginBottom: "2px" }}></Col>
          <Col md={16} sm={16} xs={24} style={{ marginBottom: "2px" }}>
            <Select
              defaultValue={3}
              value={intMeterReadingUnitID}
              style={{ width: "80%" }}
              onChange={(value) => {
                setIntMeterReadingUnitID(value);
              }}
            >
              {meterreadingunits.map((row) => {
                return (
                  <Option key={row._id} value={row._id}>
                    {row.strName + "(" + row.strSymbol + ")"}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      );
    }
  };
  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        title={title}
        onOk={onSave}
        footer={null}
        onCancel={props.onCancel}
      >
        <GeneralLine>Task Details</GeneralLine>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={10} sm={10} xs={24} style={{ marginBottom: "2px" }}>
            <Label>Choose Task Type</Label>
          </Col>
          <Col md={14} sm={14} xs={24} style={{ marginBottom: "2px" }}>
            <Select
              defaultValue={intTaskType}
              value={intTaskType}
              style={{ width: "55%" }}
              onChange={(value) => {
                setIntTaskType(value);
              }}
            >
              <Option value={0}>General</Option>
              <Option value={1}>Text</Option>
              <Option value={2}>Meter reading</Option>
              <Option value={3}>Inspection</Option>
            </Select>
          </Col>
        </Row>
        {showMeterReadingUnit()}
        <Fieldset>
          <Label>Description*</Label>
          <Textarea
            value={strDescription}
            onChange={(event) => setStrDescription(event.target.value)}
            placeholder=""
            rows={3}
          />
        </Fieldset>
         {
           intTaskType!=3?
           <div>           
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={10} style={{ marginBottom: "2px" }}>
            <Label>Asset</Label>
          </Col>
          <Col md={16} sm={16} xs={12} style={{ marginBottom: "2px" }}>
            <span>{assetName}</span>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={10} sm={10} xs={24} style={{ marginBottom: "2px" }}>
            <Label>Assigned To User</Label>
          </Col>
          <Col md={14} sm={14} xs={24} style={{ marginBottom: "2px" }}>
            <div style={{ position: "relative" }}>
              <Input
                placeholder=""
                value={assingedUserName}
                style={{ width: "70%" }}
              />
              <i
                className="ionicons ion-arrow-down-b"
                onClick={() => {
                  setAssingedUserModalActive(true);
                }}
                style={{
                  fontSize: "25px",
                  cursor: "pointer",
                  position: "absolute",
                  marginLeft: "5px",
                }}
              ></i>
            </div>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={10} sm={10} xs={24} style={{ marginBottom: "2px" }}>
            <Label>Time Estimate (hours)</Label>
          </Col>
          <Col md={14} sm={14} xs={24} style={{ marginBottom: "2px" }}>
            <Input
              placeholder=""
              value={dblTimeEstimatedHours}
              onChange={(event) => setDblTimeEstimatedHours(event.target.value)}
              style={{ width: "60%" }}
            />
          </Col>
        </Row>
        <GeneralLine>Completion Details</GeneralLine>
           </div>:<div>
              <Row style={rowStyle} gutter={16} justify="start">
              <Col md={10} sm={10} xs={24} style={{marginBottom:'2px'}}>           
                <Label style={{fontWeight:"bold"}}>Pass</Label>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={10} sm={10} xs={24} style={{marginBottom:'2px',paddingLeft:"25px"}}>           
                <Checkbox  checked={bolPassNotify} onChange={(event)=>{setBolPassNotify(event.target.checked);setBolFailNotify(event.target.checked?false:false)}}>Notify Users</Checkbox>
              </Col>
            </Row>   
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={10} sm={10} xs={24} style={{marginBottom:'2px',}}>           
                <Label style={{fontWeight:"bold"}}>Fail</Label>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={10} sm={10} xs={24} style={{marginBottom:'20px',paddingLeft:"25px"}}>           
                <Checkbox  checked={bolFailNotify} onChange={(event)=>{setBolFailNotify(event.target.checked);setBolPassNotify(event.target.checked?false:false)}}>Notify Users</Checkbox>
              </Col>
            </Row>   
              <Row style={rowStyle} gutter={16} justify="start">
                <Col md={20} sm={20} xs={24} style={{ marginBottom: '2px', paddingLeft: "25px" }}>
                  <Checkbox checked={bolCreateWorkOrder} onChange={(event) => setBolCreateWorkOrder(event.target.checked)}>Create a Follow-on Work Order </Checkbox>
                </Col>
              </Row>
              {
                bolCreateWorkOrder ? <div>
                  <Row style={rowStyle} gutter={16} justify="start">
                    {/* <Col md={3} sm={3} xs={12} style={colStyle}></Col> */}
                    <Col md={18} sm={18} xs={24} style={{ paddingLeft: "25px" }} >
                      <Form>
                        <Fieldset>
                          <Label>Work Order Status *</Label>
                          <div style={{ position: "relative" }}>
                            <Input
                              label="Work Order Status"
                              placeholder=""
                              value={selectedStatusText}
                              onChange={() => {
                                setStatusModalActive(true);
                              }}
                              style={{ width: "90%" }}
                            />
                            <i
                              className="ionicons ion-arrow-down-b"
                              onClick={() => {
                                setStatusModalActive(true);
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                position: "absolute",
                                marginLeft: "5px",
                              }}
                            ></i>
                          </div>
                        </Fieldset>
                      </Form>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={16} justify="start">
                    <Col md={18} sm={18} xs={24} style={{ paddingLeft: "25px" }} >
                      <Form>
                        <Fieldset>
                          <Label>Priority *</Label>
                          <div style={{ position: "relative" }}>
                            <Input
                              label="Priority"
                              placeholder=""
                              value={priorityTxt}
                              style={{ width: "90%" }}
                            />
                            <i
                              className="ionicons ion-arrow-down-b"
                              onClick={() => {
                                setPriorityModalActive(true);
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                position: "absolute",
                                marginLeft: "5px",
                              }}
                            ></i>
                          </div>
                        </Fieldset>
                      </Form>
                    </Col>
                  </Row>
                  <Row style={rowStyle} gutter={16} justify="start">
                    <Col md={18} sm={18} xs={24} style={{ paddingLeft: "25px" }} >
                      <Form>
                        <Fieldset>
                          <Label>Maintenance Type</Label>
                          <div style={{ position: "relative" }}>
                            <Input
                              label="Maintenance Type"
                              placeholder=""
                              value={maintanaceTypeTxt}
                              style={{ width: "90%" }}
                            />
                            <i
                              className="ionicons ion-arrow-down-b"
                              onClick={() => {
                                setMaintainTypeModalActive(true);
                              }}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                position: "absolute",
                                marginLeft: "5px",
                              }}
                            ></i>
                          </div>
                        </Fieldset>
                      </Form>
                    </Col>
                  </Row>
                </div> : null
              }

           </div>
         }     
        
      
        <Row style={rowFooterStyle} gutter={16} justify="start">
          <Col md={24} sm={24} xs={24} style={{ marginBottom: "2px" }}>
            <Button
              type="primary"
              className="saveBtn"
              onClick={onSave}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <span>Save</span>
            </Button>
            <Button type="danger" className="saveBtn" onClick={onDelete}>
              <span>Delete</span>
            </Button>
          </Col>
        </Row>
      </Modal>
      {/* customer modal start */}
      <AssingedUserModal
        visible={assingedUserModalActive}
        title="Users"
        group="all"
        selectUser={selectAssingUser}
        onCancel={handleCancel}
      ></AssingedUserModal>
      <WorkOrderStatusModal
        visible={statusModalActive}
        selectStatus={selectStatus}
        title="WORK ORDER STATUS"
        onCancel={handleCancel}
      ></WorkOrderStatusModal>
      <PriorityModal
        visible={priorityModalActive}
        selectedPriority={selectedPriority}
        title="PRIORITIES"
        onCancel={handleCancel}
      ></PriorityModal>
      <MaintenanceTypeModal
        visible={maintainTypeModalActive}
        selectMaintenanceType={selectMaintenanceType}
        title="MAINTENACE TYPES"
        onCancel={handleCancel}
      ></MaintenanceTypeModal>
      {/* customer modal end */}
    </div>
  );
}
