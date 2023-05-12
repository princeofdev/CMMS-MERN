const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const session = require('express-session')
const auth = require("./routes/auth");
const account = require("./routes/account");
const assets = require("./routes/assets");
const assetcategory = require("./routes/assetcategory");
const assetconsumingreference = require("./routes/assetconsumingreference");
const assetuser = require("./routes/assetuser");
const assetevent = require("./routes/assetevent");
const asseteventtype = require("./routes/asseteventtype");
const assetbusiness = require("./routes/assetbusiness");
const assetofflinetracker = require("./routes/assetofflinetracker");
const business = require("./routes/business");
const businesses = require("./routes/businesses");
const businessuser = require("./routes/businessuser");
const chargedepartment = require("./routes/chargedepartment");
const project = require("./routes/project");
const meterreadingunit = require("./routes/meterreadingunit");
const meterreading = require("./routes/meterreading");
const status = require("./routes/status");
const scheduledtask = require("./routes/scheduledtask");
const sheduledmaintenance = require("./routes/scheduledmaintenance");
const scheduletrigger = require("./routes/scheduletrigger");
const users = require("./routes/users");
const usergroup = require("./routes/usergroup");
const workorder = require("./routes/workorder");
const workorderasset = require("./routes/workorderasset");
const workorderbusiness = require("./routes/workorderbusiness");
const workordercompletion = require("./routes/workordercompletion");
const workordertask = require("./routes/workordertask");
const workorderstatus = require("./routes/workorderstatus");
const workorderuser = require("./routes/workorderuser");
const audit = require("./routes/audit");
const billingterm = require("./routes/billingterm");
const businessclassification = require("./routes/businessclassification");
const businessgroup = require("./routes/businessgroup");
const calendarevent = require("./routes/calendarevent");
const drill = require("./routes/drill");
const scheduleddrill = require("./routes/scheduleddrill");
const file = require("./routes/file");
const move = require("./routes/move");
const movestatus = require("./routes/movestatus");
const maintenancetype = require("./routes/maintenancetype");
const moveasset = require("./routes/moveasset");
const moveback = require("./routes/moveback");
const movebackasset = require("./routes/movebackasset");
const scheduledaudit = require("./routes/scheduledaudit");
const crewlists = require("./routes/crewlists");
const entryvessellist = require("./routes/entryvessellist");
const entrydrills = require("./routes/entrydrills");
const drillCategory = require("./routes/drillcategory");
const drillType = require("./routes/drilltype");
const charter = require("./routes/charter");
const calendar = require("./routes/calendar");
const codeType = require("./routes/codetype");
const itemType = require("./routes/itemtype");
const settingaccount = require("./routes/settingaccount");
const settingchargedepartment = require("./routes/settingchargedepartment");
const lognotification = require("./routes/lognotification");
const scheduledmaintenacenotification = require("./routes/scheduledmaintenancenotification");
const workordernotification = require("./routes/workordernotification");
const purchaseorder = require("./routes/purchaseorder");
const purchaseorderlineitem = require("./routes/purchaseorderlineitem");
const purchaseorderstatus = require("./routes/purchaseorderstatus");
const stock = require("./routes/stock");
const stockcyclecount = require("./routes/stockcyclecount");
const stockhistory = require("./routes/stockhistory");
const stocktxtype = require("./routes/stocktxtype");
const formbuilder = require("./routes/formbuilder");
const purchaseOrderNotification = require("./routes/purchaseordernotification");
const supplies = require("./routes/supplies");
const location = require("./routes/location");
const checklist = require("./routes/checklist");
const auditreport = require("./routes/auditreport");
const additionalcost = require("./routes/additionalcost");
const currency = require("./routes/currency");
const ports = require("./routes/ports");
const country = require("./routes/country");
const creditcard = require("./routes/creditcard");
const businessBranch = require("./routes/businessbranch");
const rfqs = require("./routes/rfqs");
const rfqslineitem = require("./routes/rfqslineitem");


const bodyParser = require("body-parser");
const mongoose = require("./config/database"); //database configuration
const { authenticate, authError } = require("./app/middleware");
const Config = require("./config/config");
const { port, secretKey } = Config;

const cronTask = require("./app/cron").init;

const app = express();

app.set("secretKey", secretKey); // jwt secret token

// connection to mongodb
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use(logger("dev"));
// Set body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.get("/api", function (req, res) {
  res.json({ status: "Server Running ...." });
});

// public route
app.use("/api", express.static("public")); // set the static files location /public/img will be /img for users
 
app.use("/api/auth", auth);
// private route
//app.use('/api', [authenticate, authError]);
app.use("/api/users", [authenticate, authError], users);
app.use("/api/assets", [authenticate, authError], assets);
app.use("/api/workorder", [authenticate, authError], workorder);
app.use("/api/usergroup", [authenticate, authError], usergroup);
app.use("/api/assetcategory", assetcategory);
app.use("/api/status", status);
app.use("/api/workorderstatus", workorderstatus);
app.use("/api/project", [authenticate, authError], project);
app.use("/api/account", [authenticate, authError], account);
app.use("/api/chargedepartment", [authenticate, authError], chargedepartment);
app.use("/api/asseteventtype", [authenticate, authError], asseteventtype);
app.use("/api/meterreadingunit", [authenticate, authError], meterreadingunit);
app.use("/api/meterreading", [authenticate, authError], meterreading);
app.use("/api/assetuser", [authenticate, authError], assetuser);
app.use("/api/assetevent", [authenticate, authError], assetevent);
app.use("/api/business", [authenticate, authError], business);
app.use("/api/businesses", [authenticate, authError], businesses);
app.use("/api/assetbusiness", [authenticate, authError], assetbusiness);
app.use("/api/businessuser", [authenticate, authError], businessuser);
app.use(
  "/api/sheduledmaintenance",
  [authenticate, authError],
  sheduledmaintenance
);

