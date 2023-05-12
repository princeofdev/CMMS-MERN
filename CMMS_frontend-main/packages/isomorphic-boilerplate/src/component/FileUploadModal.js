import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, message, Button } from 'antd';
import siteConfig from '@iso/config/site.config';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import Input from '@iso/components/uielements/input';
import 'antd/dist/antd.css';
import Modal from '@iso/components/Feedback/Modal';
import Select, { SelectOption } from '@iso/components/uielements/select';

import { Col, Row } from "antd";
// import ContentHolder from '@iso/components/utility/contentHolder';
// import notification from '@iso/components/Notification';

import './table.css'
// import {
//   ActionBtn,
//   Fieldset,
//   Form,
//   Label, 
// } from './UsersContentModal.styles';
import fileAction from '../redux/Files/actions';
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
};
const Option = SelectOption;
export default function (props) {
  const { visible, title, intWorkOrderId, intAssetId, intPurchaseOrderID, rfqID} = props;
  const dispatch = useDispatch();
  const { submitFile } = fileAction;
  const [fileList, setFileList] = React.useState([]);
  const [strDescription, setStrDescription]=React.useState("");
  const [progress, setProgress] = React.useState(0);  
 
  const beforeUpload=(file) => {
    console.log(file);
    if (file.type !== 'image/png' || file.type !== 'application/pdf' ) {
      message.error(`${file.name} is not a image/pdf file`);
      return Upload.LIST_IGNORE
    }
    else{
      return true
    }
    
  };
  
  const customRequest = async ({ onSuccess, onError, file, onProgress })=>{
    // if (!file.type.includes('image') && file.type !== 'application/pdf') {
    //   message.error(`${file.name} is not a image file`);
    //   return Upload.LIST_IGNORE
    // }
    // else if (  file.type !== 'application/pdf'){
    //   message.error(`${file.name} is not a image file`);
    //   return Upload.LIST_IGNORE
    // }
    
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data", "Authorization": localStorage.getItem('id_token') },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        // setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append("file", file);
    fmData.append("strDescription", strDescription);
    fmData.append("intWorkOrderId", intWorkOrderId);
    fmData.append("intAssetID", intAssetId);
    fmData.append("intPurchaseOrderID", intPurchaseOrderID);
    fmData.append("intRfqID", rfqID);
 
    try {
      // dispatch(submitFile(fmData,config));
      // axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
      const res = await axios.post(
        `${siteConfig.apiUrl}/file/upload`,
        fmData,
        config
      );

      if(res.status==200){
        onSuccess("Ok");
        message.success(`File uploaded successfully`);
        props.loadSuccess();
      }
      else{
        message.error(`File upload failed.`);
      }
      // onSuccess("Ok");
      // console.log("server res: ",res);
    } catch (err) {
      console.log("Eroor: ", err);
      message.error(`File upload failed.`);
      const error = new Error("Some error");
      onError({ err });
    }

  }
 return (
   <div>
     <Modal
       visible={visible}
       onClose={props.onCancel}
      //  okText="New"
       title={title}
       footer={null}      
       onCancel={props.onCancel}
     >
       <div>
         <Row style={rowStyle} gutter={16} justify="start">
           <Col md={24} sm={24} xs={24}>
                       
                   <Input
                     label="Description"
                      placeholder="Description"
                     value={strDescription}
                     onChange={(event) => {
                       setStrDescription(event.target.value);
                     }}                    
                   />             
           </Col>
         </Row>
        <Row style={rowStyle} gutter={16} justify="start" style={{marginTop:10}}>         
           <Col md={20} sm={20} xs={24}>
             <Upload 
              //  fileList={fileList}       
               accept="image/*, application/pdf"
              //  onChange={onChange}
              //  beforeUpload={beforeUpload}
               defaultFileList={[]}
              //  fileList={[]}
               customRequest={customRequest}
             >
               <Button icon={<UploadOutlined />}>Click to Upload</Button>
             </Upload>
           </Col>
         </Row>
       </div>
  
     </Modal>
    
   </div>
 );
}