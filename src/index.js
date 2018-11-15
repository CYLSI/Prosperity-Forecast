import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { hashHistory,Route,Router } from 'react-router';
import 'element-theme-default';
import registerServiceWorker from './registerServiceWorker';
import ApartmentManage from "@views/systemManage/UserAuthorityManage/ApartmentManage/ApartmentManage";
import ModulesManage from "@views/systemManage/UserAuthorityManage/ModulesManage/ModulesManage";
import RoleManage from "@views/systemManage/UserAuthorityManage/RoleManage/RoleManage";
import UserGroupManage from "@views/systemManage/UserAuthorityManage/UserGroupManage/UserGroupManage";
import UserManage from "@views/systemManage/UserAuthorityManage/UserManage/UserManage";
import IndInfoManage from '@views/dataManage/economicIndicatorsSetting/IndInfoManage/IndInfoManage'
import IndDataManage from '@views/dataManage/economicIndicatorsSetting/IndDataManage/IndDataManage'
import IndProviderManage from '@views/dataManage/economicIndicatorsSetting/IndProviderManage/IndProviderManage'
import IndTypeManage from '@views/dataManage/economicIndicatorsSetting/IndTypeManage/IndTypeManage'
import MonthlyDataManage from '@views/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataManage'
import AnnualDataManage from '@views/dataManage/indexDataManage/AnnualDataManage/AnnualDataManage'
import QuarterlyDataManage from '@views/dataManage/indexDataManage/QuarterlyDataManage/QuarterlyDataManage'
import RelationAnalyse from "@views/basicAnalyseTool/RelationAnalyse/RelationAnalyse";
import SeasonalAdjustment from "@views/basicAnalyseTool/SeasonalAdjustment/SeasonalAdjustment";
import PeakValleyGraphicAnalysis from "@views/basicAnalyseTool/PeakValleyGraphicAnalysis/PeakValleyGraphicAnalysis";
import CompoundConsistentIndex from "@views/basicAnalyseTool/CompoundConsistentIndex/CompoundConsistentIndex";
import PrimarySelectedIndex from "@views/basicAnalyseTool/PrimarySelectedIndex/PrimarySelectedIndex";
import BasicStatistics from "@views/basicAnalyseTool/BasicStatistics/BasicStatistics";
import ThematicAnalysisManagement from "@views/modelConfig/ThematicAnalysisManagement/ThematicAnalysisManagement";
import SDIndexConfiguration from "@views/modelConfig/synDiffIndexSetting/IndexConfiguration/IndexConfiguration";
import SDIndexPortfolioManage from "@views/modelConfig/synDiffIndexSetting/IndexPortfolioManage/IndexPortfolioManage";
import PSLIndexConfiguration from "@views/modelConfig/prosSignalLampSetting/IndexConfiguration/IndexConfiguration";
import PSLIndexPortfolioManage from "@views/modelConfig/prosSignalLampSetting/IndexPortfolioManage/IndexPortfolioManage";
import ADSynIndexCalculation from "@views/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexCalculation/SynIndexCalculation";
import ADSynIndexView from "@views/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexView/SynIndexView";
import ADDiffIndexCalculation from "@views/themeAnalysis/agriculturalDevelopment/diffusionIndex/DiffIndexCalculation/DiffIndexCalculation";
import ADDiffIndexView from "@views/themeAnalysis/agriculturalDevelopment/diffusionIndex/DiffIndexView/DiffIndexView";
import ADSyntheticalProsIndexCal from "@views/themeAnalysis/agriculturalDevelopment/prosSignalLamp/SyntheticalProsIndexCal/SyntheticalProsIndexCal";
import ADProsSignalLampView from "@views/themeAnalysis/agriculturalDevelopment/prosSignalLamp/ProsSignalLampView/ProsSignalLampView";
import ADTASignalIndexMonitor from "@views/themeAnalysis/agriculturalDevelopment/SignalIndexMonitor/SignalIndexMonitor";
import ADTSynIndexCalculation from "@views/themeAnalysis/agriculturalDevelopmentTrend/syntheticIndex/SynIndexCalculation/SynIndexCalculation";
import ADTSynIndexView from "@views/themeAnalysis/agriculturalDevelopmentTrend/syntheticIndex/SynIndexView/SynIndexView";
import ADTDiffIndexCalculation from "@views/themeAnalysis/agriculturalDevelopmentTrend/diffusionIndex/DiffIndexCalculation/DiffIndexCalculation";
import ADTDiffIndexView from "@views/themeAnalysis/agriculturalDevelopmentTrend/diffusionIndex/DiffIndexView/DiffIndexView";
import ADTSyntheticalProsIndexCal from "@views/themeAnalysis/agriculturalDevelopmentTrend/prosSignalLamp/SyntheticalProsIndexCal/SyntheticalProsIndexCal";
import ADTProsSignalLampView from "@views/themeAnalysis/agriculturalDevelopmentTrend/prosSignalLamp/ProsSignalLampView/ProsSignalLampView";
import ADTTASignalIndexMonitor from "@views/themeAnalysis/agriculturalDevelopmentTrend/SignalIndexMonitor/SignalIndexMonitor";
import FirstLevelThemeConfig from "@views/displayLayerConfig/FirstLevelThemeConfig/FirstLevelThemeConfig";
import SecondLevelIndexConfig from "@views/displayLayerConfig/SecondLevelIndexConfig/SecondLevelIndexConfig";
import AreaComparisonConfig from "@views/displayLayerConfig/AreaComparisonConfig/AreaComparisonConfig";
import CommentManage from "@views/displayLayerConfig/CommentManage/CommentManage";
import SingleIndexForecast from "@views/prosperityForecast/SingleIndexForecast/SingleIndexForecast";
import SynIndexPrediction from "@views/prosperityForecast/SynIndexPrediction/SynIndexPrediction";
import SyntheticalProsForecast from "@views/prosperityForecast/SyntheticalProsForecast/SyntheticalProsForecast";
import InflectionPointForecast from "@views/prosperityForecast/InflectionPointForecast/InflectionPointForecast";
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path='/' components={App}>
            /*
              部门管理
            */
            <Route path='/systemManage/UserAuthorityManage/ApartmentManage' component={ApartmentManage}/>
            <Route path='/systemManage/UserAuthorityManage/RoleManage' component={RoleManage}/>
            <Route path='/systemManage/UserAuthorityManage/UserGroupManage' component={UserGroupManage}/>
            <Route path='/systemManage/UserAuthorityManage/UserManage' component={UserManage}/>
            <Route path='/systemManage/UserAuthorityManage/ModulesManage' component={ModulesManage}/>

          /*
            数据管理
           */
            <Route path='/dataManage/economicIndicatorsSetting/IndInfoManage' component={IndInfoManage}/>
            <Route path='/dataManage/economicIndicatorsSetting/IndDataManage' component={IndDataManage}/>
            <Route path='/dataManage/economicIndicatorsSetting/IndTypeManage' component={IndTypeManage}/>
            <Route path='/dataManage/economicIndicatorsSetting/IndProviderManage' component={IndProviderManage}/>
            <Route path='/dataManage/indexDataManage/MonthlyDataManage' component={MonthlyDataManage}/>
            <Route path='/dataManage/indexDataManage/AnnualDataManage' component={AnnualDataManage}/>
            <Route path='/dataManage/indexDataManage/QuarterlyDataManage' component={QuarterlyDataManage}/>


          /*
            基本分析工具
           */
            <Route path='/basicAnalyseTool/RelationAnalyse' component={RelationAnalyse}/>
            <Route path='/basicAnalyseTool/SeasonalAdjustment' component={SeasonalAdjustment}/>
            <Route path='/basicAnalyseTool/PeakValleyGraphicAnalysis' component={PeakValleyGraphicAnalysis}/>
            <Route path='/basicAnalyseTool/CompoundConsistentIndex' component={CompoundConsistentIndex}/>
            <Route path='/basicAnalyseTool/PrimarySelectedIndex' component={PrimarySelectedIndex}/>
            <Route path='/basicAnalyseTool/BasicStatistics' component={BasicStatistics}/>

            /*
            模型配置
             */

            <Route path='/modelConfig/ThematicAnalysisManagement' component={ThematicAnalysisManagement}/>
            <Route path='/modelConfig/synDiffIndexSetting/IndexConfiguration' component={SDIndexConfiguration}/>
            <Route path='/modelConfig/synDiffIndexSetting/IndexPortfolioManage' component={SDIndexPortfolioManage}/>
            <Route path='/modelConfig/prosSignalLampSetting/IndexConfiguration' component={PSLIndexConfiguration}/>
            <Route path='/modelConfig/prosSignalLampSetting/IndexPortfolioManage' component={PSLIndexPortfolioManage}/>

            /*
            主题分析
             */

            <Route path='/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexCalculation' component={ADSynIndexCalculation}/>
            <Route path='/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexView' component={ADSynIndexView}/>
            <Route path='/themeAnalysis/agriculturalDevelopment/diffusionIndex/DiffIndexCalculation' component={ADDiffIndexCalculation}/>
            <Route path='/themeAnalysis/agriculturalDevelopment/diffusionIndex/DiffIndexView' component={ADDiffIndexView}/>
            <Route path='/themeAnalysis/agriculturalDevelopment/prosSignalLamp/SyntheticalProsIndexCal' component={ADSyntheticalProsIndexCal}/>
            <Route path='/themeAnalysis/agriculturalDevelopment/prosSignalLamp/ProsSignalLampView' component={ADProsSignalLampView}/>
            <Route path='/themeAnalysis/agriculturalDevelopment/SignalIndexMonitor' component={ADTASignalIndexMonitor}/>
            <Route path='/themeAnalysis/agriculturalDevelopmentTrend/syntheticIndex/SynIndexCalculation' component={ADTSynIndexCalculation}/>
            <Route path='/themeAnalysis/agriculturalDevelopmentTrend/syntheticIndex/SynIndexView' component={ADTSynIndexView}/>
            <Route path='/themeAnalysis/agriculturalDevelopmentTrend/diffusionIndex/DiffIndexCalculation' component={ADTDiffIndexCalculation}/>
            <Route path='/themeAnalysis/agriculturalDevelopmentTrend/diffusionIndex/DiffIndexView' component={ADTDiffIndexView}/>
            <Route path='/themeAnalysis/agriculturalDevelopmentTrend/prosSignalLamp/SyntheticalProsIndexCal' component={ADTSyntheticalProsIndexCal}/>
            <Route path='/themeAnalysis/agriculturalDevelopmentTrend/prosSignalLamp/ProsSignalLampView' component={ADTProsSignalLampView}/>
            <Route path='/themeAnalysis/agriculturalDevelopmentTrend/SignalIndexMonitor' component={ADTTASignalIndexMonitor}/>

            /*
            景气预测
             */

            <Route path='/prosperityForecast/SingleIndexForecast' component={SingleIndexForecast}/>
            <Route path='/prosperityForecast/SynIndexPrediction' component={SynIndexPrediction}/>
            <Route path='/prosperityForecast/SyntheticalProsForecast' component={SyntheticalProsForecast}/>
            <Route path='/prosperityForecast/InflectionPointForecast' component={InflectionPointForecast}/>

            /*
            展示层配置
             */

            <Route path='/displayLayerConfig/FirstLevelThemeConfig' component={FirstLevelThemeConfig}/>
            <Route path='/displayLayerConfig/SecondLevelIndexConfig' component={SecondLevelIndexConfig}/>
            <Route path='/displayLayerConfig/AreaComparisonConfig' component={AreaComparisonConfig}/>
            <Route path='/displayLayerConfig/CommentManage' component={CommentManage}/>


        </Route>
    </Router>
), document.getElementById('root'));
registerServiceWorker();