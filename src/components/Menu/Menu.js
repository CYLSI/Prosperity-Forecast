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
                    <Menu className="el-menu-vertical-demo" defaultOpeneds={['1']} uniqueOpened = {true}>
                        <Menu.SubMenu className={this.props.className} index="1" title="首页">
                            <Menu.SubMenu index='2' title={<span>系统管理</span>}>
                                <Menu.SubMenu index='3' title={<p>用户与权限管理</p>}>
                                    <Link to='/systemManage/UserAuthorityManage/ApartmentManage'><Menu.Item index="3-1">部门管理</Menu.Item></Link>
                                    <Link to='/systemManage/UserAuthorityManage/UserManage'><Menu.Item index="3-2">用户管理</Menu.Item></Link>
                                    <Link to='/systemManage/UserAuthorityManage/UserGroupManage'><Menu.Item index="3-3">用户组管理</Menu.Item></Link>
                                    <Link to='/systemManage/UserAuthorityManage/RoleManage'><Menu.Item index="3-4">角色管理</Menu.Item></Link>
                                    <Link to='/systemManage/UserAuthorityManage/ModulesManage'><Menu.Item index="3-5">模块管理</Menu.Item></Link>
                                </Menu.SubMenu>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="4" title={<span>数据管理</span>}>
                              <Menu.SubMenu index='5' title={<p>经济指标设置</p>}>
                                  <Link to='/dataManage/economicIndicatorsSetting/IndInfoManage'><Menu.Item index="5-1">指标信息管理</Menu.Item></Link>
                                  <Link to='/dataManage/economicIndicatorsSetting/IndDataManage'><Menu.Item index="5-2">指标数据项管理</Menu.Item></Link>
                                  <Link to= '/dataManage/economicIndicatorsSetting/IndTypeManage'><Menu.Item index="5-3">指标类别管理</Menu.Item></Link>
                                  <Link to='/dataManage/economicIndicatorsSetting/IndProviderManage'><Menu.Item index="5-4">指标提供者管理</Menu.Item></Link>
                              </Menu.SubMenu>
                                <Menu.SubMenu index='6' title={<p>指标数据管理</p>}>
                                    <Link to='/dataManage/indexDataManage/MonthlyDataManage'>
                                    <Menu.SubMenu index="7" title={<p className="el-submenu__titles">月度数据管理</p>}>
                                        <Link to='/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataQuery'><Menu.Item index="7-1">月度数据查询</Menu.Item></Link>
                                        <Link to= '/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataImport'><Menu.Item index="7-2">月度数据导入</Menu.Item></Link>
                                    </Menu.SubMenu>
                                  </Link>

                                    <Menu.SubMenu index="8" title={<p className="el-submenu__titles">季度数据管理</p>}>
                                        <Link to='/dataManage/indexDataManage/MonthlyDataManage/QuarterlyDataQuery'><Menu.Item index="8-1">季度数据查询</Menu.Item></Link>
                                        <Link to= '/dataManage/indexDataManage/MonthlyDataManage/QuarterlyDataImport'><Menu.Item index="8-2">季度数据导入</Menu.Item></Link>
                                    </Menu.SubMenu>
                                    <Menu.SubMenu index="9" title={<p className="el-submenu__titles">年度数据管理</p>}>
                                        <Link to='/dataManage/indexDataManage/MonthlyDataManage/AnnualDataQuery'><Menu.Item index="9-1">年度数据查询</Menu.Item></Link>
                                        <Link to= '/dataManage/indexDataManage/MonthlyDataManage/AnnualDataImport'><Menu.Item index="9-2">年度数据导入</Menu.Item></Link>
                                    </Menu.SubMenu>
                            </Menu.SubMenu>
                            </Menu.SubMenu>

                            <Menu.SubMenu index="10" title={<span>基本分析工具</span>}>
                              <Link to='/basicAnalyseTool/relationAnalyse'><Menu.Item index="5-1">相关性分析</Menu.Item></Link>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="11" title={<span>模型配置</span>}>
                                <Menu.Item index="11-1">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="12" title={<span>主题分析</span>}>
                                <Menu.Item index="12-1">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="13" title={<span>景气预测</span>}>
                                <Menu.Item index="13-1">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="14" title={<span>展示层配置</span>}>
                                <Menu.Item index="14-1">选项3</Menu.Item>
                            </Menu.SubMenu>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Col>
        );
    }
}


export default Menus;