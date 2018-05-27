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
import UserManageAuthorization from '@views/systemManage/UserAuthorityManage/UserManage/UserManageAuthorization/UserManageAuthorization';
import IndInfoManage from '@views/dataManage/economicIndicatorsSetting/IndInfoManage/IndInfoManage'
import IndDataManage from '@views/dataManage/economicIndicatorsSetting/IndDataManage/IndDataManage'
import IndProviderManage from '@views/dataManage/economicIndicatorsSetting/IndProviderManage'
import IndTypeManage from '@views/dataManage/economicIndicatorsSetting/IndTypeManage'
import MonthlyDataManage from '@views/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataManage'
import MonthlyDataImport from '@views/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataImport/MonthlyDataImport'
import MonthlyDataQuery from '@views/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataQuery/MonthlyDataQuery'
import AnnualDataImport from '@views/dataManage/indexDataManage/AnnualDataManage/AnnualDataImport'
import AnnualDataQuery from '@views/dataManage/indexDataManage/AnnualDataManage/AnnualDataQuery'
import QuarterlyDataImport from '@views/dataManage/indexDataManage/QuarterlyDataManage/QuarterlyDataImport'
import QuarterlyDataQuery from '@views/dataManage/indexDataManage/QuarterlyDataManage/QuarterlyDataQuery'
import relationAnalyse from "./views/basicAnalyseTool/relationAnalyse";
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
            <Route path='/systemManage/UserAuthorityManage/UserManage/UserManageAuthorization' component={UserManageAuthorization}/>

          /*
            数据管理
           */
            <Route path='/dataManage/economicIndicatorsSetting/IndInfoManage' component={IndInfoManage}/>
            <Route path='/dataManage/economicIndicatorsSetting/IndDataManage' component={IndDataManage}/>
            <Route path='/dataManage/economicIndicatorsSetting/IndTypeManage' component={IndTypeManage}/>
            <Route path='/dataManage/economicIndicatorsSetting/IndProviderManage' component={IndProviderManage}/>
            <Route path='/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataManage' component={MonthlyDataManage}/>
            <Route path='/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataQuery' component={MonthlyDataQuery}/>
            <Route path='/dataManage/indexDataManage/MonthlyDataManage/MonthlyDataImport' component={MonthlyDataImport}/>
            <Route path='/dataManage/indexDataManage/MonthlyDataManage/AnnualDataQuery' component={AnnualDataQuery}/>
            <Route path='/dataManage/indexDataManage/MonthlyDataManage/AnnualDataImport' component={AnnualDataImport}/>
            <Route path='/dataManage/indexDataManage/MonthlyDataManage/QuarterlyDataQuery' component={QuarterlyDataQuery}/>
            <Route path='/dataManage/indexDataManage/MonthlyDataManage/QuarterlyDataImport' component={QuarterlyDataImport}/>


          /*
            基本分析工具
           */
          <Route path='/basicAnalyseTool/relationAnalyse' component={relationAnalyse}/>


        </Route>
    </Router>
), document.getElementById('root'));
registerServiceWorker();