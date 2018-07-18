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
import MonthlyDataImport from '@views/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataImport/MonthlyDataImport'
import MonthlyDataQuery from '@views/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataQuery/MonthlyDataQuery'
import AnnualDataManage from '@views/dataManage/indexDataManage/AnnualDataManage/AnnualDataManage'
import AnnualDataImport from '@views/dataManage/indexDataManage/AnnualDataManage/AnnualDataImport/AnnualDataImport'
import AnnualDataQuery from '@views/dataManage/indexDataManage/AnnualDataManage/AnnualDataQuery/AnnualDataQuery'
import QuarterlyDataManage from '@views/dataManage/indexDataManage/QuarterlyDataManage/QuarterlyDataManage'
import QuarterlyDataImport from '@views/dataManage/indexDataManage/QuarterlyDataManage/QuarterlyDataImport/QuarterlyDataImport'
import QuarterlyDataQuery from '@views/dataManage/indexDataManage/QuarterlyDataManage/QuarterlyDataQuery/QuarterlyDataQuery'
import RelationAnalyse from "@views/basicAnalyseTool/RelationAnalyse/RelationAnalyse";
import SeasonalAdjustment from "@views/basicAnalyseTool/SeasonalAdjustment/SeasonalAdjustment";
import PeakValleyGraphicAnalysis from "@views/basicAnalyseTool/PeakValleyGraphicAnalysis/PeakValleyGraphicAnalysis";
import CompoundConsistentIndex from "@views/basicAnalyseTool/CompoundConsistentIndex/CompoundConsistentIndex";
import PrimarySelectedIndex from "@views/basicAnalyseTool/PrimarySelectedIndex/PrimarySelectedIndex";
import ThematicAnalysisManagement from "@views/modelConfig/ThematicAnalysisManagement/ThematicAnalysisManagement";
import SDIndexConfiguration from "@views/modelConfig/synDiffIndexSetting/IndexConfiguration/IndexConfiguration";
import SDIndexPortfolioManage from "@views/modelConfig/synDiffIndexSetting/IndexPortfolioManage/IndexPortfolioManage";
import PSLIndexConfiguration from "@views/modelConfig/prosSignalLampSetting/IndexConfiguration/IndexConfiguration";
import PSLIndexPortfolioManage from "@views/modelConfig/prosSignalLampSetting/IndexPortfolioManage/IndexPortfolioManage";
import MCSignalIndexMonitor from "@views/modelConfig/SignalIndexMonitor/SignalIndexMonitor";
import IndexThresholdManage from "@views/modelConfig/IndexThresholdManage/IndexThresholdManage";
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
import SIFModelListView from "@views/prosperityForecast/singleIndexForecast/ModelListView/ModelListView";
import NewSingleIndexModel from "@views/prosperityForecast/singleIndexForecast/NewSingleIndexModel/NewSingleIndexModel";
import SynIndexModelListView from "@views/prosperityForecast/synIndexPrediction/SynIndexModelListView/SynIndexModelListView";
import NewSynIndexModel from "@views/prosperityForecast/synIndexPrediction/NewSynIndexModel/NewSynIndexModel";
import SPFModelListView from "@views/prosperityForecast/SyntheticalProsForecast/ModelListView/ModelListView";
import NewSynProsForeModel from "@views/prosperityForecast/SyntheticalProsForecast/NewSynProsForeModel/NewSynProsForeModel";
import IPFModelListView from "@views/prosperityForecast/InflectionPointForecast/ModelListView/ModelListView";
import NewInfPointForeModel from "@views/prosperityForecast/InflectionPointForecast/NewInfPointForeModel/NewInfPointForeModel"
import FirstLevelThemeConfig from "@views/displayLayerConfig/FirstLevelThemeConfig/FirstLevelThemeConfig";
import SecondLevelIndexConfig from "@views/displayLayerConfig/SecondLevelIndexConfig/SecondLevelIndexConfig";
import AreaComparisonConfig from "@views/displayLayerConfig/AreaComparisonConfig/AreaComparisonConfig";
import CommentManage from "@views/displayLayerConfig/CommentManage/CommentManage";
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
            <Route path='/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataQuery' component={MonthlyDataQuery}/>
            <Route path='/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataImport' component={MonthlyDataImport}/>
            <Route path='/dataManage/indexDataManage/AnnualDataManage' component={AnnualDataManage}/>
            <Route path='/dataManage/indexDataManage/AnnualDataManage/AnnualDataQuery' component={AnnualDataQuery}/>
            <Route path='/dataManage/indexDataManage/AnnualDataManage/AnnualDataImport' component={AnnualDataImport}/>
            <Route path='/dataManage/indexDataManage/QuarterlyDataManage' component={QuarterlyDataManage}/>
            <Route path='/dataManage/indexDataManage/QuarterlyDataManage/QuarterlyDataQuery' component={QuarterlyDataQuery}/>
            <Route path='/dataManage/indexDataManage/QuarterlyDataManage/QuarterlyDataImport' component={QuarterlyDataImport}/>


          /*
            基本分析工具
           */
            <Route path='/basicAnalyseTool/RelationAnalyse' component={RelationAnalyse}/>
            <Route path='/basicAnalyseTool/SeasonalAdjustment' component={SeasonalAdjustment}/>
            <Route path='/basicAnalyseTool/PeakValleyGraphicAnalysis' component={PeakValleyGraphicAnalysis}/>
            <Route path='/basicAnalyseTool/CompoundConsistentIndex' component={CompoundConsistentIndex}/>
            <Route path='/basicAnalyseTool/PrimarySelectedIndex' component={PrimarySelectedIndex}/>

            /*
            模型配置
             */

            <Route path='/modelConfig/ThematicAnalysisManagement' component={ThematicAnalysisManagement}/>
            <Route path='/modelConfig/synDiffIndexSetting/IndexConfiguration' component={SDIndexConfiguration}/>
            <Route path='/modelConfig/synDiffIndexSetting/IndexPortfolioManage' component={SDIndexPortfolioManage}/>
            <Route path='/modelConfig/prosSignalLampSetting/IndexConfiguration' component={PSLIndexConfiguration}/>
            <Route path='/modelConfig/prosSignalLampSetting/IndexPortfolioManage' component={PSLIndexPortfolioManage}/>
            <Route path='/modelConfig/SignalIndexMonitor' component={MCSignalIndexMonitor}/>
            <Route path='/modelConfig/IndexThresholdManage' component={IndexThresholdManage}/>

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

            <Route path='/prosperityForecast/singleIndexForecast/ModelListView' component={SIFModelListView}/>
            <Route path='/prosperityForecast/singleIndexForecast/NewSingleIndexModel' component={NewSingleIndexModel}/>
            <Route path='/prosperityForecast/synIndexPrediction/SynIndexModelListView' component={SynIndexModelListView}/>
            <Route path='/prosperityForecast/synIndexPrediction/NewSynIndexModel' component={NewSynIndexModel}/>
            <Route path='/prosperityForecast/SyntheticalProsForecast/ModelListView' component={SPFModelListView}/>
            <Route path='/prosperityForecast/SyntheticalProsForecast/NewSynProsForeModel' component={NewSynProsForeModel}/>
            <Route path='/prosperityForecast/InflectionPointForecast/ModelListView' component={IPFModelListView}/>
            <Route path='/prosperityForecast/InflectionPointForecast/NewInfPointForeModel' component={NewInfPointForeModel}/>

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