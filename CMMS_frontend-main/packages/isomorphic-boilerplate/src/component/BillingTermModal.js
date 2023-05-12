import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from 'antd';
import ContentHolder from '@iso/components/utility/contentHolder';
import notification from '@iso/components/Notification';
import './table.css';
import { ActionBtn, Fieldset, Form, Label } from './UsersContentModal.styles';
import BillingTermAction from '../redux/billingterm/actions';
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginTop: '-20px',
};

const Option = SelectOption;
export default function (props) {
  const { visible, title } = props;
  React.useEffect(() => {}, [visible]);

  const [data, setData] = React.useState([]);
  const [newModalActive, setNewModalActive] = React.useState(false);
  const [strName, setStrName] = React.useState('');
  const [intControlID, setIntControlID] = React.useState('100');
  const [strDescription, setStrDescription] = React.useState('');
  const { addBilingTerm, getBillingTerms } = BillingTermAction;
  const dispatch = useDispatch();
  const { billingTerms } = useSelector((state) => state.billingTerm);
  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
  };
  React.useEffect(() => {
    if (visible) dispatch(getBillingTerms());
  }, [visible]);
  const onSave = () => {
    if (strName == '') {
      notification('info', 'Please put the Name!');
      return;
    }
    var sendData = {};
    sendData.strName = strName;
    // sendData.intControlID=intControlID;
    setNewModalActive(false);
    dispatch(addBilingTerm(sendData));
  };
  const onRowClick = (row) => {
    props.selectedItem(row);
    props.onCancel();
  };

  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        okText="New"
        title={title}
        width={400}
        onOk={() => {
          setNewModalActive(true);
        }}
        onCancel={props.onCancel}
      >
        <div>
          <Row style={rowStyle} gutter={16} justify="start">
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
        <div style={{ marginTop: '3px', height: '170px', overflow: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: '60%' }}>
                  <span className="listHeaderLabel35">Name</span>
                </th>
                <th>
                  <span className="listHeaderLabel35"></span>
                </th>
              </tr>
            </thead>

            <tbody>
              {billingTerms.length != 0 ? (
                billingTerms.map((row) => {
                  return (
                    <tr
                      className="listRow"
                      key={row.key}
                      onClick={() => {
                        onRowClick(row);
                      }}
                    >
                      <td className="column">
                        <p className="context">{row.strName}</p>
                      </td>
                      <td className="column">
                        <p className="context">{}</p>
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
          </table>
          {/* <TableWrapper
              // rowSelection={rowSelection}
              dataSource={status}
              columns={columns}
              pagination={false}
              className="isoGroupTable"
            /> */}
        </div>
      </Modal>
      <Modal
        visible={newModalActive}
        width={250}
        onClose={() => {
          setNewModalActive(false);
        }}
        title="BUILDING TERM"
        onOk={onSave}
        onCancel={() => {
          setNewModalActive(false);
        }}
      >
        <Form>
          <Fieldset>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={24} sm={24} xs={24}>
                <Label>Name</Label>
                <Input
                  label="Name"
                  placeholder=""
                  value={strName}
                  onChange={(event) => setStrName(event.target.value)}
                />
              </Col>
            </Row>
          </Fieldset>
        </Form>
      </Modal>
    </div>
  );
}
