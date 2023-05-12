import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
  {
    path: '',
    // component: lazy(() => import('../DashboardHomePage')),
    component: lazy(() => import('../Calendar/Calendar')),
    exact: true,
  },

  {
    path: 'calendar',
    component: lazy(() => import('../Calendar/Calendar')),
  },
  {
    path: 'kanban',
    component: lazy(() => import('../Kanbanboard/Kanbanboard')),
  },

  {
    path: 'formbuilder/add',
    component: lazy(() => import('../FormBuilders/AddForm')),
  },
  {
    path: 'formbuilder/:id',
    component: lazy(() => import('../FormBuilders/EditFormBuilder')),
  },
  {
    path: 'checklist/:id',
    component: lazy(() => import('../FormBuilders/ViewFormBuilder')),
  },
  {
    path: 'formbuilder',
    component: lazy(() => import('../FormBuilders/FormBuilders')),
  },

  {
    path: 'authCheck',
    component: lazy(() => import('../AuthCheck')),
  },
  {
    path: 'user/add',
    component: lazy(() => import('../User/AddUser')),
  },
  {
    path: 'user/edit/:userId',
    component: lazy(() => import('../User/EditUser')),
  },
  {
    path: 'user',
    component: lazy(() => import('../User/Users')),
  },
  {
    path: 'usergroup/add',
    component: lazy(() => import('../Usergroup/AddUserGroup')),
  },
  {
    path: 'usergroup/edit/:groupId',
    component: lazy(() => import('../Usergroup/EditUserGroup')),
  },
  {
    path: 'usergroup',
    component: lazy(() => import('../Usergroup/UserGroup')),
  },

  {
    path: 'business/add',
    component: lazy(() => import('../Business/AddBusiness')),
  },
  {
    path: 'business/edit/:Id',
    component: lazy(() => import('../Business/EditBusiness')),
  }, 
  {
    path: 'business',
    component: lazy(() => import('../Business/Business')),
  },
  {
    path: 'cmmssetting',
    component: lazy(() => import('../CmmsSetting/CmmsSetting')),
  },
  {
    path: 'supplier/edit/:assetId',
    component: lazy(() => import('../Asset/Supplies/EditAsset')),
  },
  {
    path: 'supplier/add',
    component: lazy(() => import('../Asset/Supplies/AddAsset')),
  },
  {
    path: 'supplier',
    component: lazy(() => import('../Asset/Supplies')),
  },
  {
    path: 'asset/equipment/print/:id',
    component: lazy(() => import('../Asset/Equipment/PrintEquipmentAsset')),
  },
  {
    path: 'asset/tool/print/:id',
    component: lazy(() => import('../Asset/Tools/PrintToolAsset')),
  },
  {
    path: 'asset/facility/print/:id',
    component: lazy(() => import('../Asset/Facility/PrintFacilityAsset')),
  },
  {
    path: 'asset/equipment/:assetId',
    component: lazy(() => import('../Asset/Equipment/EditAsset')),
  },
  {
    path: 'asset/add/equipment',
    component: lazy(() => import('../Asset/Equipment/AddAsset')),
  },
  {
    path: 'asset/facility/:assetId',
    component: lazy(() => import('../Asset/Facility/EditAsset')),
  },
  {
    path: 'asset/add/facility',
    component: lazy(() => import('../Asset/Facility/AddAsset')),
  },
  {
    path: 'asset/tool/:assetId',
    component: lazy(() => import('../Asset/Tools/EditAsset')),
  },
  {
    path: 'asset/add/tools',
    component: lazy(() => import('../Asset/Tools/AddAsset')),
  },
  {
    path: 'asset/vessel/:assetId',
    component: lazy(() => import('../Asset/Vessel/EditAsset')),
  },
  {
    path: 'asset/add/vessel',
    component: lazy(() => import('../Asset/Vessel/AddAsset')),
  },

  {
    path: 'asset',
    component: lazy(() => import('../Asset/Assets')),
  },
  {
    path: 'assetCategory',
    component: lazy(() => import('../BlankPage')),
  },
  {
    path: 'workorder/add',
    component: lazy(() => import('../Workorder/SingleWorkOrder')),
  },
  {
    path: 'workorder/print/:id',
    component: lazy(() => import('../Workorder/PrintWorkOrder')),
  },
  {
    path: 'workorder/:id',
    component: lazy(() => import('../Workorder/SingleWorkOrder')),
  },
  {
    path: 'workorder',
    component: lazy(() => import('../Workorder/Workorder')),
  },
  {
    path: 'drill/add',
    component: lazy(() => import('../Drill/AddDrill')),
  },
  {
    path: 'drill/print/:id',
    component: lazy(() => import('../Drill/PrintDrill')),
  },
  {
    path: 'drill/:id',
    component: lazy(() => import('../Drill/EditDrill')),
  },
  {
    path: 'drill',
    component: lazy(() => import('../Drill/Drills')),
  },
  {
    path: 'audit/add',
    component: lazy(() => import('../Aduit/AddAduit')),
  },
  {
    path: 'audit/:id',
    component: lazy(() => import('../Aduit/EditAudit')),
  },
  {
    path: 'audit',
    component: lazy(() => import('../Aduit/Aduits')),
  },
  {
    path: 'auditreport/edit/:id',
    component: lazy(() => import('../AuditReport/EditAuditReport')),
  },
  {
    path: 'auditreport/add',
    component: lazy(() => import('../AuditReport/AddAuditReport')),
  },
  {
    path: 'auditreport',
    component: lazy(() => import('../AuditReport/AuditReports')),
  },
  {
    path: 'scheduleddrill/add',
    component: lazy(() => import('../ScheduledDrill/AddScheduledDrill')),
  },
  {
    path: 'scheduleddrill/:id',
    component: lazy(() => import('../ScheduledDrill/EditScheduledDrill')),
  },
  {
    path: 'scheduleddrill',
    component: lazy(() => import('../ScheduledDrill/ScheduledDrills')),
  },
  {
    path: 'scheduledaudit/add',
    component: lazy(() => import('../ScheduledAudit/AddScheduledAudit')),
  },
  {
    path: 'scheduledaudit/:id',
    component: lazy(() => import('../ScheduledAudit/EditScheduledAudit')),
  },
  {
    path: 'scheduledaudit',
    component: lazy(() => import('../ScheduledAudit/ScheduledAudits')),
  },
  {
    path: 'scheduledmaintenance/add',
    component: lazy(() =>
      import('../ScheduledMaintenace/AddScheduledMaintenace')
    ),
  },
  {
    path: 'scheduledmaintenance/print/:id',
    component: lazy(() =>
      import('../ScheduledMaintenace/PrintScheduledMaintenace')
    ),
  },
  {
    path: 'scheduledmaintenance/:id',
    component: lazy(() =>
      import('../ScheduledMaintenace/EditScheduledMaintenace')
    ),
  },
  {
    path: 'scheduledmaintenance',
    component: lazy(() => import('../ScheduledMaintenace/ScheduledMaintenace')),
  },

  {
    path: 'project/add',
    component: lazy(() => import('../Project/AddProject')),
  },
  {
    path: 'project/edit/:id',
    component: lazy(() => import('../Project/EditProject')),
  },
  {
    path: 'project',
    component: lazy(() => import('../Project/Project')),
  },
  {
    path: 'entries_crew/add/:id',
    component: lazy(() => import('../EntriesCrew/AddEntryCrew')),
  },
  {
    path: 'entries_crew/edit/:id',
    component: lazy(() => import('../EntriesCrew/EditEntryCrew')),
  },
  {
    path: 'entries_crew/print/:id',
    component: lazy(() => import('../EntriesCrew/PrintCrew')),
  },
  {
    path: 'entries_crew',
    component: lazy(() => import('../EntriesCrew/EntriesCrews')),
  },
  {
    path: 'entries_vessel/add',
    component: lazy(() => import('../EntriesVessel/AddEntryVessel')),
  },
  {
    path: 'entries_vessel/edit/:id',
    component: lazy(() => import('../EntriesVessel/EditEntryVessel')),
  },
  {
    path: 'entries_vessel/print/:id',
    component: lazy(() => import('../EntriesVessel/PrintVessel')),
  },
  {
    path: 'entries_vessel',
    component: lazy(() => import('../EntriesVessel/EntriesVessel')),
  },
  {
    path: 'entries_drill/add',
    component: lazy(() => import('../EntriesDrill/AddEntryDrill')),
  },
  {
    path: 'entries_drill/edit/:id',
    component: lazy(() => import('../EntriesDrill/EditEntryDrill')),
  },
  {
    path: 'entries_drill/print/:id',
    component: lazy(() => import('../EntriesDrill/PrintDrill')),
  },
  {
    path: 'entries_drill',
    component: lazy(() => import('../EntriesDrill/EntriesDrills')),
  },
  {
    path: 'charter/add',
    component: lazy(() => import('../Charter/AddCharter')),
  },
  {
    path: 'charter/edit/:id',
    component: lazy(() => import('../Charter/EditCharter')),
  },
  {
    path: 'charter',
    component: lazy(() => import('../Charter/Charter')),
  },
  {
    path: 'businesses/add',
    component: lazy(() => import('../Businesses/AddBusinesses')),
  },
  {
    path: 'businesses/edit/:id',
    component: lazy(() => import('../Businesses/EditBusinesses')),
  },
  {
    path: 'businesses',
    component: lazy(() => import('../Businesses/Businesses')),
  },
  // {
  //   path: 'scheduling',
  //   component: lazy(() => import('../Scheduling/Scheduling')),
  // },
  // {
  //   path: 'asset',
  //   component: lazy(() => import('../Asset/Assets')),
  // },
  {
    path: 'purchase_orders/add',
    component: lazy(() => import('../PurchaseOrders/AddPurchaseOrder')),
  },
  {
    path: 'purchase_orders/print/:id',
    component: lazy(() => import('../PurchaseOrders/PrintPurchaseOrder')),
  },
  {
    path: 'purchase_orders/:id',
    component: lazy(() => import('../PurchaseOrders/EditPurchaseOrder')),
  },
  {
    path: 'purchase_orders',
    component: lazy(() => import('../PurchaseOrders/Purchase')),
  },
  {
    path: 'rfqs/add',
    component: lazy(() => import('../RFQs/AddRfqs')),
  },
  {
    path: 'rfqs/:id',
    component: lazy(() => import('../RFQs/EditRfqs')),
  },
  {
    path: 'rfqs',
    component: lazy(() => import('../RFQs/rfqs')),
  },
  {
    path: 'purchase_board/purchaseorder_generate/',
    component: lazy(() =>
      import('../PurchaseOrderPlanBoard/GeneratePurchaseOrder')
    ),
  },
  {
    path: 'purchase_board',
    component: lazy(() => import('../PurchaseOrderPlanBoard/PlanBoard')),
  },
  // {
  //   path: 'purchase_request/add',
  //   component: lazy(() => import('../PurchaseRequest/AddPurchaseRequest')),
  // },
  {
    path: 'purchase_request',
    component: lazy(() => import('../PurchaseRequest/PurchaseRequest')),
  },
  {
    path: 'purchase_receipts/add',
    component: lazy(() => import('../PurchaseReceipt/AddPurchaseReceipt')),
  },
  {
    path: 'purchase_receipts/edit/:id',
    component: lazy(() => import('../PurchaseReceipt/EditPurchaseReceipt')),
  },
  {
    path: 'purchase_receipts',
    component: lazy(() => import('../PurchaseReceipt/PurchaseReceipt')),
  },
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
