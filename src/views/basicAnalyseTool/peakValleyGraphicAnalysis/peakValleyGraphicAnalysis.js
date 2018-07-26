import React, { Component } from 'react';
import {Layout, Input, Button, Radio, Checkbox, DatePicker,Table,Dialog,Tree,Select} from 'element-react';
import './PeakValleyGraphicAnalysis.less';
import moment from 'moment';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class PeakValleyGraphicAnalysis extends  Component{

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
                springLength: '0',
                peakValleyLength: '0',
                ppLength: '0',
                quota:'',
                quotaId:'',
                altQuota:[],
                altQuotaId:[]
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
            },
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
        }
    }

    render(){
        const { settings,value1,value2,multiAxisDisplay,columns,data,dialogBodyData } = this.state
        return(
            <Layout.Col span={18}>
                <div className="PVGAnalysis">
                    <div>
                        <h3>—BB算法及峰谷图形分析—</h3>
                        <span>基准指标：</span>
                        <Input className="inline-input" value={this.state.settings.quota}/>
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this)}>查询</Button>
                    </div>
                    <div>
                        <span>分析指标：</span>
                        <Input className="inline-input-textarea" value={this.state.settings.altQuota} type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
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
                            <Checkbox className="PVGAnalysis_Checkbox" checked={settings.seasonalAdjust} onChange={e => this.onChangeCheckbox(e,"checkbox_1")}>需要进行季节调整</Checkbox>
                            <span>春节长度：</span>
                            <Input className="inline-input-smaller" placeholder={settings.springLength} onChange={this.onChange.bind(this,'seasonLength')}/>
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
                                    <Table
                                        columns={this.state.columns3}
                                        data={this.state.data3}
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
        )
    }
}

export default PeakValleyGraphicAnalysis
