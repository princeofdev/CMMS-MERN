import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import { DatePicker, Space, TimePicker } from 'antd';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row, Form } from 'antd';
import moment from 'moment';
import notification from '@iso/components/Notification';
import AccountsModal from './AccountsModal';
import ChargeDepartmentModal from './ChargeDepartmentModal';
import ShipToLocationModal from './AssetFilterModal';
import AssetSuppliesModal from './AssetSuppliesModal';
import AssetModal from './AssetModal';
import WorkOrderModal from './WorkOrderModal';
import PurchaseRequestAction from '../redux/purchaserequest/actions';
import './table.css';
import {
  // ActionBtn,
  Fieldset,
  GeneralLine,
  Label,
} from './UsersContentModal.styles';
export default function (props) {
  const {
    visible,
    title,
    selectedPR,
    pageState,
    intPurchaseOrderID,
    bolAddedDirectlyToPurchaseOrder,
    fromBoard,
  } = props;
  const { addPurchaseRequest, updateData } = PurchaseRequestAction;
  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    // marginTop: "-20px",
  };
  const rowStyle2 = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    // marginTop: "-20px",
    marginBottom: 10,
  };
  const [accountsModalActive, setAccountsModalActive] = React.useState(false);
  const [strAccount, setStrAccount] = React.useState('');
  const [intAccountID, setIntAccountID] = React.useState('');
  const [chargeDepartModalActive, setChargeDepartModalActive] = React.useState(
    false
  );
  const [intChargeDepartmentID, setIntChargeDepartmentID] = React.useState(
    null
  );
  const [strChargeDepartment, setStrChargeDepartment] = React.useState('');
  const [
    shipToLocationModalActive,
    setShipToLocationModalActive,
  ] = React.useState(false);
  const [intShipToLocationID, setIntShipToLocationID] = React.useState(null);
  const [strShipToLocation, setStrShipToLocation] = React.useState('');
  const [assetModalActive, setAssetModalActive] = React.useState(false);
  const [intAssetID, setIntAssetID] = React.useState(null);
  const [assetName, setAssetName] = React.useState('');
  const [workOrderModalActive, setWorkOrderModalActive] = React.useState(false);
  const [intSourceWorkOrderID, setIntSourceWorkOrderID] = React.useState(false);
  const [strWorkOrderName, setStrWorkOrderName] = React.useState('');
  const [dtmRequiredByDate, setDtmRequiredByDate] = React.useState(null);
  const [
    assetSuppliesModalActive,
    setAssetSuppliesModalActive,
  ] = React.useState(false);
  const [
    bolProductionEquipmentDownWhileOnOrder,
    setBolProductionEquipmentDownWhileOnOrder,
  ] = React.useState(false);
  const [bolEquipmentCon, setBolEquipmentCon] = React.useState(true);
  const [intSourceAssetID, setIntSourceAssetID] = React.useState(null);
  const [strsourceAssetName, setStrsourceAssetName] = React.useState('');
  const [strDescription, setStrDescription] = React.useState('');
  const [qtyOnOrder, setQtyOnOrder] = React.useState('1.00');
  const [strNotInventory, setStrNotInventory] = React.useState('');
  const [qtyOnOrder2, setQtyOnOrder2] = React.useState('');
  const [selectedPRId, setSelectedPRId] = React.useState(null);

  const dispatch = useDispatch();
  //  React.useEffect(() => {
  //    dispatch(initData());
  // }, [visible]);
  React.useEffect(() => {
    if (pageState == 'Edit') {
      setSelectedPRId(selectedPR._id);
      setBolProductionEquipmentDownWhileOnOrder(
        selectedPR.bolProductionEquipmentDownWhileOnOrder
      );
      setBolEquipmentCon(selectedPR.bolEquipmentCon);
      if (selectedPR.bolEquipmentCon) {
        setIntSourceAssetID(
          selectedPR.intSourceAssetID ? selectedPR.intSourceAssetID._id : null
        );
        setStrsourceAssetName(
          selectedPR.intSourceAssetID ? selectedPR.intSourceAssetID.strName : ''
        );
        setQtyOnOrder(selectedPR.qtyOnOrder);
        setStrDescription(selectedPR.strDescription);

        setStrNotInventory('');
        setQtyOnOrder2('');
      } else {
        setStrNotInventory(selectedPR.strNotInventory);
        setQtyOnOrder2(selectedPR.qtyOnOrder);

        setIntSourceAssetID(null);
        setQtyOnOrder('');
        setStrDescription('');
      }
      setIntChargeDepartmentID(
        selectedPR.intChargeDepartmentID
          ? selectedPR.intChargeDepartmentID._id
          : null
      );
      setStrChargeDepartment(
        selectedPR.intChargeDepartmentID
          ? '(' +
              selectedPR.intChargeDepartmentID.strCode +
              ')' +
              selectedPR.intChargeDepartmentID.strDescription
          : null
      );
      setIntShipToLocationID(
        selectedPR.intShipToLocationID
          ? selectedPR.intShipToLocationID._id
          : null
      );
      setStrShipToLocation(
        selectedPR.intShipToLocationID
          ? selectedPR.intShipToLocationID.strName +
              '(' +
              selectedPR.intShipToLocationID.strCode +
              ')'
          : ''
      );
      setIntAssetID(selectedPR.intAssetID ? selectedPR.intAssetID._id : null);
      setAssetName(
        selectedPR.intAssetID
          ? selectedPR.intAssetID.strName +
              '(' +
              selectedPR.intAssetID.strCode +
              ')'
          : ''
      );
      setIntSourceWorkOrderID(
        selectedPR.intSourceWorkOrderID
          ? selectedPR.intSourceWorkOrderID._id
          : null
      );
      setStrWorkOrderName(
        selectedPR.intSourceWorkOrderID
          ? 'WO# ' + selectedPR.intSourceWorkOrderID._id
          : ''
      );
      setDtmRequiredByDate(
        selectedPR.dtmRequiredByDate
          ? moment(new Date(selectedPR.dtmRequiredByDate), 'MMM DD YYYY')
          : null
      );
      setIntAccountID(
        selectedPR.intAccountID ? selectedPR.intAccountID._id : null
      );
      setStrAccount(
        selectedPR.intAccountID
          ? '(' +
              selectedPR.intAccountID.strCode +
              ')' +
              selectedPR.intAccountID.strDescription
          : ''
      );
    } else {
      setBolProductionEquipmentDownWhileOnOrder(false);
      setBolEquipmentCon(true);
      setStrsourceAssetName('');
      setStrNotInventory('');
      setQtyOnOrder2('');
      setIntSourceAssetID(null);
      setQtyOnOrder('1.00');
      setStrDescription('');
      setIntChargeDepartmentID(null);
      setStrChargeDepartment(null);
      setIntShipToLocationID(null);
      setStrShipToLocation('');
      setIntAssetID(null);
      setAssetName('');
      setIntSourceWorkOrderID(null);
      setStrWorkOrderName('');
      setDtmRequiredByDate(null);
      setIntAccountID(null);
    }
  }, [visible, selectedPR, pageState]);
  const handleCancel = () => {
    setAccountsModalActive(false);
    setChargeDepartModalActive(false);
    setShipToLocationModalActive(false);
    setAssetModalActive(false);
    setWorkOrderModalActive(false);
    setAssetSuppliesModalActive(false);
  };
  const selectedAccount = (row) => {
    setStrAccount('(' + row.strCode + ')' + row.strDescription);
    setIntAccountID(row._id);
  };
  const selectedChargeDepart = (row) => {
    // props.selectedChargeDepartment(row);
    setIntChargeDepartmentID(row._id);
    setStrChargeDepartment('(' + row.strCode + ')' + row.strDescription);
  };
  const selectedShipLocation = (row) => {
    setStrShipToLocation(row.strName + '(' + row.strCode + ')');
    setIntShipToLocationID(row._id.toString());
  };
  const selectedAssetSupplies = (row) => {
    setStrsourceAssetName(row.strName + '(' + row.strCode + ')');
    setIntSourceAssetID(row._id);
  };
  const selectedAsset = (row) => {
    setAssetName(row.strName + '(' + row.strCode + ')');
    setIntAssetID(row._id);
  };
  const selectWorkOrder = (row) => {
    setIntSourceWorkOrderID(row._id);
    setStrWorkOrderName('WO# ' + row._id);
  };
  const onSave = () => {
    if (bolEquipmentCon && !intSourceAssetID) {
      notification(
        'error',
        'You must specify the equipment / tool / part / supply required OR describe it if you are unable to find the item in inventory.'
      );
      return;
    } else if (!bolEquipmentCon && strNotInventory == '') {
      notification('error', 'You must describe the item required.');
      return;
    } else if (!bolEquipmentCon && qtyOnOrder2 == '') {
      notification('error', 'You need to specify the quantity you require.');
      return;
    } else if (bolEquipmentCon && qtyOnOrder == '') {
      notification('error', 'You need to specify the quantity you require.');
      return;
    }

    var sendData = {};

    sendData.bolProductionEquipmentDownWhileOnOrder = bolProductionEquipmentDownWhileOnOrder;
    sendData.bolEquipmentCon = bolEquipmentCon;
    if (bolEquipmentCon) {
      sendData.intSourceAssetID = intSourceAssetID;
      sendData.qtyOnOrder = qtyOnOrder;
      sendData.strDescription = strDescription;
    } else {
      sendData.strNotInventory = strNotInventory;
      sendData.qtyOnOrder = qtyOnOrder2;
    }
    sendData.intAccountID = intAccountID;
    sendData.intChargeDepartmentID = intChargeDepartmentID;
    sendData.intShipToLocationID = intShipToLocationID;
    sendData.intAssetID = intAssetID;
    sendData.intSourceWorkOrderID = intSourceWorkOrderID;
    sendData.dtmRequiredByDate = new Date(dtmRequiredByDate);
    sendData.intPurchaseOrderID = intPurchaseOrderID;
    if (fromBoard == 'yes') {
      sendData.bolFromPurchaseBoard = true;
    }

    if (pageState == 'Edit') {
      dispatch(updateData(sendData, selectedPRId));
    } else {
      sendData.bolAddedDirectlyToPurchaseOrder = bolAddedDirectlyToPurchaseOrder;
      dispatch(addPurchaseRequest(sendData));
    }
    console.log(sendData);

    props.onCancel();
  };
  const onChange = (value, dateString) => {
    // console.log(moment(value).format('YYYY'));
    setDtmRequiredByDate(dateString == '' ? null : dateString);
  };
  React.useEffect(() => {}, []);
  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        // okText="New"
        title={title}
        // footer={null}
        width={800}
        onOk={onSave}
        onCancel={props.onCancel}
      >
        <div
          style={{
            borderRadius: '4px',
            border: '1px solid rgb(205, 209, 215)',
            padding: '4px',
            margin: '4px',
          }}
        >
          {/* <div style={{marginTop:"3px",height:"170px"}}> */}
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={7} sm={7} xs={24}>
              <div className="AssetItemContainer">
                <p className="youneedContainer">You need...</p>
              </div>
            </Col>
            <Col md={17} sm={17} xs={24}>
              <div
                className="dotLineSection"
                style={{ border: bolEquipmentCon ? 'dotted 2px #51b1f9' : '' }}
              >
                <Row style={rowStyle} gutter={16} justify="start">
                  <Col md={20} sm={20} xs={24}>
                    <Form>
                      <Fieldset>
                        <Radio
                          name="value"
                          onClick={(e) =>
                            setBolEquipmentCon(bolEquipmentCon ? false : true)
                          }
                          checked={bolEquipmentCon}
                        >
                          {' '}
                          Equipment / Tools / Parts / Supplies
                        </Radio>
                        <div
                          style={{ position: 'relative', paddingLeft: '20px' }}
                        >
                          <Input
                            label=""
                            placeholder=""
                            value={strsourceAssetName}
                            onChange={() => {
                              setAssetSuppliesModalActive(true);
                            }}
                            style={{ width: '90%' }}
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
                  <Col md={4} sm={4} xs={24}>
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
                            value={qtyOnOrder}
                            onChange={(e) => {
                              setQtyOnOrder(e.target.value);
                            }}
                          />
                        </div>
                      </Fieldset>
                    </Form>
                  </Col>
                </Row>
                <Row style={rowStyle} gutter={16} justify="start">
                  <Col md={24} sm={24} xs={24}>
                    <Form>
                      <Fieldset>
                        <Label
                          style={{
                            fontWeight: 'unset',
                            marginLeft: 20,
                            fontSize: 13,
                            marginBottom: 0,
                          }}
                        >
                          More information on what you need and why
                        </Label>
                        <div
                          style={{ position: 'relative', paddingLeft: '20px' }}
                        >
                          <Textarea
                            label="Set Offline By User"
                            placeholder=""
                            value={strDescription}
                            onChange={(event) => {
                              setStrDescription(event.target.value);
                            }}
                            style={{ width: '100%' }}
                          />
                        </div>
                      </Fieldset>
                    </Form>
                  </Col>
                </Row>
              </div>
              <div
                className="needSection2"
                style={{ border: !bolEquipmentCon ? 'dotted 2px #51b1f9' : '' }}
              >
                <Row style={rowStyle} gutter={16} justify="start">
                  <Col md={20} sm={20} xs={24}>
                    <Form>
                      <Fieldset>
                        <Radio
                          name="value"
                          onClick={() =>
                            setBolEquipmentCon(!bolEquipmentCon ? true : false)
                          }
                          checked={!bolEquipmentCon}
                        >
                          Not in inventory? Describe what you need.
                        </Radio>
                        <div
                          style={{ position: 'relative', paddingLeft: '20px' }}
                        >
                          <Textarea
                            label=""
                            placeholder=""
                            value={strNotInventory}
                            onChange={(e) => {
                              setStrNotInventory(e.target.value);
                            }}
                            style={{ width: '100%' }}
                          />
                        </div>
                      </Fieldset>
                    </Form>
                  </Col>
                  <Col md={4} sm={4} xs={24}>
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
                            label="Set Offline By User"
                            placeholder=""
                            value={qtyOnOrder2}
                            onChange={(e) => {
                              setQtyOnOrder2(e.target.value);
                            }}
                          />
                        </div>
                      </Fieldset>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <GeneralLine style={{ marginBottom: 10 }}>
            Additional Information
          </GeneralLine>
          <Row style={rowStyle2} gutter={16} justify="start">
            <Col md={24} sm={24} xs={24}>
              <Checkbox
                checked={bolProductionEquipmentDownWhileOnOrder}
                onChange={(event) => {
                  setBolProductionEquipmentDownWhileOnOrder(
                    event.target.checked
                  );
                }}
              >
                Vessel operations is impacted and equipment is down while
                waiting for this item.
              </Checkbox>
            </Col>
          </Row>
          <Row style={rowStyle2} gutter={16} justify="start">
            <Col md={10} sm={10} xs={24}>
              <Form>
                <Label>Account</Label>
                <Fieldset>
                  <div style={{ position: 'relative' }}>
                    <Input
                      placeholder="Account"
                      style={{ width: '90%' }}
                      value={strAccount}
                      onChange={() => {
                        setAccountsModalActive(true);
                      }}
                    />
                    <i
                      className="ionicons ion-arrow-down-b"
                      onClick={() => {
                        setAccountsModalActive(true);
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
            <Col md={10} sm={10} xs={24}>
              <Form>
                <Label>Charge Department</Label>
                <Fieldset>
                  <div style={{ position: 'relative' }}>
                    <Input
                      placeholder="Charge Department"
                      value={strChargeDepartment}
                      onChange={() => {
                        setChargeDepartModalActive(true);
                      }}
                      style={{ width: '90%' }}
                    />
                    <i
                      className="ionicons ion-arrow-down-b"
                      onClick={() => {
                        setChargeDepartModalActive(true);
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
          <Row style={rowStyle2} gutter={16} justify="start">
            <Col md={10} sm={10} xs={24}>
              <Form>
                <Label>Ship To Location</Label>
                <Fieldset>
                  <div style={{ position: 'relative' }}>
                    <Input
                      placeholder="Ship To Location"
                      style={{ width: '90%' }}
                      value={strShipToLocation}
                      onChange={() => {
                        setShipToLocationModalActive(true);
                      }}
                    />
                    <i
                      className="ionicons ion-arrow-down-b"
                      onClick={() => {
                        setShipToLocationModalActive(true);
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
            <Col md={10} sm={10} xs={24}>
              <Form>
                <Label>Associated / Impacted Work Order</Label>
                <Fieldset>
                  <div style={{ position: 'relative' }}>
                    <Input
                      placeholder=""
                      value={strWorkOrderName}
                      onChange={() => {
                        setWorkOrderModalActive(true);
                      }}
                      style={{ width: '90%' }}
                    />
                    <i
                      className="ionicons ion-arrow-down-b"
                      onClick={() => {
                        setWorkOrderModalActive(true);
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
          <Row style={rowStyle2} gutter={16} justify="start">
            <Col md={10} sm={10} xs={24}>
              <Form>
                <Label>Associated / Impacted Asset</Label>
                <Fieldset>
                  <div style={{ position: 'relative' }}>
                    <Input
                      placeholder=""
                      style={{ width: '90%' }}
                      value={assetName}
                      onChange={() => {
                        setAssetModalActive(true);
                      }}
                    />
                    <i
                      className="ionicons ion-arrow-down-b"
                      onClick={() => {
                        setAssetModalActive(true);
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
            <Col md={7} sm={7} xs={24}>
              <Form>
                <Fieldset>
                  <Label>Required By Date</Label>
                  <DatePicker
                    value={
                      dtmRequiredByDate != null
                        ? moment(dtmRequiredByDate, 'YYYY-MM-DD HH:mm:ss')
                        : ''
                    }
                    onChange={onChange}
                  />
                </Fieldset>
              </Form>
            </Col>
          </Row>
        </div>
      </Modal>
      <AccountsModal
        visible={accountsModalActive}
        onCancel={handleCancel}
        title="ACCOUNTS"
        selectedAccount={selectedAccount}
      ></AccountsModal>
      <ChargeDepartmentModal
        visible={chargeDepartModalActive}
        onCancel={handleCancel}
        title="CHARGE DEPARTMENTS"
        selectedChargeDepart={selectedChargeDepart}
        // okText={article.key ? 'Update Article' : 'Add Article'}
        // onOk={() => handleRecord('insert', article)}
        onCancel={handleCancel}
      ></ChargeDepartmentModal>
      <ShipToLocationModal
        visible={shipToLocationModalActive}
        title="FACILITIES"
        selectedAsset={selectedShipLocation}
        onCancel={handleCancel}
        filter="Facilities"
      ></ShipToLocationModal>
      <AssetSuppliesModal
        visible={assetSuppliesModalActive}
        title="Parts & Supplies"
        selectedAsset={selectedAssetSupplies}
        onCancel={handleCancel}
        filter="Facilities"
      ></AssetSuppliesModal>
      <AssetModal
        visible={assetModalActive}
        title="ASSETS"
        selectedAsset={selectedAsset}
        onCancel={handleCancel}
      ></AssetModal>
      <WorkOrderModal
        title="WORK ORDERS"
        visible={workOrderModalActive}
        onCancel={handleCancel}
        selectWorkOrder={selectWorkOrder}
      ></WorkOrderModal>
    </div>
  );
}
