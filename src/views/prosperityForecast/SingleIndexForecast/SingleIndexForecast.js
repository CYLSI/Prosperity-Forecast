import React, { Component } from 'react';
import {Layout, Button,Input,Select} from 'element-react';
import './SingleIndexForecast.less';
import echarts from "echarts/lib/echarts";

class SingleIndexForecast extends  Component{

    onChange(key, value) {
        this.state.Object[key] = value;
        this.forceUpdate();
    }

    handleOption(e,name){
        this.state.Object[name] = e;
    }

    handleClickForPredict(){
        console.log(this.state.Object)
        this.$post('/analysis/check',this.state.Object)
            .then(res=>{
                this.state.graphOptions.xAxis.data = res.xAxis;
                this.state.graphOptions.series = res.LineList;
                this.state.graphOptions.legend.data = res.lineNames;
                this.forceUpdate();
                let myChart = echarts.init(document.getElementById('graph'));
                myChart.setOption(this.state.graphOptions)
            }).catch(e=>{
            console.log(e)
        })
    }

    componentDidMount() {
        let myChart = echarts.init(document.getElementById('graph'));
        myChart.setOption(this.state.graphOptions)
    }

    constructor(props) {
        super(props);

        this.state = {
            Object:{
                neurons:'',
                time:'',
                startTime:'',
                endTime:''
            },
            graphOptions: {
                title: {text: '单指标预测'},
                tooltip: {},
                xAxis: {
                    data: ["2001-01", "2001-02", "2001-03", "2001-04", "2001-05", "2001-06"],
                    axisLabel: {
                        interval: 0,
                        rotate: 90
                    }
                },
                yAxis: {},
                series: [{
                    name: '[A01]农业增加值-当期数据-TC项',
                    type: 'line',
                    data: [5, 20, 36, 10, 10, 20]
                }, {
                    name: '[A01]农业增加值-当期同比-TC项',
                    type: 'line',
                    data: [4, 60, 23, 54, 65, 2]
                }],
                legend: {
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 10,
                    padding: [40, 15, 0, 0,],
                    data: ['[A01]农业增加值-当期数据-TC项', '[A01]农业增加值-当期同比-TC项'],
                    right: '4%',
                    show: true,
                    orient: "horizontal",
                }
            },
            Options1: [{
                value: '1',
                label: '1'
            }],
            Options2: [{
                value: '1',
                label: '1'
            }],
        }
    }

    render(){
        return(
            <div className="SinIndexFore">
                <Layout.Col span={18}>
                    <h3>模型预测</h3>
                    <div>
                        <span>数据标准化区间：[</span>
                        <Select value={this.state.value} onChange={e => this.handleOption(e,"startTime")} size="small">
                            {
                                this.state.Options1.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value} />
                                })
                            }
                        </Select>
                        <span>,</span>
                        <Select value={this.state.value} onChange={e => this.handleOption(e,"endTime")} size="small">
                            {
                                this.state.Options2.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value} />
                                })
                            }
                        </Select>
                        <span>]</span>
                    </div>
                    <div>
                        <span>隐藏层神经元个数：</span>
                        <Input placeholder={this.state.Object.neurons} className="inline-input" onChange={this.onChange.bind(this, 'neurons')}/>
                    </div>
                    <div>
                        <span>预测时间点：</span>
                        <Input placeholder={this.state.Object.time} className="inline-input" onChange={this.onChange.bind(this, 'time')}/>
                    </div>
                    <div>
                        <Button type="primary" size="small" onClick={this.handleClickForPredict.bind(this)}>预测</Button>
                    </div>
                </Layout.Col>
                <Layout.Col span={18}>
                    <div id="graph"></div>
                </Layout.Col>
            </div>
        )
    }
}

export default SingleIndexForecast;
