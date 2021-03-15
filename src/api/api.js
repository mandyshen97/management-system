import { getCookie } from "../pages/home/Home";

const BaseUrl = "http://10.16.98.192:9091";
// const BaseUrl = "http://localhost:8080";
const UrlMap = [
  {
    description: "用户登录", // 用到，成功
    method: "login",
    url: "/user/login",
    type: "POST",
  },
  {
    description: "用户注册", // 用到，成功
    method: "register",
    url: "/user/register",
    type: "POST",
  },
  {
    description: "获取病历列表",
    method: "getRecordList",
    url: "/record/getAllRecords",
    type: "POST",
  },
  {
    description: "获取单个病历",
    method: "getRecord",
    url: "/record/getSimRecord",
    type: "POST",
  },
  {
    description: "获取病种id列表", // 用到,调通了
    method: "getDisease",
    url: "/disease/all",
    type: "POST",
  },
  {
    description: "删除电子病历记录",
    method: "removeRecord",
    url: "/record/remove",
    type: "POST",
  },
  {
    description: "获取相似电子病历",
    method: "getSimRecord",
    url: "/record/getRecWithSim",
    type: "POST",
  },
  {
    description: "处理分析结果，即更新数据库",
    method: "updateRecord",
    url: "/record/update",
    type: "POST",
  },
  {
    description: "获取医生列表",
    method: "getDoctors",
    url: "/doctor/getDoctors",
    type: "POST",
  },
  {
    description: "获取西医主药",
    method: "getWesternMedicine",
    url: "/record/westernMedicine",
    type: "POST",
  },
  {
    description: "获取中医辅药",
    method: "getChineseMedicine",
    url: "/record/chineseMedicine",
    type: "POST",
  },
  {
    description: "电子病历下载",
    method: "downloadRecord",
    url: "/record/download",
    type: "GET",
  },
  {
    description: "康复跟踪",
    method: "recordTrace",
    url: "/record/trace",
    type: "POST",
  },

  {
    description: "python后端获取分析结果", // 调试了，成功
    method: "getAnalyseResult",
    url: "http://10.16.98.192:5000/analysis",
    type: "POST",
  },
  {
    description: "专家模型用药帮助",
    method: "proMedicineHelp",
    url: "http://10.13.81.189:5000/proMedicineHelp",
    type: "POST",
  },
  {
    description: "相似电子病历用药帮助",
    method: "simMedicineHelp",
    url: "http://10.13.81.189:5000/simMedicineHelp",
    type: "POST",
  },
  //=====================================新的
  {
    description: "新建提交患者个人信息", // 用到, 联调成功
    method: "addPatient",
    url: "/patient/addPatient",
    type: "POST",
  },
  {
    description: "患者信息查询", // 用到,联调成功
    method: "getPatient",
    url: "/patient/getPatient",
    type: "POST",
  },
  {
    description: "更新患者信息", // 用到，新加的，联调更新无效
    method: "updatePatientInfo",
    url: "/patient/updatePatientInfo",
    type: "POST",
  },
  {
    description: "获取病人历史治疗记录", // 用到
    method: "getHistoryRecords",
    url: "/record/getHistoryRecords",
    type: "POST",
  },
  {
    description: "上传本次治疗的内容", // 用到，新的------
    method: "uploadRecord",
    url: "/record/uploadRecord",
    type: "POST",
  },
  // {
  //   description: "上传本次治疗前的内容", // 用到
  //   method: "saveBeforeTreat",
  //   url: "/api/saveBeforeTreat",
  //   type: "POST",
  // },
  // {
  //   description: "上传本次治疗的内容", // 用到
  //   method: "treat",
  //   url: "/api/treat",
  //   type: "POST",
  // },
  // {
  //   description: "上传本次治疗后的内容", // 用到
  //   method: "saveAfterTreat",
  //   url: "/api/saveAfterTreat",
  //   type: "POST",
  // },
  {
    description: "获取医生权限列表", // 用到
    method: "getAccessList",
    url: "/api/getAccessList",
    type: "GET",
  },
  {
    description: "修改医生权限后提交", // 用到
    method: "updataAccess",
    url: "/api/updataAccess",
    type: "POST",
  },
  {
    description: "获取医生部门和id", // 用到
    method: "getUser",
    url: "/user/getUser",
    type: "POST",
  },
];
const API = {};
UrlMap.forEach((item) => {
  if (API[item.method]) {
    console.log(`存在相同方法：${item.method}`);
  }
  API[item.method] = function (data) {
    // data是请求参数
    let url = BaseUrl + item.url;
    let option = {
      method: item.type, // 请求方式
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        'Authorization': getCookie("token") ,
        "withCredentials": true,
      },
    };

    if (item.type !== "POST") {
      let body = Object.keys(data || {})
        .map((key) => key + "=" + data[key])
        .join("&");
      // 如果不是POST请求，则将参数拼接在url中，以?连接。
      url = `${url}?${body}`;
    } else {
      option.body = JSON.stringify(data);
    }

    if (item.url === "/record/uploadRecord") {
      option = {
        method: "POST",
        // mode: "cors",
        headers: {
          'Authorization': getCookie("token"),
          "withCredentials": true,
        },
        body: data,
      };
    }
    if (item.url === "http://10.16.98.192:5000/analysis") {
      url = item.url;
      option = {
        method: "POST",
        body: data,
      };
    }
    if (item.url === "/record/download"){
      return fetch(url,option).then((res) => res.json());
    }
    // 通过fetch发送请求，第一个参数是请求地址。
    // json()返回一个被解析为JSON格式的promise对象
    return fetch(url, option).then((res) => res.json());
  };
});
export default API;
