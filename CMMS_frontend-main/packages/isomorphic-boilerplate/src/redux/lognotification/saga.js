import { all, takeEvery, put,call } from 'redux-saga/effects';
import axios from 'axios'
// import { getToken } from '@iso/lib/helpers/utility';
import siteConfig from '@iso/config/site.config';
import notification from '@iso/components/Notification';
import actions from './actions';


const onCallReqeust = async (URI) =>
  await axios
  .get(URI)  
    .then(res => res)
    .catch(error => error);
const onPostCallReqeust = async (sendData,URI) =>
  await axios
  .post(URI,sendData)  
    .then(res => res)
    .catch(error => error);
const onPutCallReqeust = async (sendData,URI) =>
    await axios
    .put(URI,sendData)  
      .then(res => res)
      .catch(error => error);    
 const onDeleteCallReqeust = async (URI) =>
      await axios
      .delete(URI)  
        .then(res => res)
        .catch(error => error);  
export function* getLogByUserId({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/lognotification/user/${payload.id}`
    );
    
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)
    }
    else{       
       var temp1=[];
      callResult.data.data.workOrderLog.map((value,index)=>{
        value.key=index+1;
        temp1.push(value);
      })
      var temp2 = [];
      callResult.data.data.logs.map((value, index) => {
        value.key = index + 1;
        temp2.push(value);
      })
        yield put({
        type: actions.GET_LOGS_BY_USER_ID_REDUCER,
          workOrderLogs: temp1,
          logs: temp2,
        msg:null
      });
    }    
  }
  catch (error) {    
    notification('error',"Internal server error!")
  }  
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_LOGS_BY_USER_ID,   getLogByUserId),
    // yield takeEvery(actions.ADD_STATUS, addStatus),
    // yield takeEvery(actions.GET_BY_ID, getById),
    // yield takeEvery(actions.UPDATE_ASSET_CATEGORY, updateAssetCategory),
    // yield takeEvery(actions.DELETE_ASSET_CATEGORY, deleteAssetCategory), 
    
  ]);
}
