import React, { Component } from 'react';
import {Layout, Button,Input} from 'element-react';
import './AreaComparisonConfig.less'

class AreaComparisonConfig extends  Component{

    onChange(key,value){
       this.setState({
           AreaComparison:value
       });
       this.forceUpdate();
    }

    handleClickForAdd(){
        console.log(this.state.AreaComparison)
    }

    constructor(props) {
        super(props);

        this.state = {
            AreaComparison:''
        }
    }

    render(){
        return(
            <div className="AreaComparisonConfig">
                <Layout.Col span={18}>
                    <h3>展现层主题配置：区域对比</h3>
                    <h4>展现层区域对比列表：</h4>
                    <span>添加区域对比：</span>
                    <Input className="inline-input" placeholder={this.state.AreaComparison} onChange={this.onChange.bind(this,'AreaComparison')}/>
                    <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>添加</Button>
                </Layout.Col>
            </div>
        )
    }
}

export default AreaComparisonConfig
