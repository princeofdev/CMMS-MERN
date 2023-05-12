import React from 'react';
// import TableWrapper from '../AntTables.styles';
import { useDispatch, useSelector } from 'react-redux';
import notification from '@iso/components/Notification';
import { useHistory } from 'react-router-dom';
import { Form } from 'antd';
import Scrollbars from '@iso/components/utility/customScrollBar';
import { Button } from 'antd';
import Modal from '@iso/components/Feedback/Modal';
import { Col, Row } from 'antd';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import BranchAction from '../../../redux/businessbranch/actions';
import PortModal from '../../../component/PortModal';
import '../../../component/table.css';
import newAddImg from '../../../assets/images/new-inner-list.png';
import { Fieldset, Label } from '../Asset.styles';
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '5px',
};
export default function (props) {
  const { businessId, } = props;
  let history = useHistory();
  const dispatch = useDispatch();
  const { addBranch, getAllBranch, deleteData, updateData} = BranchAction;
  const { branches, isChanged } = useSelector(
    (state) => state.Branch
  );
  const [pageState, setPageState] = React.useState('add');
  const [modalActive, setModalActive] = React.useState(false);

  const [strIsoPort, setStrIsoPort] = React.useState('');
  const [strTelephone, setStrTelephone] = React.useState('');
  const [strFax, setStrFax] = React.useState('');
  const [strContactInfo, setStrContactInfo] = React.useState('');
  const [strContactEmail, setStrContactEmail] = React.useState('');
  const [strOrderSubmissionEmail, setStrOrderSubmissionEmail] = React.useState('');
  const [strAddress, setStrAddress] = React.useState('');
  const [intBranchId, setIntBranchId] = React.useState(null);

  const [strStreet1, setStrStreet1] = React.useState('');
  const [strStreet2, setStrStreet2] = React.useState('');
  const [strCity, setStrCity] = React.useState('');
  const [strProvince, setStrProvince] = React.useState('');
  const [strPostalCode, setStrPostalCode] = React.useState('');
  const [strCountry, setStrCountry] = React.useState('');
  const [portModalActive, setPortModalActive]=React.useState(false);

  React.useEffect(() => {
    dispatch(getAllBranch(businessId));
  }, []);
  React.useEffect(() => {
    if (isChanged == true) {
      setModalActive(false)
      dispatch(getAllBranch(businessId));
    }
  }, [isChanged]);

  const onRowView = (row) => {
    setStrIsoPort(row.strIsoPort);
    setIntBranchId(row._id)
    setStrTelephone(row.strTelephone);
    setStrFax(row.strFax);
    setStrContactInfo(row.strContactInfo);
    setStrContactEmail(row.strContactEmail);
    setStrOrderSubmissionEmail(row.strOrderSubmissionEmail);
    // setStrAddress(row.strAddress);
    setStrStreet1(row.strStreet1);
    setStrStreet2(row.strStreet1);
    setStrCity(row.strCity);
    setStrProvince(row.strProvince);
    setStrPostalCode(row.strPostalCode);
    setStrCountry(row.strCountry);
 
    setModalActive(true);
    setPageState('edit');
  };

  const deleteRow = (rowId) => {
    dispatch(deleteData(rowId));
  };
  const onSave = () => {
    if (strIsoPort === '') {
      notification('error', 'Please put the ISO port.');
      return;
    }
    var sendData = {};
    sendData.intBusinessID = businessId;
    sendData.strIsoPort = strIsoPort;
    sendData.strTelephone = strTelephone;
    sendData.strFax = strFax;
    sendData.strContactInfo = strContactInfo;
    sendData.strContactEmail = strContactEmail;
    sendData.strOrderSubmissionEmail = strOrderSubmissionEmail;
    sendData.strStreet1 = strStreet1;
    sendData.strStreet2 = strStreet2;
    sendData.strCity = strCity;
    sendData.strProvince = strProvince;
    sendData.strPostalCode = strPostalCode;
    sendData.strCountry = strCountry;

    if (pageState == 'edit')
      dispatch(updateData(sendData, intBranchId));
    else
      dispatch(addBranch(sendData));   
  }
  const handleCancel=()=>{
    setPortModalActive(false);
  }
  const selectPort=(row)=>{
    setStrIsoPort(row.strPortName);
  }
  return (
    <div className="isoInvoiceTable">
      <Scrollbars style={{ width: '100%', height: 'calc(45vh - 70px)' }}>
        <table style={{ overflow: 'auto', width: '70%' }}>
          <thead>
            <tr>
              <th >
                <span className="listHeaderLabel35">No.</span>
              </th>
              <th style={{ width: '15%' }}>
                <span className="listHeaderLabel35">ISO Port</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Telephone</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Fax</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Contact Info</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Contact Email</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Order Submission Email</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Street1</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Street2</span>
              </th>
              <th>
                <span className="listHeaderLabel35">City</span>
              </th>
              <th>
                <span className="listHeaderLabel35">State/Province</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Postal Code</span>
              </th>
              <th>
                <span className="listHeaderLabel35">Country</span>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {branches.length != 0 ? (
              branches.map((row) => {
                return (
                  <tr className="listRow" key={row._id}>
                    <td
                      className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context" >
                        {row.key}
                      </p>
                    </td>
                    <td
                      className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">
                        {row.strIsoPort}
                      </p>
                    </td>
                    <td className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">{row.strTelephone}</p>
                    </td>
                    <td className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">{row.strFax}</p>
                    </td>
                    <td className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">{row.strContactInfo}</p>
                    </td>
                    <td className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">{row.strContactEmail}</p>
                    </td>
                    <td className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">{row.strOrderSubmissionEmail}</p>
                    </td>
                    <td className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">{row.strStreet1}</p>
                    </td>
                    <td className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">{row.strStreet2}</p>
                    </td>
                    <td className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">{row.strCity}</p>
                    </td>
                    <td className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">{row.strProvince}</p>
                    </td>
                    <td className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">{row.strPostalCode}</p>
                    </td>
                    <td className="column"
                      onClick={() => {
                        onRowView(row);
                      }}
                    >
                      <p className="context">{row.strCountry}</p>
                    </td>
                    <td className="column">
                      <Button
                        className="DltBtn"
                        onClick={() => {
                          deleteRow(row._id);
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
                  colSpan="8"
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
              setModalActive(true);
              setPageState('add');
            }}
          ></img>
        </span>
      </div>

      <Modal
        visible={modalActive}
        title="BRANCH"
        onOk={onSave}
        okText="Save"
        onCancel={() => {
          setModalActive(false);
        }}
      >
        <Form>
          <Row style={rowStyle} gutter={16} justify="start">
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>ISO Port</Label>
                <div style={{ position: 'relative' }}>
                <Input
                  placeholder=""
                  value={strIsoPort}
                  onChange={(event) => {
                    setPortModalActive(true);
                  }}
                    style={{ width: '90%' }}
                />
                  <i
                    className="ionicons ion-arrow-down-b"
                    onClick={() => {
                      setPortModalActive(true);
                    }}
                    style={{
                      fontSize: '25px',
                      cursor: 'pointer',
                      position: 'absolute',
                      marginLeft: '4px',
                    }}
                  ></i>
                </div>
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Telephone</Label>
                <Input
                  placeholder=""
                  value={strTelephone}
                  onChange={(event) => {
                    setStrTelephone(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Fax</Label>
                <Input
                  placeholder=""
                  value={strFax}
                  onChange={(event) => {
                    setStrFax(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Contact Info</Label>
                <Input
                  placeholder=""
                  value={strContactInfo}
                  onChange={(event) => {
                    setStrContactInfo(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Contact Email</Label>
                <Input
                  placeholder=""
                  value={strContactEmail}
                  onChange={(event) => {
                    setStrContactEmail(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Order Submission Email</Label>
                <Input
                  placeholder=""
                  value={strOrderSubmissionEmail}
                  onChange={(event) => {
                    setStrOrderSubmissionEmail(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Street1</Label>
                <Input
                  placeholder=""
                  value={strStreet1}
                  onChange={(event) => {
                    setStrStreet1(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Street2</Label>
                <Input
                  placeholder=""
                  value={strStreet2}
                  onChange={(event) => {
                    setStrStreet2(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>City</Label>
                <Input
                  placeholder=""
                  value={strCity}
                  onChange={(event) => {
                    setStrCity(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>State/Province</Label>
                <Input
                  placeholder=""
                  value={strProvince}
                  onChange={(event) => {
                    setStrProvince(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Postal Code</Label>
                <Input
                  placeholder=""
                  value={strPostalCode}
                  onChange={(event) => {
                    setStrPostalCode(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
            <Col md={12} sm={12} xs={12} style={colStyle}>
              <Fieldset>
                <Label>Country</Label>
                <Input
                  placeholder=""
                  value={strCountry}
                  onChange={(event) => {
                    setStrCountry(event.target.value);
                  }}
                />
              </Fieldset>
            </Col>
          </Row>
        </Form>
      </Modal>
      <PortModal
        visible={portModalActive}
        selectPort={selectPort}
        title="PORT"
        onCancel={handleCancel}
      >

      </PortModal>
    </div>
  );
}
