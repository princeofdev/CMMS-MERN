import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';

import notification from '@iso/components/Notification';
import UsersContentModal from './UsersContentModal';

import './table.css';
import { Fieldset, Form, Label } from './UsersContentModal.styles';

import Action from '../redux/purchaseordernotification/actions';
export default function (props) {
  const { visible, title, purcaseOrderId, pageState, userInf } = props;
  const { savePurchaseOrderNotification, updateData } = Action;
  const dispatch = useDispatch();
  const [userName, setUserName] = React.useState('');
  const [intUserID, setIntUserID] = React.useState(null);
  const [userModalActive, setUserModalActive] = React.useState(false);
  const [intAssetUserTypeID, setintAssetUserTypeID] = React.useState(0);

  React.useEffect(() => {
    if (pageState == 'edit') {
      setIntUserID(userInf.intUserID._id);
      setintAssetUserTypeID(userInf.intUserID.bolGroup ? 1 : 0);
      setUserName(
        userInf.intUserID.bolGroup
          ? "Any member of the '" + userInf.intUserID.strFullName + "' grop"
          : userInf.intUserID.strFullName
      );
    }
  }, [pageState, userInf]);

  const handleCancel = () => {
    setUserModalActive(false);
  };
  const onSave = () => {
    if (intUserID == null) {
      notification('info', 'Please select a  User');
      return;
    }

    var sendData = {};
    sendData.intUserTypeID = intAssetUserTypeID;
    sendData.intUserID = intUserID;
    sendData.intPurchaseOrderID = purcaseOrderId;
    if (pageState == 'edit') {
      dispatch(updateData(sendData, userInf._id));
    } else {
      dispatch(savePurchaseOrderNotification(sendData));
    }

    props.onCancel();
  };
  const selectedUser = (row) => {
    setIntUserID(row._id);
    setintAssetUserTypeID(row.bolGroup ? 1 : 0);
    setUserName(
      row.bolGroup
        ? "Any member of the '" + row.strFullName + "' grop"
        : row.strFullName
    );
  };
  return (
    <div>
      <Modal
        visible={visible}
        width={350}
        onClose={props.onCancel}
        title={title}
        onOk={onSave}
        onCancel={props.onCancel}
      >
        <div>
          <Form>
            <Fieldset>
              <Label>User</Label>
              <div style={{ position: 'relative' }}>
                <Input
                  label="Facility"
                  style={{ width: '90%' }}
                  value={userName}
                  onChange={() => setUserModalActive(true)}
                  placeholder=""
                />
                <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setUserModalActive(true);
                  }}
                  style={{
                    fontSize: '25px',
                    cursor: 'pointer',
                    marginLeft: '3px',
                  }}
                ></i>
              </div>
            </Fieldset>
          </Form>
        </div>
      </Modal>

      <UsersContentModal
        visible={userModalActive}
        title="Users"
        selectUser={selectedUser}
        onCancel={handleCancel}
      ></UsersContentModal>
    </div>
  );
}
