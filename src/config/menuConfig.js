const menuList = [
  {
    title: '首页',
    path: '/home',
    icon: 'home'
  },
  // {
  //   title: '采集流程介绍',
  //   path: '/introduction',
  //   icon: 'project'
  // },
  {
    title: '患者信息管理',
    path: '/informationManagement',
    icon: 'user'
  },
  {
    title: '近红外标注管理',
    path: '/labelInformationManagement',
    icon: 'form'
  },
  
  // {
  //   title: '数据采集模块',
  //   path: '/collection',
  //   icon: 'appstore',
  //   children: [ // 子菜单列表
  //     {
  //       title: '采集模块简介',
  //       path: '/collection/introduction',
  //       icon: 'bars'
  //     },
  //     {
  //       title: '数据采集',
  //       path: '/collection/data-collection',
  //       icon: 'tool'
  //     },
  //     {
  //       title: '标注数据列表',
  //       path: '/collection/label-data-list',
  //       icon: 'tool'
  //     },
  //   ]
  // },

  {
    title: '红外热像智能分析',
    path: '/assist1',
    icon: 'bulb',
    children: ['失眠症辅助诊疗','颈椎病辅助诊疗'],
  },
  {
    title: '近红外光谱智能分析',
    path: '/assist2',
    icon: 'bulb',
    children: ['失眠症辅助诊疗'],
  },
  
  // {
  //   title: '失眠症辅助诊疗',
  //   path: '/assist1',
  //   icon: 'bulb',
  //   children: ['红外热像辅助诊断','近红外光谱辅助诊断','自测量表辅助诊断','相似病历检索','电子病历辅助诊'],
  //   subtitle1: '红外热像辅助诊断',
  //   subpath1: '/infradAna',
  //   subtitle2: '近红外光谱辅助诊断',
  //   subpath2: '/nirsAna',
  //   subtitle3: '自测量表辅助诊断',
  //   subpath3: '/scaleAna',
  //   subtitle4: '相似病历检索',
  //   subpath4: '/similarAna',
  //   subtitle5: '电子病历辅助诊断',
  //   subpath5: '/recardAna',
  // },
  // {
  //   title: '颈椎病辅助诊疗',
  //   path: '/assist2',
  //   icon: 'bulb',
  //   children: ['红外热像辅助诊断','近红外光谱辅助诊断','自测量表辅助诊断','相似病历检索','电子病历辅助诊'],
  // },
  // {
  //   title: '乳腺癌辅助诊疗',
  //   path: '/assist3',
  //   icon: 'bulb',
  //   children: ['红外热像辅助诊断','近红外光谱辅助诊断','自测量表辅助诊断','相似病历检索','电子病历辅助诊'],
  // },
  // {
  //   title: '康复评估',
  //   path: '/kangfu',
  //   icon: 'form'
  // },
  // {
  //   title: '个人中心',
  //   path: '/person',
  //   icon: 'user'
  // },


]
export default menuList