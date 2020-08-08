import React from "react";
import { Form, message } from "antd";
import ReactEcharts from "echarts-for-react";
import API from "../../api/api";
require("react-dom");
window.React2 = require("react");
console.log(window.React1 === window.React2);

function AIAnalysis() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (values.opinion) {
      message.success("提交成功！");
    }

    // todo
    // 提交接口
    // API.addPatient(values).then((res) => {
    //   console.log(res);
    //   if ((res.state = "200")) {
    //     message.success('提交成功！')
    //   }
    // });
  };

  function getOption() {
    const option = {
      title: {
        text: "脊椎疾病严重程度",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["脊椎疾病严重程度等级"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "10%",
        right: "10%",
        bottom: "5%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          name: "治疗次数",
          data: ["第0次", "第1次", "第2次", "第3次", "第4次", "第5次", "第6次"],
          position: "bottom",
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "脊椎疾病严重程度等级",
        },
      ],
      series: [
        {
          name: "脊椎疾病严重程度等级",
          type: "line",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "top",
            },
          },
          areaStyle: {},
          data: [5, 5, 4, 3.5, 3, 2, 1],
        },
      ],
    };
    return option;
  }

  return (
    <div className="main-content">
      <ReactEcharts
        option={getOption()}
        // style={{ height: "200px", width: "", align: "center" }}
      />
    </div>
  );
}

export default AIAnalysis;
