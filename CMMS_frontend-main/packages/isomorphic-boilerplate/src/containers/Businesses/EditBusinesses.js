import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from '@iso/components/uielements/button';
import { Col, Row, Form } from 'antd';
import Input from '@iso/components/uielements/input';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import { Fieldset, Label, TableTabsStyle } from './User.styles';
import UserPageWrapper from './SingleUser.styles';
import {
  General,
  Location,
  AssignedAsset,
  Personal,
  Branch  
} from './Tabviews/Tabviews';
import businessActions from '../../redux/businesses/actions';

const { deleteData, getById, updateData } = businessActions;
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '16px',
};
const colSwitchStyle = {
  marginTop: '30px',
};
const gutter = 16;
function callback(key) {}
export default function (props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const { business, isDelete } = useSelector((state) => state.Businesses);
  console.log(isDelete);
  const { id } = useParams();

  const [strName, setStrName] = React.useState('');
  const [strCode, setStrCode] = React.useState('');

  const [strPrimaryContact, setStrPrimaryContact] = React.useState('');
  const [strPhone, setStrPhone] = React.useState('');
  const [strPhone2, setStrPhone2] = React.useState('');
  const [strFax, setStrFax] = React.useState('');
  const [strPrimaryEmail, setStrPrimaryEmail] = React.useState('');
  const [strSecondaryEmail, setStrSecondaryEmail] = React.useState('');
  const [strNotes, setStrNotes] = React.useState('');
  const [strPrimaryCurrency, setStrPrimaryCurrency] = React.useState('');
  const [strWebSite, setStrWebSite] = React.useState('');
  const [
    strBusinessClassification,
    setStrBusinessClassification,
  ] = React.useState('');
  const [strAccount, setStrAccount] = React.useState('');
  const [strChargeDepartment, setStrChargeDepartment] = React.useState('');

  const [strAddress, setStrAddress] = React.useState('');
  const [strCity, setStrCity] = React.useState('');
  const [strProvince, setStrProvince] = React.useState('');
  const [strPostalCode, setStrPostalCode] = React.useState('');
  const [intCountryID, setIntCountryID] = React.useState('');
  const [strTimezone, setStrTimezone] = React.useState('');

  const [businessId, setBusinessId] = React.useState(null);

  const [strClassificationLists, setStrClassificationLists] = React.useState(
    ''
  );
  const [strClassificationIds, setStrClassificationIds] = React.useState('');
  const [strCustomerAccount, setStrCustomerAccount] = React.useState('');

  const onSave = () => {
    var sendData = {
      strName: strName,
      strCode: strCode,
      strPrimaryContact: strPrimaryContact,
      strPhone: strPhone,
      strPhone2: strPhone2,
      strFax: strFax,
      strPrimaryEmail: strPrimaryEmail,
      strSecondaryEmail: strSecondaryEmail,
      strNotes: strNotes,
      strPrimaryCurrency: strPrimaryCurrency,
      strWebSite: strWebSite,
      strBusinessClassification: strBusinessClassification,
      strAddress: strAddress,
      strCity: strCity,
      strProvince: strProvince,
      strPostalCode: strPostalCode,
      intCountryID: intCountryID,
      strTimezone: strTimezone,
      strAccount: strAccount,
      strChargeDepartment: strChargeDepartment,
      strClassificationIds: strClassificationIds,
      strClassificationLists: strClassificationLists,
      strCustomerAccount: strCustomerAccount
    };

    dispatch(updateData(sendData, id));
  };

  const goBack = () => {
    history.goBack();
  };

  const onDelete = () => {
    dispatch(deleteData(id));
  };

  React.useEffect(() => {
    dispatch(getById(id));
  }, []);
  React.useEffect(() => {
    if (Object.keys(business).length != 0) {
      setBusinessId(business._id);
      setStrName(business.strName);
      setStrCode(business.strCode);

      setStrPrimaryContact(business.strPrimaryContact);
      setStrPhone(business.strPhone);
      setStrPhone2(business.strPhone2);
      setStrFax(business.strFax);
      setStrWebSite(business.strWebSite);
      setStrBusinessClassification(business.strBusinessClassification);
      setStrPrimaryEmail(business.strPrimaryEmail);
      setStrSecondaryEmail(business.strSecondaryEmail);
      setStrPrimaryCurrency(business.strPrimaryCurrency);
      setStrNotes(business.strNotes);

      setStrAddress(business.strAddress);
      setStrCity(business.strCity);
      setStrProvince(business.strProvince);
      setStrPostalCode(business.strPostalCode);
      setIntCountryID(business.intCountryID);
      setStrTimezone(business.strTimezone);
      setStrCustomerAccount(business.strCustomerAccount)
    }
  }, [business]);

  React.useEffect(() => {
    if (isDelete) history.push('/dashboard/businesses');
  }, [isDelete]);

  const changeGeneralInf = (inf) => {
    setStrPrimaryContact(inf.strPrimaryContact);
    setStrPhone(inf.strPhone);
    setStrPhone2(inf.strPhone2);
    setStrFax(inf.strFax);
    setStrWebSite(inf.strWebSite);
    // setStrBusinessClassification(inf.strBusinessClassification);
    setStrPrimaryEmail(inf.strPrimaryEmail);
    setStrSecondaryEmail(inf.strSecondaryEmail);
    setStrPrimaryCurrency(inf.strPrimaryCurrency);
    setStrNotes(inf.strNotes);
  };
  const changeLocationInf = (inf) => {
    setStrAddress(inf.strAddress);
    setStrCity(inf.strCity);
    setStrProvince(inf.strProvince);
    setStrPostalCode(inf.strPostalCode);
    setIntCountryID(inf.intCountryID);
    setStrTimezone(inf.strTimezone);
  };

  const businessClassification = (value) => {
    setStrBusinessClassification(value);
  };

  const selectedAccount = (row) => {
    setStrAccount('(' + row.strCode + ')' + row.strDescription);
  };

  const selectedChargeDepartment = (row) => {
    setStrChargeDepartment('(' + row.strCode + ')' + row.strDescription);
  };

  return (
    <LayoutWrapper>
      <div className="PageHeader">
        <Button color="primary" onClick={goBack}>
          <span>Back</span>
        </Button>
        <Button
          type="primary"
          onClick={onSave}
          className="saveBtn"
          style={{ marginLeft: '10px', marginRight: '10px' }}
        >
          <span>Save</span>
        </Button>
        <Button type="danger" className="saveBtn" onClick={onDelete}>
          <span>Delete</span>
        </Button>
      </div>

      <TableTabsStyle className="isoLayoutContentAsset">
        <h4 style={{ marginBottom: '15px' }}>Business: </h4>
        <UserPageWrapper className="editView">
          <div className="PageContent">
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={10} sm={10} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Name</Label>
                    <Input
                      value={strName}
                      placeholder=""
                      onChange={(event) => {
                        setStrName(event.target.value);
                      }}
                      style={{ width: '100%' }}
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Customer Account</Label>
                    <Input
                      value={strCustomerAccount}
                      placeholder=""
                      onChange={(event) => {
                        setStrCustomerAccount(event.target.value);
                      }}                      
                    />
                  </Fieldset>
                </Form>
              </Col>
              <Col md={6} sm={6} xs={24} style={colStyle}>
                <Form>
                  <Fieldset>
                    <Label>Code</Label>
                    <Input
                      value={strCode}
                      placeholder=""
                      onChange={(event) => {
                        setStrCode(event.target.value);
                      }}
                      style={{ width: '60%' }}
                    />
                  </Fieldset>
                </Form>
              </Col>
            </Row>
          </div>
        </UserPageWrapper>
        <Tabs
          defaultActiveKey="1"
          className="isoTableDisplayTab"
          onChange={callback}
        >
          <TabPane tab="General" key="1">
            <General
              business={business}
              changeGeneralInf={changeGeneralInf}
              selectedAccount={selectedAccount}
              selectedChargeDepartment={selectedChargeDepartment}
              businessClassification={businessClassification}
              classificationIds={(val) => setStrClassificationIds(val)}
              strClassificationLists={(val) => setStrClassificationLists(val)}
            ></General>
          </TabPane>
          <TabPane tab="Location" key="2">
            <Location
              business={business}
              changeLocationInf={changeLocationInf}
            ></Location>
            {/* <Groups
           selectedGroups={selectedGroups}
           pageState={"edit"}
           groupIds={arrayGroupIds}
           ></Groups> */}
          </TabPane>
          <TabPane tab="Associated Assets" key="3">
            <AssignedAsset
              businessId={businessId}
              pageState={'edit'}
              businessName={strName}
            ></AssignedAsset>
          </TabPane>
          <TabPane tab="personnel" key="4">
            <Personal businessId={businessId}></Personal>
          </TabPane>         
          <TabPane tab="Branch" key="5">
            <Branch businessId={businessId}
              pageState={'edit'}
             ></Branch>
          </TabPane>

          
        </Tabs>
      </TableTabsStyle>
    </LayoutWrapper>
  );
}
