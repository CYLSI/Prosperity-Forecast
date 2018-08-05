import React, { Component } from 'react';
import '../../App.css';
import './Menu.css';
import { Layout,Menu } from 'element-react';
import { Link } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import BasicStatistics from "../../views/basicAnalyseTool/BasicStatistics/BasicStatistics";

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
                                    <Link to='/dataManage/indexDataManage/QuarterlyDataManage'>
                                    <Menu.SubMenu index="8" title={<p className="el-submenu__titles">季度数据管理</p>}>
                                        <Link to='/dataManage/indexDataManage/QuarterlyDataManage/QuarterlyDataQuery'><Menu.Item index="8-1">季度数据查询</Menu.Item></Link>
                                        <Link to= '/dataManage/indexDataManage/QuarterlyDataManage/QuarterlyDataImport'><Menu.Item index="8-2">季度数据导入</Menu.Item></Link>
                                    </Menu.SubMenu>
                                    </Link>
                                    <Link to='/dataManage/indexDataManage/AnnualDataManage'>
                                    <Menu.SubMenu index="9" title={<p className="el-submenu__titles">年度数据管理</p>}>
                                        <Link to='/dataManage/indexDataManage/AnnualDataManage/AnnualDataQuery'><Menu.Item index="9-1">年度数据查询</Menu.Item></Link>
                                        <Link to= '/dataManage/indexDataManage/AnnualDataManage/AnnualDataImport'><Menu.Item index="9-2">年度数据导入</Menu.Item></Link>
                                    </Menu.SubMenu>
                                    </Link>
                            </Menu.SubMenu>
                            </Menu.SubMenu>

                            <Menu.SubMenu index="10" title={<span>基本分析工具</span>}>
                                <Link to='/basicAnalyseTool/PrimarySelectedIndex'><Menu.Item index="10-1">指标初选</Menu.Item></Link>
                                <Link to='/basicAnalyseTool/BasicStatistics'><Menu.Item index="10-2">基本统计量</Menu.Item></Link>
                                <Link to='/basicAnalyseTool/RelationAnalyse'><Menu.Item index="10-3">相关性分析</Menu.Item></Link>
                                <Link to='/basicAnalyseTool/SeasonalAdjustment'><Menu.Item index="10-4">季节调整</Menu.Item></Link>
                                <Link to='/basicAnalyseTool/PeakValleyGraphicAnalysis'><Menu.Item index="10-5">峰谷图形分析</Menu.Item></Link>
                                <Link to='/basicAnalyseTool/CompoundConsistentIndex'><Menu.Item index="10-6">复合一致指标</Menu.Item></Link>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="11" title={<span>模型配置</span>}>
                                <Link to='/modelConfig/ThematicAnalysisManagement'><Menu.Item index="11-1">主题分析管理</Menu.Item></Link>
                                <Menu.SubMenu index='12' title={<p>合成/扩散指数指标设置</p>}>
                                    <Link to='/modelConfig/synDiffIndexSetting/IndexConfiguration'><Menu.Item index="12-1">指标配置</Menu.Item></Link>
                                    <Link to='/modelConfig/synDiffIndexSetting/IndexPortfolioManage'><Menu.Item index="12-2">指标组合管理</Menu.Item></Link>
                                </Menu.SubMenu>
                                <Menu.SubMenu index='13' title={<p>景气信号灯设置</p>}>
                                    <Link to='/modelConfig/prosSignalLampSetting/IndexConfiguration'><Menu.Item index="13-1">指标配置</Menu.Item></Link>
                                    <Link to='/modelConfig/prosSignalLampSetting/IndexPortfolioManage'><Menu.Item index="13-2">指标组合管理</Menu.Item></Link>
                                </Menu.SubMenu>
                                <Link to='/modelConfig/SignalIndexMonitor'><Menu.Item index="11-2">单指标监测</Menu.Item></Link>
                                <Link to='/modelConfig/IndexThresholdManage'><Menu.Item index="11-3">指标阈值管理</Menu.Item></Link>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="14" title={<span>主题分析</span>}>
                                <Menu.SubMenu index='15' title={<p>农业发展</p>}>
                                    <Menu.SubMenu index='16' title={<p className="menu_secondLevelP">合成指数</p>}>
                                        <Link to='/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexCalculation'><Menu.Item index="16-1">合成指数计算</Menu.Item></Link>
                                        <Link to='/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexView'><Menu.Item index="16-2">合成指数查看</Menu.Item></Link>
                                    </Menu.SubMenu>
                                    <Menu.SubMenu index='17' title={<p className="menu_secondLevelP">扩散指数</p>}>
                                        <Link to='/themeAnalysis/agriculturalDevelopment/diffusionIndex/DiffIndexCalculation'><Menu.Item index="17-1">扩散指数计算</Menu.Item></Link>
                                        <Link to='/themeAnalysis/agriculturalDevelopment/diffusionIndex/DiffIndexView'><Menu.Item index="17-2">扩散指数查看</Menu.Item></Link>
                                    </Menu.SubMenu>
                                    <Menu.SubMenu index='18' title={<p className="menu_secondLevelP">景气信号灯</p>}>
                                        <Link to='/themeAnalysis/agriculturalDevelopment/prosSignalLamp/SyntheticalProsIndexCal'><Menu.Item index="18-1">综合景情指数计算</Menu.Item></Link>
                                        <Link to='/themeAnalysis/agriculturalDevelopment/prosSignalLamp/ProsSignalLampView'><Menu.Item index="18-2">景气信号灯查看</Menu.Item></Link>
                                    </Menu.SubMenu>
                                    <Link to='/themeAnalysis/agriculturalDevelopment/SignalIndexMonitor'><Menu.Item index="15-1">单指标监测</Menu.Item></Link>
                                </Menu.SubMenu>
                                <Menu.SubMenu index='19' title={<p>农业发展趋势</p>}>
                                    <Menu.SubMenu index='20' title={<p className="menu_secondLevelP">合成指数</p>}>
                                        <Link to='/themeAnalysis/agriculturalDevelopmentTrend/syntheticIndex/SynIndexCalculation'><Menu.Item index="20-1">合成指数计算</Menu.Item></Link>
                                        <Link to='/themeAnalysis/agriculturalDevelopmentTrend/syntheticIndex/SynIndexView'><Menu.Item index="20-2">合成指数查看</Menu.Item></Link>
                                    </Menu.SubMenu>
                                    <Menu.SubMenu index='21' title={<p className="menu_secondLevelP">扩散指数</p>}>
                                        <Link to='/themeAnalysis/agriculturalDevelopmentTrend/diffusionIndex/DiffIndexCalculation'><Menu.Item index="21-1">扩散指数计算</Menu.Item></Link>
                                        <Link to='/themeAnalysis/agriculturalDevelopmentTrend/diffusionIndex/DiffIndexView'><Menu.Item index="21-2">扩散指数查看</Menu.Item></Link>
                                    </Menu.SubMenu>
                                    <Menu.SubMenu index='22' title={<p className="menu_secondLevelP">景气信号灯</p>}>
                                        <Link to='/themeAnalysis/agriculturalDevelopmentTrend/prosSignalLamp/SyntheticalProsIndexCal'><Menu.Item index="22-1">综合景情指数计算</Menu.Item></Link>
                                        <Link to='/themeAnalysis/agriculturalDevelopmentTrend/prosSignalLamp/ProsSignalLampView'><Menu.Item index="22-2">景气信号灯查看</Menu.Item></Link>
                                    </Menu.SubMenu>
                                    <Link to='/themeAnalysis/agriculturalDevelopmentTrend/SignalIndexMonitor'><Menu.Item index="19-1">单指标监测</Menu.Item></Link>
                                </Menu.SubMenu>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="23" title={<span>景气预测</span>}>
                                <Menu.SubMenu index='24' title={<p>单指标预测</p>}>
                                    <Link to='/prosperityForecast/singleIndexForecast/ModelListView'><Menu.Item index="24-1">查看模型列表</Menu.Item></Link>
                                    <Link to='/prosperityForecast/singleIndexForecast/NewSingleIndexModel'><Menu.Item index="24-2">新建单指标模型</Menu.Item></Link>
                                </Menu.SubMenu>
                                <Menu.SubMenu index='25' title={<p>合成指数预测</p>}>
                                    <Link to='/prosperityForecast/synIndexPrediction/SynIndexModelListView'><Menu.Item index="25-1">查看合成指数模型列表</Menu.Item></Link>
                                    <Link to='/prosperityForecast/synIndexPrediction/NewSynIndexModel'><Menu.Item index="25-2">新建合成指数模型</Menu.Item></Link>
                                </Menu.SubMenu>
                                <Menu.SubMenu index='26' title={<p>综合景情预测</p>}>
                                    <Link to='/prosperityForecast/SyntheticalProsForecast/ModelListView'><Menu.Item index="26-1">查看模型列表</Menu.Item></Link>
                                    <Link to='/prosperityForecast/SyntheticalProsForecast/NewSynProsForeModel'><Menu.Item index="26-2">新建综合景情预测模型</Menu.Item></Link>
                                </Menu.SubMenu>
                                <Menu.SubMenu index='27' title={<p>拐点预测</p>}>
                                    <Link to='/prosperityForecast/InflectionPointForecast/ModelListView'><Menu.Item index="27-1">查看模型列表</Menu.Item></Link>
                                    <Link to='/prosperityForecast/InflectionPointForecast/NewInfPointForeModel'><Menu.Item index="27-2">新建拐点预测模型</Menu.Item></Link>
                                </Menu.SubMenu>
                            </Menu.SubMenu>
                            <Menu.SubMenu index="28" title={<span>展示层配置</span>}>
                                <Link to='/displayLayerConfig/FirstLevelThemeConfig'><Menu.Item index="28-1">配置一级主题</Menu.Item></Link>
                                <Link to='/displayLayerConfig/SecondLevelIndexConfig'><Menu.Item index="28-2">配置二级指标</Menu.Item></Link>
                                <Link to='/displayLayerConfig/AreaComparisonConfig'><Menu.Item index="28-3">配置区域对比</Menu.Item></Link>
                                <Link to='/displayLayerConfig/CommentManage'><Menu.Item index="28-4">展示层评论管理</Menu.Item></Link>
                            </Menu.SubMenu>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Col>
        );
    }
}


export default Menus;