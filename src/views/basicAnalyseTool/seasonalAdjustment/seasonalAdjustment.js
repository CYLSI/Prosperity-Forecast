import React, { Component } from 'react';
import {Layout, Input, Button, Radio,DatePicker,Checkbox,Dialog,Select,Tree,Table} from 'element-react';
import './SeasonalAdjustment.less';
import moment from "moment/moment";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import PrimarySelectedQuota from '@components/PrimarySelectedQuota/PrimarySelectedQuota'

class SeasonalAdjustment extends  Component{

    componentDidMount() {
        let myChart = echarts.init(document.getElementById('graph'));
        myChart.setOption(this.state.graphOptions)
        //
    }

    onChange(key,value){
        if(key === "dialog-search"){
            this.state.dialogBodyData.search.keywordInput = value;
        }else{
            this.state.settings[key] = value;
            this.forceUpdate();
        }
    }

    onChangeRadio(value) {
        this.state.settings.frequency = value;
        this.forceUpdate();
    }

    onChangeCheckbox(e){
        this.state.dialogBodyData.reverse = e
    }

    handleChange(e){
        let list = new Array();
        for(let p in e){
            list.push(e[p])
        }
        for(let i = 0;i < 5;i++){
            if((i+1) === list[i]){
                continue;
            }else{
                list.splice(i,0,"0")
            }
        }
        this.state.settings.checkBox = list;
        this.forceUpdate();
    }

    handleClickForAnalysis(e){
        console.log(this.state.settings)
    }

    handleClickForAdjust(){
        console.log(this.state.settings)
        this.$post('/analysis/season',this.state.settings)
            .then(res=>{
                this.state.graphOptions.xAxis.data = res.xAxis;
                this.state.graphOptions.series = res.lineList;
                this.state.graphOptions.legend.data = res.lineNames;
                this.forceUpdate();
                let myChart = echarts.init(document.getElementById('graph'));
                myChart.setOption(this.state.graphOptions,true)
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForCheck(){
        let analysisQuota = [this.state.settings.quota]
        Object.assign(this.state.settings,{analysisQuota:analysisQuota})
        this.$post('/analysis/check',this.state.settings)
            .then(res=>{
               if(res === 1){
                   alert("数据完整！")
               }else{
                   alert("数据不完整！")
               }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForSearch(name){
        this.setState({
            dialogVisible:true
        })
    }

    handleConfirm(e){
        this.setState({
            dialogVisible:false,
            bas:e
        })
        this.state.settings.quota = e.basicId
    }

    constructor(props) {
        super(props);

        this.state = {
            value1: new Date("2001-04"),
            value2: new Date('2004-06'),
            settings: {
                frequency: 1,
                startTime: '2001-06',
                endTime: '2006-07',
                springLength: '0',
                checkBox: ['1', '2', '3', '4', '5'],
                quota:1,
                quotaId:''
            },
            checkList:['1', '2', '3', '4', '5'],
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
                series: [],
                legend: {
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 10,
                    padding:[5,15,0,0],
                    data: [],
                    right: '4%',
                    show:true,
                    orient:"horizontal",
                }
            },
            bas:{
                basic:[],
                basicId:[]
            },
            alt:{
                altSearch:false
            },
            dialogVisible:false
        }
    }

    render(){
        const { settings,value1,value2,checkList } = this.state
        return(
            <Layout.Col span={18}>
                <div className="seasonAdjust">
                    <h3>—季节调整—</h3>
                    <div>
                        <span>选择指标：</span>
                        <Input className="inline-input" value={this.state.settings.quota} onChange={this.onChange.bind(this, 'basicIndex')}/>
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this)}>查询</Button>
                    </div>
                    <div>
                        <span>数据频度：</span>
                        <Radio.Group onChange={this.onChangeRadio.bind(this)} value={this.state.settings.frequency}>
                            <Radio value={1}>月度</Radio>
                            <Radio value={2}>季度</Radio>
                            <Radio value={3}>年度</Radio>
                        </Radio.Group>
                        <span className="seasonAdjust_span">春节长度：</span>
                        <Input className="inline-input-smaller" placeholder={settings.springLength} onChange={this.onChange.bind(this,'seasonLength')}/>
                        <span>天(0-7天)</span>
                    </div>
                    <div>
                        <span>样本时间：从</span>
                        <DatePicker
                            value={value1}
                            placeholder="选择月"
                            onChange={date=>{
                                this.setState({value1: date})
                                settings.startTime = moment(date).format("YYYY-MM");
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
                                settings.endTime = moment(date).format("YYYY-MM");
                                this.forceUpdate();
                            }}
                            selectionMode="month"
                        />
                        <span>(格式：2007-04)</span>
                    </div>
                    <div>
                        <Button type="primary" size="small" onClick={this.handleClickForCheck.bind(this)}>数据检查</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForAdjust.bind(this)}>进行季节调整</Button>
                        <Button type="primary" size="small" onClick={e => this.handleClickForAnalysis(e)}>详细结果另存为...</Button>
                    </div>
                    <Layout.Col span={3}>
                        <div>
                            <Checkbox.Group value={checkList} onChange={this.handleChange.bind(this)}>
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
                <div>
                    <PrimarySelectedQuota
                        dialogVisible={this.state.dialogVisible}
                        bas={this.state.bas}
                        alt={this.state.alt}
                        handleConfirm={this.handleConfirm.bind(this)}
                        handleCancel={this.state.dialogVisible = false}
                    >
                    </PrimarySelectedQuota>
                </div>
            </Layout.Col>
        )
    }
}

export default SeasonalAdjustment
