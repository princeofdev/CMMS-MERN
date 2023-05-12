import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from "@iso/components/utility/customScrollBar";
import Switch from 'react-switch';
import Input, { Textarea } from "@iso/components/uielements/input";
import notification from '@iso/components/Notification';
import Modal from "@iso/components/Feedback/Modal";
import Button from '@iso/components/uielements/button';
import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import addDoubleImg from '../../../assets/images/new-group-inner-list.png';
import newAddImg from '../../../assets/images/new-inner-list.png';
import CheckListModal from '../../../component/CheckListModal';
import AssingedUserModal from "../../../component/UsersContentModal";
import { Fieldset, Label } from "../Checkout.styles";
import checkListAction from "../../../redux/checklist/actions";

const FormItem = Form.Item;

const rowStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "row wrap",
  // marginTop: "10px",
  marginBottom: "10px",
};
export default function (props) {
  const { intCharterId } = props;
  const { addCheckList, getCheckListData, updateData, deleteData } = checkListAction;
  const { checklists, isDelete } = useSelector((state) => state.CheckList);
  const dispatch = useDispatch();
  const [checklistModalVisible, setChecklistModalVisible] = React.useState(false);
  const [addCharterListModalActive, setAddCharterListModalActive] = React.useState(false);
  const [assingedUserModalActive, setAssingedUserModalActive] = React.useState(false);
  const [assingedUserName, setAssingedUserName] = React.useState("");
  const [intAssignedUserId, setIntAssignedUserId] = React.useState(null);
  const [intFormBuilderId, setIntFormBuilderId] = React.useState(null);
  const [strFormBuilderName, setStrFormBuilderName] = React.useState('');
  const [intCheckListId, setIntCheckListId] = React.useState(null);
  const [modalState, setModalState] = React.useState("Add");
  const [isCompleted, setIsCompleted]=React.useState(false);

  const columns = [
    {
      title: "Code",
      dataIndex: "intFormBuilderId",
      rowKey: "intFormBuilderId",
      width: "10%",
      render: (val, row) => {
        return <a onClick={() => goShowModal(row)}>{"CL# " + val?val._id:""}</a>;
      },
    },
    {
      title: "Title",
      dataIndex: "intFormBuilderId",
      rowKey: "intFormBuilderId",
      width: "30%",
      render: (val, row) => {
        var content = val.formData ? val.formData[0].content : null;
        var temp = null;
        if (content) {
          temp = content.replace('<p style="text-align:center;">', "");
          temp = temp.replace('<strong>', "");
          temp = temp.replace('</strong>', "");
        }

        return <a onClick={() => goShowModal(row)}>{temp ? temp : "CheckList# " + val._id}</a>;
      },
    },
    {
      title: "Assigned User",
      dataIndex: "intAssignedUserId",
      rowKey: "intAssignedUserId",
      width: "20%",
      render: (value, row) => <a onClick={() => goShowModal(row)}>{value ? value.strFullName : ""}</a>,
    },
    {
      title: "Status",
      dataIndex: "isCompleted",
      rowKey: "isCompleted",
      width: "10%",
      render: (value, row) => <a onClick={() => goShowModal(row)}>{value ? "COMPLETE" : "INCOMPLETE"}</a>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      rowKey: "_id",
      width: "10%",
      render: (text, row) => {
        return (
          <Button
            onClick={() => {
              dispatch(deleteData(row._id));
            }}
          >
            Delete
          </Button>
        );
      },
    },

  ];
  const onCancel = () => {
    setAddCharterListModalActive(false);

  }
  const handleCancel = () => {
    setAssingedUserModalActive(false);
    setChecklistModalVisible(false);
  }
  const selectItem = (row) => {
    var content = row.formData ? row.formData[0].content : null;
    var temp = null;
    if (content) {
      temp = content.replace('<p style="text-align:center;">', "");
      temp = temp.replace('<strong>', "");
      temp = temp.replace('</strong>', "");
    }
    setStrFormBuilderName(temp ? temp : "CheckList# " + row._id);
    setIntFormBuilderId(row._id);
    setChecklistModalVisible(false);
  }
  const selectAssingUser = (row) => {
    setAssingedUserName(row.strFullName);
    setIntAssignedUserId(row._id);
    setAssingedUserModalActive(false);
    // console.log(row);
  }
  const onSave = () => {
    if (strFormBuilderName==''){
      notification("info","Please select a checklist.");
      return;
    }
    var sendData = {};
    sendData.intCharterId = intCharterId;
    sendData.intFormBuilderId = intFormBuilderId;
    sendData.intAssignedUserId = intAssignedUserId;
    sendData.isCompleted = isCompleted;
    if (modalState === "Edit")
      dispatch(updateData(sendData, intCheckListId));
    else
      dispatch(addCheckList(sendData));

    setAddCharterListModalActive(false)


  }
  const goShowModal = (row) => {
    setAssingedUserName(row.intAssignedUserId ? row.intAssignedUserId.strFullName : "");
    setIntAssignedUserId(row.intAssignedUserId ? row.intAssignedUserId._id : null);

    if (row.intFormBuilderId) {
      var content = row.intFormBuilderId.formData ? row.intFormBuilderId.formData[0].content : null;
      var temp = null;
      if (content) {
        temp = content.replace('<p style="text-align:center;">', "");
        temp = temp.replace('<strong>', "");
        temp = temp.replace('</strong>', "");
      }
      setStrFormBuilderName(temp ? temp : "CheckList# " + row.intFormBuilderId._id);
      setIntFormBuilderId(row.intFormBuilderId._id);
    }
    else {
      setStrFormBuilderName('');
      setIntFormBuilderId(null);
    }
    setIntCheckListId(row._id);
    setModalState("Edit");
    setIsCompleted(row.isCompleted?true:false);
    setAddCharterListModalActive(true);

  }
  React.useEffect(() => {
    if (intCharterId)
    dispatch(getCheckListData(intCharterId));
  }, []);
  React.useEffect(() => {
    if (isDelete) {
      dispatch(getCheckListData(intCharterId));
    }
  }, [isDelete]);

  function handleChange(checked) {
    setIsCompleted(checked); 
  }
  React.useEffect(() => {
   console.log(checklists)
  }, [checklists]);
  return (
    <div className="isoInvoiceTable">

      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
      <TableWrapper
        // rowSelection={rowSelection}
        dataSource={checklists}
        // dataSource={[]}
        columns={columns}
        pagination={false}
        className="isoGroupTable"
      />
      {/* </Scrollbars> */}
      <div style={{
        color: "rgb(102, 115, 136)",
        fontSize: "10pt",
        background: "#f7f7f7",
        border: "1px solid rgb(241, 243, 246)",
        height: "25px"
      }}>
        <span onClick={() => { 
          if (!intCharterId){
            notification("info","First please save a charter.")
            return
          }
          setAddCharterListModalActive(true);
           setModalState("Add") }}
          style={{
            float: "left",
            marginLeft: "4px",
            marginRight: "4px",
            cursor: "pointer",
          }}>
          <img src={newAddImg}></img>
        </span>
        {/* <span style={{float: "left",
                    marginLeft:"4px", 
                    marginRight:"4px",
                    cursor:"pointer",
                   }}>
         <img src={addDoubleImg}></img></span> */}
      </div>
      <Modal
        visible={addCharterListModalActive}
        onClose={onCancel}
        title={'Add CheckList'}
        onOk={onSave}
        okText={"Save"}
        onCancel={onCancel}
        width={300}
      >
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={24} sm={24} xs={24} style={{ marginBottom: "2px" }}>
            <Form>
              <Fieldset>
                <Label>CheckList</Label>
                <div style={{ position: 'relative' }}>
                  <FormItem
                    // hasFeedback
                    validateStatus={
                      strFormBuilderName == '' ? 'error' : 'success'
                    }
                    help={
                      strFormBuilderName == ''
                        ? 'this field is require'
                        : ''
                    }
                    style={{ width: '90%' }}
                  >
                    <Input
                      value={strFormBuilderName}
                      // placeholder=""
                      onChange={() => {
                        setChecklistModalVisible(true);
                      }}
                    />
                  </FormItem>
                  <i
                    className="ionicons ion-arrow-down-b"
                    onClick={() => {
                      setChecklistModalVisible(true);
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
          <Col md={23} sm={23} xs={24} style={{ marginBottom: "2px" }}>
            <Form>
              <Fieldset>
                <Label>Assing User</Label>
                <div style={{ position: 'relative' }}>
                  <FormItem
                    // hasFeedback
                    // validateStatus={
                    //   assingedUserName == '' ? 'error' : 'success'
                    // }
                    // help={
                    //   assingedUserName == ''
                    //     ? 'this field is require'
                    //     : ''
                    // }
                    style={{ width: '90%' }}
                  >
                    <Input
                      value={assingedUserName}
                      // placeholder=""
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
          <Col md={23} sm={23} xs={24} style={{ marginBottom: "2px",marginTop:15 }}>
            <label style={{ position: 'relative' }}>
              <Switch checked={isCompleted} onChange={handleChange} />
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: '65px',
                }}
              >
                {isCompleted ? 'COMPLETE' : 'INCOMPLETE'}
              </span>
            </label>
          </Col>
        </Row>

      </Modal>
      <CheckListModal
        visible={checklistModalVisible}
        title={'CHECKLIST'}
        onCancel={handleCancel}
        selectItem={selectItem}
      />
      <AssingedUserModal
        visible={assingedUserModalActive}
        title="Users"
        group="user"
        selectUser={selectAssingUser}
        onCancel={handleCancel}
      ></AssingedUserModal>
    </div>
  );
}
