const options = [
  // {
  //   key: 'blankPage',
  //   label: 'sidebar.blankPage',
  //   leftIcon: 'ion-document',
  // },
  // {
  //   key: 'authCheck',
  //   label: 'sidebar.authCheck',
  //   leftIcon: 'ion-chatbubbles',
  // },
  // {
  //   key: 'user',
  //   label: 'sidebar.Users',
  //   leftIcon: 'ion-document',
  // },
  {
    key: 'dashboards',
    label: 'sidebar.dashboard',
    leftIcon: 'ion-android-options',
    children: [
      {
        key: 'calendar',
        label: 'sidebar.calendar',
      },
      {
        key: 'kanban',
        label: 'sidebar.kanban',
      },
      {
        key: 'purchase_request',
        label: 'sidebar.purchaseRequest',
      },
    ],
  },
  {
    key: 'assets',
    label: 'sidebar.Assets',
    leftIcon: 'ion-android-checkbox-outline',
    children: [
      {
        key: 'asset',
        label: 'sidebar.allAssets',
      },
      {
        key: 'supplier',
        label: 'sidebar.supplies',
      },
    ],
  },
  {
    key: 'Maintenance',
    label: 'siderbar.Maintenance',
    leftIcon: 'ion-bag',
    children: [
      {
        key: 'workorder',
        label: 'sidebar.WorkOrder',
      },
      {
        key: 'scheduledmaintenance',
        label: 'sidebar.ScheduledMaintenance',
      },
      {
        key: 'project',
        label: 'sidebar.Project',
      },
    ],
  },
  {
    key: 'Safety',
    label: 'sidebar.Safety',
    leftIcon: 'ion-clipboard',
    children: [
      {
        key: 'audit',
        label: 'sidebar.Aduit',
      },
      {
        key: 'scheduledaudit',
        label: 'sidebar.ScheduledAduit',
      },
      {
        key: 'auditreport',
        label: 'sidebar.AuditReport',
      },
      {
        key: 'drill',
        label: 'sidebar.Drill',
      },
      {
        key: 'scheduleddrill',
        label: 'sidebar.ScheduledDrill',
      },
    ],
  },

  {
    key: 'settings',
    label: 'siderbar.Settings',
    leftIcon: 'ion-android-menu',
    children: [
      {
        key: 'user',
        label: 'sidebar.Users',
      },
      {
        key: 'usergroup',
        label: 'sidebar.Groups',
      },
      {
        key: 'business',
        label: 'sidebar.Business',
      },
      {
        key: 'cmmssetting',
        label: 'sidebar.cmmsSettings',
      },
      {
        key: 'businesses',
        label: 'sidebar.businesses',
      },
      {
        key: 'formbuilder',
        label: 'sidebar.formbuilder',
      },
    ],
  },
  {
    key: 'documents',
    label: 'sidebar.documents',
    leftIcon: 'ion-ios-paper',
    children: [
      {
        key: 'policymanual',
        label: 'sidebar.smspolicymanual',
      },
      {
        key: 'entries_crew',
        label: 'sidebar.entries_crew',
      },
      {
        key: 'entries_drill',
        label: 'sidebar.entiriesDrill',
      },
      {
        key: 'entries_vessel',
        label: 'sidebar.entriesVesselOperation',
      },
    ],
  },
  {
    key: 'charters',
    label: 'sidebar.charter',
    leftIcon: 'ion-ios-paper',
    children: [
      {
        key: 'charter',
        label: 'sidebar.sailings',
      },
      {
        key: 'passengers',
        label: 'sidebar.passengers',
      },
    ],
  },

  {
    key: 'purchasing',
    label: 'sidebar.purchasing',
    leftIcon: 'ion-ios-cart',
    children: [
      {
        key: 'purchase_board',
        label: 'sidebar.purchaseplanningboard',
      },
      {
        key: 'purchase_orders',
        label: 'sidebar.purchaseorders',
      },
      {
        key: 'purchase_receipts',
        label: 'sidebar.purchasereceipts',
      },
      {
        key: 'rfqs',
        label: 'sidebar.rfqs',
      },
    ],
  },
];
export default options;
