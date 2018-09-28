import React, { Component } from 'react';
import {Layout, Input, Button, Radio, Checkbox, DatePicker,Table,Dialog,Tree,Select} from 'element-react';
import {Link} from 'react-router';
import './SynIndexView.less';
import moment from "moment/moment";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';


class SynIndexView extends  Component{
    componentDidMount() {
        this.getList();
        let myChart = echarts.init(document.getElementById('graph'));
        myChart.setOption(this.state.graphOptions);
        let myChart2 = echarts.init(document.getElementById('graph2'));
        myChart2.setOption(this.state.graphOptions2);
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
        let page3 = document.getElementById("page3")
        page3.style.display = "none";
    }

    getList(){
        this.$post('/CICalculate/list')
            .then(res=>{
                this.setState({
                    data5: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForInfo(e,row){ 
        this.setState({
            id : row.id,
            name: row.combination,
            time: row.startTime+"~"+row.endTime,
            festival: row.springDay,
            account: row.calculator,
            accountTime: row.calTime,
            bakeup:row.bakeup
        })
        this.state.settings.id = row.id;
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
    
    handleClickForGraphAnalysis(){
    }

    onChange(key,value){
        this.state.settings[key] = value;
        this.forceUpdate();
    }

    onChangeBb(key,value){
        this.state.settings[key] = value;
        this.forceUpdate();
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

    handleClickForAnalysis(e){
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
        let page3 = document.getElementById("page3")
        page3.style.display = "block";
        console.log(this.state.settings)
        this.$post('/analysis/check',this.state.bbcal)
            .then(res=>{
                /*this.state.graphOptions.xAxis.data = res.xAxis;
                this.state.graphOptions.series = res.LineList;
                this.state.graphOptions.legend.data = res.lineNames;
                this.forceUpdate();
                let myChart1 = echarts.init(document.getElementById('graph'));
                myChart1.setOption(this.state.graphOptions)*/
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
        let page3 = document.getElementById("page3")
        page3.style.display = "none";
    }

    handleClickForAdjust(){
        this.$post('/CICalculate/Data',{keyNum1:this.state.id})
            .then(res=>{
                this.state.graphOptions.xAxis.data = res.dates;
                this.state.graphOptions.series = res.datas;
                this.state.graphOptions.legend.data = res.lineName;
                this.forceUpdate();
                let myChart = echarts.init(document.getElementById('graph'));
                myChart.setOption(this.state.graphOptions);
            }).catch(e=>{
            console.log(e)
        })
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

    handleClickForaddCommit(){
        this.$post('',{addCommit:this.state.addCommit})
            .then(res=>{
                if(res === 1){

                }
            }).catch(e=>{
            console.log(e)
        })
    }
    

    handleClickForSave(e){
        console.log(this.state.settings)
    }
   
    constructor(props) {
        super(props);

        this.state = {
            settings: {
                combination:'指标组合1',
                id:''
            },
            bbcal:{
                dataFrequency: 1,
                startTime: '2018-06',
                endTime: '2018-07',
                seasonalAdjust: true,
                springLength: '0',
                halfPeriod: '0',
                onePeriod: '0',
                baseQuota:1,
                quotaId:'',
                analysisQuota:[2,3],
                altQuotaId:[]
            },
            multiAxisDisplay: true,
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
            columns4: [
                {
                    label: "基准指标拐点",
                    prop: "A1",
                    align: 'center'
                },
                {
                    label: "分析指标拐点",
                    prop: "B1",
                    align: 'center'
                },
                {
                    label: " ",
                    prop: "C1",
                    align: 'center'
                },
                {
                    label: " ",
                    prop: "D1",
                    align: 'center'
                }
            ],
            data4: [{
                A1: '先行合成指数',
                B1: '[A01]农业增加值 -当期数据',
                C1: '一致合成指数',
                D1: '滞后合成指数'
            }],
            Selectoptions: [{
                value: '选项1',
                label: '基准指数'
                }, {
                value: '选项2',
                label: '先行合成指数'
                }, {
                value: '选项3',
                label: '一致合成指数'
                }, {
                value: '选项4',
                label: '滞后合成指数'
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
                    data: [],
                    right: '0%',
                    show: true,
                    orient: "horizontal",
                }
            },
            graphOptions2: {
                title: {text: '合成指数计算结果'},
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
                    name: '基准指数',
                    type: 'line',
                    data: [5, 20, 36, 10, 10, 20]
                }, {
                    name: '先行合成指数',
                    type: 'line',
                    data: [4, 60, 23, 54, 65, 2]
                },{
                    name: '一致合成指数',
                    type: 'line',
                    data: [3, 30, 36, 34, 20, 30]
                }, {
                    name: '滞后合成指数',
                    type: 'line',
                    data: [5, 50, 23, 54, 25, 20]
                }],
                legend: {
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 10,
                    padding: [40, 15, 0, 0,],
                    data: ['基准指数', '先行合成指数','一致合成指数', '滞后合成指数'],
                    right: '4%',
                    show: true,
                    orient: "horizontal",
                }
            },
            checkList1:['1', '2', '3', '4', '5'],
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
        const {settings,value1,value2,bbcal,multiAxisDisplay,columns,data,columns4,data4,columns5,data5,Selectoptions,checkList,checkList1} = this.state
        return(
            <Layout.Col span={18}>
                <div className="SIView">
                    <div>
                    <div id="page1">
                        <Layout.Row>
                        <h3>—合成指数计算结果列表—</h3>
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
                            <Link to='/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexCalculation'><div className="SIView-center-btn"><Button type="primary" size="small">计算新的合成指数</Button></div></Link>
                        </Layout.Row>
                    </div>
                    <div id="page2">
                        <Layout.Row>
                        <h3>—合成指数计算结果—</h3>
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
                        <div className="SIView-heading">指标组合-ID[{this.state.id}]:{this.state.name}</div>
                        <Table
                            columns={columns}
                            data={data}
                            border={true}
                            style={{width: '100%'}}
                        />
                        </Layout.Row>

                        <Layout.Row>
                            <div className="SIView-center-btn"><Button type="primary" size="small" onClick={this.handleClickForDefine.bind(this)}>将指标组合设为系统推荐组合</Button></div>
                            <Layout.Col span="6">
                                <div><Button type="primary" size="small" onClick={this.handleClickForReturn.bind(this)}>返回计算结果列表</Button></div>
                                <div><Button type="primary" size="small" onClick={this.handleClickForAdjust.bind(this)}>图形显示刷新</Button></div>
                                <div>
                                    <Checkbox.Group value={checkList} >
                                        <Checkbox label="1"><span>基准指数</span></Checkbox>
                                        <Checkbox label="2"><span>先行合成指数</span></Checkbox>
                                        <Checkbox label="3"><span>一致合成指数</span></Checkbox>
                                        <Checkbox label="4"><span>滞后合成指数</span></Checkbox>
                                    </Checkbox.Group>
                                </div>
                                <div><Button type="primary" size="small" onClick={e => this.handleClickForSave(e)}>图像数据另存为</Button></div>
                                <div>
                                    <Checkbox><span>推荐到展示层</span></Checkbox>
                                </div>
                                <div><Button type="primary" size="small" onClick={this.handleClickForaddCommit.bind(this)}>修改推荐状态及评论</Button></div>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <div id="graph"></div>
                            </Layout.Col>
                        </Layout.Row>
                    
                        <hr/>
                        <Layout.Row>
                        <h3 className="SIView-h3">—BB算法分析—</h3>
                        </Layout.Row>
                        <Layout.Row>
                        <span>基准序列</span>
                        <Select value={this.state.value}>
                          {
                            Selectoptions.map(el => {
                              return <Select.Option key={el.value} label={el.label} value={el.value} />
                            })
                          }
                        </Select>
                        </Layout.Row>
                    
                        <span>峰谷距离：</span>
                        <Input className="inline-input-smaller" placeholder={bbcal.halfPeriod} onChange={this.onChangeBb.bind(this,'halfPeriod')}/>
                        <span>峰峰距离：</span>
                        <Input className="inline-input-smaller" placeholder={bbcal.onePeriod} onChange={this.onChangeBb.bind(this,'onePeriod')}/>
                        <span>季节长度：</span>
                        <Input className="inline-input-smaller" placeholder={0}/>
                        <Button type="primary" size="small" onClick={e => this.handleClickForAnalysis(e)}>BB算法识别峰谷</Button>
                    </div>
                    <div id="page3">
                        <Layout.Row>
                            <Layout.Col span="6">
                            <div>
                                <Checkbox.Group value={checkList1}>
                                    <Checkbox label="1"><span>先行合成指数</span></Checkbox>
                                    <Checkbox label="2"><span>[A01]农业增加值 TC项</span></Checkbox>
                                    <Checkbox label="3"><span>一致合成指数</span></Checkbox>
                                    <Checkbox label="4"><span>滞后合成指数</span></Checkbox>
                                </Checkbox.Group>
                            </div>
                             <hr/>
                                <Checkbox className="SIView_Checkbox" checked={multiAxisDisplay} onChange={e => this.onChangeCheckbox(e,"checkbox_2")}>多轴显示</Checkbox>
                                <Button type="primary" size="small" onClick={this.handleClickForAdjust.bind(this)}>刷新图片>></Button>
                            </Layout.Col>
                            <Layout.Col span="12">
                                <div id="graph2"></div>
                            </Layout.Col>
                        </Layout.Row>
                        <Layout.Row>
                            <Table
                                columns={columns4}
                                data={data4}
                                border={true}
                                style={{width: '70%'}}
                            />      
                        </Layout.Row>
                        <Layout.Row>
                            <Button type="primary" size="small" onClick={this.handleClickForGraphAnalysis.bind(this)}>峰谷图形分析</Button>
                        </Layout.Row>
                    </div>
                    </div>
                </div>
            </Layout.Col>
        )
    }
}

export default SynIndexView
