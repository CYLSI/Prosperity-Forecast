import React, { Component } from 'react';
import {Layout, Input, Button, Radio, Checkbox, DatePicker,Table} from 'element-react';
import './peakValleyGraphicAnalysis.less';
import moment from 'moment';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class peakValleyGraphicAnalysis extends  Component{

    componentDidMount() {
        let myChart = echarts.init(document.getElementById('graph'));
        myChart.setOption(this.state.graphOptions)
    }

    onChange(key,value){
        this.state.settings[key] = value;
        this.forceUpdate();
    }

    onChangeRadio(value) {
        this.state.settings.dataFrequency = value;
        this.forceUpdate();
    }

    onChangeCheckbox(e,name){
        if(name === "checkbox_1")
            this.state.settings.seasonalAdjust = e
        else {
            if (this.state.multiAxisDisplay) {
                this.setState({
                    multiAxisDisplay: false
                })
            } else {
                this.setState({
                    multiAxisDisplay: true
                })
            }
        }

    }

    handleClickForAnalysis(e){
        console.log(this.state.settings)
    }

    handleClickForRefresh(){

    }

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this)
        this.handleClickForAnalysis = this.handleClickForAnalysis.bind(this)

        this.state = {
            settings: {
                dataFrequency: 1,
                date1: '2018-06',
                date2: '2018-07',
                seasonalAdjust: true,
                seasonLength: '0',
                peakValleyLength: '0',
                ppLength: '0'
            },
            multiAxisDisplay: true,
            columns: [
                {
                    label: "基准指标拐点",
                    prop: "BIIP",
                    width: '200%',
                    align: 'center'
                },
                {
                    label: "分析指标拐点",
                    prop: "AIIP",
                    align: 'center'
                }],
            data: [{
                BIIP: '[A01]农业增加值-当期数据',
                AIIP: '[A01]农业增加值-当期同比'
            }],
            graphOptions: {
                title: {text: '峰谷图形分析'},
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
            }
        }
    }

    render(){
        const { settings,value1,value2,multiAxisDisplay,columns,data } = this.state
        return(
            <Layout.Col span={18}>
                <div className="PVGAnalysis">
                    <div>
                        <h3>—BB算法及峰谷图形分析—</h3>
                        <span>基准指标：</span>
                        <Input className="inline-input"/>
                        <Button type="primary" size="small">查询</Button>
                    </div>
                    <div>
                        <span>分析指标：</span>
                        <Input className="inline-input-textarea"  type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
                        <Button type="primary" size="small">查询</Button>
                    </div>
                    <div>
                        <h4>相关设定：</h4>
                        <div>
                            <span>数据频度：</span>
                            <Radio value="1" checked={settings.dataFrequency === 1} onChange={this.onChangeRadio.bind(this)}>月度</Radio>
                            <Radio value="2" checked={settings.dataFrequency === 2} onChange={this.onChangeRadio.bind(this)}>季度</Radio>
                            <Radio value="3" checked={settings.dataFrequency === 3} onChange={this.onChangeRadio.bind(this)}>年度</Radio>
                        </div>
                        <div>
                            <span>样本时间：从</span>
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
                            <span>季节调整：</span>
                            <Checkbox className="PVGAnalysis_Checkbox" checked onChange={e => this.onChangeCheckbox(e,"checkbox_1")}>需要进行季节调整</Checkbox>
                            <span>季节长度：</span>
                            <Input className="inline-input-smaller" placeholder={settings.seasonLength} onChange={this.onChange.bind(this,'seasonLength')}/>
                            <span>天(0-7天)</span>
                            <div id="PVG_dataCheck">
                                <Button type="success" size="small">数据检查</Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>峰谷距离：</span>
                        <Input className="inline-input-smaller" placeholder={settings.peakValleyLength} onChange={this.onChange.bind(this,'peakValleyLength')}/>
                        <span>峰峰距离：</span>
                        <Input className="inline-input-smaller" placeholder={settings.ppLength} onChange={this.onChange.bind(this,'ppLength')}/>
                        <span>季节长度：</span>
                        <Input className="inline-input-smaller" placeholder={0}/>
                        <Button type="primary" size="small" onClick={e => this.handleClickForAnalysis(e)}>BB算法识别峰谷</Button>
                    </div>
                    <Layout.Col span={10}>
                        <hr />
                        <Checkbox className="PVGAnalysis_Checkbox" checked={multiAxisDisplay} onChange={e => this.onChangeCheckbox(e,"checkbox_2")}>多轴显示</Checkbox>
                        <Button type="primary" size="small" onClick={this.handleClickForRefresh.bind(this)}>刷新图片>></Button>
                        <Table
                            columns={columns}
                            data={data}
                            border={true}
                        />
                        <Button type="primary" size="small" >峰谷图形分析</Button>
                    </Layout.Col>
                    <Layout.Col span={10}>
                        <div id="graph"></div>
                    </Layout.Col>
                </div>
            </Layout.Col>
        )
    }
}

export default peakValleyGraphicAnalysis
