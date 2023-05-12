import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import Modal from '@iso/components/Feedback/Modal';
// import TableWrapper from "@iso/containers/Tables/AntTables/AntTables.styles";
// import Checkbox, { CheckboxGroup } from '@iso/components/uielements/checkbox';
import { Col, Row } from 'antd';
import userActions from '../redux/user/actions';
import './table.css';

const { getAllUserData, initUserData } = userActions;

const businessClassifications = [
  {
    _id: 0,
    strName: 'Supplies',
  },
  {
    _id: 1,
    strName: 'Purchasing',
  },
  {
    _id: 2,
    strName: 'Charters',
  },
  {
    _id: 3,
    strName: 'Supplier',
  },
  {
    _id: 4,
    strName: 'Manufacture',
  },
  {
    _id: 5,
    strName: 'Service Provider',
  },
  {
    _id: 6,
    strName: 'Owner',
  },
  {
    _id: 7,
    strName: 'Customer',
  },
];

export default function (props) {
  const { users } = useSelector((state) => state.Users);
  const { visible, title, group } = props;
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (group == 'user') {
      dispatch(initUserData());
    } else {
      dispatch(getAllUserData());
    }
  }, []);
  const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    marginTop: '-20px',
  };
  // const [data, setData] = React.useState([]);

  const onRowClick = (row) => {
    props.onCancel();
    props.selectClassification(row);
  };
  return (
    <Modal
      visible={visible}
      onClose={props.onCancel}
      title={title}
      width={400}
      footer={null}
      onCancel={props.onCancel}
    >
      <div>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={12} sm={12} xs={24}>
            <div style={{ position: 'relative', width: '95%' }}>
              <Input
                label="Set Offline By User"
                placeholder="Enter Title"
                style={{ width: '95%' }}
              />
              <i
                className="ionicons ion-arrow-down-b"
                style={{
                  fontSize: '25px',
                  cursor: 'pointer',
                  position: 'absolute',
                  marginTop: '5px',
                  marginLeft: '5px',
                }}
              ></i>
            </div>
          </Col>
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
        {/* <TableWrapper
          // rowSelection={rowSelection}
          dataSource={users}
          columns={columns}
          pagination={true}
          className="isoGroupTable"
        /> */}
        <table style={{ overflow: 'auto' }}>
          <thead>
            <tr>
              <th>
                <span className="listHeaderLabel35">
                  Business Classification Name
                </span>
              </th>
              {/* <th style={{width:"45%"}}><span className="listHeaderLabel35">Full Name</span></th>                */}
            </tr>
          </thead>
          <tbody>
            {businessClassifications.length != 0 ? (
              businessClassifications.map((row, index) => {
                return (
                  <tr
                    className="listRow"
                    key={index}
                    onClick={() => {
                      onRowClick(row);
                    }}
                  >
                    {/* <td className="column"><p className="context">{row.strUserTitle}</p></td> */}
                    <td className="column">
                      <p className="context">{row.strName}</p>
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
      </div>
    </Modal>
  );
}
