import Axios from 'axios'

import 'element-theme-default';

import { Notification } from 'element-react';
//
const url = "http://172.18.92.116:414";
/* 服务器ip地址 */

Axios.defaults.timeout = 5000;//响应时间
Axios.defaults.baseURL = url;//接口地址
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//设置请求头
Axios.defaults.retry = 2; //重试次数
Axios.defaults.retryDelay = 1000;//重试延时
Axios.defaults.shouldRetry = (error) => true;//重试条件，默认只要是错误都需要重试
// //请求拦截器
Axios.interceptors.request.use(
  (config)=>{

    if(config.method === 'post'){

      //先对数据进行转换，把对象、数组等数据转换为json字符串
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  (error)=>{

    Notification.error({
      title: '错误',
      message: 'post或get请求代码有误，请检查'
    });
    return Promise.reject(error);
  }
)

Axios.interceptors.response.use(
  (res) => {

    if(res.status !== 200 ){
      if(res.status >= 500){
        Notification.error({
          title: '错误',
          message: '系统异常，请检查服务端代码'
        });
      }
      return Promise.reject(res);
    }

    return res.data;
  },
  (error) => {
    Notification.error({
      title: '错误',
      message: '系统异常，请稍后重试！'
    });
     console.log(error)

      return Promise.reject(error);
    }

)

// Axios.interceptors.response.use(undefined, (err) => {
//   var config = err.config;
//   // 判断是否配置了重试
//   if(!config || !config.retry) return Promise.reject(err);
//
//   if(!config.shouldRetry || typeof config.shouldRetry != 'function') {
//     return Promise.reject(err);
//   }
//
//   //判断是否满足重试条件
//   if(!config.shouldRetry(err)) {
//     return Promise.reject(err);
//   }
//
//   // 设置重置次数，默认为0
//   config.__retryCount = config.__retryCount || 0;
//
//   // 判断是否超过了重试次数
//
//
//   //重试次数自增
//   config.__retryCount += 1;
//   console.log('config.__retryCount ' + config.__retryCount);
//   //延时处理
//   var backoff = new Promise(function(resolve) {
//     setTimeout(function() {
//       resolve();
//     }, config.retryDelay || 1);
//   });
//
//   //重新发起Axios请求
//   return backoff.then(function() {
//     return Axios(config);
//   });
// });
function get (url, params = {}){
  return new Promise((reslove,reject) => {
    Axios.get(url,{
      params:params
    }).then(
      (response) =>{
        reslove(response.res);
      },
      (err) => {

        reject(err);
      }
    )
  })
}


 // async function post(url ,data = {}){
 //  return Axios.post(url,data)
 //    .then(res=>{
 //      return res
 //    }).catch(err => {
 //      console.log("error")
 //    })
 // }
 function post(url, data = {}){
  return new Promise((reslove,reject) => {
    Axios.post(url,data)
      .then(
        (response) => {
          reslove(response);
        }).catch(
      (error) => {
        reject(error);
      })
  })
}
/*
    使用方法:
    在组件的任意位置都可以调用
     get： this.$get(url[,params])
                .then(res=>{
                    .....
                })
     post： this.$post(url[,params])
                .then(res=>{
                    .....
                })

       tips:url只需写特定的路径即可，不需要完整的url，如 http://123.45.67.12:8080/methods/getData
       可写为 /methods/getData
       params代码接口需要的参数，类型是对象（已提前转为Json,无需手动再转)
 */
function upload(fileUri,fileNAME,httpuri){
  alert(fileUri,fileNAME,httpuri)
    let formData = new FormData();
    let file = { uri: fileUri, type: 'multipart/form-data', name: fileNAME };
    formData.append('file', file);
    let config = {
        Accept: 'Application/json',
        'Content-Type': 'multipart/form-data',
    };
    return new Promise((reslove,reject) => {
        Axios.post(httpuri, formData, config)
            .then((response) => {
                reslove(response);
            }).catch((error) => {
            reject(error);
        });
    })
}

/*async uploadFile () {
    var config = {
      onUploadProgress: (progressEvent) => {          
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total) 
      }
    }      
    let formData = new FormData()      
    let form = document.getElementById('headImg')      
    let file = form.files[0]  
    formData.append('file', file)      
    let Url = window.URL || window.webkitURL      
    var imgURL = Url.createObjectURL(file)      
    this.setState({        
        headHref: imgURL      
    })      
    let res = await axios.post('/user/head/upload', formData, config)
        .then(res => {        
            this.ticket = res.data.image        
            // this.state.upData[tag] = logoTicket        
            // this.checkIfCanCommit()      
        }).catch(err => { console.error(err) })      
        axios.post('user/head/update', {        
          head_file: res.data.data.head_file 
        })
}*/


export { get,post,upload }