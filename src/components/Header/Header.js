import React, { Component } from 'react';
import '../../App.css';
import './Header.css';

class Header extends Component{
    render(){
        return(
            <div className="App-header">
                <span className="App-title-center">基于景气预测框架的农产品市场预测系统</span>
                <span className="App-title-right">
                     <span>系统管理员</span>
                     <span className="el-icon-message"></span>
                     <span className="el-icon-d-arrow-right"></span>
                </span>
            </div>
        );
    }
}

export default Header;