import React, { Component } from 'react';
import {Layout, Button,Select} from 'element-react';
import './FirstLevelThemeConfig.less'

class FirstLevelThemeConfig extends  Component{

    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div className="FirstLevelThemeConfig">
                <Layout.Col span={18}>
                    <h3>展现层主题配置：一级主题</h3>
                    <h4>展现层主题列表：</h4>
                    <div>
                        <Button type="primary" size="small">增加展现层主题>></Button>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default FirstLevelThemeConfig
