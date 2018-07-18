import React, { Component } from 'react';
import {Layout, Button,Select,} from 'element-react';
import { Link } from 'react-router';
import './SynIndexModelListView.less'

class SynIndexModelListView extends  Component{

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
            <div className="SynIndexModelList">
                <Layout.Col span={18}>
                    <h3>合成指数预测列表</h3>
                    <Select value={this.state.value} onChange={e => this.handleOption(e)} clearable={true}>
                        {
                            this.state.Options.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                            })
                        }
                    </Select>
                    <Button type="primary" size="small" onClick={this.handleClickForShow.bind(this)}>显示合成指数预测模型</Button>
                    <div>
                        <Link to='/prosperityForecast/synIndexPrediction/NewSynIndexModel'><Button type="primary" size="small" >选择新的指标组合进行预测</Button></Link>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default SynIndexModelListView
