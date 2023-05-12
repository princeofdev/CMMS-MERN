import React, { useEffect } from 'react';
// import TableWrapper from '../AntTables.styles';
import { Col, Row, Form } from 'antd';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import { Fieldset, Label } from '../User.styles';

import Select, { SelectOption } from '@iso/components/uielements/select';
import AccountsModal from '../../../component/AccountsModal';
import ChargeDepartmentModal from '../../../component/ChargeDepartmentModal';
import BusinessClassificationModal from '../../../component/BusinessClassificationModal';
import newInnerImg from '../../../assets/images/new-inner-list.png';

const Option = SelectOption;
const FormItem = Form.Item;

const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  marginBottom: '20px',
};
const rowStyle1 = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};

const formItemAccount = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};
const formItemCharge = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
export default function (props) {
  const { business } = props;

  const [strPrimaryContact, setStrPrimaryContact] = React.useState('');
  const [strPhone, setStrPhone] = React.useState('');
  const [strPhone2, setStrPhone2] = React.useState('');
  const [strWebSite, setStrWebsite] = React.useState('');
  const [
    strBusinessClassification,
    setStrBusinessClassification,
  ] = React.useState('');

  const [strFax, setStrFax] = React.useState('');
  const [strPrimaryEmail, setStrPrimaryEmail] = React.useState('');
  const [strSecondaryEmail, setStrSecondaryEmail] = React.useState('');
  const [strPrimaryCurrency, setStrPrimaryCurrency] = React.useState('');
  const [strNotes, setStrNotes] = React.useState('');
  const [strAccount, setStrAccount] = React.useState('');
  const [strChargeDepartment, setStrChargeDepartment] = React.useState('');

  const [accountsModalActive, setAccountsModalActive] = React.useState(false);
  const [chargeDepartModalActive, setChargeDepartModalActive] = React.useState(
    false
  );
  // const [strSecondaryEmail,setStrSecondaryEmail]=React.useState('');
  // const [strAddress, setStrAddress] = React.useState('');
  // const [strAddress2, setStrAddress2] = React.useState('');

  // const onChangeSend = () => {
  //     var accountInf={};
  //     accountInf.strEmailAddress=strEmailAddress;
  //     accountInf.strTelephone=strTelephone;
  //     accountInf.strTelephone2=strTelephone2;
  //     accountInf.strUserName=strUserName;
  //     accountInf.password=password;
  //     accountInf.passwordconfirm=passwordconfirm;
  //     props.accountIf(accountInf);
  // };
  React.useEffect(() => {
    if (Object.keys(business).length != 0) {
      console.log(business.strPrimaryContact);
      setStrPrimaryContact(business.strPrimaryContact);
      setStrPhone(business.strPhone);
      setStrPhone2(business.strPhone2);
      setStrFax(business.strFax);
      setStrWebsite(business.strWebSite);
      setStrBusinessClassification(business.strBusinessClassification);
      setStrPrimaryEmail(business.strPrimaryEmail);
      setStrSecondaryEmail(business.strSecondaryEmail);
      setStrPrimaryCurrency(business.strPrimaryCurrency);
      setStrNotes(business.strNotes);
      setStrAccount(business.strAccount);
      setStrChargeDepartment(business.strChargeDepartment);
    }
  }, [business]);
  

  const handleCancel = () => {
    setAccountsModalActive(false);
    setChargeDepartModalActive(false);
    setBusinessClassificationModalActive(false);
  };

  const selectedAccount = (row) => {
    setStrAccount('(' + row.strCode + ')' + row.strDescription);
    // setIntAccountID(row._id);
    props.selectedAccount(row);
  };

  const selectedChargeDepart = (row) => {
    setStrChargeDepartment('(' + row.strCode + ')' + row.strDescription);
    props.selectedChargeDepartment(row);
  };

  // const businessClassification = (e) => {
  //   setStrBusinessClassification(e);
  //   props.businessClassification(e);
  // };
  const [
    businessClassificationModalActive,
    setBusinessClassificationModalActive,
  ] = React.useState(false);
  const [classificationList, setClassificationList] = React.useState('');
  const [classificationIds, setClassificationIds] = React.useState('');
  console.log(classificationIds, classificationList);

  const selectClassification = (row) => {
    var temp_ids = [];
    var temp_list = [];

    if (classificationIds == '') {
      temp_ids.push(row._id);
      temp_list.push(row.strName);
      console.log(temp_ids, temp_list);
    } else if (temp_ids.indexOf(row._id) == -1) {
      temp_ids = classificationIds.split(',');
      temp_list = classificationList.split(',');
      temp_list.push(row.strName);
      temp_ids.push(row._id);
    }
    setClassificationList(temp_list.join(','));
    setClassificationIds(temp_ids.join(','));
    props.classificationIds(temp_ids.join(','));
    props.strClassificationLists(temp_list.join(','));
  };

  const removeList = (index) => {
    let temp_ids = classificationIds.split(',');
    var temp_list = classificationList.split(',');
    temp_ids.splice(index, 1);
    temp_list.splice(index, 1);
    setClassificationIds(temp_ids.join(','));
    setClassificationList(temp_list.join(','));
    props.classificationIds(temp_ids.join(','));
    props.strClassificationLists(temp_list.join(','));
  };

  const tableBody = () => {
    if (classificationIds != '' && classificationIds != null) {
      var temp_ids1 = classificationIds.split(',');
      var temp_list = classificationList.split(',');
      return (
        <tbody>
          {temp_list.map((row, index) => {
            return (
              <tr key={index}>
                <td>
                  <span>
                    <a>{row}</a>
                  </span>
                </td>
                <td style={{ paddingLeft: '10px' }}>
                  <span>
                    <a
                      title="Remove"
                      onClick={() => {
                        removeList(index);
                      }}
                      style={{ color: 'black' }}
                    >
                      X
                    </a>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    }
  };

  useEffect(() => {
    if (business.strClassificationLists !== undefined) {
      setClassificationList(business.strClassificationLists);
      setClassificationIds(business.strClassificationIds);
    }
  }, [business]);
 
  useEffect(() => {
    var inf = {};
    inf.strPrimaryContact = strPrimaryContact;
    inf.strPhone = strPhone;
    inf.strPhone2 = strPhone2;
    inf.strFax = strFax;
    inf.strWebSite = strWebSite;
    inf.strBusinessClassification = strBusinessClassification;
    inf.strPrimaryEmail = strPrimaryEmail;
    inf.strSecondaryEmail = strSecondaryEmail;
    inf.strPrimaryCurrency = strPrimaryCurrency;
    inf.strNotes = strNotes;
  }, [strPrimaryContact, strPhone, strPhone2, strFax, strWebSite, strBusinessClassification, strPrimaryEmail, strSecondaryEmail, strPrimaryCurrency, strNotes]);
  return (
    <div className="PageContent">
      <InputGroup size="large" style={{ marginBottom: '15px' }}>
        <Row style={rowStyle} gutter={16} justify="start">
          <Col md={8} sm={8} xs={24}>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={24} sm={24} xs={24}>
                <Form>
                  <Fieldset>
                    <Label>Primary Contact</Label>
                    <Input
                      value={strPrimaryContact}
                      placeholder=""
                      onChange={(event) => {
                        setStrPrimaryContact(event.target.value);
                      }}
                      // onKeyUp={() => {
                      //   generalChange();
                      // }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={24} sm={24} xs={24}>
                <Form>
                  <Fieldset>
                    <Label>Phone</Label>
                    <Input
                      value={strPhone}
                      placeholder=""
                      onChange={(event) => {
                        setStrPhone(event.target.value);
                      }}
                      // onKeyUp={() => {
                      //   generalChange();
                      // }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={24} sm={24} xs={24}>
                <Form>
                  <Fieldset>
                    <Label>Fax</Label>
                    <Input
                      value={strFax}
                      placeholder=""
                      onChange={(event) => {
                        setStrFax(event.target.value);
                      }}
                      // onKeyUp={() => {
                      //   generalChange();
                      // }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={24} sm={24} xs={24}>
                <Form>
                  <Fieldset>
                    <Label>Primary Email</Label>
                    <Input
                      value={strPrimaryEmail}
                      placeholder=""
                      onChange={(event) => {
                        setStrPrimaryEmail(event.target.value);
                      }}
                      // onKeyUp={() => {
                      //   generalChange();
                      // }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={24} sm={24} xs={24}>
                <Form>
                  <Fieldset>
                    <Label>Primary Currency</Label>
                    <Input
                      value={strPrimaryCurrency}
                      placeholder=""
                      onChange={(event) => {
                        setStrPrimaryCurrency(event.target.value);
                      }}
                      // onKeyUp={() => {
                      //   generalChange();
                      // }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={22} sm={22} xs={24}>
                <Form>
                  <Fieldset>
                    <Label>Account</Label>
                    <Input
                      placeholder=""
                      value={strAccount}
                      onChange={() => {
                        setAccountsModalActive(true);
                      }}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={1} sm={1} xs={1} style={{ paddingLeft: '0px' }}>
                <i
                  className="ionicons ion-arrow-down-b mt-2"
                  style={{ marginTop: '2rem' }}
                  onClick={() => {
                    setAccountsModalActive(true);
                  }}
                  style={{
                    fontSize: '25px',
                    cursor: 'pointer',
                    marginTop: '2rem',
                  }}
                ></i>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={22} sm={22} xs={24}>
                <Form>
                  <Fieldset>
                    <Label>Charge Department</Label>
                    <Input
                      placeholder=""
                      value={strChargeDepartment}
                      onChange={() => {
                        setChargeDepartModalActive(true);
                      }}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={1} sm={1} xs={1} style={{ paddingLeft: '0px' }}>
                <i
                  className="ionicons ion-arrow-down-b"
                  style={{ marginTop: '2rem' }}
                  onClick={() => {
                    setChargeDepartModalActive(true);
                  }}
                  style={{
                    fontSize: '25px',
                    cursor: 'pointer',
                    marginTop: '2rem',
                  }}
                ></i>
              </Col>
            </Row>
          </Col>
          <Col md={8} sm={8} xs={24}>
            {' '}
            {/** RIGHT SECTION */}
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={24} sm={24} xs={24}>
                <Form>
                  <Fieldset>
                    <Label>Phone2</Label>
                    <Input
                      value={strPhone2}
                      placeholder=""
                      onChange={(event) => {
                        setStrPhone2(event.target.value);
                      }}
                      // onKeyUp={() => {
                      //   generalChange();
                      // }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={24} sm={24} xs={24}>
                <Form>
                  <Fieldset>
                    <Label>Web Site</Label>
                    <Input
                      value={strWebSite}
                      placeholder=""
                      onChange={(event) => {
                        setStrWebsite(event.target.value);
                      }}
                      // onKeyUp={() => {
                      //   generalChange();
                      // }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              {/* <Col md={18} sm={18} xs={22}>
                <Form>
                  <Fieldset>
                    <Label>Business Classification</Label>
                    <Select
                      value={strBusinessClassification}
                      // onChange={(event) => setStrBusinessClassification(event)}
                      onChange={businessClassification}
                    >
                      <Option value="supplies">Supplies</Option>
                      <Option value="purchasing">Purchasing</Option>
                      <Option value="charters">Charters</Option>
                      <Option value="supplier">Supplier</Option>
                      <Option value="manufacture">Manufacture</Option>
                      <Option value="service provider">Service Provider</Option>
                      <Option value="owner">Owner</Option>
                      <Option value="customer">Customer</Option>
                    </Select>
                  </Fieldset>
                </Form>
              </Col> */}
              <Col md={24} sm={24} xs={24}>
                <Label>Business Classification</Label>
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      height: '200px',
                      overflow: 'auto',
                      borderRadius: '4px',
                      border: '1px solid rgb(205, 209, 215)',
                      padding: '4px',
                      margin: '4px',
                    }}
                  >
                    <table cellPadding="0" cellSpacing="0">
                      <thead>
                        <tr>
                          <th>Classification Name</th>
                          <th></th>
                        </tr>
                      </thead>
                      {tableBody()}
                    </table>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      width: '100%',
                      height: '30px',
                      padding: '0px 5px',
                    }}
                    onClick={() => setBusinessClassificationModalActive(true)}
                  >
                    <img
                      style={{ width: '13px', height: '12px' }}
                      src={newInnerImg}
                    ></img>
                    <span
                      style={{
                        paddingLeft: '5px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                      }}
                    >
                      Add another business classification
                    </span>
                  </div>
                </div>
              </Col>
              {/* <Col md={2} sm={2} xs={2} style={{paddingLeft:"0px"}} >
                     <i className="ionicons ion-arrow-down-b"                    
                    //  onClick={()=>{setAccountsModalActive(true)}}
                     style={{fontSize:'25px',cursor: "pointer",marginTop:"30px"}}></i>
                  </Col>                */}
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={24} sm={24} xs={24}>
                <Form>
                  <Fieldset>
                    <Label>Secondary Email</Label>
                    <Input
                      value={strSecondaryEmail}
                      placeholder=""
                      onChange={(event) => {
                        setStrSecondaryEmail(event.target.value);
                      }}
                      // onKeyUp={() => {
                      //   generalChange();
                      // }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
            <Row style={rowStyle} gutter={16} justify="start">
              <Col md={24} sm={24} xs={24}>
                <Form>
                  <Fieldset>
                    <Label>Notes</Label>
                    <Textarea
                      placeholder="Notes"
                      value={strNotes}
                      onChange={(event) => {
                        setStrNotes(event.target.value);
                      }}
                      // onKeyUp={() => {
                      //   generalChange();
                      // }}
                      style={{ height: 'auto' }}
                      rows={6}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </InputGroup>
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
      ></ChargeDepartmentModal>
      <BusinessClassificationModal
        visible={businessClassificationModalActive}
        title="Business"
        group="classification"
        selectClassification={selectClassification}
        onCancel={handleCancel}
      />
    </div>
  );
}
