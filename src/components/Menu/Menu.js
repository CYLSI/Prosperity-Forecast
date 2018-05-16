import React, { Component } from 'react';
import '../../App.css';
import './Menu.css';
import { Layout,Menu } from 'element-react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Menus extends Component{

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render(){
        return(
                <Layout.Col span={5}>
                    <Menu className="el-menu-vertical-demo" defaultOpeneds={['1']} uniqueOpened = {true} >
                        <Menu.SubMenu className={this.props.className} index="1" title="首页">
                            <Menu.SubMenu index='2' title={<span>系统管理</span>}>
                                <Menu.SubMenu index='3' title={<p>用户与权限管理</p>}>
                                    <Link to='/contents/ApartmentManage'><Menu.Item index="3-1">部门管理</Menu.Item></Link>
                                    <Link to='/contents/UserManage'><Menu.Item index="3-2">用户管理</Menu.Item></Link>
                                    <Link to='/contents/UserGroupManage'><Menu.Item index="3-3">用户组管理</Menu.Item></Link>
                                    <Link to='/contents/RoleManage'><Menu.Item index="3-4">角色管理</Menu.Item></Link>
                                    <Link to='/contents/ModulesManage'><Menu.Item index="3-5">模块管理</Menu.Item></Link>
                                </Menu.SubMenu>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="4" title={<span>数据管理</span>}>
                              <Menu.SubMenu index='5' title={<p>经济指标设置</p>}>
                                  <Link to='/dataManage/economicIndicatorsSetting/IndInfoManage'><Menu.Item index="3-1">指标信息管理</Menu.Item></Link>
                                  <Link to='/contents/economicIndicatorsSetting/UserManage'><Menu.Item index="3-2">指标数据项管理</Menu.Item></Link>
                                  <Link to='/contents/economicIndicatorsSetting/UserGroupManage'><Menu.Item index="3-3">指标类别管理</Menu.Item></Link>
                                  <Link to='/contents/economicIndicatorsSetting/RoleManage'><Menu.Item index="3-4">指标提供者管理</Menu.Item></Link>
                              </Menu.SubMenu>
                              </Menu.SubMenu>

                            <Menu.SubMenu index="5" title={<span>基本分析工具</span>}>
                                <Menu.Item index="1-1">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="6" title={<span>模型配置</span>}>
                                <Menu.Item index="1-1">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="7" title={<span>主题分析</span>}>
                                <Menu.Item index="1-1">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="8" title={<span>景气预测</span>}>
                                <Menu.Item index="1-1">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="9" title={<span>展示层配置</span>}>
                                <Menu.Item index="1-1">选项3</Menu.Item>
                            </Menu.SubMenu>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Col>
        );
    }
}


export default Menus;