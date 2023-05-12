import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbars from '@iso/components/utility/customScrollBar';
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
// import addDoubleImg from '../../../../assets/images/new-group-inner-list.png';
import { Button } from 'antd';
import newAddImg from '../../../assets/images/new-inner-list.png';
import '../../../component/table.css';
import PersonalModal from '../../../component/PurchaseOrderNotificationModal';
import Actions from '../../../redux/purchaseordernotification/actions';
export default function (props) {
  const { purcaseOrderId } = props;
  const dispatch = useDispatch();
  const [personalModalActive, setPersonalModalActive] = React.useState(false);
  const { getDatas, deleteData } = Actions;
  const { purchaseOrderNotifications, isDelete } = useSelector(
    (state) => state.purchaseOrderNotification
  );
  const [pageState, setPageState] = React.useState('add');
  const [userInf, setUserInf] = React.useState({});

  const handleCancel = () => {
    setPersonalModalActive(false);
  };
  React.useEffect(() => {
    dispatch(getDatas(purcaseOrderId));
  }, []);
  React.useEffect(() => {
    console.log(purchaseOrderNotifications);
  }, [purchaseOrderNotifications]);

  const onRowClick = (row) => {
    setPersonalModalActive(true);
    setUserInf(row);
    setPageState('edit');
  };
  const deleteRow = (id, intAssetID) => {
    dispatch(deleteData(id, intAssetID));
    setPersonalModalActive(false);
    setPageState('add');
  };
  return (
    <div className="isoInvoiceTable">
      <Scrollbars style={{ width: '100%', height: 'calc(35vh - 70px)' }}>
        {/* <TableWrapper
          // rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          pagination={false}
          className="isoGroupTable"
        /> */}
        <table style={{ overflow: 'auto' }}>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>
                <span className="listHeaderLabel35">User</span>
              </th>
              <th>
                <span className="listHeaderLabel35"></span>
              </th>
              <th style={{ width: '10%' }}>
                <span className="listHeaderLabel35"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrderNotifications.length != 0 ? (
              purchaseOrderNotifications.map((row) => {
                return (
                  <tr className="listRow" key={row._id}>
                    <td
                      className="column"
                      onClick={() => {
                        onRowClick(row);
                      }}
                    >
                      <p className="context">{row.intUserID.strFullName}</p>
                    </td>
                    <td
                      className="column"
                      onClick={() => {
                        onRowClick(row);
                      }}
                    >
                      <p className="context"></p>
                    </td>
                    <td className="column">
                      {' '}
                      <Button
                        className="DltBtn"
                        // icon="delete"
                        onClick={() => {
                          deleteRow(row._id, row.intPurchaseOrderID);
                        }}
                      >
                        <i className="ion-android-delete" />
                      </Button>
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
      </Scrollbars>
      <div
        style={{
          color: 'rgb(102, 115, 136)',
          fontSize: '10pt',
          background: '#f7f7f7',
          border: '1px solid rgb(241, 243, 246)',
          height: '25px',
        }}
      >
        <span
          style={{
            float: 'left',
            marginLeft: '4px',
            marginRight: '4px',
            cursor: 'pointer',
          }}
        >
          <img
            src={newAddImg}
            onClick={() => {
              setPersonalModalActive(true);
              setPageState('add');
            }}
          ></img>
        </span>
      </div>
      <PersonalModal
        visible={personalModalActive}
        purcaseOrderId={purcaseOrderId}
        onCancel={handleCancel}
        pageState={pageState}
        userInf={userInf}
        title={'PERSONEL'}
      ></PersonalModal>
    </div>
  );
}
