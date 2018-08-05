import React, { Component } from 'react';
import {Layout, Input, Button, Select,Table,Dialog,Radio,Checkbox,Tree,DatePicker } from 'element-react';
import './BasicStatistics.less';
import moment from "moment/moment";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class BasicStatistics extends  Component{

    handleClickForSearch(name){
        this.setState({
            dialogVisible:true
        })
    }

    onChangeRadio(value) {
        this.state.settings.dataFrequency = value;
        this.forceUpdate();
    }

    handleClickForCheck(){
        console.log(this.state.settings)
        this.$post('/group/del')
            .then(res=>{
                if(res === 1){
                    alert("")
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForGraph(){
        console.log(this.state.settings)
        let myChart = echarts.init(document.getElementById('graph'));
        myChart.setOption(this.state.graphOptions)
    }

    handleClickForCal(){

    }

    //PrimaryDialogMethod

    handleCancel(){
        this.setState({dialogVisible:false})
    }

    handleIniOption(e){
        this.state.dialogBodyData.search.keywordSelect = e;
    }

    onChange(key, value) {
        this.state.dialogBodyData.search.keywordInput = value;
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
            TableData:[{
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
                    TableData:res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleComfirm(){
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
        this.setState({
            dialogVisible:false,
            TableData:[{type:"-"}]
})
}

    //PrimaryDialogMethod

    constructor(props) {
        super(props);

        this.state = {
            dialogVisible:false,
            Options: [{
                value: '1',
                label: '1'
            }],
            dialogBodyData:{
                search:{
                    frequency:1,
                    keywordSelect:'',
                    keywordInput:''
                },
                reverse:true,
            },
            TreeData:[{
                id: 1,
                label: 'A01',
            },{
                id: 2,
                label: 'A01',
            },{
                id: 3,
                label: 'A01',
            }],
            TreeOptions: {
                children: 'children',
                label: 'label'
            },
            TreeData2: [{
                id: 1,
                label: 'A02',
            }],
            TableColumns: [
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
            TableData:[{
                type: "-"
            }],
            addedIndex:'',
            settings:{
                altQuota:[],
                altQuotaId:[],
                dataFrequency:1,
                date1: '2018-06',
                date2: '2018-07',
            },
            graphOptions: {
                title: {text: '基本统计量分析'},
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
        }
    }

    render(){
        const { dialogBodyData,settings,value1,value2 } = this.state
        return(
            <div className="BasicStatistics">
                <Layout.Col span={18}>
                    <h3>基本统计量</h3>
                    <div>
                        <span>选择备选指标：</span>
                        <Input className="inline-input-textarea" value={settings.altQuota} type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this) }>查询</Button>
                    </div>
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
                        <Button type="primary" size="small" onClick={this.handleClickForCheck.bind(this,"altSearch") }>数据检查</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForGraph.bind(this,"altSearch") }>显示图形</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForCal.bind(this,"altSearch") }>计算统计量</Button>
                    </div>
                    <div>
                        <Layout.Col span={10}>
                            <div id="graph"></div>
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
                                        <Select value={this.state.value} onChange={e => this.handleIniOption(e)} clearable={true}>
                                            {
                                                this.state.Options.map(el => {
                                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                                })
                                            }
                                        </Select>
                                        <Input className="inline-input" onChange={this.onChange.bind(this)}/>
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
                                                data={this.state.TreeData}
                                                options={this.state.TreeOptions}
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
                                                data={this.state.TreeData2}
                                                options={this.state.TreeOptions}
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
                                        <Table
                                            columns={this.state.TableColumns}
                                            data={this.state.TableData}
                                            border={true}
                                            height="80px"
                                        />
                                    </div>
                                </div>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Button type="primary" size="small" onClick={this.handleComfirm.bind(this) }>确定</Button>
                            </Dialog.Footer>
                        </Dialog>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default BasicStatistics