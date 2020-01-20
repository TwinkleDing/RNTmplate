// import store from '@/store/index';
import axios from 'axios';
import {Alert} from 'react-native';

// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    //window.localStorage.getItem("accessToken") 获取token的value
    // let token;
    // if (JSON.stringify(store.getState()).length > 2) {
    //   if (store.getState().user) {
    //     token = store.getState().user.value.token;
    //   }
    // }
    // if (token) {
    //   //将token放到请求头发送给服务器,将tokenkey放在请求头中
    //   config.headers.accessToken = token;
    //   config.headers.Authorization = token;
    // }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
//返回状态判断
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        Alert.alert('温馨提示', error.response.data);
      }
    }
    return Promise.reject(error); // 返回接口返回的错误信息
  },
);

export default axios;
