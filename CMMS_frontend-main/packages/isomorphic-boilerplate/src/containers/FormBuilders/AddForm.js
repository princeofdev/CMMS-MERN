import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { Col, Row, Form } from "antd";
import notification from '@iso/components/Notification';
// import DateTimePicker from 'react-datetime-picker';
// import Checkbox from '@iso/components/uielements/checkbox';
import formbuilderAction from '../../redux/formbuilder/actions';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
const rowStyle = {
  width: "100%",
  display: "flex",
  marginTop: '10px',
  flexFlow: "row wrap",
};
const FormItem = Form.Item;
const { addForm } = formbuilderAction;
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
  const { redirectPath } = props;
  const [formData, setFormData] = React.useState([]);
  const [intCategoryId, setIntCategoryId] = React.useState(null)
  const onSave = () => {
    if (!intCategoryId) {
      notification('info', 'Please select a category.');
      return
    }

    var sendData = {};
    sendData.intCategoryId = intCategoryId;
    sendData.formData = formData;
    dispatch(addForm(sendData));
  };

  const onPost = (data) => {
    setFormData(data.task_data);
  };
  return (
    // <LayoutWrapper style={{ overflow: 'initial' }}>
    <>
      <div className="PageHeader">
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={4} sm={4} xs={12}>
            <Link to={'/dashboard/formbuilder'}>
              <Button color="primary">
                <span>Back</span>
              </Button>
            </Link>
            <Button type="primary" onClick={onSave} className="saveBtn">
              <span>Save</span>
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
      <ReactFormBuilder onPost={onPost} />
    </>
    // </LayoutWrapper>
  );
}
