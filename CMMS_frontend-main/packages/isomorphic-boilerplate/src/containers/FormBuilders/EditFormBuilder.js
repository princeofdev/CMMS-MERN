import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';
import axios from 'axios';
import Button from '@iso/components/uielements/button';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import notification from '@iso/components/Notification';
import { Col, Row, Form } from "antd";
// import Checkbox from '@iso/components/uielements/checkbox';
import formbuilderAction from '../../redux/formbuilder/actions';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';

const { updateData, getById, deleteData } = formbuilderAction;
const rowStyle = {
  width: "100%",
  display: "flex",
  marginTop: '10px',
  flexFlow: "row wrap",
};
const FormItem = Form.Item;
const Option = SelectOption;
const formItemStyle = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 17 },
  },
};

export default function (props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  let history = useHistory();
  const { formData, isDelete } = useSelector((state) => state.formBuilder);
  const [editFormData, setEditFormData] = React.useState([]);
  const [intCategoryId, setIntCategoryId] = React.useState(null)
  const onSave = () => {
    if (!intCategoryId){
      notification('info', 'Please select a category.');
      return
    }
    var sendData = {};
    sendData.formData = editFormData;
    sendData.intCategoryId = intCategoryId;
    dispatch(updateData(sendData, id));
  };
  const onDelete = () => {
    dispatch(deleteData(id));
  };
  const onLoad = async () => {
    axios.defaults.headers.get['Authorization'] = localStorage.getItem(
      'id_token'
    );
    const res = await axios
      .get(`${siteConfig.apiUrl}/formbuilder/${id}`)
      .then((response) => response.data.data
      );
    console.log(res)
    setIntCategoryId(res.intCategoryId);
    setEditFormData(res ? res.formData : [])
    return res ? res.formData : []
  };
  const onPost = (data) => {
    setEditFormData(data.task_data);
  };
  React.useEffect(() => {
    if (isDelete) {
      history.push('/dashboard/formbuilder');
    }
  }, [isDelete]);
  return (
    <>
      <div className="PageHeader">
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={6} sm={6} xs={12}>
            <Link to={'/dashboard/formbuilder'}>
              <Button color="primary">
                <span>Back</span>
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={onSave}
              className="saveBtn"
              style={{ marginLeft: '10px', marginRight: '10px' }}
            >
              <span>Save</span>
            </Button>
            <Button type="danger" className="saveBtn" onClick={onDelete}>
              <span>Delete</span>
            </Button>
          </Col>
          <Col md={5} sm={5} xs={12} >
            <Form>
              <FormItem {...formItemStyle} label="Category">
                <Select
                  // defaultValue={intLocationId}
                  value={intCategoryId}
                  onChange={(value) => {
                    setIntCategoryId(value);
                  }}
                >
                  <Option value={1}>Charters</Option>
                  <Option value={2}>Crew</Option>
                  <Option value={3}>Vessel</Option>
                </Select>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
      <ReactFormBuilder onLoad={onLoad} onPost={onPost} />
    </>
  );
}
