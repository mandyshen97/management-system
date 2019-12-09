/**
 * 量表查看弹窗
 */

import React, { Component } from "react";
import { Card, Form, Modal, Descriptions, Table } from "antd";
import ReactEcharts from "echarts-for-react";

// const { Option } = Select;
// const { Title } = Typography;

class ScaleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ScaleInfo: {
        count: undefined, //次数
        week: undefined, //周数
        scaleTime: undefined, //评估时间
        sleepQuality: undefined, //睡眠质量
        sleepTime: undefined, //入睡时间
        sleepingTime: undefined, //睡眠时间
        sleepEfficiency: undefined, //睡眠效率
        sleepDisorder: undefined, // 睡眠障碍
        sleepMedicine: undefined, // 催眠药物
        daytimeDysfunction: undefined, //日间功能障碍
        PSQI: undefined,
        GAD7: undefined,
        PHQ9: undefined,
        PHQ15: undefined,
        ESS: undefined,
        isSnoring: false, //是否打鼾
        isPain: false, //是否抽动酸痛
        isItch: false, //是否虫爬感，刺痛感
        isMoveLegs: false, //是否有移动双腿的冲动
        isFirst: false, //是都首次失眠
        isNowMedicine: false, //现在是否服用药物
        isPastMedicine: false, //过往是否服用药物
        isGenetic: false, //父母兄弟是否失眠
        lastingTime: "" //失眠持续时间
      }
    };
  }
  componentDidMount() {
    // todo
  }

  // 提交处理
  handleClinicalSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;
      if (!err) {
        // todo
        // 哪个接口？？？
      }
      this.props.handleModalVisible(false, "scaleInfo");
    });
  };

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    const { scaleInfo } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    const option = {
      title: {
        text: "量表指标变化柱状图"
      },
      legend: {},
      tooltip: {},
      dataset: {
        dimensions: ["week", "PSQI", "GAD7", "PHQ9", "PHQ15", "ESS"],
        source: [
          { week: "第一周", PSQI: 19, GAD7: 16, PHQ9: 22, PHQ15: 8, ESS: 1 },
          { week: "第二周", PSQI: 13, GAD7: 12, PHQ9: 15, PHQ15: 4, ESS: 2 },
          { week: "第三周", PSQI: 14, GAD7: 8, PHQ9: 10, PHQ15: 6, ESS: 1 },
          { week: "第四周", PSQI: 12, GAD7: 5, PHQ9: 3, PHQ15: 2, ESS: 1 }
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        { type: "bar" },
        { type: "bar" },
        { type: "bar" },
        { type: "bar" },
        { type: "bar" }
      ]
    };

    const columns = [
      {
        title: "周数",
        dataIndex: "week",
        key: "week"
      },
      {
        title: "睡眠质量评分",
        dataIndex: "sleepQuality",
        key: "sleepQuality"
      },
      {
        title: "入睡时间",
        dataIndex: "sleepTime",
        key: "sleepTime"
      },
      {
        title: "睡眠时间",
        key: "sleepingTime",
        dataIndex: "sleepingTime"
      },
      {
        title: "睡眠效率",
        key: "sleepEfficiency",
        dataIndex: "sleepEfficiency"
      },
      {
        title: "睡眠障碍",
        key: "sleepDisorder",
        dataIndex: "sleepDisorder"
      },
      {
        title: "催眠药物",
        key: "sleepMedicine",
        dataIndex: "sleepMedicine"
      },
      {
        title: "日间功能障碍",
        key: "daytimeDysfunction",
        dataIndex: "daytimeDysfunction"
      }
    ];

    const data = [
      {
        key: "1",
        week: "第一周",
        sleepQuality: "2",
        sleepTime: "2",
        sleepingTime: "2",
        sleepEfficiency: "2",
        sleepDisorder: "1",
        sleepMedicine: "2",
        daytimeDysfunction: "3"
      },
      {
        key: "3",
        week: "第二周",
        sleepQuality: "3",
        sleepTime: "3",
        sleepingTime: "3",
        sleepEfficiency: "3",
        sleepDisorder: "1",
        sleepMedicine: "3",
        daytimeDysfunction: "3"
      },
      {
        key: "3",
        week: "第三周",
        sleepQuality: "3",
        sleepTime: "1.5",
        sleepingTime: "3",
        sleepEfficiency: "3",
        sleepDisorder: "1",
        sleepMedicine: "2",
        daytimeDysfunction: "3"
      },

      {
        key: "4",
        week: "第四周",
        sleepQuality: "2",
        sleepTime: "1",
        sleepingTime: "3",
        sleepEfficiency: "2",
        sleepDisorder: "1",
        sleepMedicine: "4",
        daytimeDysfunction: "3"
      }
    ];

    return (
      <div>
        <Card className="basic">
          <Descriptions bordered title="Custom Size" title="患者基本信息">
            <Descriptions.Item label="失眠持续时间">
              {/* //{scaleInfo.lastingTime} */}
              {"三个月"}
            </Descriptions.Item>
            <Descriptions.Item label="现在是否服用药物?">
              {"是"}
              {/* {scaleInfo.isNowMedicine === false ? "否":"是"} */}
            </Descriptions.Item>
            <Descriptions.Item label="既往是否服用药物?">
              {"否"}
              {/* {scaleInfo.isPastMedicine === false ? "否":"是"} */}
            </Descriptions.Item>
            <Descriptions.Item label="父母兄弟是否存在失眠?">
              {"否"}
              {/* {scaleInfo.isGenetic === false ? "否" : "是"} */}
            </Descriptions.Item>
            <Descriptions.Item label="是否打鼾?">
              {"否"}
              {/* {scaleInfo.isSnoring === false ? "否" : "是"} */}
            </Descriptions.Item>
            <Descriptions.Item label="睡觉时腿是否抽动酸痛?">
              {"是"}
              {/* {scaleInfo.isPain === false ? "否" : "是"} */}
            </Descriptions.Item>
            <Descriptions.Item label="睡觉时双腿是否有虫爬感、刺痛感、瘙痒感?">
              {/* {scaleInfo.isItch === false ? "否" : "是"} */}
              {"否"}
            </Descriptions.Item>
            <Descriptions.Item label="出现这些感觉时是否有移动双腿的冲动?">
              {/* {scaleInfo.isMoveLegs === false ? "否" : "是"} */}
              {"是"}
            </Descriptions.Item>
            <Descriptions.Item label="是否首次失眠?">
              {/* {scaleInfo.isMoveLegs === false ? "否" : "是"} */}
              {"是"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card className="table">
          <Descriptions title="患者睡眠状况表"></Descriptions>
          <Table columns={columns} dataSource={data} />
        </Card>
        <Card className="bar">
          <ReactEcharts option={option} />
        </Card>
      </div>
    );
  };
  render() {
    const title = `量表展示——${this.props.currentRecord.medId}_${this.props.currentRecord.name}`;
    return (
      <Modal
        visible={this.props.modalVisible}
        title={title}
        width="1200px"
        onCancel={() => this.props.handleModalVisible(false, "scaleInfo")}
        onOk={this.handleClinicalSubmit}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

export default Form.create()(ScaleForm);
