import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row, Form } from 'antd';
import moment from 'moment';
import notification from '@iso/components/Notification';
import AssetSuppliesModal from './AssetSuppliesModal';
import AssetModal from './AssetModal';
import RfqLineItemAction from '../redux/rfqlineitem/actions';
import './table.css';
import {
  // ActionBtn,
  Fieldset,
  GeneralLine,
  Label,
} from './UsersContentModal.styles';
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginBottom: "10px",
};
export default function (props) {
  const {
    visible,
    title, 
    pageState,  
    selectedRfqId
  } = props;
  const { addRfqLineItem, updateDataLineItem } = RfqLineItemAction;
  const dispatch = useDispatch();
  const [assetModalActive, setAssetModalActive] = React.useState(false);
  const [intAssetID, setIntAssetID] = React.useState(null);
  const [assetName, setAssetName] = React.useState('');
  const [
    assetSuppliesModalActive,
    setAssetSuppliesModalActive,
  ] = React.useState(false);
  const [strDescription, setStrDescription] = React.useState('');
  const [intQty, setIntQty] = React.useState('1.00');

  //  React.useEffect(() => {
  //    dispatch(initData());
  // }, [visible]);
  React.useEffect(() => {
    if (pageState == 'Edit') {


      // setIntAssetID(selectedPR.intAssetID ? selectedPR.intAssetID._id : null);
      // setAssetName(
      //   selectedPR.intAssetID
      //     ? selectedPR.intAssetID.strName +
      //     '(' +
      //     selectedPR.intAssetID.strCode +
      //     ')'
      //     : ''
      // );
    } else {

      setIntAssetID(null);
      setAssetName('');

    }
  }, [visible,  pageState]);
  const handleCancel = () => {
    setAssetModalActive(false);
    setAssetSuppliesModalActive(false);
  };
  const selectedAssetSupplies = (row) => {
    setAssetName(row.strName + '(' + row.strCode + ')');
    setIntAssetID(row._id);   
  };


  const onSave = () => {

    if (!intAssetID){
      notification('error', 'Please select asset.');
      return;
    }
    // notification('error', 'You need to specify the quantity you require.');
    var sendData = {};
    sendData.intAssetID = intAssetID;
    sendData.strDescription = strDescription;
    sendData.intQty = intQty;
    sendData.intRFQSId = selectedRfqId;
    
    if (pageState == 'Edit') {
      dispatch(updateDataLineItem(sendData, selectedRfqId));
    } else {
      dispatch(addRfqLineItem(sendData));
    }

    props.onCancel();
  };

  React.useEffect(() => { }, []);
  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        // okText="New"
        title={title}
        // footer={null}       
        onOk={onSave}
        onCancel={props.onCancel}
      >
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={24} sm={24} xs={24}>
            <Form>
              <Fieldset>
                <Label
                  style={{
                    fontWeight: 'unset',
                    fontSize: 13,
                    marginBottom: 0,
                  }}
                >
                  Asset
                </Label>
                <div
                  style={{ position: 'relative' }}
                >
                  <Input
                    label=""
                    placeholder=""
                    value={assetName}
                    onChange={() => {
                      setAssetSuppliesModalActive(true);
                    }}
                  />
                  <i
                    className="ionicons ion-arrow-down-b"
                    onClick={() => {
                      setAssetSuppliesModalActive(true);
                    }}
                    style={{
                      fontSize: '25px',
                      cursor: 'pointer',
                      position: 'absolute',
                      marginLeft: '5px',
                    }}
                  ></i>
                </div>
              </Fieldset>
            </Form>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={24} sm={244} xs={24}>
            <Form>
              <Fieldset>
                <Label
                  style={{
                    fontWeight: 'unset',
                    fontSize: 13,
                    marginBottom: 0,
                  }}
                >
                  Description
                </Label>
                <Textarea
                  label="Set Offline By User"
                  placeholder=""
                  value={strDescription}
                  onChange={(event) => {
                    setStrDescription(event.target.value);
                  }}
                  style={{ width: '100%' }}
                />
              </Fieldset>
            </Form>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={24} sm={244} xs={24}>
            <Form>
              <Fieldset>
                <Label
                  style={{
                    fontWeight: 'unset',
                    fontSize: 13,
                    marginBottom: 0,
                  }}
                >
                  Quantity
                </Label>
                <div style={{ position: 'relative' }}>
                  <Input
                    label=""
                    placeholder=""
                    value={intQty}
                    onChange={(e) => {
                      setIntQty(e.target.value);
                    }}
                  />
                </div>
              </Fieldset>
            </Form>
          </Col>
        </Row>
      </Modal>
      <AssetSuppliesModal
        visible={assetSuppliesModalActive}
        title="Parts & Supplies"
        selectedAsset={selectedAssetSupplies}
        onCancel={handleCancel}
        filter="Facilities"
      ></AssetSuppliesModal>
      {/* <AssetModal
        visible={assetModalActive}
        title="ASSETS"
        selectedAsset={selectedAsset}
        onCancel={handleCancel}
      ></AssetModal> */}

    </div>
  );
}
