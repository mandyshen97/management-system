import React, { Component } from "react";
import "./rehab-ass.less";
import { Table } from "antd";
import _ from "lodash";
import moment from "moment";

class RenderHistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 渲染历史治疗记录表格
  renderHistoryTable = () => {
    const columns = [
      {
        title: "治疗次数",
        dataIndex: "count",
        key: "count",
        render: (count) => `第${count}次治疗`,
        width: "14%",
        align: "center",
      },
      {
        title: "治疗时间",
        dataIndex: "time",
        key: "time",
        width: "14%",
        align: "center",
      },
      {
        title: "治疗方案",
        dataIndex: "treat",
        key: "treat",
        width: "14%",
        align: "center",
      },
      {
        title: "颈椎康复评估效果数字等级",
        dataIndex: "j_disease",
        key: "j_disease",
        width: "14%",
        align: "center",
      },
      {
        title: "颈椎VAS评分",
        dataIndex: "j_VAS",
        key: "j_VAS",
        width: "14%",
        align: "center",
      },
      {
        title: "腰椎康复评估效果数字等级",
        dataIndex: "y_disease",
        key: "y_disease",
        width: "14%",
        align: "center",
      },
      {
        title: "腰椎VAS评分",
        dataIndex: "y_VAS",
        key: "y_VAS",
        width: "14%",
        align: "center",
      },
      // {
      //   title: "红外热像图",
      //   dataIndex: "infImage",
      //   key: "infImage",
      //   render: (infImage) => {
      //     return <img src={'http://10.16.98.192:8001/infraFile/after/'+infImage} alt="" width='100px' height='100px'/>;
      //   },
      // },
      // {
      //   title: "红外热像图描述",
      //   dataIndex: "infImageDes",
      //   key: "infImageDes",
      // },
      // {
      //   title: "核磁共振图像",
      //   dataIndex: "MRI",
      //   key: "MRI",
      // },
      // {
      //   title: "核磁共振图像描述",
      //   dataIndex: "MRIDes",
      //   key: "MRIDes",
      // },
      // {
      //   title: "核磁共振图像",
      //   dataIndex: "CT",
      //   key: "CT",
      // },
      // {
      //   title: "核磁共振图像描述",
      //   dataIndex: "CTDes",
      //   key: "CTDes",
      // },
    ];

    const data = [];

    function getDesFromClassification(classification) {
      const map = {
        0: "正常",
        1: "疲劳",
        2: "炎性改变",
        3: "颈椎负荷过重",
        4: "颈肩综合症，颈椎退行性，颈椎病",
        100: "",
      };
      return map[classification];
    }

    (this.props.historyRecords || []).map((item, index) => {
      let record = {};
      record.key = index;
      record.count = item.treatCount;
      record.time = moment(item.timeMiddle).format("YYYY-MM-DD");
      record.treat = item.treat;
      console.log(item.timeBefore);
      record.infImage = item.infraAfterPath;
      record.infImageDes = getDesFromClassification(
        _.get(item, "classificationBefore", 100)
      );
      record.MRI = "";
      record.MRIDes = "";
      record.CT = "";
      record.CTDes = "";
      data.push(record);
    });

    const paginationProps = {
      showTotal: (total) => {
        return `共${total}条`;
      },
      showSizeChanger: false,
      total: data.length, //数据总数
      defaultCurrent: 1, //默认当前页
      pageSize: 3, //每页条数
    };

    const mockData = [
      {
        count: 1,
        time: "2020-12-03",
        treat: "针灸治疗",
        j_disease: "4",
        j_VAS: "8",
        y_disease: "5",
        y_VAS: "9",
      },
      {
        count: 2,
        time: "2020-12-10",
        treat: "超短波理疗",
        j_disease: "3",
        j_VAS: "6",
        y_disease: "4",
        y_VAS: "8",
      },
      {
        count: 3,
        time: "2020-12-17",
        treat: "干扰电治疗",
        j_disease: "2",
        j_VAS: "4",
        y_disease: "3",
        y_VAS: "6",
      },
      {
        count: 4,
        time: "2020-12-24",
        treat: "针灸治疗",
        j_disease: "3",
        j_VAS: "4",
        y_disease: "3",
        y_VAS: "5",
      },
      {
        count: 5,
        time: "2020-12-31",
        treat: "低频理疗",
        j_disease: "2",
        j_VAS: "3",
        y_disease: "2",
        y_VAS: "3",
      },
      {
        count: 6,
        time: "2020-01-07",
        treat: "熏蒸疗法",
        j_disease: "1",
        j_VAS: "2",
        y_disease: "1",
        y_VAS: "1",
      },
    ];

    return (
      <Table
        bordered="true"
        columns={columns}
        // dataSource={data}
        dataSource={mockData}
        scroll={{ x: "max-content", y: 600 }}
        pagination={paginationProps}
        size="middle"
      />
    );
  };

  render() {
    console.log("historyRecords", this.props.historyRecords);
    return <>{this.renderHistoryTable()}</>;
  }
}

export default RenderHistoryTable;
