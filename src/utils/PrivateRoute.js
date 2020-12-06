import  React from 'React';
import { Route, Redirect } from 'react-router-dom';
import { Message } from 'antd';
import { getCookie } from "../pages/home/Home";

const PrivateRoute = ({component: Component, ...props}) => {
    // 解构赋值 将 props 里面的 component 赋值给 Component
    return <Route {...props} render={(p) => {
        const token = getCookie("token");
        if (token){ // 如果登录了, 返回正确的路由
            if(props.path==='/login'){
                return <Redirect to='/home'/>
            }else{
                return <Component />
            }
        } else { // 没有登录就重定向至登录页面
            Message.error("你还未登录，请先登录")
            return <Redirect to='/login'/>
        }
    }}/>
}
export default PrivateRoute