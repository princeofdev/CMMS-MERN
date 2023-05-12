import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
import Select, { SelectOption } from '@iso/components/uielements/select';
import { Col, Row } from 'antd';
import './table.css';
import { ActionBtn, Fieldset, Form, Label } from './UsersContentModal.styles';
import CreditCardAction from '../redux/creditcard/actions';
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

  const {
    add,
    getcreditcards,
    updateData,
    deleteData,
    createdId,
  } = CreditCardAction;
  const dispatch = useDispatch();
  const [strCardHoldName, setStrCardHolderName] = React.useState('');
  const { creditCards } = useSelector((state) => state.CreditCard);
  console.log('creditCards', creditCards);
  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
  };
  React.useEffect(() => {
    if (visible) dispatch(getcreditcards());
  }, [visible]);
  const onRowClick = (row) => {
    props.selectedItem(row);
    props.onCancel();
  };

  return (
    <div>
      <Modal
        visible={visible}
        onClose={props.onCancel}
        title={title}
        width={400}
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
                  <span className="listHeaderLabel35">CardType</span>
                </th>
                <th>
                  <span className="listHeaderLabel35">CardHolderName</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {creditCards.length != 0 ? (
                creditCards.map((row) => {
                  return (
                    <tr
                      className="listRow"
                      key={row.key}
                      onClick={() => {
                        onRowClick(row);
                      }}
                    >
                      <td className="column">
                        <p className="context">{row.strCardType}</p>
                      </td>
                      <td className="column">
                        <p className="context">{row.strCardHolderName}</p>
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
    </div>
  );
}
