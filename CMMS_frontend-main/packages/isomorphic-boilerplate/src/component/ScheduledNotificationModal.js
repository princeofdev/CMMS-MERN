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
import ScheduleNotificationAction from "../redux/schedulednotification/actions";
import { Fieldset, Label, GeneralLine } from "./UsersContentModal.styles";

const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  // marginTop: "10px",
  marginBottom: "10px",
};
const rowFooterStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  marginTop: "10px",
};

const Option = SelectOption;
const FormItem = Form.Item;
export default function (props) {
  const {
    visible,
    title,
    intScheduledMaintenanceID,
    pageState,
    scheduleNotificaton
  } = props;
  // const { initData } = MeterReadingAction;
  const { saveScheduledNotification, updateData, deleteData } = ScheduleNotificationAction;
  // const { add, getById, updateData, deleteData } = ScheduledTaskAction;
  const dispatch = useDispatch(); 
  const [assingedUserModalActive, setAssingedUserModalActive] = React.useState(
    false
  );
  const [intAssignedToUserID, setIntAssignedToUserID] = React.useState(null);
  const [strUserEmail, setStrUserEmail] = React.useState('');
  const [assingedUserName, setAssingedUserName] = React.useState("");  
  const [bolAssign, setBolAssign] = React.useState(false);
  const [bolStatusChange, setBolStatusChange] = React.useState(false);
  const [bolWorkOrderCompletion, setBolWorkOrderCompletion] = React.useState(false);
  const [bolTaskCompletion, setBolTaskCompletion] = React.useState(false);
  const [bolAssetOnline, setBolAssetOnline]=React.useState(false);
  const [intScheduledNotificationId, setIntScheduledNotificationId]=React.useState(null);
  const handleCancel = () => {
    setAssingedUserModalActive(false);
  };

  const selectAssingUser = (row) => {
    console.log(row);
    setIntAssignedToUserID(row._id);
    setAssingedUserName(row.strFullName);
    setStrUserEmail(row.strEmailAddress);
  };
  const onSave = () => {
    if (assingedUserName == "") {
      notification("info", "Please select a user");
      return;
    }
    var sendData = {};
    sendData.intScheduledMaintenanceID = intScheduledMaintenanceID;
    sendData.intUserId = intAssignedToUserID;
    sendData.strUserEmail = strUserEmail;
    sendData.bolAssign = bolAssign;
    sendData.bolStatusChange = bolStatusChange;
    sendData.bolWorkOrderCompletion = bolWorkOrderCompletion;
    sendData.bolTaskCompletion = bolTaskCompletion;
    sendData.bolAssetOnline = bolAssetOnline;

    if(pageState == "edit")
      dispatch(updateData(sendData, intScheduledNotificationId));
    else
      dispatch(saveScheduledNotification(sendData));
    props.onCancel();
  };
  const onDelete=()=>{
    dispatch(deleteData(intScheduledNotificationId));
    props.onCancel();
  }
  React.useEffect(() => {   
    if(pageState=="edit"){
      setIntAssignedToUserID(scheduleNotificaton.intUserId);
      setStrUserEmail(scheduleNotificaton.strUserEmail);
      setBolAssign(scheduleNotificaton.bolAssign);
      setBolStatusChange(scheduleNotificaton.bolStatusChange);
      setBolWorkOrderCompletion(scheduleNotificaton.bolWorkOrderCompletion);
      setBolTaskCompletion(scheduleNotificaton.bolTaskCompletion);
      setBolAssetOnline(scheduleNotificaton.bolAssetOnline);
      setStrUserEmail(scheduleNotificaton.intUserId ? scheduleNotificaton.intUserId.strEmailAddress:"");
      setAssingedUserName(scheduleNotificaton.intUserId.strFullName);
      setIntScheduledNotificationId(scheduleNotificaton._id);
    }
    else{
      setIntAssignedToUserID(null);
      setStrUserEmail('');
      setBolAssign(false);
      setBolStatusChange(false);
      setBolWorkOrderCompletion(false);
      setBolTaskCompletion(false);
      setBolAssetOnline(false);
      setStrUserEmail("");
      setAssingedUserName("");
    }
  }, [pageState])
  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        title={title}
        onOk={onSave}
        footer={null}
        onCancel={props.onCancel}
        width={400}
      >
        <div>
          <Row style={rowStyle} gutter={16} justify="start">

            <Col md={20} sm={20} xs={24} style={{ marginBottom: "2px" }}>
              <Form>
                <Fieldset>
                  <Label>User</Label>

                  <div style={{ position: 'relative' }}>
                    <FormItem
                      hasFeedback
                      validateStatus={
                        assingedUserName == '' ? 'error' : 'success'
                      }
                      help={
                        assingedUserName == ''
                          ? 'this field is require'
                          : ''
                      }
                      style={{ width: '90%' }}
                    >
                      <Input
                        value={assingedUserName}
                        placeholder=""
                        onChange={() => {
                          setAssingedUserModalActive(true);
                        }}
                      />
                    </FormItem>
                    <i
                      className="ionicons ion-arrow-down-b"
                      onClick={() => {
                        setAssingedUserModalActive(true);
                      }}
                      style={{
                        top: '0',
                        right: '0',
                        // marginRight: '10px',
                        fontSize: '25px',
                        cursor: 'pointer',
                        position: 'absolute',
                        marginLeft: '10px',
                      }}
                    ></i>
                  </div>

                </Fieldset>
              </Form>             
            </Col>
          </Row>
         
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px', paddingLeft: "25px" }}>
              <Checkbox checked={bolAssign}
              onChange={(event)=>{setBolAssign(event.target.checked)}}
              >Notify user on work order assignment</Checkbox>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px', paddingLeft: "25px" }}>
              <Checkbox checked={bolStatusChange}
                onChange={(event) => { setBolStatusChange(event.target.checked) }}
              >Notify user on work order status change</Checkbox>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px', paddingLeft: "25px" }}>
              <Checkbox checked={bolWorkOrderCompletion}
                onChange={(event) => { setBolWorkOrderCompletion(event.target.checked) }}
              >Notify user on work order completion</Checkbox>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px', paddingLeft: "25px" }}>
              <Checkbox checked={bolTaskCompletion}
                onChange={(event) => { setBolTaskCompletion(event.target.checked) }}
              >Notify user on task completion</Checkbox>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px', paddingLeft: "25px" }}>
              <Checkbox checked={bolAssetOnline}
                onChange={(event) => { setBolAssetOnline(event.target.checked) }}
              >Notify user when work order asset goes online/offline</Checkbox>
            </Col>
          </Row>
        </div>
        <Row style={rowFooterStyle} gutter={16} justify="start">
          <Col md={24} sm={24} xs={24} style={{ marginBottom: "2px" }}>
            <Button
              type="primary"
              className="saveBtn"
              onClick={onSave}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <span>Ok</span>
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
        group="user"
        selectUser={selectAssingUser}
        onCancel={handleCancel}
      ></AssingedUserModal>


      {/* customer modal end */}
    </div>
  );
}
