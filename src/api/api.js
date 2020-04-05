// const BaseUrl = "http://10.13.81.186:8080";
const UrlMap = [
  {
    description: "1.医生注册",
    method: "doctorRegister",
    url: "http://10.13.81.186:8080/nir/som/doctor/register",
    type: "POST"
  },
  {
    description: "2.医生登录",
    method: "doctorLogin",
    url: "http://10.13.81.186:8081/user/login",
    type: "POST"
  },
  {
    description: "3.获取医生列表",
    method: "getDoctorList",
    url: "http://10.13.81.186:8080/nir/som/doctor/getList",
    type: "GET"
  },
  {
    description: "4.患者注册",
    method: "patientRegister",
    url: "http://10.13.81.186:8080/nir/som/patient/register",
    type: "POST"
  },
  {
    description: "5.更新患者个人信息",
    method: "updatePatientInformation",
    url: "http://10.13.81.186:8080/nir/som/patient/update",
    type: "POST"
  },
  {
    description: "6.获取患者列表",
    method: "getPatientList",
    url: "http://10.13.81.186:8080/nir/som/patient/getList",
    type: "POST"
  },
  {
    description: "7.添加患者wcst任务",
    method: "addWCST",
    url: "http://10.13.81.186:8080/nir/som/patient/wcst/add",
    type: "POST"
  },
  {
    description: "8.更新患者wcst任务",
    method: "updateWCST",
    url: "http://10.13.81.186:8080/nir/som/patient/wcst/update",
    type: "POST"
  },
  {
    description: "9.删除患者wcst任务",
    method: "removeWCSTTask",
    url: "http://10.13.81.186:8080/nir/som/patient/wcst/remove",
    type: "POST"
  },
  {
    description: "10.添加患者近红外测试数据",
    method: "addNirData",
    url: "http://10.13.81.186:8080/nir/som/patient/nirTest/add",
    type: "POST"
  },
  {
    description: "11.更新患者近红外测试数据",
    method: "updateNirData",
    url: "http://10.13.81.186:8080/nir/som/patient/nirTest/update",
    type: "POST"
  },
  {
    description: "12.删除患者近红外测试数据",
    method: "removeNirTask",
    url: "http://10.13.81.186:8080/nir/som/patient/nirTest/remove",
    type: "POST"
  },
  {
    description: "13.查询患者任务/测试列表",
    method: "InquirePatientTaskList",
    url: "http://10.13.81.186:8080/nir/som/patient/getTaskList",
    type: "POST"
  },
  {
    description: "14.查询患者量表",
    method: "inquirePatientScale",
    url: "http://10.13.81.186:8080/nir/som/patient/scale",
    type: "POST"
  },
  {
    description: "15.获取药品列表",
    method: "getMedicineList",
    url: "http://10.13.81.186:8080/nir/som/medicine",
    type: "GET"
  },
  {
    description: "16.非药物治疗列表",
    method: "getNonMedicineList",
    url: "http://10.13.81.186:8080/nir/som/nonMedicine",
    type: "GET"
  },
  {
    description: "17.获取疾病列表",
    method: "getDiseaseList",
    url: "http://10.13.81.186:8080/nir/som/disease",
    type: "GET"
  },
  {
    description: "18.获取疾病统计",
    method: "getDiseaseTotal",
    url: "http://10.13.81.186:8080/nir/som/statistic/getDiseaseTotal",
    type: "GET"
  },
  {
    description: "19.获取任务统计",
    method: "getTaskTotal",
    url: "http://10.13.81.186:8080/nir/som/statistic/getTaskTotal",
    type: "GET"
  },
  {
    description: "20",
    method: "getBloodOxygenData",
    url: "http://10.13.81.186:8080/nir/som/patient/getBloodOxygenData",
    type: "GET"
  },
  {
    description: "21、获取病历列表",
    method: "getRecordList",
    url: "http://10.13.81.186:8081/record/get",
    type: "POST"
  },
  {
    description: "22、获取病种id列表",
    method: "getDisease",
    url: "http://10.13.81.186:8081/disease/all",
    type: "GET"
  },
  {
    description: "23、删除电子病历记录",
    method: "removeRecord",
    url: "http://10.13.81.186:8081/record/remove",
    type: "POST"
  },
  {
    description: "24、获取相似电子病历",
    method: "getSimRecord",
    url: "http://10.13.81.186:8081/record/getRecWithSim",
    type: "POST"
  },
  {
    description: "25、python后端获取分析结果",
    method: "getAnalyseResult",
    url: "http://10.13.81.189:5000/analyse",
    type: "POST"
  },
  {
    description: "26、处理分析结果，即更新数据库",
    method: "handleAnalyseResult",
    url: "http://10.13.81.186:8081/record/update",
    type: "POST"
  },
  {
    description: "27、获取医生列表",
    method: "getDoctors",
    url: "http://10.13.81.186:8081/user/doctors",
    type: "POST"
  },
  {
    description: "28、添加病历列表",
    method: "uploadRecord",
    url: "http://10.13.81.186:8081/record/add",
    type: "POST",
  }
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
      }
    };
    // 如果是添加数据记录，则改变option
    if(url=="http://10.13.81.186:8081/record/add"){
      option = {
        method: item.type, // 请求方式
        mode: "cors",
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
      option.body = JSON.stringify(data); // 如果是POST请求，则将请求参数对象拼接好的字符串放在请求体中。
    }
    // 通过fetch发送请求，第一个参数是请求地址。
    // json()返回一个被解析为JSON格式的promise对象
    return fetch(url, option).then(res => res.json());
  };
});
export default API;
