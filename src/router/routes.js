import compoundConsistentIndex from "../views/basicAnalyseTool/compoundConsistentIndex/compoundConsistentIndex";
import primarySelectedIndex from "../views/basicAnalyseTool/primarySelectedIndex/primarySelectedIndex";

const routes = new Map([
    ['systemManage','系统管理'],
    ['UserAuthorityManage','用户与权限管理'],
    ['ApartmentManage','部门管理'],
    ['UserManage','用户管理'],
    ['UserGroupManage','用户组管理'],
    ['RoleManage','角色管理'],
    ['ModulesManage','模块管理'],
    ['dataManage','数据管理'],
    ['economicIndicatorsSetting','经济指标设置'],
    ['IndInfoManage','指标信息管理'],
    ['IndDataManage','指标数据项管理'],
    ['IndProviderManage','指标提供者管理'],
    ['IndTypeManage','指标类型管理'],
    ['basicAnalyseTool','基本分析工具'],
    ['relationAnalyse','相关性分析'],
    ['IndTypeManage','指标类别管理'],
    ['indexDataManage','指标数据管理'],
    ['MonthlyDataManage','月度数据管理'],
    ['MonthlyDataImport','月度数据导入'],
    ['MonthlyDataQuery','月度数据查询'],
    ['AnnualDataManage','年度数据管理'],
    ['AnnualDataImport','年度数据导入'],
    ['AnnualDataQuery','年度数据查询'],
    ['QuarterlyDataManage','季度数据管理'],
    ['QuarterlyDataImport','季度数据导入'],
    ['QuarterlyDataQuery','季度数据查询'],
    ['seasonalAdjustment','季节调整'],
    ['peakValleyGraphicAnalysis','峰谷图形分析'],
    ['compoundConsistentIndex','复合一致指标'],
    ['primarySelectedIndex','指标初选'],
])

export default  routes