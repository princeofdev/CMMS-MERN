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
export function* getBusiness() {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/business`
    );
     
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg);
    }
    else{     
      var temp=[];
      callResult.data.data.map((row,index)=>{
        row.key=index;
        temp.push(row);
      })
       yield put({
         type: actions.GET_BUSINESS_REDUCER,
         data: temp,//createDemoData(),
       });
    }  
   
  }
  catch (error) {
    notification('error',"Internal server error!")
  }  
}
export function* getBusinessById({payload}) {
  axios.defaults.headers.get['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onCallReqeust,
      `${siteConfig.apiUrl}/business/${payload.id}`             
    );
   
 
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{       
        yield put({
        type: actions.GET_BUSINESS_BY_ID_REDUCER,
        data:callResult.data.data     
      });
    }    
  }
  catch (error) {    
    notification('error',"Internal server error!")
  }  
}
export function* addBusiness({payload}) {
  axios.defaults.headers.post['Authorization'] = localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPostCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/business`          
    );

    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
       notification('success',callResult.data.msg);   
        yield put({
          type: actions.ADD_BUSINESS_REDUCER,
          msg:callResult.data.msg,
        });
    }
  }
  catch (error) {  
 
    yield put({ type: actions.ADD_FAILED ,msg: "Server Internal error!"});
  }  
}
export function* updateBusiness({payload}) { 
  axios.defaults.headers.put['Authorization'] =  localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onPutCallReqeust,
      payload.sendData,
      `${siteConfig.apiUrl}/business/${payload.id}`          
    );
  
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
     notification('success',callResult.data.msg)
      yield put({
        type: actions.GET_BUSINESS,
        payload:{id:payload.id}
      });

    }  
  }
  catch (error) {  
    notification('success',"Server Internal error!")   
  }  
}

export function* deleteBusiness({payload}) {
  axios.defaults.headers.delete['Authorization'] =localStorage.getItem('id_token');
  try {
    const callResult = yield call(
      onDeleteCallReqeust,     
      `${siteConfig.apiUrl}/business/${payload.id}`          
    );
    if(callResult.response!=undefined){
      notification('error',callResult.response.data.msg)     
    }
    else{
      notification('success',callResult.data.msg)
      yield put({
        type: actions.ADD_BUSINESS_REDUCER
      });
    }     

  }
  catch (error) {     
    notification('error',"Server Internal error!")      
  }  
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_BUSINESS,   getBusiness),
    yield takeEvery(actions.ADD_BUSINESS, addBusiness),
    yield takeEvery(actions.GET_BUSINESS_BY_ID, getBusinessById),
    yield takeEvery(actions.UPDATE_BUSINESS, updateBusiness),
    yield takeEvery(actions.DELETE_BUSINESS, deleteBusiness),
    
  ]);
}
