import clone from 'clone';
import actions from './actions';
import moment from 'moment';
const initState = {
  crewComplimentLists: [],
  logEntryLists: [],
  vesselList: {},
  isNewCrew: true,
  isDelete: false,
  entriesLists: [],
  weatherLists: [],
  isSaved: false,
  weatherData: [],
};
const newCrewComplimen = [
  {
    key: 1,
    strCrewPosition: '',
    strName: '',
    strHoursOnDuty: '',
    strHoursTotal: '',
  },
];

const newLogEntry = [
  {
    key: 1,
    strTime: null,
    strCode: '',
    strItem: '',
    strExplanation: '',
  },
];

const newWeather = [
  {
    key: 1,
    weatherTime: null,
    weather: '',
  },
];

export default function cardReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_NEW_VESSEL_LIST:
      // console.log("cardReducer ============== ",newCrewComplimen);
      return {
        ...state,
        crewComplimentLists: newCrewComplimen,
        logEntryLists: newLogEntry,
        weatherLists: newWeather,
        isNewCrew: false,
        isDelete: false,
        isSaved: false,
      };
    case actions.ADD_VESSEL_LIST_SUCCESS:
      return {
        ...state,
        isNewCrew: false,
        isDelete: false,
        isDelete: false,
        isSaved: true,
      };
    case actions.UPDATE_EDIT_CREW_COMPLIMENT:
      action.crewData.forEach((row, index) => {
        action.crewData[index].key = index + 1;
      });
      return {
        ...state,
        crewComplimentLists: clone(action.crewData),
        isSaved: false,
        isDelete: false,
      };
    case actions.UPDATE_LOG_ENTRY:
      action.logData.forEach((row, index) => {
        action.logData[index].key = index + 1;
      });
      return {
        ...state,
        logEntryLists: clone(action.logData),
        isSaved: false,
        isDelete: false,
      };
    case actions.UPDATE_WEATHER_ENTRY:
      action.weatherData.forEach((row, index) => {
        action.weatherData[index].key = index + 1;
      });
      return {
        ...state,
        weatherLists: clone(action.weatherData),
        isSaved: false,
      };
    case actions.GET_ENTRIES_VESSEL_LIST_REDUCER: {
      return {
        ...state,
        entriesLists: action.entries,
        isNewCrew: true,
        isSaved: false,
        isDelete: false,
      };
    }
    case actions.GET_VESSEL_LIST_ID_REDUCER: {
      let temp_weather = JSON.parse(action.vesselList.weather);
      // var now=moment().format('YYYY-MM-DD HH:mm:ss');
      // var temp=[];
      // for (var i=0;i<temp_weather.length;i++){
      //    var time=moment(temp_weather[i].weatherTime).format('YYYY-MM-DD HH:mm:ss');
      //    if(now>=time){
      //     temp.push(temp_weather[i]);
      //    }
      //   //if(temp_weather
      // }
      return {
        ...state,
        vesselList: action.vesselList,
        crewComplimentLists: JSON.parse(action.vesselList.crewComplement),
        logEntryLists: JSON.parse(action.vesselList.logEntries),
        weatherLists: JSON.parse(action.vesselList.weather),
        isSaved: false,
        isDelete: false,
      };
    }
    case actions.DELETE_SUCCESS: {
      return {
        ...state,
        isDelete: true,
        isSaved: false,
      };
    }
    case actions.GET_WEATHER_DATA_REDUCER: {
      return {
        ...state,
        weatherData: action.data,
        weatherLists: action.data,
      };
    }
    default:
      return state;
  }
}
