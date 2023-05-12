import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@iso/components/uielements/button';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import Box from '@iso/components/utility/box';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import Tabs, { TabPane } from '@iso/components/uielements/tabs';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import PageWrapper from './Single.styles';
import { TableTabsStyle } from './Asset.styles';
// import Checkbox from '@iso/components/uielements/checkbox';
import {
  AssetCategory,
  DrillCategory,
  DrillType,
  CodeType,
  ItemType,
  Accounts,
  ChargeDepartment,
  Locations,
  Currency,
  Ports,
  Country,
  CreditCard,
} from './Tabviews/Tabviews';
import usergroupAction from '../../redux/usergroup/actions';
import { Col, Row, Form } from 'antd';
const FormItem = Form.Item;

const { add } = usergroupAction;
function callback(key) {}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '16px',
};
const gutter = 16;

export default function AddUserGroup() {
  const dispatch = useDispatch();
  const [strFullName, setStrFullName] = React.useState('');
  const onSave = () => {
    var sendData = {
      strName: strFullName,
    };
    console.log(sendData);
    dispatch(add(sendData));
  };
  React.useEffect(() => {
    console.log('init add user group');
  }, []);
  return (
    <LayoutContentWrapper>
      <div className="PageHeader">
        {/* <Link to="/dashboard/usergroup">
          <Button color="primary">
            <span>Back</span>
          </Button>
        </Link> */}
        <Button type="primary" className="saveBtn" onClick={onSave}>
          <span>Save</span>
        </Button>
      </div>
      <TableTabsStyle className="isoLayoutContentAsset">
        <PageWrapper className="editView">
          <h3>Cmms Settings</h3>
          <div className="PageContent">
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col md={10} sm={10} xs={24} style={colStyle}></Col>
            </Row>
          </div>
        </PageWrapper>
        <Tabs
          defaultActiveKey="1"
          className="isoTableDisplayTab"
          onChange={callback}
        >
          {/* <TabPane tab="System" key="1">
            System 1
          </TabPane> */}
          <TabPane tab="Asset Categories" key="2">
            <AssetCategory></AssetCategory>
          </TabPane>
          <TabPane tab="Drill Category" key="3">
            <DrillCategory></DrillCategory>
          </TabPane>
          <TabPane tab="Drill Type" key="4">
            <DrillType></DrillType>
          </TabPane>
          <TabPane tab="Code Type" key="5">
            <CodeType></CodeType>
          </TabPane>
          <TabPane tab="Item Type" key="6">
            <ItemType></ItemType>
          </TabPane>
          <TabPane tab="Currencies" key="7">
            <Currency></Currency>
          </TabPane>
          <TabPane tab="Countries" key="8">
            <Country></Country>
          </TabPane>
          
          <TabPane tab="Ports" key="9">
            <Ports></Ports>
          </TabPane>
          <TabPane tab="Accounts" key="10">
            <Accounts></Accounts>
          </TabPane>
          <TabPane tab="Charge Department" key="11">
            <ChargeDepartment></ChargeDepartment>
          </TabPane>
          <TabPane tab="Locations" key="12">
            <Locations></Locations>
          </TabPane>
          <TabPane tab="Credit Card" key="13">
            <CreditCard></CreditCard>
          </TabPane>
        </Tabs>
      </TableTabsStyle>
    </LayoutContentWrapper>
  );
}
