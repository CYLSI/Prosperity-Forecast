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
            <div className="IPFModelListView">
                <Layout.Col span={18}>
                    <h3>拐点预测列表</h3>
                    <Select value={this.state.value} onChange={e => this.handleOption(e)} clearable={true}>
                        {
                            this.state.Options.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                            })
                        }
                    </Select>
                    <Button type="primary" size="small" onClick={this.handleClickForShow.bind(this)}>显示所有指标组合</Button>
                    <div>
                        <Link to='/prosperityForecast/InflectionPointForecast/NewInfPointForeModel'><Button type="primary" size="small" >建立新的ProbitLogit模型</Button></Link>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default ModelListView
