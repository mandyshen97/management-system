// const BaseUrl = "http://10.13.81.186:8080";
const UrlMap = [
  {
    description: "用户登录",
    method: "login",
    url: "http://localhost:8081/user/login",
    type: "POST"
  },
  {
    description: "用户注册",
    method: "register",
    url: "http://localhost:8081/user/register",
    type: "POST"
  },
  {
    description: "获取病历列表",
    method: "getRecordList",
    url: "http://localhost:8081/record/get",
    type: "POST"
  },
  {
    description: "获取单个病历",
    method: "getRecord",
    url: "http://localhost:8081/record/getSimRecord",
    type: "POST"
  },
  {
    description: "获取病种id列表",
    method: "getDisease",
    url: "http://localhost:8081/disease/all",
    type: "GET"
  },
  {
    description: "删除电子病历记录",
    method: "removeRecord",
    url: "http://localhost:8081/record/remove",
    type: "POST"
  },
  {
    description: "获取相似电子病历",
    method: "getSimRecord",
    url: "http://10.13.81.186:8081/record/getRecWithSim",
    type: "POST"
  },
  {
    description: "处理分析结果，即更新数据库",
    method: "updateRecord",
    url: "http://localhost:8081/record/update",
    type: "POST"
  },
  {
    description: "获取医生列表",
    method: "getDoctors",
    url: "http://localhost:8081/user/doctors",
    type: "POST"
  },
  {
    description: "获取西医主药",
    method: "getWesternMedicine",
    url: "http://localhost:8081/record/westernMedicine",
    type: "POST"
  },
  {
    description: "获取中医辅药",
    method: "getChineseMedicine",
    url: "http://localhost:8081/record/chineseMedicine",
    type: "POST"
  },
  {
    description: "添加病历列表",
    method: "uploadRecord",
    url: "http://localhost:8081/record/upload",
    type: "POST",
  },
  {
    description: "电子病历下载",
    method: "downloadRecord",
    url: "http://localhost:8081/record/download",
    type: "GET",
  },
  {
    description: "康复跟踪",
    method: "recordTrace",
    url: "http://localhost:8081/record/trace",
    type: "POST"
  },

  {
    description: "python后端获取分析结果",
    method: "getAnalyseResult",
    url: "http://10.13.81.189:5000/analyse",
    type: "POST"
  },
  {
    description: "专家模型用药帮助",
    method: "proMedicineHelp",
    url: "http://10.13.81.189:5000/proMedicineHelp",
    type: "POST"
  },
  {
    description: "相似电子病历用药帮助",
    method: "simMedicineHelp",
    url: "http://10.13.81.189:5000/simMedicineHelp",
    type: "POST"
  },

];
const API = {};
UrlMap.forEach(item => {
  if (API[item.method]) {
    console.log(`存在相同方法：${item.method}`);
  }
  API[item.method] = function(data) {
    // data是请求参数
    let url = item.url;
    let option = {
      method: item.type, // 请求方式
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    };
    // 如果是添加数据记录，则改变option
    if(url=="http://localhost:8081/record/upload"){
      option = {
        method: item.type, // 请求方式
        mode: "cors",
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // },
        credentials: "include"
      };
    }
    if (item.type !== "POST") {
      // 如果不是POST请求，则将参数拼接在url中，以?连接。
      // 将请求参数对象拼接成查询字符串：data={a:1,b:2,c:3} ===> a=1&b=2&c=3
        if (data != null) {
          let body = Object.keys(data)
          .map(key => key + "=" + data[key])
          .join("&");
        if (body !== "") {
          url = `${url}?${body}`;
        }
      }
    } else {
      if(url=="http://localhost:8081/record/upload"){
        option.body = data;
      }
      else{
        option.body = JSON.stringify(data)
      }
      // option.body = JSON.stringify(data); // 如果是POST请求，则将请求参数对象拼接好的字符串放在请求体中。
    }
    // 通过fetch发送请求，第一个参数是请求地址。
    // json()返回一个被解析为JSON格式的promise对象
    return fetch(url, option).then(res => res.json());
  };
});
export default API;
