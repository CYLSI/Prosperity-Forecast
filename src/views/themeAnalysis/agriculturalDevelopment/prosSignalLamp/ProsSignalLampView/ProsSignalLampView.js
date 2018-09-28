import React, { Component } from 'react';
import {Layout, Input, Button, Radio, Checkbox, DatePicker,Table,Dialog,Tree,Select} from 'element-react';
import {Link} from 'react-router';
import moment from "moment/moment";
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/line';


import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/singleAxis';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/axis';


import './ProsSignalLampView.less';

class ProsSignalLampView extends  Component{
    componentDidMount() {
        this.getList();
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
        let myChart = echarts.init(document.getElementById('graph1'));
        myChart.setOption(this.state.option1);
        let myChart1 = echarts.init(document.getElementById('graph'));
        myChart1.setOption(this.state.option);
    }
    
    getList(){
        this.$post('SignalLampCalculate/list')
            .then(res=>{
                this.setState({
                    data5: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    onChange(key,value){
        this.state.settings[key] = value;
        this.forceUpdate();
    }

    handleClickForInfo(e,row){
        this.setState({
            id:row.id,
            name: row.combination,
            time: row.startTime+"~"+row.endTime,
            festival: row.springDay,
            account: row.calculator,
            accountTime: row.calTime,
            bakeup:row.bakeup
        })
        let page1 = document.getElementById("page1")
        page1.style.display = "none";
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
    }

    handleClickForDelete(e,row){
        this.$post('/CICalculate/del',row.id)
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForDefine(){
        alert("成功保存推荐指标组合！");
    }

    handleClickForReturn(){
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
    }

    handleClickForAdjust(){
        this.$post('/SignalLampCalculate/Data',{keyNum1:123})
            .then(res=>{
                this.state.option.xAxis.data = res.timeList;
                this.state.option.yAxis.data = res.quotaList;
                this.state.option.series.data = res.lampAndTimeList.map(function (item) {
                        return [item[1], item[0], item[2]];
                    });
                this.forceUpdate();
                // let myChart = echarts.init(document.getElementById('graph'));
                // myChart.setOption(this.state.graphOptions)
            }).catch(e=>{
            console.log(e)
        })
        this.$post('/SignalIndexCalculate/Data',{keyNum1:56})
        .then(res=>{
            this.state.option1.xAxis.data = res.timeList;
            this.state.option1.series.data = res.datas;
            this.forceUpdate();
            // let myChart = echarts.init(document.getElementById('graph'));
            // myChart.setOption(this.state.graphOptions)
        }).catch(e=>{
        console.log(e)
        })
    }

    
    constructor(props) {
        super(props);

        this.state = {
            settings: {
                frequency: 1,
                startTime: '2001-06',
                endTime: '2006-07',
                springLength: '0',
                checkBox: ['1', '2', '3', '4'],
                quota:4,
                quotaId:''
            },
            Lampgraph:{
                combination:'',
                startTime:'',
                endTime:'',
                springDay:'',
                calculator:'',
                calTime:'',
                subject:''
            },
            multiAxisDisplay: true,
            columns5: [
                {
                    label: "",
                    prop: "choose",
                    width:90,
                    align: 'center',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForInfo(e,row)}>查看结果</Button>
                                </span>
                    }
                },
                {
                    label: "指标组合名称",
                    prop: "combination",
                    width: 145,
                    align: 'center',
                    sortable: true
                },
                {
                    label: "样本开始日期",
                    prop: "startTime",
                    width: 144,
                    align: 'center',
                    sortable: true
                },
                {
                    label: "样本结束日期",
                    prop: "endTime",
                    width: 144,
                    align: 'center',
                    sortable: true
                },
                {
                    label: "春节",
                    prop: "springDay",
                    width: 65,
                    align: 'center',
                },
                {
                    label: "计算人",
                    prop: "calculator",
                    width: 85,
                    align: 'center',
                },
                {
                    label: "计算时间",
                    prop: "calTime",
                    width: 117,
                    align: 'center',
                    sortable: true
                },
                {
                    label: "备注",
                    prop: "bakeup",
                    width: 70,
                    align: 'center',
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: 70,
                    align: 'center',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data5: [{
                combination:"--",
                startTime:"--",
                endTime:"--",
                springDay:"--",
                calculator:"--",
                calTime:"--",
                bakeup:"--"
            }],
            value:"",
            checkList:['1', '2', '3', '4'],
            graphOptions: {
                title: {text: '合成指数计算结果'},
                tooltip: {},
                xAxis: {
                    data: [],
                    axisLabel: {
                        interval: 0,
                        rotate: 90
                    }
                },
                yAxis: {},
                series: [],
                legend: {
                    itemWidth: 30,
                    itemHeight: 20,
                    itemGap: 10,
                    padding: [30, 15, 0, 0,],
                    data: [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130]],
                    right: '0%',
                    show: true,
                    orient: "horizontal",
                }
            },
            option1:{
                title: {
                    text: '综合警情指数计算结果界面'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    data: ["2000-06-05","2000-07-05","2000-08-05","2000-09-05","2000-10-05","2000-11-05"]
                },
                yAxis: {
                    splitLine: {
                        show: false
                    }
                },
                toolbox: {
                    left: 'center',
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [{
                    startValue: '2014-06-01'
                }, {
                    type: 'inside'
                }],
                visualMap: {
                    top: 0,
                    right:10,
                    pieces: [{
                        gt: 0,
                        lte: 20,
                        label:'过冷',
                        color: '#0080FF'
                    }, {
                        gt: 20,
                        lte: 40,
                        label:'趋冷',
                        color: '#1EA8E0'
                    }, {
                        gt: 40,
                        lte: 70,
                        label:'正常',
                        color: '#3DD826'
                    }, {
                        gt: 70,
                        lte: 85,
                        label:'趋热',
                        color: '#E3ED11'
                    }, {
                        gt: 85,
                        lte: 100,
                        label:'过热',
                        color: '#EF0F22'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                series: {
                    name: '警情指数',
                    type: 'line',
                    data: [16,19,23,45,100,31,23],
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 20
                        }, {
                            yAxis: 40
                        }, {
                            yAxis: 70
                        }, {
                            yAxis: 85
                        }, {
                            yAxis: 100
                        }]
                    }
                }
            },
            option : {
                title: {
                    text: '景气信号灯计算结果界面'
                },
                legend: {
                    data: ['景气信号灯'],
                    left: 'right'
                },
                grid: {
                    left: 2,
                    bottom: 10,
                    right: 10,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
                    '7a', '8a', '9a','10a','11a',
                    '12p', '1p', '2p', '3p', '4p', '5p',
                    '6p', '7p', '8p', '9p', '10p', '11p'],
                    boundaryGap: false,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#999',
                            type: 'dashed'
                        }
                    },
                    axisLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ['Saturday', 'Friday', 'Thursday',
                    'Wednesday', 'Tuesday', 'Monday', 'Sunday'],
                    axisLine: {
                        show: false
                    }
                },
                series: [{
                    name: 'Punch Card',
                    type: 'scatter',
                    symbolSize: function (val) {
                        return val[2] * 2;
                    },
                    data : [[0,0,1],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]]
                    .map(function (item) {
                        return [item[1], item[0], item[2]];
                    }),
                    animationDelay: function (idx) {
                        return idx * 5;
                    }
                }]
            },
            name: '',
            time: '',
            festival: '',
            account: '',
            accountTime: '',
        }
    }

    render(){
        const { settings,value1,value2,columns,data,columns4,data4,columns5,data5,Selectoptions,checkList} = this.state
        return(
            <Layout.Col span={18}>
                <div className="ProsSLView">
                    <div>
                    <div id="page1">
                        <Layout.Row>
                        <h3>—景气信号灯-综合景气指数计算结果列表—</h3>
                        </Layout.Row>
                        <Layout.Row>
                            <Table
                                columns={columns5}
                                data={data5}
                                border={true}
                                style={{width: '100%'}}
                            />
                        </Layout.Row>
                        <Layout.Row>
                            <Link to='/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexCalculation'><div className="ProsSLView-center-btn"><Button type="primary" size="small">计算新的合成指数</Button></div></Link>
                        </Layout.Row>
                    </div>
                    <div id="page2">
                        <Layout.Row>
                        <h3>—综合景气指数计算结果—</h3>
                        </Layout.Row>
                        <Layout.Row>
                            <Layout.Col span="8"><span>基准指标： </span><span>[A01]农业增加值-当期数据</span></Layout.Col>
                            <Layout.Col span="8"><span>样本日期： </span><span>{this.state.time}</span></Layout.Col>
                            <Layout.Col span="4"><span>春节长度： </span><span>{this.state.festival}</span></Layout.Col>
                        </Layout.Row>
                        <Layout.Row>
                            <Layout.Col span="8"><span>指标组合： </span><span>{this.state.name}</span></Layout.Col>
                            <Layout.Col span="8"><span>计算时间： </span><span>{this.state.accountTime}</span></Layout.Col>
                            <Layout.Col span="4"><span>计算人： </span><span>{this.state.account}</span></Layout.Col>
                        </Layout.Row>
                        <Layout.Row>
                        <div className="ProsSLView-heading">指标组合-ID[{this.state.id}]:{this.state.name}</div>
                        </Layout.Row>

                        <Layout.Row>
                            <div className="ProsSLView-center-btn"><Button type="primary" size="small" onClick={this.handleClickForDefine.bind(this)}>将指标组合设为系统推荐组合</Button></div>
                            <Layout.Col span="6">
                                <div><Button type="primary" size="small" onClick={this.handleClickForReturn.bind(this)}>返回计算结果列表</Button></div>
                                <div><Button type="primary" size="small" onClick={this.handleClickForAdjust.bind(this)}>图形显示刷新</Button></div>
                                <div>
                                    <Checkbox.Group value={checkList}>
                                        <Checkbox label="1"><span>基准指数</span></Checkbox>
                                        <Checkbox label="2"><span>先行合成指数</span></Checkbox>
                                        <Checkbox label="3"><span>一致合成指数</span></Checkbox>
                                        <Checkbox label="4"><span>滞后合成指数</span></Checkbox>
                                    </Checkbox.Group>
                                </div>
                                <div><Button type="primary" size="small">图像数据另存为</Button></div>
                                <div>
                                    <Checkbox><span>推荐到展示层</span></Checkbox>
                                </div>
                                <div><Button type="primary" size="small">修改推荐状态及评论</Button></div>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <div id="graph"></div>
                                <div id="graph1"></div>
                            </Layout.Col>
                        </Layout.Row>
                    </div>
                    </div>
                </div>
            </Layout.Col>
        )
    }
}

export default ProsSignalLampView
