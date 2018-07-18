import React, { Component } from 'react';
import {Layout, Button,Select,Input,DatePicker} from 'element-react';
import moment from "moment/moment";
import './NewSingleIndexModel.less'

class NewSingleIndexModel extends  Component{

    onChange(key,value){
        this.state.info[key] = value;
        this.forceUpdate();
    }

    handleOption(e,name){
        if(name === "Options"){
            this.state.info.model = e;
        }else{
            this.state.info.test = e;
        }
        this.forceUpdate();
    }

    handleClickForCheck(){
        console.log(this.state.info)
        this.$post('/user/psw',)
            .then(res=>{
                if(res === 1){

                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForView(){
        console.log(this.state.info)
        this.$post('/user/psw',)
            .then(res=>{
                if(res === 1){

                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForForecast(){
        console.log(this.state.info)
        this.$post('/user/psw',)
            .then(res=>{
                if(res === 1){

                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForTest(){
        console.log(this.state.info)
        this.$post('/user/psw',)
            .then(res=>{
                if(res === 1){

                }
            }).catch(e=>{
            console.log(e)
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            info: {
                indexName:'',
                date1: '2018-06',
                date2: '2018-07',
                differenceOrder: '0',
                predictionInterval: '0',
                seasonalDiffOrder: '0',
                modelForm:'',
                model:'',
                test:'',
                P:'0',
                Q:'0',
                SP:'0',
                SQ:'0'
            },
            Options: [{
                value: '基于给定的模型形式建立ARIMA模型',
                label: '基于给定的模型形式建立ARIMA模型'
            }],
            Options1: [{
                value: '包含截距',
                label: '包含截距'
            }]
        }
    }

    render(){
        const { value1,value2,info } = this.state
        return(
            <div className="NewSingleIndexModel">
                <Layout.Col span={18}>
                    <h3>模型信息</h3>
                    <div>
                        <span>指标名称</span>
                        <Input className="inline-input" placeholder={info.indexName} onChange={this.onChange.bind(this,'indexName')}/>
                        <Button type="primary" size="small">查询</Button>
                    </div>
                    <div>
                        <span>样本时间：从</span>
                        <DatePicker
                            value={value1}
                            placeholder="选择月"
                            onChange={date=>{
                                this.setState({value1: date})
                                info.date1 = moment(date).format("YYYY-MM");
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
                                info.date2 = moment(date).format("YYYY-MM");
                                this.forceUpdate();
                            }}
                            selectionMode="month"
                        />
                        <span>(格式：2007-04)</span>
                        <span className="NewSinIndexMo_span_1">预测区间</span>
                        <Input className="inline-input-smaller" placeholder={info.predictionInterval} onChange={this.onChange.bind(this,'predictionInterval')}/>
                        <span>月</span>
                    </div>
                    <div>
                        <span>差分阶数</span>
                        <Input className="inline-input-smaller" placeholder={info.differenceOrder} onChange={this.onChange.bind(this,'differenceOrder')}/>
                        <span>阶（d值）</span>
                        <span className="NewSinIndexMo_span_1">季节差分阶数</span>
                        <Input className="inline-input-smaller" placeholder={info.seasonalDiffOrder} onChange={this.onChange.bind(this,'seasonalDiffOrder')}/>
                        <span>阶（D值）</span>
                    </div>
                    <div>
                        <span>模型形式</span>
                        <Input className="inline-input-longer" placeholder={info.modelForm} onChange={this.onChange.bind(this,'modelForm')}/>
                        <span className="NewSinIndexMo_span_2">请输入形如C AR(1) MA(1) SAR(1) SMA(1)的表达式，其中：C-常数；AR-自回归项；MA-移动平均项；SAR-季节自回归项；SMA-季节移动平均项，括号内的数字表示阶数。</span>
                    </div>
                    <h3>建模</h3>
                    <Layout.Col span={13}>
                        <div>
                            <Button type="primary" size="small" onClick={this.handleClickForCheck.bind(this)}>数据检查</Button>
                            <Button type="primary" size="small" onClick={this.handleClickForView.bind(this)}>查看相关系数</Button>
                        </div>
                        <div className="Layout1">
                            <Button type="primary" size="small" onClick={this.handleClickForForecast.bind(this)}>模型估计和预测</Button>
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"Options")} clearable={true}>
                                {
                                    this.state.Options.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                        </div>
                    </Layout.Col>
                    <Layout.Col span={9}>
                        <div className="Layout2">
                            <Button type="primary" size="small" onClick={this.handleClickForTest.bind(this)}>单位根检验</Button>
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"Options1")} clearable={true}>
                                {
                                    this.state.Options1.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                            <span>P</span>
                            <Input className="inline-input-smaller" placeholder={info.P} onChange={this.onChange.bind(this,'P')}/>
                            <span>Q</span>
                            <Input className="inline-input-smaller" placeholder={info.Q} onChange={this.onChange.bind(this,'Q')}/>
                            <span>SP</span>
                            <Input className="inline-input-smaller" placeholder={info.SP} onChange={this.onChange.bind(this,'SP')}/>
                            <span>SQ</span>
                            <Input className="inline-input-smaller" placeholder={info.SQ} onChange={this.onChange.bind(this,'SQ')}/>
                        </div>
                    </Layout.Col>
                </Layout.Col>
            </div>
        )
    }
}

export default NewSingleIndexModel
