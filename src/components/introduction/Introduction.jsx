import React, { Component } from "react";
// import ReactEcharts from 'echarts-for-react'
import { Card, Steps } from "antd";
import "./introduction.less";

// 从后台获取
// todo
const labelData = [
  { value: 335, name: "正常患者" },
  { value: 310, name: "多动症患者" },
  { value: 234, name: "未标注数据" }
];

const { Step } = Steps;

// const tabList = [
//   {
//     key: 'tab1',
//     tab: 'tab1',
//   },
//   {
//     key: 'tab2',
//     tab: 'tab2',
//   },
//   {
//     key: 'tab3',
//     tab: 'tab3',
//   },
//   {
//     key: 'tab4',
//     tab: 'tab4',
//   },
// ];

// const contentList = {
//   tab1: <p>操作的患者不在库中，在患者管理页面新建患者，若已经在库中，跳过该步骤</p>,
//   tab2: <p>对患者进行新建任务，选择任务类型并填写干预条件</p>,
//   tab3: <p>若为WCST任务，实验结束后更新测试值</p>,
//   tab4: <p>点击数据存储关联，进行数据关联，匹配对应的红外图像</p>,
// };

class Introduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelData: [],
      // key: 'tab1',
      current: 0
    };
  }

  // onTabChange = (key, type) => {
  //   console.log(key, type);
  //   this.setState({ [type]: key });
  // };

  onChange = current => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  componentDidMount() {
    this.setState({
      labelData: labelData
    });
  }

  render() {
    const { current } = this.state;
    return (
      <div className="main-content">
        <div className="text">
          <Card className="text-left">
            <h2>数据采集系统介绍</h2>
            <h3>
              本系统的主要功能是，对失眠障碍患者的近红外数据进行采集，同时结合其相关疾情信息，用人工智能的方法来分析其内在关系。
              <br />
              希冀能够找到相应的联系，让机器能自动通过近红外采集信息来辅助医师对睡眠障碍患者进行诊疗。
            </h3>
          </Card>
          <Card className="text-right">
            <h2>标注步骤介绍</h2>

            {/* <Card
          style={{ width: '100%' }}
          title="标注步骤介绍"
          extra={<a href="#">More</a>}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        >
          {contentList[this.state.key]}
        </Card> */}
            <Steps
              current={current}
              onChange={this.onChange}
              direction="vertical"
            >
              <Step
                title="第一步"
                description="对新患者进行操作时，需新建患者信息"
              />
              <Step
                title="第二步"
                description="在“患者信息管理”界面对患者添加测试任务，填写相关信息"
              />
              <Step
                title="第三步"
                description="若添加的为WCST任务，实验结束后在“标注信息管理”界面填写可观测指标"
              />
              <Step
                title="第四步"
                description="在“标注信息管理”界面的对应条目下，点击数据存储关联，进行数据关联，匹配对应的红外图像"
              />
            </Steps>
          </Card>
        </div>
      </div>
    );
  }
}

export default Introduction;
