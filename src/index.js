import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { hashHistory,Route,Router } from 'react-router';
import 'element-theme-default';
import registerServiceWorker from './registerServiceWorker';
import ApartmentManage from "./contents/ApartmentManage/ApartmentManage";
import ModulesManage from "./contents/ModulesManage/ModulesManage";
import RoleManage from "./contents/RoleManage/RoleManage";
import UserGroupManage from "./contents/UserGroupManage/UserGroupManage";
import UserManage from "./contents/UserManage/UserManage";
import UserManageAuthorization from './contents/UserManage/UserManageAuthorization/UserManageAuthorization';
import ModifyPassword from './contents/UserManage/ModifyPassword/ModifyPassword';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path='/' components={App}>
            <Route path='/contents/ApartmentManage' component={ApartmentManage}/>
            <Route path='/contents/RoleManage' component={RoleManage}/>
            <Route path='/contents/UserGroupManage' component={UserGroupManage}/>
            <Route path='/contents/UserManage' component={UserManage}/>
            <Route path='/contents/ModulesManage' component={ModulesManage}/>
            <Route path='/contents/UserManage/UserManageAuthorization' component={UserManageAuthorization}/>
            <Route path='/contents/UserManage/ModifyPassword' component={ModifyPassword}/>
        </Route>
    </Router>
), document.getElementById('root'));
registerServiceWorker();