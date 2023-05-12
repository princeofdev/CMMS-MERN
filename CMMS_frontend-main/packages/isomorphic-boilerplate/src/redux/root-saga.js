import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import ecommerceSaga from '@iso/redux/ecommerce/saga';
import usersSagas from './user/saga';
import assetsSagas from './asset/saga';
import workorderSagas from './workorder/saga';
import usergroupSagas from './usergroup/saga';
import assetcategory from './assetcategory/saga';
import statusSagas from './status/saga';
import workorderstatusSagas from './workorderstatus/saga';
import projectSagas from './project/saga';
import accountSagas from './account/saga';
import chargedepartmentSagas from './chargedepartment/saga';
import eventtypeSagas from './eventtype/saga';
import meterReadingSagas from './meterreading/saga';
import assetUserSagas from './assetuser/saga';
import assetEventSagas from './assetevent/saga';
import businessSagas from './business/saga';
import businessesSagas from './businesses/saga';
import assetBusinessSagas from './assetbusiness/saga';
import businessUserSagas from './businessuser/saga';
import scheduledmaintenaceSagas from './scheduledmaintenance/saga';
import scheduledmaintenancetriggerSagas from './scheduledmaintenancetrigger/saga';
import workordertaskSagas from './workordertask/saga';
// import scrumBoardSaga from './scrumBoard/saga';
import scheduledTaskSagas from './scheduledtask/saga';
import drillSagas from './drill/saga';
import scheduleddrillSagas from './scheduleddrill/saga';
import auditSagas from './audit/saga';
import scheduledAuditSagas from './scheduledaudit/saga';
import entriescrewSagas from './EntriesCrew/saga';
import entriesvesselSagas from './EntriesVessel/saga';
import entriesdrillSagas from './EntriesDrill/saga';
import charterSagas from './charter/saga';
import drillcategorySagas from './drillcategory/saga';
import drilltypeSagas from './drilltype/saga';
import calendarSagas from './calendar/saga';
import codetypeSagas from './codetype/saga';
import creditcardSagas from './creditcard/saga';
import itemtypeSagas from './itemtype/saga';
import workorderbusinessesSagas from './workorderbusiness/saga';
import workordercompletionSagas from './workordercompletion/saga';
import cmmsaccountSagas from './cmmsaccount/saga';
import cmmschargedepartmentSagas from './cmmschargedepartment/saga';
import logNotificationSagas from './lognotification/saga';
import filesSagas from './Files/saga';
import schedulenotificationSagas from './schedulednotification/saga';
import workOrderNotificationSagas from './workordernotification/saga';
import purchaseRequestSagas from './purchaserequest/saga';
import formBuilderSagas from './formbuilder/saga';
import billingTermsSagas from './billingterm/saga';
import purchaseOrderSagas from './purchaseorder/saga';
import purchaseOrderNotificationSagas from './purchaseordernotification/saga';
import locationSagas from './location/saga';
import stockSagas from './stock/saga';
import checkListSaga from './checklist/saga';
import AuditReportSaga from './auditreport/saga';
import AdditionalCostSaga from './additionalcost/saga';
import CurrencySaga from './currency/saga';
import PortSaga from './port/saga';
import CountrySaga from './country/saga';
import BranchSaga from './businessbranch/saga';
import RfqSaga from './rfqs/saga';
import RfqLIneItemSaga from './rfqlineitem/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    ecommerceSaga(),
    usersSagas(),
    assetsSagas(),
    workorderSagas(),
    usergroupSagas(),
    assetcategory(),
    statusSagas(),
    workorderstatusSagas(),
    projectSagas(),
    accountSagas(),
    chargedepartmentSagas(),
    eventtypeSagas(),
    meterReadingSagas(),
    assetUserSagas(),
    assetEventSagas(),
    businessSagas(),
    businessesSagas(),
    assetBusinessSagas(),
    businessUserSagas(),
    scheduledmaintenaceSagas(),
    scheduledmaintenancetriggerSagas(),
    // scrumBoardSaga(),
    workordertaskSagas(),
    scheduledTaskSagas(),
    drillSagas(),
    scheduleddrillSagas(),
    auditSagas(),
    scheduledAuditSagas(),
    entriescrewSagas(),
    entriesvesselSagas(),
    entriesdrillSagas(),
    charterSagas(),
    drillcategorySagas(),
    drilltypeSagas(),
    calendarSagas(),
    codetypeSagas(),
    creditcardSagas(),
    itemtypeSagas(),
    workorderbusinessesSagas(),
    workordercompletionSagas(),
    cmmsaccountSagas(),
    cmmschargedepartmentSagas(),
    logNotificationSagas(),
    filesSagas(),
    schedulenotificationSagas(),
    workOrderNotificationSagas(),
    purchaseRequestSagas(),
    formBuilderSagas(),
    billingTermsSagas(),
    purchaseOrderSagas(),
    purchaseOrderNotificationSagas(),
    locationSagas(),
    stockSagas(),
    checkListSaga(),
    AuditReportSaga(),
    AdditionalCostSaga(),
    CurrencySaga(),
    PortSaga(),
    CountrySaga(),
    BranchSaga(),
    RfqSaga(),
    RfqLIneItemSaga()
  ]);
}
