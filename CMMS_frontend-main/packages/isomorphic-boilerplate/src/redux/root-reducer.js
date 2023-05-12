import { combineReducers } from 'redux';
import App from '@iso/redux/app/reducer';
import Auth from './auth/reducer';
import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';
import Ecommerce from '@iso/redux/ecommerce/reducer';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';
//import Invoices from './invoice/reducer';
import Users from './user/reducer';
import Assets from './asset/reducer';
import Workorders from './workorder/reducer';
import UserGroup from './usergroup/reducer';
import AssetCategory from './assetcategory/reducer';
import Status from './status/reducer';
import WorkOrderStatus from './workorderstatus/reducer';
import Project from './project/reducer';
import Account from './account/reducer';
import Chargedepartment from './chargedepartment/reducer';
import EventType from './eventtype/reducer';
import MeterReading from './meterreading/reducer';
import AssetUser from './assetuser/reducer';
import AssetEvent from './assetevent/reducer';
import Business from './business/reducer';
import Businesses from './businesses/reducer';
import AssetBusiness from './assetbusiness/reducer';
import BusinessUser from './businessuser/reducer';
import ScheduledMaintenance from './scheduledmaintenance/reducer';
import ScheduledMaintenanceTrigger from './scheduledmaintenancetrigger/reducer';
import WorkOrderTask from './workordertask/reducer';
// import scrumBoard from './scrumBoard/reducer';
import ScheduledTask from './scheduledtask/reducer';
import Drill from './drill/reducer';
import ScheduledDrill from './scheduleddrill/reducer';
import Audit from './audit/reducer';
import ScheduledAudit from './scheduledaudit/reducer';
import EntriesCrew from './EntriesCrew/reducer';
import EntriesVessel from './EntriesVessel/reducer';
import EntriesDrill from './EntriesDrill/reducer';
import Charter from './charter/reducer';
import DrillCategory from './drillcategory/reducer';
import DrillType from './drilltype/reducer';
import Calendar from './calendar/reducer';
import CodeType from './codetype/reducer';
import CreditCard from './creditcard/reducer';
import ItemType from './itemtype/reducer';
import WorkOrderBusiness from './workorderbusiness/reducer';
import WorkOrderCompletion from './workordercompletion/reducer';
import CmmsAccount from './cmmsaccount/reducer';
import CmmsChargeDepartment from './cmmschargedepartment/reducer';
import logNotification from './lognotification/reducer';
import Files from './Files/reducer';
import ScheduleNotification from './schedulednotification/reducer';
import workOrderNotification from './workordernotification/reducer';
import purchaseRequest from './purchaserequest/reducer';
import formBuilder from './formbuilder/reducer';
import billingTerm from './billingterm/reducer';
import purchaseOrder from './purchaseorder/reducer';
import purchaseOrderNotification from './purchaseordernotification/reducer';
import Location from './location/reducer';
import Stock from './stock/reducer';
import CheckList from './checklist/reducer';
import AuditReport from './auditreport/reducer';
import AdditionalCost from './additionalcost/reducer';
import Currency from './currency/reducer';
import Port from './port/reducer';
import Country from './country/reducer';
import Branch from './businessbranch/reducer';
import Rfq from './rfqs/reducer';
import RfqLineItem from './rfqlineitem/reducer';

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  Ecommerce,
  LanguageSwitcher,
  Users,
  Assets,
  Workorders,
  UserGroup,
  AssetCategory,
  Status,
  WorkOrderStatus,
  Project,
  Account,
  Chargedepartment,
  EventType,
  MeterReading,
  AssetUser,
  AssetEvent,
  Business,
  Businesses,
  AssetBusiness,
  BusinessUser,
  ScheduledMaintenance,
  ScheduledMaintenanceTrigger,
  WorkOrderTask,
  //scrumBoard,
  ScheduledTask,
  Drill,
  ScheduledDrill,
  Audit,
  ScheduledAudit,
  EntriesCrew,
  EntriesVessel,
  EntriesDrill,
  Charter,
  DrillCategory,
  DrillType,
  Calendar,
  CodeType,
  CreditCard,
  ItemType,
  WorkOrderBusiness,
  WorkOrderCompletion,
  CmmsAccount,
  CmmsChargeDepartment,
  logNotification,
  Files,
  ScheduleNotification,
  workOrderNotification,
  purchaseRequest,
  formBuilder,
  billingTerm,
  purchaseOrder,
  purchaseOrderNotification,
  Location,
  Stock,
  CheckList,
  AuditReport,
  AdditionalCost,
  Currency,
  Port,
  Country,
  Branch,
  Rfq,
  RfqLineItem
});
