import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import notification from '@iso/components/Notification';
import { Col, Row } from 'antd';
import './table.css';
import { ActionBtn, Fieldset, Form, Label } from './UsersContentModal.styles';
import AccountAction from '../redux/account/actions';
import Button from '@iso/components/uielements/button';
import AssetModal from './AssetModal';

const rowFooterStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginTop: '10px',
};

export default function (props) {
  const { visible, title } = props;
  React.useEffect(() => {}, [visible]);
  const { add, initData } = AccountAction;
  const dispatch = useDispatch();
  const [assetModalActive, setAssetModalActive] = React.useState(false);
  const [strCode, setStrCode] = React.useState('');
  const [strDescription, setStrDescription] = React.useState('');
  const [strQty, setStrQty] = React.useState('');
  const { accounts } = useSelector((state) => state.Account);

  const [assetName, setAssetName] = React.useState('');
  const [strAssets, setStrAssets] = React.useState('');
  const [strAssetIds, setStrAssetIds] = React.useState('');

  const selectedAsset = (row) => {
    setAssetName(row.strName);
    setStrAssets(row.strName + '(' + row.strCode + ')');
    setStrAssetIds(row._id.toString());
  };

  const onSave = () => {
    if (assetName == '') {
      notification('info', 'Please put the asset');
      return;
    }
    if (strDescription == '') {
      notification('info', 'Please put the description!');
      return;
    }
    if (strQty == '') {
      notification('info', 'Please put the Qty!');
      return;
    }
    var sendData = {};
    sendData.strDescription = strDescription;
    sendData.strQty = strQty;
    sendData.assetName = assetName;
    sendData.strAssetIds = strAssetIds;
    sendData.strAssets = strAssets;
    dispatch(add(sendData));
  };
  React.useEffect(() => {
    dispatch(initData());
  }, [visible]);
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
              <Label>Asset</Label>
              <div style={{ position: 'relative' }}>
                <Input
                  label="Set Offline By User"
                  placeholder=""
                  value={assetName}
                  // onChange={() => {
                  //   setStatusModalActive(true);
                  // }}
                  style={{ width: '90%' }}
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
          <Form>
            <Fieldset>
              <Label>Description</Label>
              <Textarea
                value={strDescription}
                onChange={(event) => setStrDescription(event.target.value)}
                placeholder=""
                rows={3}
              />
            </Fieldset>
          </Form>
          <Form>
            <Fieldset>
              <Label>Qty Received</Label>
              <div style={{ position: 'relative' }}>
                <Input
                  label="Set Offline By User"
                  placeholder=""
                  value={strQty}
                  onChange={(event) => setStrQty(event.target.value)}
                  style={{ width: '50%' }}
                />
              </div>
            </Fieldset>
          </Form>
          {/* <Row style={rowStyle} gutter={16} justify="start">
            <Col md={12} sm={12} xs={24}></Col>
            <Col md={12} sm={12} xs={24}>
              <InputSearch
                placeholder="input search text"
                // value={category}
                // onChange={onCategorySearchChange}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: '3px', height: '200px' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '30%' }}>
                  <span className="listHeaderLabel35">Code</span>
                </th>
                <th>
                  <span className="listHeaderLabel35">Description</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {accounts.length != 0 ? (
                accounts.map((row) => {
                  return (
                    <tr
                      className="listRow"
                      key={row.key}
                      onClick={() => {
                        onRowClick(row);
                      }}
                    >
                      <td className="column">
                        <p className="context">{row.strCode}</p>
                      </td>
                      <td className="column">
                        <p className="context">{row.strDescription}</p>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    style={{ textAlign: 'center', fontSize: '14px' }}
                    colSpan="2"
                  >
                    No Data!
                  </td>
                </tr>
              )}
            </tbody>
          </table> */}
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

      <AssetModal
        visible={assetModalActive}
        title="ASSETS"
        selectedAsset={selectedAsset}
        onCancel={() => {
          setAssetModalActive(false);
        }}
        filter="ASSETS"
      ></AssetModal>
    </div>
  );
}
