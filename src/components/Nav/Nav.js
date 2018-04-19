import React, { Component } from 'react';
import '../../App.css';
import './Nav.css';
import { Breadcrumb } from 'element-react';

class Nav extends Component{
    render(){
        return(
            <div className='App-header-Breadcrumb'>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
    }
}

export default Nav;