import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea,InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from "antd";
import notification from '@iso/components/Notification';
import './table.css'
import {
  ActionBtn,
  Fieldset,
  Form,
  Label, 
} from './UsersContentModal.styles';
import EventTypeAction from "../redux/eventtype/actions";
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  // marginTop:"-20px",
  // marginLeft:"2px",
  // background: "#e0e7ed",
}; 
export default function (props) {
  const {  visible,title} = props; 
  const dispatch = useDispatch();
  const { add,initData } = EventTypeAction;
  const [heading, setHeading] = React.useState(true);
  const [general, setGeneral] = React.useState(true);
  const [completion, setCompletion] = React.useState(true);
  const [labortab, setLabortab] = React.useState(true);
  const [business, setBusiness] = React.useState(true);
  // const { eventTypes } = useSelector((state) => state.EventType);

  const onSave = () => {
     
    var printData={}; 
    printData.heading=heading;
    printData.general=general;
    printData.completion=completion;
    printData.labortab=labortab;
    printData.business=business;
    localStorage.setItem("printData",JSON.stringify(printData));   
    // props.onCancel();
    props.goPdf();
  }

 return (  
      <Modal
      visible={visible}
      onClose={props.onCancel}
      okText="PDF"
      title={title}  
      // width={600}
     onOk={ onSave}
      onCancel={props.onCancel}
    >
    <div>
      <div>
        <Row style={rowStyle} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24} >         
            <div style={{ background: "#e8edf0",borderRadius:"5px", color: "#738796", fontSize: "13px", height: "20px", padding: "5px 0px 25px 10px"}}>
              <p>Select which Tabs/sections you wanted printed for the pane: Work Order</p>
            </div>
            </Col>         
        </Row>
       </div>
      <div style={{margin:"5px"}}>
         <Row style={rowStyle} gutter={16} justify="start">
           <Col md={24} sm={24} xs={24} >
             <div style={{ background: "#f0f0f0", borderRadius: "5px", fontSize: "13px", height: "25px", padding: "5px 0px 25px 10px" }}>
               <Checkbox checked={heading} onChange={(event) => { setHeading(event.target.checked);}}>Heading</Checkbox>
             </div>
           </Col>
         </Row>
      </div>
       <div style={{ margin: "5px" }}>
         <Row style={rowStyle} gutter={16} justify="start">
           <Col md={12} sm={8} xs={24} >
             <div style={{ background: "#f0f0f0", borderRadius: "5px", fontSize: "13px", height: "25px", padding: "5px 0px 25px 10px" }}>
               <Checkbox checked={general} onChange={(event) => { setGeneral(event.target.checked); }} >'General' tab page</Checkbox>
             </div>
           </Col>
           <Col md={12} sm={8} xs={24} >
             <div style={{ background: "#f0f0f0", fontSize: "13px", borderRadius: "5px", height: "25px", padding: "5px 0px 25px 10px" }}>
               <Checkbox checked={completion} onChange={(event) => { setCompletion(event.target.checked); }}  >'Completion' tab page</Checkbox>
             </div>
           </Col>           
         </Row>
       </div>
       <div style={{ margin: "5px" }}>
         <Row style={rowStyle} gutter={16} justify="start">
           <Col md={24} sm={24} xs={24} >
             <div style={{ background: "#f0f0f0", fontSize: "13px", borderRadius: "5px", height: "25px", padding: "5px 0px 25px 10px" }}>
               <Checkbox checked={labortab} onChange={(event) => { setLabortab(event.target.checked); }}>'Labor Tasks' tab page</Checkbox>
             </div>
           </Col>
         </Row>
       </div>
       
       <div style={{ margin: "5px" }}>
         <Row style={rowStyle} gutter={16} justify="start">
           <Col md={24} sm={24} xs={24} >
             <div style={{ background: "#f0f0f0", borderRadius: "5px", fontSize: "13px", height: "25px", padding: "5px 0px 25px 10px" }}>
               <Checkbox checked={business} onChange={(event)=>{setBusiness(event.target.checked)}} >Business</Checkbox>
             </div>
           </Col>
         </Row>
       </div>
    </div>
    <div style={{marginTop:"3px",height:"190px"}}>
      
    </div>
    </Modal>
 )
}