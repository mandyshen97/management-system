const BaseUrl = "http://10.13.81.186:8080";
const UrlMap = [
  {
    description: "医生注册",
    method: "doctorRegister",
    url: "/nir/som/doctor/register",
    type: "POST"
  },
  {
    description: "医生登录",
    method: "doctorLogin",
    url: "/nir/doctor/login",
    type: "POST"
  },
  {
    description: "获取医生列表",
    method: "getDoctorList",
    url: "/nir/som/doctor/getList",
    type: "GET"
  },
  {
    description: "获取疾病列表",
    method: "getDiseaseList",
    url: "/nir/som/disease",
    type: "GET"
  },

  {
    description: "患者注册",
    method: "patientRegister",
    url: "/nir/som/patient/register",
    type: "POST"
  },
  {
    description: "更新患者个人信息",
    method: "updatePatientInformation",
    url: "/nir/som/patient/update",
    type: "POST"
  },
  {
    description: "获取患者列表",
    method: "getPatientList",
    url: "/nir/som/patient/getList",
    type: "POST"
  },
  {
    description: "添加患者wcst任务",
    method: "addWCST",
    url: "/nir/som/patient/wcst/add",
    type: "POST"
  },
  {
    description: "更新患者wcst任务",
    method: "updateWCST",
    url: "/nir/som/patient/wcst/update",
    type: "POST"
  },
  {
    description: "删除患者wcst任务",
    method: "removeWCSTTask",
    url: "/nir/som/patient/wcst/remove",
    type: "POST"
  },
  {
    description: "添加患者近红外测试数据",
    method: "addPatientData",
    url: "/nir/patient/data/add",
    type: "POST"
  },
  {
    description: "更新患者近红外测试数据",
    method: "updatePatientData",
    url: "/nir/patient/data/update",
    type: "POST"
  },
  {
    description: "删除患者近红外测试数据",
    method: "removeNirTask",
    url: "/nir/som/patient/nirTest/remove",
    type: "POST"
  },
  {
    description: "查询患者任务/测试列表",
    method: "InquirePatientTaskList",
    url: "/nir/som/patient/getTaskList",
    type: "POST"
  },
  {
    description: "查询患者量表",
    method: "inquirePatientScale",
    url: "/nir/patient/scale",
    type: "POST"
  }
];
const API = {};
UrlMap.forEach(item => {
  if (API[item.method]) {
    console.log(`存在相同方法：${item.method}`);
  }
  API[item.method] = function(data) {
    // data是请求参数
    let url = BaseUrl + item.url;
    let option = {
      method: item.type, // 请求方式
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (item.type !== "POST") {
      // 如果不是POST请求，则将参数拼接在url中，以?连接。
      // 将请求参数对象拼接成查询字符串：data={a:1,b:2,c:3} ===> a=1&b=2&c=3
      let body = Object.keys(data).map(key => key + "=" + data[key]).join("&");
      if(body !== ''){
        url = `${url}?${body}`;
      }
    } else {
      option.body = JSON.stringify(data); // 如果是POST请求，则将请求参数对象拼接好的字符串放在请求体中。
    }
    // 通过fetch发送请求，第一个参数是请求地址。
    // json()返回一个被解析为JSON格式的promise对象
    return fetch(url, option).then(res => res.json());
  };
});
export default API;
