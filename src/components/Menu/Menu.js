import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../App.css';
import ApartmentManage from '../../contents/ApartmentManage/ApartmentManage';
import UserManage from '../../contents/UserManage/UserManage';
import UserGroupManage from '../../contents/UserGroupManage/UserGroupManage';
import RoleManage from '../../contents/RoleManage/RoleManage';
import ModulesManage from '../../contents/ModulesManage/ModulesManage';
import { Layout,Menu } from 'element-react';

class Menus extends Component{
    handleClick (e){
        if(e === "3-1"){
            ReactDOM.render(
                <ApartmentManage/>,
                document.getElementById("context")
            )
        }
        if(e === "3-2"){
            ReactDOM.render(
                <UserManage/>,
                document.getElementById("context")
            )
        }
        if(e === "3-3"){
            ReactDOM.render(
                <UserGroupManage/>,
                document.getElementById("context")
            )
        }
        if(e === "3-4"){
            ReactDOM.render(
                <RoleManage/>,
                document.getElementById("context")
            )
        }
        if(e === "3-5"){
            ReactDOM.render(
                <ModulesManage/>,
                document.getElementById("context")
            )
        }
    }
    render(){
        return(
            <Layout.Col span={5}>
                <Menu className="el-menu-vertical-demo" defaultOpeneds={['1']} onSelect={e => {this.handleClick(e)}} >
                    <Menu.SubMenu index="1" title={<span>首页</span>}>
                        <Menu.SubMenu index='2' title="系统管理">
                            <Menu.SubMenu index='3' title="用户与数据管理">
                                <Menu.Item index="3-1">部门管理</Menu.Item>
                                <Menu.Item index="3-2">用户管理</Menu.Item>
                                <Menu.Item index="3-3">用户组管理</Menu.Item>
                                <Menu.Item index="3-4">角色管理</Menu.Item>
                                <Menu.Item index="3-5">模块管理</Menu.Item>
                            </Menu.SubMenu>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="4" title="数据管理">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="5" title="基本分析工具">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="6" title="模型配置">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="7" title="主题分析">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="8" title="景气预测">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="9" title="展示层配置">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                </Menu>
            </Layout.Col>
        );
    }
}

export default Menus;