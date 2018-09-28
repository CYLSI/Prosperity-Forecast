import React, { Component } from 'react';
import {Layout, Button,Checkbox,DatePicker,Input,Table,Select} from 'element-react';
import moment from "moment/moment";
import './SyntheticalProsIndexCal.less';

class SyntheticalProsIndexCal extends  Component{
    
    componentDidMount(){
        this.getList();
        this.getList1();
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
        let editname1 = document.getElementById("editname1")
        editname1.style.display = "block";
        let editname2 = document.getElementById("editname2")
        editname2.style.display = "none";
    }

    getList(){
        this.$post('/SignalQuotaManagement/combination')
            .then(res=>{
                this.setState({
                    data: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    getList1(){
        this.$post('/SignalQuotaManagement/combinationQuotaList',{condition:this.state.settings.combination})
            .then(res=>{
                this.setState({
                    data1: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForInfo(e,row){
        this.setState({
            combination:row.name,
            calculator:row.creator,
            subject:row.subject,
            benchmark:row.benchmarkValue,
            id:row.id
        })
        this.state.addData.id = row.id;
        this.state.settings.combination = row.name;
        let page1 = document.getElementById("page1")
        page1.style.display = "none";
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
    }

    handleClickForDelete(e,row){
        this.$post('/SignalQuotaManagement/delectCombination',{id:row.id})
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForAdd(){
        this.state.addData.creatTime = moment().format('YYYY-MM');
        this.state.addData.lastChange = moment().format('YYYY-MM');
        this.$post('/SignalQuotaManagement/addCombination',this.state.addData)
            .then(res=>{
                if(res === 1){
                     this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForEditdName(){
        let editname1 = document.getElementById("editname1")
        editname1.style.display = "none";
        let editname2 = document.getElementById("editname2")
        editname2.style.display = "block";
    }

    handleClickForUpdName(){
        this.state.addData.lastChange = moment().format('YYYY-MM');
        this.$post('SignalQuotaManagement/update',this.state.addData)
            .then(res=>{
                if(res === 1){ 
                    alert("修改成功！");
                    this.getList();
                    window.location.reload(true); 
            }
            }).catch(e=>{
            console.log(e)
        })
        let editname1 = document.getElementById("editname1")
        editname1.style.display = "block";
        let editname2 = document.getElementById("editname2")
        editname2.style.display = "none";
    }

    onChange(key,value){
        this.state.settings[key] = value;
        this.forceUpdate();
    }

    onChangeDate(value1,value2){
        if(value1 > value2)
            alert("时间输入有误，请重新输入！")
    }

    onChangeName(key,value){
        this.state.addData[key] = value;
        this.forceUpdate();
    }

    onChangeCheckbox(e){
        this.state.settings.seasonalAdjust = e
    }

    handleClickForReturn(){
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
    }

    handleClickForFinish(){
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
        let page3 = document.getElementById("page3")
        page3.style.display = "none";
    }

    handleClickForCalculate(){
        this.$post('/SignalLampCalculate/Calculate',this.state.settings)
             .then(res=>{
                if(res != null){
                    alert('计算成功！结算结果已显示在"景气信号灯查看"页面的最新一条');
                    window.location.href="/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexView#/themeAnalysis/agriculturalDevelopment/prosSignalLamp/ProsSignalLampView";
                }
            }).catch(e=>{
            console.log(e)
        })
        console.log(this.state.settings)
    }
    
    constructor(props) {
        super(props);

        this.state = {
            settings: {
                combination:'指标组合1',
                startTime:'1999-01',
                endTime:'2003-01',
                springDay:'0',
                calculator:'1',
                calTime:'2018-07',
                subject:'农业增加分析2'
            },
            addData:{
                id:'',
                name:'',
                creator:'管理员',
                creatTime:'',
                lastChange:'',
                remarks:null,
                benchmarkValue:'',
                time1:null,
                time2:null,
                subject:null
            },
            columns: [
                {
                    label: "",
                    prop: "choose",
                    width:150,
                    align: 'center',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForInfo(e,row)}>选择</Button>
                               </span>
                    }
                },
                {
                    label: "指标组合名称",
                    prop: "name",
                    width: 210,
                    align: 'center',
                    sortable: true
                },
                {
                    label: "创建人",
                    prop: "creator",
                    width: 170,
                    align: 'center',
                },
                {
                    label: "修改时间",
                    prop: "creatTime",
                    width: 205,
                    align: 'center',
                    sortable: true
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: 155,
                    align: 'center',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data: [{
                name:"--",
                creator:"--",
                creatTime:"--"
            }],
            columns1: [
                {
                    label: "指标名称",
                    prop: "quota",
                    align: 'center',
                },
                {
                    label: "数据项",
                    prop: "dataitem",
                    align: 'center',
                }
            ],
            data1: [{
                quota:"--",
                dataitem:"--"
            }],
            columns2: [
                {
                    type: 'selection',
                    width:100
                },
                {
                    label: "指标信息",
                    prop: "info2",
                    align: 'center',
                    width:370,
                    sortable: true
                },
                {
                    label: "配置",
                    prop: "manage2",
                    align: 'center',
                    width:100
                },
                {
                    label: "配置人",
                    prop: "manager2",
                    align: 'center',
                    width:100
                },
                {
                    label: "评价",
                    prop: "commit2",
                    align: 'center',
                    width:100
                },
                {
                    label: "修改时间",
                    prop: "edittime2",
                    align: 'center',
                    width:200,
                    sortable: true
                }
            ],
            data2: [{
                info2:"--",
                manage2:"--",
                manager2:"--",
                commit2:"--",
                editname2:"--"
            }],
            value:""
        }
    }
    render(){
        var moment = require('moment');
        const {value1,value2,settings,addData,columns,data,columns1,data1,columns2,data2} = this.state
        return(
            <Layout.Col span={18}>
            <div className="synProsIndexCal">
                <div>
                    <Layout.Row>
                    <h3>—景气信号灯-综合景气指数计算—</h3>
                    </Layout.Row>
                    
                    <div id="page1">
                        <Layout.Row>
                        <div className="synProsIndexCal-heading">请选择指标组合:</div>
                            <Table
                                columns={columns}
                                data={data}
                                border={true}
                                style={{width: '100%'}}
                            />
                        </Layout.Row>
                        <Layout.Row>
                            <div className="text-center">
                                <span>添加新的指标组合：</span>
                                <Input className="inline-input" placeholder={addData.name} onChange={this.onChangeName.bind(this,"name")}/>
                                <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>创建新的指标组合</Button>
                            </div>
                        </Layout.Row>
                    </div>

                    <div id="page2">
                        <div id="editname1">

                                <Layout.Row>
                                <div className="synProsIndexCal-heading">指标组合：{this.state.combination}</div>
                                <Layout.Row>
                                    <div className="text-right">
                                        <Button type="primary" size="small" onClick={this.handleClickForEditdName.bind(this)}>修改指标组合名称</Button>
                                        <Button type="primary" size="small">编辑指标组合</Button>
                                        <Button type="primary" size="small" onClick={this.handleClickForReturn.bind(this)}>返回指标组合列表</Button>
                                    </div>
                                </Layout.Row>
                                </Layout.Row>
                        </div>
                        <div id="editname2">
                            <Layout.Row>
                            <span><div className="synProsIndexCal-heading">指标组合：</div></span>
                            <span><Input className="inline-input" placeholder={addData.name} onChange={this.onChangeName.bind(this,"name")}/></span>
                                <span className="text-right">
                                    <Button type="primary" size="small" onClick={this.handleClickForUpdName.bind(this)}>保存组合名称</Button>
                                    <Button type="primary" size="small">编辑指标组合</Button>
                                    <Button type="primary" size="small" onClick={this.handleClickForReturn.bind(this)}>返回指标组合列表</Button>
                                </span>
                            </Layout.Row>
                        </div>
                            <Table
                                columns={columns1}
                                data={data1}
                                border={true}
                                style={{width: '100%'}}
                            />
                        <hr/>
                    <Layout.Row>
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
                                    settings.calTime = moment().format('YYYY-MM-DD HH:mm:ss');
                                    this.forceUpdate();
                                    this.onChangeDate(settings.startTime,settings.endTime);

                            }}
                                selectionMode="month"
                            />
                            <span>(格式：2007-04)</span>
                    </div>
                    <div>
                        <span>季节调整：</span>
                        <Checkbox className="PVGAnalysis_Checkbox">需要进行季节调整</Checkbox>
                        <span>春节长度：</span>
                        <Input className="inline-input-smaller" placeholder={settings.springDay} onChange={this.onChange.bind(this,'springDay')}/>
                        <span>天(0-7天)</span>
                    </div>
                    </Layout.Row>
                    <hr/>
                    <Layout.Row>
                    <div className="synProsIndexCal_button text-center">
                        <Button type="primary" size="small">数据检查</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForCalculate.bind(this)}>计算新的合成指数</Button>
                    </div>
                    </Layout.Row>
                    </div>
                </div>
            </div>
            </Layout.Col>
        )
    }
}

export default SyntheticalProsIndexCal
