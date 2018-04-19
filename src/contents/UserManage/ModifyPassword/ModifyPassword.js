import React, { Component } from 'react';
import '../../../App.css';
import './ModifyPassword.css';
import { Layout,Input,Button } from 'element-react';

class ModifyPassword extends Component{
    render(){
        return(
            <div className="ModifyPassword">
                <h3>修改密码</h3>
                <Layout.Col span={30}>
                    <div>您的登录名是：管理员</div>
                    <div>请输入您的密码：<Input className="inline-input"/></div>
                    <div>请输入新密码：<Input className="inline-input"/>10位以内数字字母</div>
                    <Button type="primary" size="small">修改</Button>
                    <Button type="primary" size="small">返回</Button>
                </Layout.Col>
            </div>
        );
    }
}

export default ModifyPassword;