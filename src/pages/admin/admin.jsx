import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd'
import { Switch, Redirect, Route } from 'react-router-dom';
import menuList from '../../config/menuConfig'
import LeftNav from './../../components/left-nav/LeftNav';
import Header from '../../components/header/Header'
import Introduction from '../../components/introduction/Introduction';
import Home from './../../components/home/Home';
import Assist from './../../components/assist/Assist';
import Assist2 from './../../components/assist/Assist2';
import './admin.less'
import InformationManagement from '../../components/userManagement/UserInformationManagement';
import kangfuManagement from '../../components/userManagement/kangfu';
import LabelInformationManagement from './../../components/labelManagement/LabelInformationManagement';
import infradAnalysis from './../../components/labelManagement/infradAnalysis';
import nirsAnalysis from './../../components/labelManagement/nirsAnalysis';
import infradAnalysis2 from '../../components/labelManagement/infradAnalysis2';

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
              <Redirect from='/' exact to='/home' />
              <Route path='/home'  component={Home} />
              <Route path='/informationManagement'  component={InformationManagement} />
              <Route path='/introduction' component={Introduction} />
              <Route path='/assist' component={Assist} />
              <Route path='/assist2' component={Assist2} />
              <Route path='/labelInformationManagement' component={LabelInformationManagement} />
              <Route path='/infradAna' component={infradAnalysis} />
              <Route path='/infradAna2' component={infradAnalysis2} />
              <Route path='/nirsAna' component={nirsAnalysis} />
              <Route path='/kangfu' component={kangfuManagement} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Admin