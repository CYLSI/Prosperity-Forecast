import React, { Component } from 'react';
import {Layout, Button,Select,DatePicker,Checkbox,Radio,Input} from 'element-react';
import './SecondLevelIndexConfig.less'
import moment from "moment/moment";

class SecondLevelIndexConfig extends  Component{

    onChange(key,value){
        this.state.settings[key] = value;
        this.forceUpdate();
    }

    handleOption(e,name){
        if(name === "Select1"){
           this.state.settings.theme = e
        }else{
            this.state.settings.threshold = e
        }
        this.forceUpdate();
    }

    onChangeCheckbox(e){
        this.state.settings.seasonalAdjust = e
        this.forceUpdate();
    }

    onChangeRadio(value) {
        this.state.settings.dataFrequency = value;
        this.forceUpdate();
    }

    handleClickForAdd(){
        console.log(this.state.settings)
    }

    constructor(props) {
        super(props);

        this.state = {
            Options1: [{
                value: '1',
                label: '1'
            }],
            Options2: [{
                value: '2',
                label: '2'
            }],
            settings: {
                date1: '2018-06',
                date2: '2018-07',
                seasonLength:'0',
                theme:'',
                seasonalAdjust: true,
                dataFrequency: 1,
                threshold:''
            }
        }
    }

    render(){
        const { settings,value1,value2, } = this.state
        return(
            <div className="SecondLevelIndexConfig">
                <Layout.Col span={18}>
                    <h3>配置二级指标</h3>
                    <span>展现层主题选择</span>
                    <Select value={this.state.value} onChange={e => this.handleOption(e,"Select1")} clearable={true}>
                        {
                            this.state.Options1.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                            })
                        }
                    </Select>
                    <hr />
                    <p>对应操作层指数：</p>
                    <p>默认指标组合的推荐计算结果：</p>
                    <hr />
                    <p>该主题包含的其他指标：</p>
                    <p>为该主题添加展示指标：</p>
                    <div>
                        <span>指标名称：</span>
                        <Input className="inline-input"/>
                        <Button type="primary" size="small">查询</Button>
                    </div>
                    <div>
                        <span>显示设置：从</span>
                        <DatePicker
                            value={value1}
                            placeholder="选择月"
                            onChange={date=>{
                                this.setState({value1: date})
                                settings.date1 = moment(date).format("YYYY-MM");
                                this.forceUpdate();
                            }}
                            selectionMode="month"
                        />
                        <span>到</span>
                        <DatePicker
                            value={value2}
                            placeholder="选择月"
                            onChange={date=>{
                                this.setState({value2: date})
                                settings.date2 = moment(date).format("YYYY-MM");
                                this.forceUpdate();
                            }}
                            selectionMode="month"
                        />
                        <span>(格式：2007-04)</span>
                    </div>
                    <div>
                        <Checkbox checked={settings.seasonalAdjust} onChange={e => this.onChangeCheckbox(e)}>需要进行季节调整</Checkbox>
                        <div className="SecondLevelIndexConfig_radio">
                            <Radio value="1" checked={settings.dataFrequency === 1} onChange={this.onChangeRadio.bind(this)}>月度</Radio>
                            <Radio value="2" checked={settings.dataFrequency === 2} onChange={this.onChangeRadio.bind(this)}>季度</Radio>
                            <Radio value="3" checked={settings.dataFrequency === 3} onChange={this.onChangeRadio.bind(this)}>年度</Radio>
                        </div>
                    </div>
                    <div>
                        <span>季节长度：</span>
                        <Input className="inline-input-smaller" placeholder={settings.seasonLength} onChange={this.onChange.bind(this,'seasonLength')}/>
                        <span>天(0-7天)</span>
                    </div>
                    <div>
                        <span>阈值：</span>
                        <Select value={this.state.value} onChange={e => this.handleOption(e,"Select2")} clearable={true}>
                            {
                                this.state.Options2.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                        <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>增加指标</Button>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default SecondLevelIndexConfig
