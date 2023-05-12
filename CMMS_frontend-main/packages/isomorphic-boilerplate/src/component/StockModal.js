import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import { Col, Row, } from 'antd';
import notification from '@iso/components/Notification';
import Select, { SelectOption } from '@iso/components/uielements/select';
import AssetModal from './AssetFilterModal';
import './table.css'
import {
  Fieldset,
  Form,
  Label,
} from './UsersContentModal.styles';

import LocationAction from "../redux/location/actions";
import StockAction from "../redux/stock/actions";

const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginBottom: 10
};
const colStyle = {
  marginBottom: '2px',
};
const Option = SelectOption;
export default function (props) {
  const dispatch = useDispatch();
  const { visible, title, assetId, pageState, stockData } = props;  
  const { initData, } = LocationAction;
  const { addStock, updateData}=StockAction;

  const { locations } = useSelector((state) => state.Location);
  const [intLocationId, setIntLocationId] = React.useState(null);
  const [qtyOnHand, setQtyOnHand] = React.useState(null);
  const [qtyMinQty, setQtyMinQty] = React.useState(null);
  const [intFacilityID, setIntFacilityID] = React.useState(null);
  const [assetModalActive, setAssetModalActive] = React.useState(false);
  const [assetName, setAssetName] = React.useState('');


  React.useEffect(() => {
   
    if (pageState == "edit" && stockData!=null) {
      setIntLocationId(stockData.intLocationId?stockData.intLocationId._id:null);
      setQtyMinQty(stockData.qtyMinQty);
      setQtyOnHand(stockData.qtyOnHand);
      setIntFacilityID(stockData.intFacilityID ? stockData.intFacilityID._id:null);
      setAssetName(stockData.intFacilityID ? stockData.intFacilityID.strName:"");
    }
    else{
      setIntLocationId( null);
      setQtyMinQty('');
      setQtyOnHand('');
      setIntFacilityID( null);
      setAssetName("");
    }
  }, [pageState, stockData ]);
  React.useEffect(() => {
    if (visible == true)
      dispatch(initData());
  }, [visible]); 


  const handleCancel = () => {
    setAssetModalActive(false);
  }
  const onSave = () => {
    if (intLocationId == null) {
      notification('info', "Please select location");
      return;
    }

    var sendData = {};
    sendData.intLocationId = intLocationId;
    sendData.intFacilityID = intFacilityID;
    sendData.qtyOnHand = qtyOnHand;
    sendData.intAssetID = assetId;
    sendData.qtyMinQty = qtyMinQty;
 
    console.log(sendData);
    if (pageState == "edit") {
      dispatch(updateData(sendData, stockData._id));
    }
    else {
      dispatch(addStock(sendData));
    }

    props.onCancel()

  }
  const selectedAsset = (row) => {
    setAssetName(row.strName + '(' + row.strCode + ')');
    setIntFacilityID(row._id);
  }
  return (
    <div>
      <Modal
        visible={visible}
        width={550}
        onClose={props.onCancel}
        title={title}
        onOk={onSave}
        onCancel={props.onCancel}
      >
        <div>
          

          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={13} sm={13} xs={24} style={colStyle}>
              <Form>
                <Fieldset>
                  <Label>Location</Label>
                  <Select
                    defaultValue={intLocationId}
                    value={intLocationId}
                    onChange={(value) => {
                      setIntLocationId(value);
                    }}
                  >
                    {locations.map((row) => {
                      return (
                        <Option key={row._id} value={row._id}>
                          {row.strName}
                        </Option>
                      );
                    })}
                  </Select>

                </Fieldset>
              </Form>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={16} sm={16} xs={24} style={colStyle}>
              <Form>
                <Fieldset>
                  <Label>Asset</Label>
                  <div style={{ position: "relative" }}>
                    <Input
                      label="Facility"
                      style={{ width: "90%" }}
                      value={assetName}
                      onChange={() => setAssetModalActive(true)}
                      placeholder=""
                    />
                    <i
                      className="ionicons ion-arrow-down-b"
                      onClick={() => {
                        setAssetModalActive(true);
                      }}
                      style={{ fontSize: "25px", cursor: "pointer", marginLeft: "3px" }}
                    ></i>
                  </div>
                </Fieldset>
              </Form>
            </Col>
          </Row>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={10} sm={10} xs={24} style={colStyle}>
              <Form>
                <Fieldset>
                  <Label>Qty on hand</Label>
                  <Input
                    label="Location"
                    value={qtyOnHand}
                    onChange={(event) => setQtyOnHand(event.target.value)}
                    placeholder="Qty on hand"
                  />

                </Fieldset>
              </Form>
            </Col>
            <Col md={10} sm={10} xs={24} style={colStyle}>
              <Form>
                <Fieldset>
                  <Label>Min qty</Label>
                  <Input
                    label="qtyMinQty"
                    value={qtyMinQty}
                    onChange={(event) => setQtyMinQty(event.target.value)}
                    placeholder="Min qty"
                  />

                </Fieldset>
              </Form>
            </Col>
          </Row>


        </div>
      </Modal>
      <AssetModal
        visible={assetModalActive}
        title="FACILITIES"
        selectedAsset={selectedAsset}
        onCancel={handleCancel}
        filter="Facilities"
      ></AssetModal>
    </div>
  )
}