app.use("/api/scheduletrigger", [authenticate, authError], scheduletrigger);
app.use("/api/workordertask", [authenticate, authError], workordertask);
app.use("/api/scheduledtask", [authenticate, authError], scheduledtask);
app.use("/api/audit", [authenticate, authError], audit);
app.use(
  "/api/assetofflinetracker",
  [authenticate, authError],
  assetofflinetracker
);
app.use("/api/workorderasset", [authenticate, authError], workorderasset);
app.use("/api/workorderbusiness", [authenticate, authError], workorderbusiness);
app.use(
  "/api/workordercompletion",
  [authenticate, authError],
  workordercompletion
);
app.use("/api/workorderuser", [authenticate, authError], workorderuser);
app.use(
  "/api/assetconsumingreference",
  [authenticate, authError],
  assetconsumingreference
);
app.use("/api/billingterm", [authenticate, authError], billingterm);
app.use(
  "/api/businessclassification",
  [authenticate, authError],
  businessclassification
);
app.use("/api/businessgroup", [authenticate, authError], businessgroup);
app.use("/api/calendarevent", [authenticate, authError], calendarevent);
app.use("/api/drill", [authenticate, authError], drill);
app.use("/api/scheduleddrill", [authenticate, authError], scheduleddrill);
app.use("/api/file", [authenticate, authError],  file);
app.use("/api/move", [authenticate, authError], move);
app.use("/api/movestatus", [authenticate, authError], movestatus);
app.use("/api/maintenancetype", [authenticate, authError], maintenancetype);
app.use("/api/moveasset", [authenticate, authError], moveasset);
app.use("/api/moveback", [authenticate, authError], moveback);
app.use("/api/movebackasset", [authenticate, authError], movebackasset);
app.use("/api/scheduledaudit", [authenticate, authError], scheduledaudit);
app.use("/api/crewlists", [authenticate, authError], crewlists);
app.use("/api/vessellists", [authenticate, authError], entryvessellist);
app.use("/api/entrydrills", [authenticate, authError], entrydrills);
app.use("/api/drillcategory", [authenticate, authError], drillCategory);
app.use("/api/drilltype", [authenticate, authError], drillType);
app.use("/api/charter", [authenticate, authError], charter);
app.use("/api/calendar", [authenticate, authError], calendar);
app.use("/api/codetype", [authenticate, authError], codeType);
app.use("/api/itemtype", itemType);
app.use("/api/settingaccount", [authenticate, authError], settingaccount);
app.use(
  "/api/settingchargedepartment",
  [authenticate, authError],
  settingchargedepartment
);
app.use("/api/lognotification", [authenticate, authError], lognotification);
app.use("/api/schedulenotification", [authenticate, authError], scheduledmaintenacenotification);
app.use("/api/workordernotification", [authenticate, authError], workordernotification);
app.use("/api/purchaseorder", [authenticate, authError], purchaseorder);
app.use("/api/purchaseorderlineitem", [authenticate, authError], purchaseorderlineitem);
app.use("/api/purchaseorderstatus", [authenticate, authError], purchaseorderstatus);
app.use("/api/stock", [authenticate, authError], stock);
app.use("/api/stockcyclecount", [authenticate, authError], stockcyclecount);
app.use("/api/stockhistory", [authenticate, authError], stockhistory);
app.use("/api/stocktxtype", [authenticate, authError], stocktxtype);
app.use("/api/formbuilder", formbuilder);
app.use("/api/purchaseordernotification", [authenticate, authError], purchaseOrderNotification);
app.use("/api/supplies", [authenticate, authError], supplies);
app.use("/api/location", [authenticate, authError], location);
app.use("/api/checklist", checklist);
app.use("/api/auditreport", [authenticate, authError], auditreport);
app.use("/api/additionalcost", [authenticate, authError], additionalcost);
app.use("/api/currency", [authenticate, authError], currency);
app.use("/api/port", [authenticate, authError], ports);
app.use("/api/creditcard", [authenticate, authError], creditcard);
app.use("/api/country", [authenticate, authError], country);
app.use("/api/branch", [authenticate, authError], businessBranch);
app.use("/api/rfqs", [authenticate, authError], rfqs);
app.use("/api/rfqslineitem", [authenticate, authError], rfqslineitem);


// app.use('./api/scheduleda', scheduledaudit);
// app.get('/favicon.ico', function(req, res) {
//     res.sendStatus(204);
// });

// handle errors
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.listen(port, function () {
  console.log("server listening on port ", port);
});
cronTask();
