import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, message, Button } from 'antd';
import siteConfig from '@iso/config/site.config';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
// import Button from '@iso/components/uielements/button';
import Input, { Textarea } from '@iso/components/uielements/input';
import 'antd/dist/antd.css';
import Modal from '@iso/components/Feedback/Modal';
import Select, { SelectOption } from '@iso/components/uielements/select';

import { Col, Row } from "antd";
// import ContentHolder from '@iso/components/utility/contentHolder';
// import notification from '@iso/components/Notification';

import './table.css'
import {
  ActionBtn,
  Fieldset,
  Form,
  Label,
} from './UsersContentModal.styles';
import fileAction from '../redux/Files/actions';
const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
};
const Option = SelectOption;
export default function (props) {
  const { visible, title, strSupplierName, strSupplierEmail, intPurchaseOrderID } = props;
  const dispatch = useDispatch();
  const { submitFile } = fileAction;
  const [fileList, setFileList] = React.useState([]);
  const [strDescription, setStrDescription] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [formDt, setFormDt] = React.useState(null);
  const [pdfFile, setPdfFile] = React.useState({});
  const [supplierName,setSupplierName]=React.useState('');
  const [supplierEmail,setSupplierEmail]=React.useState('');

  React.useEffect(() => {
    
    setSupplierEmail(strSupplierEmail);
    setSupplierName(strSupplierName);
  }, [visible]);

  const onSend = async () => {

    if(supplierEmail==''){
      message.error(`Please put the supplier email`);
      return;
    }
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data", "Authorization": localStorage.getItem('id_token') },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
      }
    };
    fmData.append("file", pdfFile.originFileObj);
    fmData.append("strDescription", strDescription);
    fmData.append("intPurchaseOrderID", intPurchaseOrderID);
    fmData.append("strSupplierEmail", supplierEmail);
    try {
      // dispatch(submitFile(fmData,config));
      axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
      const res = await axios.post(
        `${siteConfig.apiUrl}/file/uploadMail`,
        fmData,
        config
      );
      console.log(res, 'this sent mail response');
      if (res.status == 200) {
        setFileList([]);
        // onSuccess("Ok");
        message.success(`Email Sent successfully`);
        props.loadSuccess();
      }
      else {
        message.error(`Email send failed.`);
      }
      // onSuccess("Ok");
      // console.log("server res: ",res);
    } catch (err) {
      console.log("Eroor: ", err);
      message.error(`Email send failed.`);
      const error = new Error("Some error");
      // onError({ err });
    }
  }
  const propss = {
    name: 'file',
    action: `${siteConfig.apiUrl}/file/blank`,
    headers: {
      authorization: localStorage.getItem('id_token'),

    },
    multiple: false,
    maxCount: 1,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      setFileList(info.fileList);
      setPdfFile(info.file)
      const fmData = new FormData();     
      setFormDt(fmData);     
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
  };
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
            <Col md={12} sm={12} xs={24}>
              <Form>
                <Fieldset>
                  <Label>Supplier</Label>
                  <Input
                    label="Supplier"
                    placeholder="Supplier"
                    value={supplierName}
                    onChange={(event) => {
                      setSupplierName(event.target.value);
                    }}
                   />
                </Fieldset>
              </Form>
            </Col>
            <Col md={12} sm={12} xs={24}>
              <Form>
                <Fieldset>
                  <Label>Email</Label>
                  <Input
                    label="Email"
                    placeholder="Email"
                    value={supplierEmail}
                    onChange={(event) => {
                      setSupplierEmail(event.target.value);
                    }}
                  />
                </Fieldset>
              </Form>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start" style={{ marginTop: 10 }}>
            <Col md={24} sm={24} xs={24}>
              <Form>
                <Fieldset>
                  <Label>Comments to attach</Label>                
                  <Textarea
                    placeholder="Comments to attach"
                    value={strDescription}
                    onChange={(event) => {
                      setStrDescription(event.target.value);
                    }}
                    style={{ height: 'auto' }}
                    rows={4}
                  />
                </Fieldset>
              </Form>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start" style={{ marginTop: 10 }}>
            <Col md={20} sm={20} xs={24}>
              <Form>
                <Fieldset>
                  <Label>Please selec a purchase order PDF</Label>
                  <Upload
                    //  fileList={fileList}
                    // disabled={fileList.length===0?false:true}
                    openFileDialogOnClick={fileList.length === 0 ? true : false}
                    {...propss}
                    accept="application/pdf"
                    //  onChange={onChange}
                    //  beforeUpload={beforeUpload}
                    defaultFileList={[]}
                  //  fileList={[]}
                  //  customRequest={customRequest}
                  >
                    <Button icon={<UploadOutlined />}>Select pdf</Button>
                  </Upload>
                </Fieldset>
              </Form>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start" style={{ marginTop: 20 }}>
            <Col md={20} sm={20} xs={24}>
              <Button color="primary" onClick={props.onCancel}>
                <span>Cancel</span>
              </Button>
              <Button type="primary" className="saveBtn" disabled={formDt ? false : true} onClick={onSend} style={{ marginLeft: "10px", marginRight: "10px" }}>
                <span>Send Email</span>
              </Button>
              <Button type="danger" className="saveBtn" onClick={props.markSent} >
                <span>Mark as Sent</span>
              </Button>
            </Col>
          </Row>
        </div>

      </Modal>

    </div>
  );
}