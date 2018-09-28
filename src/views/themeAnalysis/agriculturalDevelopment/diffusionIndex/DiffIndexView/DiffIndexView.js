import React, { Component } from 'react';
import {Layout, Input, Button, Radio, Checkbox, DatePicker,Table,Dialog,Tree,Select} from 'element-react';
import {Link} from 'react-router';
import './DiffIndexView.less';
import moment from "moment/moment";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';


class DiffIndexView extends  Component{
    componentDidMount() {
        this.getList();
        let myChart = echarts.init(document.getElementById('graph'));
        myChart.setOption(this.state.graphOptions);
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
    }

    getList(){
        this.$post('/DICalculate/list')
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
        this.state.settings.combination = row.name;
        let page1 = document.getElementById("page1")
        page1.style.display = "none";
        let page2 = document.getElementById("page2")
        page2.style.display = "block";

        this.$post('/IndexManagement/quotaByCombinationList',{keyNum1:row.id})
                    .then(res=>{
                        this.setState({
                            data: res
                        })
                    }).catch(e=>{
                    console.log(e)
                })
    }

    handleClickForDelete(e,row){
        this.$post('/DICalculate/del',row.id)
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
        this.$post('/DICalculate/Data',{keyNum1:this.state.id})
            .then(res=>{
                this.state.graphOptions.xAxis.data = res.dates;
                this.state.graphOptions.series = res.datas;
                this.state.graphOptions.legend.data = res.lineName;
                this.forceUpdate();
                let myChart = echarts.init(document.getElementById('graph'));
                myChart.setOption(this.state.graphOptions)
            }).catch(e=>{
            console.log(e)
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            settings: {
                combination:'指标组合1'
            },
            columns: [
                {
                    label: "先行指标",
                    prop: "leadQuota",
                    align: 'center',
                },
                {
                    label: "一致指标",
                    prop: "coinQuota",
                    align: 'center',
                },
                {
                    label: "滞后指标",
                    prop: "lagQuota",
                    align: 'center',
                }
            ],
            data: [{
                leadQuota:"--",
                coinQuota:"--",
                lagQuota:"--"
            }],
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
            data5: [
            {
                combination:"--",
                startTime:"--",
                endTime:"--",
                springDay:"--",
                calculator:"--",
                calTime:"--",
                bakeup:"--"
            }],
            value:'',
            checkList:['1', '2', '3', '4', '5', '6', '7'],
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
                    data: [],
                    right: '0%',
                    show: true,
                    orient: "horizontal",
                }
            },
            id:'',
            name: '',
            time: '',
            festival: '',
            account: '',
            accountTime: '',
            addCommit:''
        }
    }

    render(){
        const {settings,value1,value2,columns,data,columns4,data4,columns5,data5,checkList} = this.state
        return(
            <Layout.Col span={18}>
                <div className="DiffView">
                    <div>
                    <div id="page1">
                        <Layout.Row>
                        <h3>—扩散指数计算结果列表—</h3>
                        </Layout.Row>
                        <Layout.Row>
                            <Table
                                columns={columns5}
                                data={data5}
                                border={true}
                                style={{width: '120%'}}
                            />
                        </Layout.Row>
                        <Layout.Row>
                            <Link to='/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexCalculation'><div className="DiffView-center-btn"><Button type="primary" size="small">计算新的合成指数</Button></div></Link>
                        </Layout.Row>
                    </div>
                    <div id="page2">
                        <Layout.Row>
                        <h3>—扩散指数计算结果—</h3>
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
                        <div className="DiffView-heading">指标组合-ID[{this.state.id}]:{this.state.name}</div>
                        <Table
                            columns={columns}
                            data={data}
                            border={true}
                            style={{width: '100%'}}
                        />
                        </Layout.Row>

                        <Layout.Row>
                            <div className="DiffView-center-btn"><Button type="primary" size="small" onClick={this.handleClickForDefine.bind(this)}>将指标组合设为系统推荐组合</Button></div>
                            <Layout.Col span="6">
                                <div><Button type="primary" size="small" onClick={this.handleClickForReturn.bind(this)}>返回计算结果列表</Button></div>
                                <div><Button type="primary" size="small" onClick={this.handleClickForAdjust.bind(this)}>图形显示刷新</Button></div>
                                <div>
                                    <Checkbox.Group value={checkList} >
                                        <Checkbox label="1"><span>基准指数</span></Checkbox>
                                        <Checkbox label="2"><span>先行扩散指数</span></Checkbox>
                                        <Checkbox label="3"><span>先行累积扩散指数</span></Checkbox>
                                        <Checkbox label="4"><span>一致扩散指数</span></Checkbox>
                                        <Checkbox label="5"><span>一致累积扩散指数</span></Checkbox>
                                        <Checkbox label="6"><span>滞后扩散指数</span></Checkbox>
                                        <Checkbox label="7"><span>滞后累积扩散指数</span></Checkbox>
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
                            </Layout.Col>
                        </Layout.Row>
                        <Layout.Row>
                             <div>评论：</div>
                             <Input className="inline-input-textarea" value={this.state.bakeup} onChange={this.onChange.bind(this,"addCommit")} type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
                        </Layout.Row>
                    
                    </div>
                    </div>
                </div>
            </Layout.Col>
        )
    }
}

export default DiffIndexView
