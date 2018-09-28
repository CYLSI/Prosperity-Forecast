import React, { Component } from 'react';
import {Layout, Input, Button, Radio, Checkbox,DatePicker,Dialog,Tree,Select} from 'element-react';
import './PeakValleyGraphicAnalysis.less';
import moment from 'moment';
import { Table,Divider } from 'antd';

class PeakValleyGraphicAnalysis extends  Component{

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
        this.$post('/analysis/check',this.state.settings)
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

    handleClickForRefresh(){

    }

    handleClickForSearch(name){
        if(name === "altSearch"){
            this.setState({altSearch:true})
        }else{
            this.setState({altSearch:false})
        }
        this.setState({
            dialogVisible:true
        })
    }

    handleCancel(){
        this.setState({dialogVisible:false})
    }

    handleIniOption(e){
        this.state.dialogBodyData.search.keywordSelect = e;
    }

    onChangeDialogRadio(value) {
        this.state.dialogBodyData.search.frequency = value;
        this.forceUpdate();
    }

    handleClickForSearching(){
        console.log(this.state.dialogBodyData.search)
        this.$post('/group/del')
            .then(res=>{
                if(res === 1){
                    this.setState({
                        data1:res
                    })
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForTree1(data){
        /*this.$post('/group/list',data)
            .then(res=>{
                this.setState({
                    data2:''
                })
            }).catch(e=>{
            console.log(e)
        })*/
    }

    handleClickForTree2(data){
        this.setState({
            addedIndex:data
        })
    }

    handleClickForIndexAdd(){
        this.setState({
            data3:[{
                type:this.state.addedIndex.label
            }]
        })
        this.forceUpdate()
    }

    handleClickForDialogDel(e,row){
        console.log(this.state.addedIndex.id)
        this.$post('/role/del',{type: row.type})
            .then(res=>{
                this.setState({
                    data3:res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleComfirm(){
        if(this.state.altSearch === false){
            this.state.settings.quota = this.state.addedIndex.label;
            this.state.settings.quotaId = this.state.addedIndex.id
        }else {
            if (this.state.settings.altQuotaId.length === 0) {
                this.state.settings.altQuotaId.push(this.state.addedIndex.id)
                this.state.settings.altQuota.push(this.state.addedIndex.label)
            } else {
                let flag = false
                for (let i in this.state.settings.altQuotaId) {
                    if (this.state.settings.altQuotaId[i] === this.state.addedIndex.id) {
                        alert("该指标已添加！")
                        flag = true
                        break;
                    }
                }
                if(!flag){
                    this.state.settings.altQuotaId.push(this.state.addedIndex.id)
                    this.state.settings.altQuota.push(this.state.addedIndex.label)
                }
            }
        }
        this.setState({
            dialogVisible:false,
            data3:[{type:"-"}]
        })
    }

    handleClickForCheck(){
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

    handleClickForGraphAnalysis(){
    }

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this)
        this.handleClickForAnalysis = this.handleClickForAnalysis.bind(this)

        this.state = {
            settings: {
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
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="javascript:;">{text}</a>,
            }, {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                          <a href="javascript:;">Invite {record.name}</a>
                          <a href="javascript:;">Delete</a>
                        </span>
                ),
            }],
            data: [{
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            }, {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            }, {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            }],
        multiAxisDisplay: true,
            addedIndex:'',
            altSearch:false,
            dialogBodyData:{
                search:{
                    frequency:1,
                    keywordSelect:'',
                    keywordInput:''
                },
                reverse:true,
            },
            dialogVisible:false,
            columns3: [
                {
                    label: "指标类型",
                    prop: "type"
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '80%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDialogDel(e,row)}>删除</Button>
                                </span>
                    }
                }],
            data3:[{
                type: "-"
            }],
            Options: [{
                value: '1',
                label: '1'
            }],
            data1:[{
                id: 1,
                label: 'A01',
            },{
                id: 2,
                label: 'A01',
            },{
                id: 3,
                label: 'A01',
            }],
            options: {
                children: 'children',
                label: 'label'
            },
            data2: [{
                id: 1,
                label: 'A02',
            }],
            TableOptions:[{
                value: 'TableOptions',
                label: 'TableOptions'
            }],
        }
    }

    render(){
        const { settings,value1,value2,multiAxisDisplay,dialogBodyData } = this.state
        return(
            <Layout.Col span={18}>
                <div className="PVGAnalysis">
                    <div>
                        <h3>—BB算法及峰谷图形分析—</h3>
                        <span>基准指标：</span>
                        <Input className="inline-input" value={this.state.settings.baseQuota}/>
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this)}>查询</Button>
                    </div>
                    <div>
                        <span>分析指标：</span>
                        <Input className="inline-input-textarea" value={this.state.settings.analysisQuota} type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
                        <Button type="primary" size="small"  onClick={this.handleClickForSearch.bind(this,"altSearch") }>查询</Button>
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
                            <span>季节调整：</span>
                            <Checkbox className="PVGAnalysis_Checkbox" checked={settings.seasonalAdjust} onChange={e => this.onChangeCheckbox(e,"checkbox_1")}>需要进行季节调整</Checkbox>
                            <span>春节长度：</span>
                            <Input className="inline-input-smaller" placeholder={settings.springLength} onChange={this.onChange.bind(this,'seasonLength')}/>
                            <span>天(0-7天)</span>
                            <div id="PVG_dataCheck">
                                <Button type="success" size="small" onClick={this.handleClickForCheck.bind(this)}>数据检查</Button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>峰谷距离：</span>
                        <Input className="inline-input-smaller" placeholder={settings.halfPeriod} onChange={this.onChange.bind(this,'halfPeriod')}/>
                        <span>峰峰距离：</span>
                        <Input className="inline-input-smaller" placeholder={settings.onePeriod} onChange={this.onChange.bind(this,'onePeriod')}/>
                        <span>季节长度：</span>
                        <Input className="inline-input-smaller" placeholder={0}/>
                        <Button type="primary" size="small" onClick={e => this.handleClickForAnalysis(e)}>BB算法识别峰谷</Button>
                    </div>
                    <Layout.Col span={20}>
                        <div id="BBAnalysis">
                            <hr />

                            <Button type="primary" size="small" onClick={this.handleClickForGraphAnalysis.bind(this)}>峰谷图形分析</Button>
                            <div></div>
                        </div>
                    </Layout.Col>
                </div>
                <div className="PSIndex_Dialog">
                    <Dialog
                        visible={this.state.dialogVisible}
                        size="small"
                        title="指标初选"
                        top="20px"
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <Dialog.Body>
                            <div>
                                <div>
                                    <span>请选择一组指标：</span>
                                    <Select value={this.state.value} onChange={e => this.handleIniOption(e,"Select2")} clearable={true}>
                                        {
                                            this.state.Options.map(el => {
                                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                            })
                                        }
                                    </Select>
                                    <Input className="inline-input" onChange={this.onChange.bind(this,"dialog-search")}/>
                                </div>
                                <div>
                                    <Radio value="1" checked={dialogBodyData.search.frequency === 1} onChange={this.onChangeDialogRadio.bind(this)}>月度</Radio>
                                    <Radio value="2" checked={dialogBodyData.search.frequency === 2} onChange={this.onChangeDialogRadio.bind(this)}>季度</Radio>
                                    <Radio value="3" checked={dialogBodyData.search.frequency === 3} onChange={this.onChangeDialogRadio.bind(this)}>年度</Radio>
                                    <Button type="primary" size="small" onClick={this.handleClickForSearching.bind(this) }>关键字查询</Button>
                                </div>
                                <Layout.Col span={11}>
                                    <div className="PSIndex_Dialog_indexName">
                                        <p>指标名称</p>
                                        <Tree
                                            data={this.state.data1}
                                            options={this.state.options}
                                            nodeKey="id"
                                            defaultExpandedKeys={[1]}
                                            onNodeClicked={this.handleClickForTree1.bind(this)}
                                            highlightCurrent={true}
                                        />
                                    </div>
                                </Layout.Col>
                                <Layout.Col span={11}>
                                    <div className="PSIndex_Dialog_indexType">
                                        <p>指标类型</p>
                                        <Tree
                                            data={this.state.data2}
                                            options={this.state.options}
                                            nodeKey="id"
                                            defaultExpandedKeys={[1]}
                                            onNodeClicked={this.handleClickForTree2.bind(this)}
                                            highlightCurrent={true}
                                        />
                                    </div>
                                </Layout.Col>
                                <div>
                                    <Button type="primary" size="small" onClick={this.handleClickForIndexAdd.bind(this)}>添加指标</Button>
                                    <Checkbox checked={dialogBodyData.reverse} onChange={e => this.onChangeCheckbox(e)}>逆转</Checkbox>
                                </div>
                                <div>

                                </div>
                            </div>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button type="primary" size="small" onClick={this.handleComfirm.bind(this) }>确定</Button>
                        </Dialog.Footer>
                    </Dialog>
                </div>
            </Layout.Col>
        )
    }
}

export default PeakValleyGraphicAnalysis
