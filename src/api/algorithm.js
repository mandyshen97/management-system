const BaseUrl = "http://10.13.81.190:5000";
const UrlMap = [
    {description: "上传图像",
    method: "uploadImg",
    url: "/analysis/uploadImg",
    type: "POST"
    },
    {
        description: "医生登录",
        method: "login",
        url: "/login",
        type: "POST"
    },
    {
        description: "医生注册",
        method: "register",
        url: "/register",
        type: "POST"
    },
    {   
        description: "增添患者基本信息",
        method: "addNewPatient",
        url: "/addNewPatient",
        type: "POST"

    },
    {
        description: "更新患者信息",
        method: "updatePatient",
        url: "/updatePatient",
        type: "POST"
    },
    {
        description: "显示患者列表",
        method: "getPatientList",
        url: "/getPatientList",
        type: "POST"
    },
    {
        description: "新建wcst任务",
        method: "addWcstTask",
        url: "/addWcstTask",
        type: "POST"

    },
    {
        description: "更新wcst任务",
        method: "updateWcstTask",
        url: "/updateWcstTask",
        type: "POST"
    },
    {
        description: "删除wcst任务",
        method: "removeWcstTask",
        url: "/removeWcstTask",
        type: "POST"
    },
    {
        description: "新建整晚任务",
        method: "addTask",
        url: "/addTask",
        type: "POST"
    },
    {
        description: "更新整晚任务",
        method: "updateTask",
        url: "/updateTask",
        type: "POST"
    },
    {
        description: "删除整晚任务",
        method: "removeTask",
        url: "removeTask",
        type: "POST"
    },
    {
        description: "获取任务列表",
        method: "getTaskList",
        url: "/getTaskList",
        type: "POST"
    },
    {
        description: "获取医生列表",
        method: "getDoctorList",
        url: "/getDoctorList",
        type: "GET"
    },
    {
        description: "获取药物列表",
        method: "getDoctorList",
        url: "/getMedicineList",
        type: "GET"
    },
    {
        description: "获取疾病列表",
        method: "getDiseaseList",
        url: "/getDiseaseList",
        type: "GET"
    },
    {
        description: "获取非药物干预列表",
        method: "getNonMedicineList",
        url: "/getNonMedicineList",
        type: "GET"
    },
    {
        description: "获取疾病分类",
        method: "getDiseaseTotal",
        url: "/statistic/getDiseaseTotal",
        type: "GET"
    }

]
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