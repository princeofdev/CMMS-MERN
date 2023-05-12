import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';
import axios from 'axios';
import Button from '@iso/components/uielements/button';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';

// import Checkbox from '@iso/components/uielements/checkbox';
import formbuilderAction from '../../../redux/formbuilder/actions';
import { ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
const { updateData, getById } = formbuilderAction;

export default function (props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  let history = useHistory();
  const { formData, isDelete } = useSelector((state) => state.formBuilder);
  const [editFormData, setEditFormData] = React.useState([]);
  const onSave = () => {
    var sendData = {};
    sendData.formData = editFormData;
    dispatch(updateData(sendData, id));
  };
  const onLoad = async () => {
    axios.defaults.headers.get['Authorization'] = localStorage.getItem(
      'id_token'
    );
    return await axios
      .get(`${siteConfig.apiUrl}/formbuilder/${id}`)
      .then((response) => setEditFormData(response.data.data.formData));
  };
  const onPost = (data) => {
    setEditFormData(data.task_data);
  };
  React.useEffect(() => {
    onLoad();
  }, []);
  return (
    <>
      <div className="PageHeader">
        {/* <Link to={'/dashboard/formbuilder'}>
          <Button color="primary">
            <span>Back</span>
          </Button>
        </Link> */}
       
      </div>
      <div
        style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: 'white',fontSize:'19px' }}
      >
        <ReactFormGenerator
          download_path=""
          back_action="/"
          back_name="Back"
          answer_data={{}}
          action_name="Save"
          form_action="/"
          form_method="POST"
          onSubmit={onSave}
          hide_actions={true}
          variables={''}
          // variables={this.props.variables}
          data={editFormData}
        />
      </div>
    </>
  );
}
