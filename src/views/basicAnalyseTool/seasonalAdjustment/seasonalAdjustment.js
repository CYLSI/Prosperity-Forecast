import React, { Component } from 'react';
import {Layout, Input, Button, Radio,DatePicker,Checkbox,Dialog,Select,Tree,Table} from 'element-react';
import './SeasonalAdjustment.less';
import moment from "moment/moment";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class SeasonalAdjustment extends  Component{

    componentDidMount() {
        let myChart = echarts.init(document.getElementById('graph'));
        myChart.setOption(this.state.graphOptions)
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
            if((i+1) == list[i]){
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
        this.$post('/analysis/season',this.state.settings)
            .then(res=>{
                this.setState({
                    graphOptions : res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForSearch(name){
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
            data:[{
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
        this.state.settings.quota = this.state.addedIndex.label;
        this.state.settings.quotaId = this.state.addedIndex.id
        this.setState({
            dialogVisible:false,
            data:[{type:"-"}]
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            settings: {
                frequency: 1,
                startTime: '2018-06',
                endTime: '2018-07',
                springLength: '0',
                checkBox: ['1', '2', '3', '4', '5'],
                quota:'',
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
                series: [{
                    name: '原序列',
                    type: 'line',
                    data: [0, 20, 36, 10, 10, 20]
                },{
                    name: '趋势项序列(TC)',
                    type: 'line',
                    data: [4, 60, 23, 54, 65,0]
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
            },
            dialogVisible:false,
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
            columns: [
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
            data:[{
                type: "-"
            }],
        }
    }

    render(){
        const { settings,value1,value2,checkList,dialogBodyData } = this.state
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
                        <Radio value="1" checked={settings.frequency === 1} onChange={this.onChangeRadio.bind(this)}>月度</Radio>
                        <Radio value="2" checked={settings.frequency === 2} onChange={this.onChangeRadio.bind(this)}>季度</Radio>
                        <Radio value="3" checked={settings.frequency === 3} onChange={this.onChangeRadio.bind(this)}>年度</Radio>
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
                        <Button type="primary" size="small">数据检查</Button>
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
                                        columns={this.state.columns}
                                        data={this.state.data}
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

export default SeasonalAdjustment
