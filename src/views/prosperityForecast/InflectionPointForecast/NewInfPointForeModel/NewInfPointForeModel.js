import React, { Component } from 'react';
import {Layout, Button,Select,Input,DatePicker} from 'element-react';
import moment from "moment/moment";
import './NewInfPointForeModel.less'

class NewInfPointForeModel extends  Component{

    handleOption(e){
        this.setState({
            index: e
        });
        this.forceUpdate();
    }

    handleClickForShow(){
        console.log(this.state.index)
    }

    constructor(props) {
        super(props);

        this.state = {
            Options: [{
                value: '1',
                label: '1'
            }],
            index:''
        }
    }

    render(){
        return(
            <div className="NewInfPointForeModel">
                <Layout.Col span={18}>
                    <h3>拐点预测</h3>
                    <Select value={this.state.value} onChange={e => this.handleOption(e)} clearable={true}>
                        {
                            this.state.Options.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                            })
                        }
                    </Select>
                    <Button type="primary" size="small" onClick={this.handleClickForShow.bind(this)}>显示所有指标组合</Button>
                </Layout.Col>
            </div>
        )
    }
}

export default NewInfPointForeModel
