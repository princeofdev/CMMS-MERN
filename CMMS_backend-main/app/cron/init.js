var schedule = require("node-schedule");
const moment = require("moment");
const spawn = require('child_process').spawn;
const SchedulTriggerModel = require("../api/models/scheduletrigger");
const workOrderModel = require("../api/models/workorder");
const entryVesselListModel = require("../api/models/entryvessellist");
const fetch = require("node-fetch");

// const moment = require('moment');
// const request = require('request-promise');

const init = async () => {
  console.log("this is cron", moment.tz(new Date(), 'America/New_York').format());
  moment(new Date()).subtract(1, "days").format("YYYY-MM-DD");
  console.log(moment(new Date()).subtract(1, "days").format("YYYY-MM-DD"), 'this is before date');
  // var j = schedule.scheduleJob(" */30 * * * *", async function () {
  var j = schedule.scheduleJob("*/10 * * * *", async function () {
    console.log("The answer to life, the universe, and everything!");
    const currentTime = moment.tz(new Date(), 'America/New_York').format();
    // var currentTime = moment(new Date()).subtract(4, 'h').format();
    // var currentTime = new Date();

    var upperTime = moment.tz(new Date(), 'America/New_York').add({ 'minutes': 30 }).format();
    console.log(currentTime, "currentTime", upperTime);
    // await  SchedulTriggerModel.find({}, function(err, result){
    await SchedulTriggerModel.find({})
      .populate("intScheduledMaintenanceID")
      .then(async function (result) {
        for (var i = 0; i < result.length; i++) {
          var isTriggered = false;
          if (result[i].intScheduledMaintenanceID == null || result[i].intScheduledMaintenanceID == undefined) continue;
          // if(result[i].intScheduledMaintenanceID.intScheduledMaintenanceStatusID!=1)
          //  continue;
          var triggers =
            result[i].strthreshold == undefined ? "" : result[i].strthreshold;
          triggers = triggers.split(",");
          var againTrigger = [];
          for (var k = 0; k < triggers.length; k++) {
            // var triggerTime = new Date(triggers[k]);
            // var triggerTime = moment(new Date(triggers[k])).format();
            var triggerTime = moment(new Date(triggers[k])).format();
            var triggerTime2 = new Date(triggers[k]);
            console.log(currentTime, triggerTime, "this rigger time", upperTime,);
            if (currentTime <= triggerTime && triggerTime <= upperTime) {
              // start section
              var data = {
                intPriorityID:
                  result[i].intScheduledMaintenanceID.intPriorityID,
                intWorkOrderStatusID: 4,
                intSiteID: 1,
                intRequestedByUserID:
                  result[i].intScheduledMaintenanceID.intRequestorUserID,
                strDescription:
                  result[i].intScheduledMaintenanceID.strDescription,
                strCode: result[i].intScheduledMaintenanceID.strCode,
                strCompletionNotes:
                  result[i].intScheduledMaintenanceID.strCompletionNotes,
                intMaintenanceTypeID:
                  result[i].intScheduledMaintenanceID.intMaintenanceTypeID,
                dtmEstimatedStartDate: moment(new Date()).format(),
                dtmEstimatedStartTime: "",
                strAssignedUsers: result[i].intScheduledMaintenanceID.strAssignedUser,
                intEstimatedHour: result[i].intScheduledMaintenanceID.intEstimatedHour,
                strAssetIds: result[i].intScheduledMaintenanceID.strAssetIds,
                strAssets: result[i].intScheduledMaintenanceID.strAssets,
                intProjectId: result[i].intScheduledMaintenanceID.intProjectID,
                estimatedCompletionTime: "",
                dtmSuggestedCompletionDate: result[i].intScheduledMaintenanceID.intEstimatedHour > 8 ? moment(new Date()).add('days', 1).format() : moment(new Date()).format(),
                intAssignedUserId: result[i].intScheduledMaintenanceID.intAssignedToUserID,
                intScheduledMaintenanceID: result[i].intScheduledMaintenanceID._id
              };
              isTriggered = true;
              await workOrderModel.create(data, function (err, result) {
                var workorder = {};
                workorder.strCode = "WO# " + result._id;
                workOrderModel.findByIdAndUpdate(
                  result._id,
                  workorder,
                  function (err, movieInfo) {
                    console.log("created");
                  }
                );
              });
              // end section
            }
            else {
              againTrigger.push(triggers[k])
            }
          }//end for     
          var newStrthreshold = againTrigger.join(",");
          if (isTriggered) {
            await SchedulTriggerModel.findByIdAndUpdate(result[i]._id, { strthreshold: newStrthreshold }, function (err, result) {
              if (err)
                console.log(err, 'this is err');
              else
                console.log('updated new trigger');

              isTriggered = false;
            });
          }
        }//end for
      });
  });
  // j.cancel();
  var vesselCron = schedule.scheduleJob("0 4 * * *", async function () {
    //  var vesselCron = schedule.scheduleJob(' 41 * * * *', async  function(){
    console.log("vessel cron");

    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();
    const start_date = new Date(
      currentYear,
      currentMonth,
      currentDayOfMonth,
      4,
      0,
      0
    );
    const end_date = new Date(
      currentYear,
      currentMonth,
      currentDayOfMonth,
      6,
      0,
      0
    );
    let start = Math.round(start_date.getTime() / 1000);
    let end = Math.round(end_date.getTime() / 1000);
    let start_endTime = "&start=" + start + "&end=" + end;

    var url =
      "https://api.stormglass.io/v2/weather/point?lat=25.772320&lng=-80.185490&params=airTemperature,pressure,cloudCover,currentDirection,currentSpeed,gust,humidity,precipitation,seaLevel,swellDirection,swellHeight,swellPeriod,visibility,waterTemperature,waveDirection,waveHeight,wavePeriod,windDirection,windSpeed";
    url = url + start_endTime;
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "cc07cc62-6fc3-11eb-958b-0242ac130002-cc07cce4-6fc3-11eb-958b-0242ac130002",
      //  Authorization:"6a959b82-7bc9-11eb-b2a7-0242ac130002-6a959c18-7bc9-11eb-b2a7-0242ac130002", // me
    };
    var weatherObject = "[]";
    try {
      const response = await fetch(url, { method: "GET", headers: headers });
      const json = await response.json();
      // *********
      let temp = [];
      let k = 0;
      for (var i = 0; i < json.hours.length; i = i + 3) {
        let weather = {};
        k++;
        weather.key = k;
        weather.weatherTime = json.hours[i].time;
        var data = json.hours[i];
        var content = "";
        content +=
          "Wind Speed " +
          parseFloat(data.windSpeed.sg * 1.944).toFixed(2) +
          " Knts , ";
        content +=
          "Gust " + parseFloat(data.gust.sg * 1.944).toFixed(2) + " Knts , ";
        content +=
          "Air Temperature " +
          parseInt(data.airTemperature.sg * 1.8 + 32) +
          " °F , ";
        content +=
          "Water Temperature " +
          parseInt(data.waterTemperature.sg * 1.8 + 32) +
          " °F , ";
        content += "Coud Coverage " + parseInt(data.cloudCover.sg) + " %, ";
        content += "Relative Humidity " + parseInt(data.humidity.sg) + " % , ";
        content +=
          "Pressure " +
          parseFloat((data.pressure.sg * 0.0295301) / 100).toFixed(2) +
          " In , ";
        content +=
          "Visibility " +
          parseFloat(data.visibility.sg / 1.609).toFixed(2) +
          " Miles ";
        weather.weather = content;
        temp.push(weather);
      }
      weatherObject = JSON.stringify(temp);
      // ********
    } catch (error) {
      console.log(error);
    }

    var data = {};
    data.orderDate = moment(new Date()).format("YYYY-MM-DD");
    data.orderStatus = "Draft";
    data.revisedDate = "";
    data.printedDate = "";
    data.crewComplement = "[]";
    data.weather = weatherObject;
    data.logEntries = "[]";
    data.timePeriod = "";

    entryVesselListModel.create(data, function (err, result) {
      if (err) {
        console.log(err);
      } else console.log("created");
      //everyThreeHour();
    });
  });

  //function everyThreeHour(){
  console.log("this is every3hour cron");
  var getWeatherCron1 = schedule.scheduleJob("0 7 * * *", async function () {
    console.log("getWeatherCron cron3");
    getWeatherData();
  });
  var getWeatherCron2 = schedule.scheduleJob("0 10 * * *", async function () {
    console.log("getWeatherCron cron6");
    getWeatherData();
  });
  var getWeatherCron3 = schedule.scheduleJob("0 13 * * *", async function () {
    console.log("getWeatherCron cron9");
    getWeatherData();
  });
  var getWeatherCron4 = schedule.scheduleJob("0 16 * * *", async function () {
    console.log("getWeatherCron cron12");
    getWeatherData();
  });
  var getWeatherCron5 = schedule.scheduleJob("0 19 * * *", async function () {
    console.log("getWeatherCron cron15");
    getWeatherData();
  });

  var getWeatherCron6 = schedule.scheduleJob("0 22 * * *", async function () {
    console.log("getWeatherCron cron18");
    getWeatherData();
  });
  var getWeatherCron7 = schedule.scheduleJob("0 1 * * *", async function () {
    console.log("getWeatherCron cron21");
    getWeatherData();
  });


  async function getWeatherData() {
    console.log('this is geeatherdata');
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();
    const currentHour = currentDate.getHours();
    var dataInf = {};

    if (currentHour >= 4) {
      dataInf.orderDate = moment(new Date()).format("YYYY-MM-DD");
      var start_date = new Date(
        currentYear,
        currentMonth,
        currentDayOfMonth,
        4,
        0,
        0
      );
      var end_date = new Date(
        currentYear,
        currentMonth,
        currentDayOfMonth,
        currentHour,
        0,
        0
      );
    } else if (currentHour <= 3) {
      dataInf.orderDate = moment(new Date())
        .subtract(1, "days")
        .format("YYYY-MM-DD");
      var start_date = new Date(
        currentYear,
        currentMonth,
        currentDayOfMonth,
        4,
        0,
        0
      );
      var end_date = new Date(
        currentYear,
        currentMonth,
        currentDayOfMonth + 1,
        1,
        0,
        0
      );
    } else {
      console.log("cancel");
      return;
    }
    // var start_date = new Date(currentYear, currentMonth, currentDayOfMonth, 5, 0, 0);
    // var start_date = new Date(currentYear, currentMonth, currentDayOfMonth, 0, 0, 0);
    // var end_date = new Date(currentYear, currentMonth, currentDayOfMonth+1, 2, 0, 0);
    // var end_date = new Date(currentYear, currentMonth, currentDayOfMonth, currentHour, 0, 0);

    console.log(start_date, end_date);
    let start = Math.round(start_date.getTime() / 1000);
    let end = Math.round(end_date.getTime() / 1000);
    let start_endTime = "&start=" + start + "&end=" + end;

    var url =
      "https://api.stormglass.io/v2/weather/point?lat=25.772320&lng=-80.185490&params=airTemperature,pressure,cloudCover,currentDirection,currentSpeed,gust,humidity,precipitation,seaLevel,swellDirection,swellHeight,swellPeriod,visibility,waterTemperature,waveDirection,waveHeight,wavePeriod,windDirection,windSpeed";
    url = url + start_endTime;
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "cc07cc62-6fc3-11eb-958b-0242ac130002-cc07cce4-6fc3-11eb-958b-0242ac130002",
      // Authorization:
      //   "6a959b82-7bc9-11eb-b2a7-0242ac130002-6a959c18-7bc9-11eb-b2a7-0242ac130002", // me
    };
    var weatherObject = "[]";
    try {
      const response = await fetch(url, { method: "GET", headers: headers });
      const json = await response.json();
      // *********
      let temp = [];
      let k = 0;
      for (var i = 0; i < json.hours.length; i = i + 3) {
        let weather = {};
        k++;
        weather.key = k;
        weather.weatherTime = json.hours[i].time;
        var data = json.hours[i];
        var content = "";
        content +=
          "Wind Speed " +
          parseFloat(data.windSpeed.sg * 1.944).toFixed(2) +
          " Knts , ";
        content +=
          "Gust " + parseFloat(data.gust.sg * 1.944).toFixed(2) + " Knts , ";
        content +=
          "Air Temperature " +
          parseInt(data.airTemperature.sg * 1.8 + 32) +
          " °F , ";
        content +=
          "Water Temperature " +
          parseInt(data.waterTemperature.sg * 1.8 + 32) +
          " °F , ";
        content += "Coud Coverage " + parseInt(data.cloudCover.sg) + " %, ";
        content += "Relative Humidity " + parseInt(data.humidity.sg) + " % , ";
        content +=
          "Pressure " +
          parseFloat((data.pressure.sg * 0.0295301) / 100).toFixed(2) +
          " In , ";
        content +=
          "Visibility " +
          parseFloat(data.visibility.sg / 1.609).toFixed(2) +
          " Miles ";
        weather.weather = content;
        temp.push(weather);
      }
      weatherObject = JSON.stringify(temp);
      // ********
    } catch (error) {
      console.log(error);
    }

    dataInf.orderStatus = "Draft";
    dataInf.revisedDate = "";
    dataInf.printedDate = "";
    dataInf.crewComplement = "[]";
    dataInf.weather = weatherObject;
    dataInf.logEntries = "[]";
    dataInf.timePeriod = "";

    entryVesselListModel.findOne(
      { orderDate: dataInf.orderDate },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result == null) {
            entryVesselListModel.create(dataInf, function (err, result) {
              if (err) {
                console.log(err);
              } else console.log("created===========");
            });
          } else {
            dataInf = result;
            dataInf.weather = weatherObject;
            entryVesselListModel.findByIdAndUpdate(
              result._id,
              dataInf,
              function (err, movieInfo) {
                if (err) console.log(err, "update error");
                else {
                  console.log("updated=============");
                }
              }
            );
          }
        }
      }
    );
  }


  var dbDumpDailyCron = schedule.scheduleJob("59 4 * * *", async function () {
    console.log("It's the db daily dump clone");
    let backupProcess = spawn('mongodump', [
      '--db=seafair_cmms',
      '--archive=../db/backup/',
      '--gzip'
    ]);
    backupProcess.on('exit', (code, signal) => {
      if (code)
        console.log('Backup process exited with code ', code);
      else if (signal)
        console.error('Backup process was killed with singal ', signal);
      else
        console.log('Successfully backedup the database')
    });
  });

  var dbDumpWeeklyCron = schedule.scheduleJob("59 4 * * 0", async function () {
    console.log("It's the db weekly dump clone");
    let backupProcess = spawn('mongodump', [
      '--db=seafair_cmms',
      '--archive=../db/week/',
      '--gzip'
    ]);
    backupProcess.on('exit', (code, signal) => {
      if (code)
        console.log('Backup process exited with code ', code);
      else if (signal)
        console.error('Backup process was killed with singal ', signal);
      else
        console.log('Successfully backedup the database')
    });
  });
  // }
};
module.exports = init;
