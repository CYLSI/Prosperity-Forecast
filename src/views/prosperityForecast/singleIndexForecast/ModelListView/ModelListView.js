import React, { Component } from 'react';
import {Layout, Button,Select,} from 'element-react';
import { Link } from 'react-router';

class ModelListView extends  Component{

    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div>
                <Layout.Col span={18}>
                    <h3>单指标预测结果列表</h3>
                    <Link to='/prosperityForecast/singleIndexForecast/NewSingleIndexModel'><Button type="primary" size="small" >选择新的指标进行预测</Button></Link>
                </Layout.Col>
            </div>
        )
    }
}

export default ModelListView
