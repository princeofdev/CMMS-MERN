import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import notification from '@iso/components/Notification';
import { Col, Row } from 'antd';
import { ActionBtn, Fieldset, Form, Label } from './UsersContentModal.styles';
import Actions from '../redux/purchaserequest/actions';
import Button from '@iso/components/uielements/button';
import BusinessModal from './BusinessModal';
import BusinessTypeModal from './BusinessTypeModal';

const rowFooterStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginTop: '10px',
};
const businessTypes = {
  1: 'Supplier',
  2: 'Manufacture',
  3: 'Service Provider',
  4: 'Owner',
  5: 'Customer',
};
export default function (props) {
  const { visible, title, data, selectedid } = props;
  React.useEffect(() => {}, [visible]);
  const dispatch = useDispatch();
  const [businessModalActive, setBusinessModalActive] = React.useState(false);
  const [businessTypeModalActive, setBusinessTypeModalActive] = React.useState(
    false
  );
  const [strCatalog, setStrCatalog] = React.useState('');
  const [strPartNumber, setStrPartNumber] = React.useState('');
  const [strSupplierName, setStrSupplierName] = React.useState('');
  const [strBusinessType, setStrBusinessType] = React.useState('');
  const [intBusinessRoleTypeID, setintBusinessRoleTypeID] = React.useState(
    null
  );
  const [businessGroupName, setBusinessGroupName] = React.useState('');
  const [selectedPRId, setSelectedPRId] = React.useState(null);

  React.useEffect(() => {
    setSelectedPRId(selectedid);
  }, [selectedid]);

  const { updateData } = Actions;
  const selectBusiness = (row) => {
    setStrSupplierName(row.strName);
    setIntSupplierID(row._id);
  };

  const selectedBusinessType = (row) => {
    setStrBusinessType(businessTypes[row]);
    setintBusinessRoleTypeID(row);
    setBusinessGroupName(businessTypes[row]);
  };

  const [intSupplierID, setIntSupplierID] = React.useState(null);

  const onSave = () => {
    if (strSupplierName == '') {
      notification('info', 'Please put the Business Name!');
      return;
    }
    if (strBusinessType == '') {
      notification('info', 'Please put the Business Type!');
      return;
    }
    if (strPartNumber == '' || strCatalog == '') {
      notification('info', 'Please fill the all field');
      return;
    }
    setStrSupplierName(intSupplierID ? intSupplierID.strName : '');
    var sendData = {};
    // sendData.strDescription = strDescription;
    // sendData.strBusinessType = strBusinessType;
    sendData.strSupplierName = strSupplierName;
    sendData.intSupplierID = intSupplierID;
    // sendData.strCatalog = strCatalog;
    sendData.strPartNumber = strPartNumber;
    dispatch(updateData(sendData, selectedPRId));
    props.onCancel();
  };
  const onRowClick = (row) => {
    props.onCancel();
  };
  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        title={title}
        onCancel={props.onCancel}
        footer={null}
      >
        <div>
          <Form>
            <Fieldset>
              <Label>Parts And Supplies Item</Label>
              <div style={{ position: 'relative' }}>
                <Input value={data} style={{ width: '70%' }} />
              </div>
            </Fieldset>
          </Form>
          <Form>
            <Fieldset>
              <Label>Business</Label>
              <div style={{ position: 'relative' }}>
                <Input
                  placeholder=""
                  value={strSupplierName}
                  onChange={() => {
                    setBusinessModalActive(true);
                  }}
                  style={{ width: '90%' }}
                />
                <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setBusinessModalActive(true);
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
          <Form>
            <Fieldset>
              <Label>Business Type</Label>
              <div>
                <Input
                  placeholder=""
                  value={strBusinessType}
                  onChange={() => {
                    setBusinessTypeModalActive(true);
                  }}
                  style={{ width: '90%' }}
                />
                <i
                  className="ionicons ion-arrow-down-b"
                  onClick={() => {
                    setBusinessTypeModalActive(true);
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
          <Form>
            <Fieldset>
              <Label>Supplier Part Number</Label>
              <div style={{ position: 'relative' }}>
                <Input
                  placeholder=""
                  value={strPartNumber}
                  onChange={(event) => setStrPartNumber(event.target.value)}
                  style={{ width: '50%' }}
                />
              </div>
            </Fieldset>
          </Form>
          <Form>
            <Fieldset>
              <Label>Catalog</Label>
              <div style={{ position: 'relative' }}>
                <Input
                  placeholder=""
                  value={strCatalog}
                  onChange={(event) => setStrCatalog(event.target.value)}
                  style={{ width: '50%' }}
                />
              </div>
            </Fieldset>
          </Form>
        </div>
        <Row style={rowFooterStyle} gutter={16} justify="start">
          <Col md={24} sm={24} xs={24} style={{ marginBottom: '2px' }}>
            <Button
              type="primary"
              className="saveBtn"
              onClick={onSave}
              style={{ marginLeft: '10px', marginRight: '10px' }}
            >
              <span>Save</span>
            </Button>
            <Button type="danger" className="saveBtn" onClick={props.onCancel}>
              <span>Cancel</span>
            </Button>
          </Col>
        </Row>
      </Modal>
      <BusinessModal
        visible={businessModalActive}
        title="Business"
        selectBusiness={selectBusiness}
        onCancel={() => setBusinessModalActive(false)}
        onRowClick={onRowClick}
      />
      <BusinessTypeModal
        onCancel={() => setBusinessTypeModalActive(false)}
        title={'BUSINESS TYPE'}
        selectedBusinessType={selectedBusinessType}
        visible={businessTypeModalActive}
        onRowClick={onRowClick}
      ></BusinessTypeModal>
      {/* <AssetModal
        visible={assetModalActive}
        title="ASSETS"
        selectedAsset={selectedAsset}
        onCancel={() => {
          setAssetModalActive(false);
        }}
        filter="ASSETS"
      ></AssetModal> */}
    </div>
  );
}
