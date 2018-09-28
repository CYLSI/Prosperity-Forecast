import React, { Component } from 'react';
import {Layout, Button,Checkbox,DatePicker,Input,Table,Select} from 'element-react';
import moment from "moment/moment";
import './SynIndexCalculation.less';

class SynIndexCalculation extends  Component{
    
    componentDidMount(){
        this.getList();
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
        let page3 = document.getElementById("page3")
        page3.style.display = "none";
        let editname1 = document.getElementById("editname1")
        editname1.style.display = "block";
        let editname2 = document.getElementById("editname2")
        editname2.style.display = "none";
    }

    getList(){
        this.$post('/IndexCombination/list')
            .then(res=>{
                this.setState({
                    data: res
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
        this.state.quota.keyWord1 = row.name;
        this.state.settings.combination = row.name;
        let page1 = document.getElementById("page1");
        page1.style.display = "none";
        let page2 = document.getElementById("page2");
        page2.style.display = "block";
        this.$post('/IndexManagement/quotaByCombinationList',{keyNum1:row.id})
                    .then(res=>{
                        this.setState({
                            data1: res
                        })
                    }).catch(e=>{
                    console.log(e)
                })
    }

    handleClickForDelete(e,row){
        this.$post('IndexCombination/del',{id:row.id})
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
        this.$post('/IndexCombination/add',this.state.addData)
            .then(res=>{
                if(res === 1){
                     this.getList();
                     console.log(this.state.addData);
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForEditName(){
        let editname1 = document.getElementById("editname1")
        editname1.style.display = "none";
        let editname2 = document.getElementById("editname2")
        editname2.style.display = "block";
    }
    
    handleClickForUpdName(){
        this.state.addData.lastChange = moment().format('YYYY-MM');
        this.$post('IndexCombination/cha',this.state.addData)
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

    onChangeCheckbox(e,row,index){
        this.state.data2[index].select = e
        Object.assign(row,{combination:this.state.id})
        if(!row.select){
            this.$post('/IndexManagement/deleteInCombination',row.id)
            .then(res=>{
                if(res === 1)
                    this.$post('/IndexManagement/quotaByCombinationList',{keyNum1:this.state.id})
                    .then(res=>{
                        this.setState({
                            data1: res
                        })
                    }).catch(e=>{
                    console.log(e)
                })
            }).catch(e=>{
                console.log(e)
            })
        }else{
            this.$post('/IndexManagement/addToCombination',row)
            .then(res=>{
                if(res === 1)
                    this.$post('/IndexManagement/quotaByCombinationList',{keyNum1:this.state.id})
                    .then(res=>{
                        this.setState({
                            data1: res
                        })
                    }).catch(e=>{
                    console.log(e)
                })
            }).catch(e=>{
            console.log(e)
            })
        }
    }

    handleClickForUpdGroup(){
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
        let page3 = document.getElementById("page3")
        page3.style.display = "block";
    }

    handleClickForReturn(){
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
        let page3 = document.getElementById("page3")
        page3.style.display = "none";
    }

    handleClickForFinish(){
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
        let page3 = document.getElementById("page3")
        page3.style.display = "none";
    }

    handleClickForCalculate(){
        this.$post('/CICalculate/calculate',this.state.settings)
             .then(res=>{
                if(res != null){
                    alert('计算成功！结算结果已显示在"合成指数查看"页面的最新一条');
                    window.location.href="/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexView#/themeAnalysis/agriculturalDevelopment/syntheticIndex/SynIndexView";
                }
            }).catch(e=>{
            console.log(e)
        })
        console.log(this.state.settings);
    }
    
    handleOption(e,Select){
        if(Select === "Select"){
            this.state.quota.keyWord2 = e;
        }
        this.$post('/IndexManagement/ifIncombination',this.state.quota)
            .then(res=>{
                this.setState({
                    data2: res
                })
            }).catch(e=>{
            console.log(e)
        })
        console.log(this.state.quota);
    }

    handleClickForCheck(){
        this.$post('/analysis/check',this.state.datacheck)
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

    constructor(props) {
        super(props);

        this.state = {
            settings: {
                combination:'指标组合1',
                startTime:'1999-01',
                endTime:'2003-01',
                springDay:'0',
                calculator:'1',
                calTime:'2018-01',
                subject:'1',
                benchmark:3
            },
            addData:{
                id:'',
                name:'',
                creator:'管理员',
                creatTime:'',
                lastChange:'',
                remarks:'',
                benchmarkValue:'benchmark'
            },
            quota:{
                keyWord1:'',
                keyWord2:''
            },
            datacheck: {
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
            columns: [
                {
                    label: "操作",
                    prop: "choose",
                    width:70,
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
                    width: 195,
                    align: 'center',
                    sortable: true
                },
                {
                    label: "创建人",
                    prop: "creator",
                    width: 90,
                    align: 'center',
                },
                {
                    label: "创建时间",
                    prop: "creatTime",
                    width: 165,
                    align: 'center',
                    sortable: true
                },
                {
                    label: "最后修改时间",
                    prop: "lastChange",
                    width: 165,
                    align: 'center',
                    sortable: true
                },
                {
                    label: "备注",
                    prop: "remarks",
                    width: 120,
                    align: 'center',
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: 105,
                    align: 'center',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data: [
            {
                name:"--",
                creator:"--",
                creatTime:"--",
                lastChange:"--",
                remarks:"--"
            }],
            columns1: [
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
            data1: [{
                leadQuota:"--",
                coinQuota:"--",
                lagQuota:"--"
            }],
            columns2: [
                {
                    label: "操作",
                    prop: "zip", 
                    align: "center",
                    width:100,
                    render: (row,event,index) =>
                        <Checkbox name="select" checked={row.select?true:false} onChange={e => this.onChangeCheckbox(e,row,index)}></Checkbox>
                },
                {
                    label: "指标信息",
                    prop: "quota",
                    align: 'center',
                    width:316,
                    sortable: true
                },
                {
                    label: "配置",
                    prop: "uniformity",
                    align: 'center',
                    width:100
                },
                {
                    label: "配置人",
                    prop: "evaluate",
                    align: 'center',
                    width:100
                },
                {
                    label: "评价",
                    prop: "evaluate",
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
                quota:"--",
                uniformity:'--',
                evaluate:'--',
                editname2:"--",
                select:true
            }],
            typeSelect:'',
            Selectoptions: [{
                value: '先行',
                label: '先行指标'
                }, {
                value: '一致',
                label: '一致指标'
                }, {
                value: '滞后',
                label: '滞后指标'
                }],
            value:'',
            id:''
        }
    }

    render(){
        var moment = require('moment');
        const {value1,value2,settings,addData,quota,columns,data,columns1,data1,columns2,data2,Selectoptions} = this.state
        return(
            <Layout.Col span={18}>
            <div className="synIndexCal">
                <div>
                    <Layout.Row>
                    <h3>—合成指数计算—</h3>
                    </Layout.Row>
                    {this.state.listid}
                    <div id="page1">
                        <Layout.Row>
                        <div className="synIndexCal-heading">当前指标组合:</div>
                        </Layout.Row>
                        <Layout.Row>
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
                                <div className="synIndexCal-heading">指标组合：{this.state.combination}</div>
                                <Layout.Row>
                                    <div className="text-right">
                                        <Button type="primary" size="small" onClick={this.handleClickForEditName.bind(this)}>修改组合名称</Button>
                                        <Button type="primary" size="small" onClick={this.handleClickForUpdGroup.bind(this)}>修改指标组合组成</Button>
                                        <Button type="primary" size="small" onClick={this.handleClickForReturn.bind(this)}>返回指标组合列表</Button>
                                    </div>
                                </Layout.Row>
                                </Layout.Row>
                        </div>
                        <div id="editname2">
                            <Layout.Row>
                            <span><div className="synIndexCal-heading">指标组合：</div></span>
                            <span><Input className="inline-input" placeholder={addData.name} onChange={this.onChangeName.bind(this,"name")}/></span>
                                <span className="text-right">
                                    <Button type="primary" size="small" onClick={this.handleClickForUpdName.bind(this)}>保存组合名称</Button>
                                    <Button type="primary" size="small" onClick={this.handleClickForUpdGroup.bind(this)}>修改指标组合组成</Button>
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
                    <div className="synIndexCal_button text-center">
                        <Button type="primary" size="small" onClick={this.handleClickForCheck.bind(this)}>数据检查</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForCalculate.bind(this)}>计算新的合成指数</Button>
                    </div>
                    </Layout.Row>
                    </div>

                    <div id="page3">
                        <Layout.Row>
                        <div className="synIndexCal-heading">指标组合：{this.state.combination}</div>
                        <Layout.Row>
                            <div className="text-right">
                                <Button type="primary" size="small" onClick={this.handleClickForEditName.bind(this)}>修改组合名称</Button>
                                <Button type="primary" size="small" onClick={this.handleClickForFinish.bind(this)}>结束指标组合组成</Button>
                                <Button type="primary" size="small" onClick={this.handleClickForReturn.bind(this)}>返回指标组合列表</Button>
                            </div>
                        </Layout.Row>
                            <Table
                                columns={columns1}
                                data={data1}
                                border={true}
                                style={{width: '100%'}}
                            />
                        </Layout.Row>
                        <Layout.Row>
                            <span>请选择指标类别</span>
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"Select")} clearable={true}>
                              {
                                Selectoptions.map(el => {
                                  return <Select.Option key={el.value} label={el.label} value={el.value} />
                                })
                              }
                            </Select>
                            <Table
                              style={{width: '100%'}}
                              columns={columns2}
                              data={data2}
                              border={true}
                            />
                        </Layout.Row>
                        <hr/>
                    <Layout.Row>
                        <div>
                        <span>样本时间：从</span>
                            <DatePicker
                                value={value1}
                                placeholder="选择月"
                                onChange={date=>{
                                    this.setState({value1: date});
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
                                    this.setState({value2: date});
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
                    <div className="synIndexCal_button text-center">
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

export default SynIndexCalculation
