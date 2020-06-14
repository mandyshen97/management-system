const menuList = [
  {
    title: '首页',
    path: '/admin/home',
    icon: 'home'
  },
  {
    title: '采集流程介绍',
    path: '/admin/introduction',
    icon: 'project'
  },
  {
    title: '患者信息管理',
    path: '/admin/informationManagement',
    icon: 'user'
  },
  {
    title: '标注信息管理',
    path: '/admin/labelInformationManagement',
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
    title: '智能诊断辅助',
    path: '/admin/assist',
    icon: 'bulb',
  },
  {
    title: '电子病历查询',
    path: '/admin/recordQuery',
    icon: 'file'
  },
  {
    title: '电子病历上传',
    path: '/admin/recordUpload',
    icon: 'upload'
  },
  {
    title: '康复评估',
    path: '/admin/recovery',
    icon: 'switcher',
    children: [
      {
        title: '红外热成像图',
        path: '/admin/recovery/infrared',
        icon: 'image'
      },
      {
        title: '舌象图谱',
        path: '/admin/recovery/tongue',
        // icon: 'fileJpg'
      },
      {
        title: '脉象数据',
        path: '/admin/recovery/pulse',
        // icon: 'line'
      },
      {
        title: '病历文本数据',
        path: '/admin/recovery/textRecord',
        // icon: 'line'
      },
    ]
  },

]
export default menuList
