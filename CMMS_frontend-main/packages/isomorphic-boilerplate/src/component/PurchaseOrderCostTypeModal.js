import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import notification from '@iso/components/Notification';
import FacilityPartModal from './FacilityPartModal';
import { Col, Row } from 'antd';
import './table.css';
import { ActionBtn, Fieldset, Form, Label } from './UsersContentModal.styles';
import ChargedepartmentAction from '../redux/chargedepartment/actions';
const Data = [
  {
    id: 1,
    strName: 'Shipping'
  },
  {
    id: 2,
    strName: 'Environmental'
  },
  {
    id: 3,
    strName: 'Miscellanous'
  }
];
export default function (props) {
  const { visible, title, costTypeArray } = props;
  React.useEffect(() => { }, [visible]);
  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    marginTop: '-20px',
    background: '#e0e7ed',
    height: '38px',
    borderBottom: '1px solid rgb(174,193,208)',
    paddingTop: '2px',
    marginLeft: '2px',
  };
  const { add, initData } = ChargedepartmentAction;
  const dispatch = useDispatch();
  const [strCode, setStrCode] = React.useState('');
  const [strDescription, setStrDescription] = React.useState('');
  const { departments } = useSelector((state) => state.Chargedepartment);
  const onSave = () => {
    if (strCode == '') {
      notification('info', 'Please put the code!');
      return;
    }
    var sendData = {};
    sendData.strCode = strCode;
    sendData.strDescription = strDescription;
    dispatch(add(sendData));
  };

  React.useEffect(() => {
    // dispatch(initData());
  }, [visible]);

  const onRowClick = (row) => {
    props.selectedCostType(row);
    props.onCancel();
  };

  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        // okText="New"
        title={title}
        footer={null}
        // onOk={() => {
        //   setStrCode('');
        //   setStrDescription('');
        // }}
         onCancel={props.onCancel}
      >
        {/* <div>
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
        </div> */}
        <div style={{ marginTop: '3px', height: '200px', overflow: 'auto' }}>
          <table style={{ overflow: 'auto' }}>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>
                  <span className="listHeaderLabel35">Name</span>
                </th>
                <th style={{ width: '25%' }}>
                  <span className="listHeaderLabel35">Control</span>
                </th>
                <th>
                  <span className="listHeaderLabel35"></span>
                </th>
              </tr>
            </thead>

            <tbody>
              {Data.length != 0 ? (
                Data.map((row) => {
                  if (costTypeArray.indexOf(row.id)==-1)
                  return (
                    <tr
                      className="listRow"
                      key={row.id}
                      onClick={() => {
                        onRowClick(row);
                      }}
                    >
                      <td className="column">
                        <p className="context">{row.strName}</p>
                      </td>
                      <td className="column">
                        <p className="context">{row.strName}</p>
                      </td>
                      <td className="column">
                        <p className="context"></p>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    style={{ textAlign: 'center', fontSize: '14px' }}
                    colSpan="3"
                  >
                    No Data!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Modal>

    </div>
  );
}
