import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd'
import { Switch, Redirect, Route } from 'react-router-dom';
import menuList from '../../config/menuConfig'
import LeftNav from './../../components/left-nav/LeftNav';
import Header from '../../components/header/Header'
import Introduction from '../../components/introduction/Introduction';
import Home from './../../components/home/Home';
import Assist from './../../components/assist/Assist';
import RecordQuery from './../../components/recordQuery/RecordQuery';
import TextAnalysis from './../../components/recordQuery/TextAnalysis';
import RecordUpload from './../../components/recordUpload/RecordUpload';
import Infrared from '../../components/recovery/Infrared';
import Tongue from '../../c../../components/recovery/Tongue'
import Pulse from '../../components/recovery/Pulse';
import TextRecord from '../../components/recovery/TextRecord'
import Medicine from '../../components/recovery/Medicine';

import './admin.less'
import InformationManagement from '../../components/userManagement/UserInformationManagement';
import LabelInformationManagement from './../../components/labelManagement/LabelInformationManagement';

const { Sider, Content } = Layout
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      // 如果当前item对象的key与path一样,item的title就是需要显示的title
      if (item.path === path) {
        title = item.title
      } else if (item.children) {
        // 如果当前item有子项，在所有子item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.path) === 0)
        if (cItem) {
          // 如果存在说明匹配成功
          title = cItem.title
        }
      }
    })
    return title
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{ height: '100vh' }} className="sider">
          <LeftNav path={this.props.location.pathname}></LeftNav>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Breadcrumb className='my-breadcrumb'>
            <Breadcrumb.Item>{this.getTitle()}</Breadcrumb.Item>
          </Breadcrumb>
          <Content>
            <Switch>
              <Redirect from='/admin' exact to='/admin/home' />
              <Route path='/admin/home'  component={Home} />
              <Route path='/admin/informationManagement'  component={InformationManagement} />
              <Route path='/admin/introduction' component={Introduction} />
              <Route path='/admin/assist' component={Assist} />
              <Route path='/admin/labelInformationManagement' component={LabelInformationManagement} />
              <Route path='/admin/recordQuery' component={RecordQuery} />
              <Route path='/admin/textAnalysis/:id' component={TextAnalysis} />
              <Route path='/admin/recordUpload' component={RecordUpload} />
              <Route path='/admin/recovery/infrared' component={Infrared} />
              <Route path='/admin/recovery/tongue' component={Tongue} />
              <Route path='/admin/recovery/pulse' component={Pulse} />
              <Route path='/admin/recovery/textRecord' component={TextRecord} />
              <Route path='/admin/recovery/medicine' component={Medicine} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Admin