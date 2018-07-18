import React, { Component } from 'react';
import {Layout, Button,Select,} from 'element-react';
import { Link } from 'react-router';
import './ModelListView.less'

class ModelListView extends  Component{

    handleOption(e){
        this.setState({
            model: e
        });
        this.forceUpdate();
    }

    handleClickForShow(){
        console.log(this.state.model)
    }

    constructor(props) {
        super(props);

        this.state = {
            Options: [{
                value: '1',
                label: '1'
            }],
            model:''
        }
    }

    render(){
        return(
            <div className="SPFModelListView">
                <Layout.Col span={18}>
                    <h3>综合景情预测列表</h3>
                    <Select value={this.state.value} onChange={e => this.handleOption(e)} clearable={true}>
                        {
                            this.state.Options.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                            })
                        }
                    </Select>
                    <Button type="primary" size="small" onClick={this.handleClickForShow.bind(this)}>显示综合景情预测模型</Button>
                    <div>
                        <Link to='/prosperityForecast/SyntheticalProsForecast/NewSynProsForeModel'><Button type="primary" size="small" >选择新的指标组合进行预测</Button></Link>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default ModelListView
