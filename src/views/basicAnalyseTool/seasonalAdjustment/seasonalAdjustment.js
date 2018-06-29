import React, { Component } from 'react';
import {Layout, Input, Button, Radio,DatePicker,Checkbox} from 'element-react';
import './seasonalAdjustment.less';
import moment from "moment/moment";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class seasonalAdjustment extends  Component{

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

    handleClickForAnalysis(e){
        console.log(this.state.settings)
    }

    handleClickForAdjust(){
        console.log(this.state.checkList)
        this.$post('/group/list')
            .then(res=>{
                this.setState({
                    graphOptions : res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            settings:{
                dataFrequency: 1,
                date1:'2018-06',
                date2:'2018-07',
                seasonLength: '0'
            },
            checkList: ['1','2','3','4','5'],
            graphOptions:{
                title: { text: '季节调整' },
                tooltip: {},
                xAxis: {
                    data: ["2001-01", "2001-02", "2001-03", "2001-04", "2001-05", "2001-06"],
                    axisLabel: {
                        interval:0,
                        rotate:90
                    }
                },
                yAxis: {},
                series: [{
                    name: '原序列',
                    type: 'line',
                    data: [5, 20, 36, 10, 10, 20]
                },{
                    name: '趋势项序列(TC)',
                    type: 'line',
                    data: [4, 60, 23, 54, 65, 2]
                },{
                    name: '季节调整后序列(SA)',
                    type: 'line',
                    data: [3,45,6,34,34,53]
                },{
                    name: '季节因子序列(SF)',
                    type: 'line',
                    data: [23,45,67,63,43,2,1]
                },{
                    name: '不规则项序列(IR)',
                    type: 'line',
                    data: [1,23,45,6,3,5]
                }],
                legend: {
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 10,
                    padding:[5,0,0,0,],
                    data: ['原序列','趋势项序列(TC)','季节调整后序列(SA)','季节因子序列(SF)','不规则项序列(IR)'],
                    right: '4%',
                    show:true,
                    orient:"horizontal",
                }
            }
        }
    }

    render(){
        const { settings,value1,value2 } = this.state
        return(
            <Layout.Col span={18}>
                <div className="seasonAdjust">
                    <h3>—季节调整—</h3>
                    <div>
                        <span>选择指标：</span>
                        <Input className="inline-input"/>
                        <Button type="primary" size="small">查询</Button>
                    </div>
                    <div>
                        <span>数据频度：</span>
                        <Radio value="1" checked={settings.dataFrequency === 1} onChange={this.onChangeRadio.bind(this)}>月度</Radio>
                        <Radio value="2" checked={settings.dataFrequency === 2} onChange={this.onChangeRadio.bind(this)}>季度</Radio>
                        <Radio value="3" checked={settings.dataFrequency === 3} onChange={this.onChangeRadio.bind(this)}>年度</Radio>
                        <span className="seasonAdjust_span">季节长度：</span>
                        <Input className="inline-input-smaller" placeholder={settings.seasonLength} onChange={this.onChange.bind(this,'seasonLength')}/>
                        <span>天(0-7天)</span>
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
                        <Button type="primary" size="small">数据检查</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForAdjust.bind(this)}>进行季节调整</Button>
                        <Button type="primary" size="small" onClick={e => this.handleClickForAnalysis(e)}>详细结果另存为...</Button>
                    </div>
                    <Layout.Col span={3}>
                        <div>
                            <Checkbox.Group value={this.state.checkList}>
                                <Checkbox label="1"><span>原序列</span></Checkbox>
                                <Checkbox label="2"><span>趋势项序列(TC)</span></Checkbox>
                                <Checkbox label="3"><span>季节调整后序列(SA)</span></Checkbox>
                                <Checkbox label="4"><span>季节因子序列(SF)</span></Checkbox>
                                <Checkbox label="5"><span>不规则项序列(IR)</span></Checkbox>
                            </Checkbox.Group>
                        </div>
                    </Layout.Col>
                    <Layout.Col span={15}>
                        <div id="graph"></div>
                    </Layout.Col>
                </div>
            </Layout.Col>
        )
    }
}

export default seasonalAdjustment
