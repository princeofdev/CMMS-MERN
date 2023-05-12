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
import workOrderNotificationAction from "../redux/workordernotification/actions";
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
    intWorkOrderId,
    pageState,
    workOrderNotication
  } = props;
  // const { initData } = MeterReadingAction;
  const { saveWorkOrderNotification, updateData, deleteData } = workOrderNotificationAction;
  // const { add, getById, updateData, deleteData } = ScheduledTaskAction;
  const dispatch = useDispatch(); 
  const [assingedUserModalActive, setAssingedUserModalActive] = React.useState(
    false
  );
  const [intAssignedToUserID, setIntAssignedToUserID] = React.useState(null);
  const [strUserEmail, setStrUserEmail] = React.useState('');
  const [assingedUserName, setAssingedUserName] = React.useState("");  
  const [bolAssign, setBolAssign] = React.useState(true);
  const [bolStatusChange, setBolStatusChange] = React.useState(false);
  const [bolWorkOrderCompletion, setBolWorkOrderCompletion] = React.useState(false);
  const [bolTaskCompletion, setBolTaskCompletion] = React.useState(false);
  const [bolAssetOnline, setBolAssetOnline]=React.useState(false);
  const [intWorkOrderNotificationId, setIntWorkOrderNotificationId] = React.useState(null);
  const handleCancel = () => {
    setAssingedUserModalActive(false);
  };

  const selectAssingUser = (row) => {   
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
    sendData.intWorkOrderID = intWorkOrderId;
    sendData.intUserId = intAssignedToUserID;
    sendData.strUserEmail = strUserEmail;
    sendData.bolAssign = bolAssign;
    sendData.bolStatusChange = bolStatusChange;
    sendData.bolWorkOrderCompletion = bolWorkOrderCompletion;
    sendData.bolTaskCompletion = bolTaskCompletion;
    sendData.bolAssetOnline = bolAssetOnline;
    if(pageState == "edit")
      dispatch(updateData(sendData, intWorkOrderNotificationId));
    else
      dispatch(saveWorkOrderNotification(sendData));
    props.onCancel();
  };
  const onDelete=()=>{
    dispatch(deleteData(intWorkOrderNotificationId));
    props.onCancel();
  }
  React.useEffect(() => {   
    if(pageState=="edit"){
      setIntAssignedToUserID(workOrderNotication.intUserId);
      setStrUserEmail(workOrderNotication.strUserEmail);
      setBolAssign(workOrderNotication.bolAssign);
      setBolStatusChange(workOrderNotication.bolStatusChange);
      setBolWorkOrderCompletion(workOrderNotication.bolWorkOrderCompletion);
      setBolTaskCompletion(workOrderNotication.bolTaskCompletion);
      setBolAssetOnline(workOrderNotication.bolAssetOnline);
      setStrUserEmail(workOrderNotication.intUserId ? workOrderNotication.intUserId.strEmailAddress:"");
      setAssingedUserName(workOrderNotication.intUserId.strFullName);
      setIntWorkOrderNotificationId(workOrderNotication._id);
    }
    else{
      setIntAssignedToUserID(null);
      setStrUserEmail('');
      setBolAssign(true);
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
        width={300}
      >
        <div>
          <Row style={rowStyle} gutter={16} justify="start">

            <Col md={23} sm={23} xs={24} style={{ marginBottom: "2px" }}>
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
              >Notify On Assignment</Checkbox>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px', paddingLeft: "25px" }}>
              <Checkbox checked={bolStatusChange}
                onChange={(event) => { setBolStatusChange(event.target.checked) }}
              >Notify On Status Change</Checkbox>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px', paddingLeft: "25px" }}>
              <Checkbox checked={bolWorkOrderCompletion}
                onChange={(event) => { setBolWorkOrderCompletion(event.target.checked) }}
              >Notify On Completion</Checkbox>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px', paddingLeft: "25px" }}>
              <Checkbox checked={bolTaskCompletion}
                onChange={(event) => { setBolTaskCompletion(event.target.checked) }}
              >Notify On Task Completed</Checkbox>
            </Col>
          </Row>
          {/* <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px', paddingLeft: "25px" }}>
              <Checkbox checked={bolAssetOnline}
                onChange={(event) => { setBolAssetOnline(event.target.checked) }}
              >Notify On Online Offline</Checkbox>
            </Col>
          </Row> */}
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
