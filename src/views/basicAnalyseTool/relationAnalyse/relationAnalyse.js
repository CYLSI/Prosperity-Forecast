import React, { Component } from 'react';
import {Layout, Input, Button, Radio, Select, Checkbox, DatePicker,Dialog,Tree,Table} from 'element-react';
import './RelationAnalyse.less';
import moment from 'moment';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class RelationAnalyse extends  Component{

    constructor(props) {
        super(props);

        this.state = {
            options1: [{
                value: '1',
                label: '1'
            }, {
                value: '2',
                label: '2'
            }, {
                value: '3',
                label: '3'
            }, {
                value: '4',
                label: '4'
            }, {
                value: '5',
                label: '5'
            },{
                value: '6',
                label: '6'
            }, {
                value: '7',
                label: '7'
            }],
            options2:[{

            }],
            value: 1,
            Object:{
                baseQuota:1,
                basicIndexId:'',
                altIndexId:[],
                analysisQuota:[2,3],
                frequency:"1",
                seasonAdjust:false,
                select1:0,
                startTime:"2018-05",
                endTime:"2018-05",
                checkBox:["1",'2']
            },
            graphOptions1: {
                title: {text: '时差相关分析'},
                tooltip: {},
                xAxis: {
                    data: ["0", "2", "4", "6", "8", "10"],
                    axisLabel: {
                        interval: 0,
                    }
                },
                yAxis: {},
                series: [],
                legend: {
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 10,
                    padding: [40, 15, 0, 0,],
                    data: [],
                    right: '4%',
                    show: true,
                    orient: "horizontal",
                }
            },
            graphOptions2: {
                title: {text: 'KL信息量'},
                tooltip: {},
                xAxis: {
                    data: ["0", "2", "4", "6", "8", "10"],
                    axisLabel: {
                        interval: 0,
                    }
                },
                yAxis: {},
                series: [],
                legend: {
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 10,
                    padding: [40, 15, 0, 0,],
                    data: [],
                    right: '4%',
                    show: true,
                    orient: "horizontal",
                }
            },
            dialogVisible:false,
            Options3: [{
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
            },{
                id: 2,
                label: 'A03',
            }],
            addedIndex:'',
            altSearch:false
        }
    }

    componentDidMount() {
        let myChart1 = echarts.init(document.getElementById('graph1'));
        myChart1.setOption(this.state.graphOptions1)
        let myChart2 = echarts.init(document.getElementById('graph2'));
        myChart2.setOption(this.state.graphOptions2)
    }

    onChangeBox1(value) {
      this.setState({value});
      if(value == 1)this.state.Object.box1 = "月度";
      else if(value == 2) this.state.Object.box1 = "季度";
      else this.state.Object.box1 = "年度";
      this.forceUpdate();
       //console.log(value);
    }

    onChangeBox2(value) {
        this.state.Object.seasonAdjust = value;
        this.forceUpdate();
    }

    onChangeSelect(value,name){
        if(name === "Select2"){
            this.state.dialogBodyData.search.keywordSelect = value;
        }else{
            this.state.Object.select1 = value;
        }
        this.forceUpdate();
    }

    onChangeBox3(value) {
      this.setState({value});
      this.state.Object.box3 = value;
      this.forceUpdate();
    }

    handleCancel(){
        this.setState({dialogVisible:false})
    }

    onChange(key, value) {
        if(key === "dialog-search"){
            this.state.dialogBodyData.search.keywordInput = value;
        }else if(key === "basicIndex"){
            this.state.Object.index = value;
        }else{
            this.setState({
                [key]: value
            });
        }
        this.forceUpdate();
    }

    onChangeRadio(value) {
        this.state.dialogBodyData.search.frequency = value;
        this.forceUpdate();
    }

    onChangeCheckbox(e){
        this.state.dialogBodyData.reverse = e
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

    handleComfirm() {
        if (this.state.altSearch === false) {
            this.state.Object.basicIndex = this.state.addedIndex.label;
            this.state.Object.basicIndexId = this.state.addedIndex.id
        } else {
            if (this.state.Object.altIndexId.length === 0) {
                this.state.Object.altIndexId.push(this.state.addedIndex.id)
                this.state.Object.altIndex.push(this.state.addedIndex.label)
            } else {
                let flag = false
                for (let i in this.state.Object.altIndexId) {
                    if (this.state.Object.altIndexId[i] === this.state.addedIndex.id) {
                        alert("该指标已添加！")
                        flag = true
                        break;
                    }
                }
                if(!flag){
                    this.state.Object.altIndexId.push(this.state.addedIndex.id)
                    this.state.Object.altIndex.push(this.state.addedIndex.label)
                }
            }
        }
        this.setState({
            dialogVisible: false,
            data: [{type: "-"}]
        })
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

    handleClickForCheck(){
        console.log(this.state.Object)
        this.$post('/analysis/check',this.state.Object)
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

    handleClickForCal(){
        this.$post('/analysis/pb',this.state.Object)
            .then(res=>{
                this.state.graphOptions1.xAxis.data = res.xAxis;
                this.state.graphOptions1.series = res.timeLineList;
                this.state.graphOptions1.legend.data = res.lineNames;
                this.forceUpdate();
                let myChart1 = echarts.init(document.getElementById('graph1'));
                myChart1.setOption(this.state.graphOptions1)
                this.state.graphOptions2.xAxis.data = res.xAxis;
                this.state.graphOptions2.series = res.klLineList;
                this.state.graphOptions2.legend.data = res.lineNames;
                this.forceUpdate();
                let myChart2 = echarts.init(document.getElementById('graph2'));
                myChart2.setOption(this.state.graphOptions2)
            }).catch(e=>{
            console.log(e)
        })
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

  render(){
        const {value1,value2,dialogBodyData} = this.state
    return (
        <Layout.Col span={18}>
            <div id='relation-analyse'>
                <h3>相关性分析</h3>
                <span>
                  基准指标：  <Input  className="inline-input"  value={this.state.Object.baseQuota} onChange={this.onChange.bind(this, 'basicIndex')}/>
                    <Button type="primary" onClick={this.handleClickForSearch.bind(this)}>查询</Button>
                </span><br/><br/>
                <span>
                  分析指标：  <Input className="inline-input"  type="textarea" autosize={{ minRows: 2, maxRows: 4}}
                                value={this.state.Object.analysisQuota}/>
                  <Button type="primary" onClick={this.handleClickForSearch.bind(this,"altSearch") }>查询</Button>
                </span><br/><br/>
                <span>
                  相关设定：
                </span><br/><br/>
                <span>
                   数据频度： <Radio.Group value={this.state.Object.frequency} onChange={this.onChangeBox1.bind(this)}>
                    <Radio value= "1">月度</Radio>
                   <Radio value= "2">季度</Radio>
                   <Radio value= "3">年度</Radio>
                </Radio.Group>
                </span><br/><br/>
                <span>
                  季节调整：  <Checkbox checked={this.state.Object.seasonAdjust} onChange={this.onChangeBox2.bind(this)}>
                    需要进行季节调整，春节长度： </Checkbox>
                   <Select  size="small"  disabled={!this.state.Object.box2}
                            value={this.state.Object.select1} onChange={this.onChangeSelect.bind(this)}>
                  {
                    this.state.options1.map(el => {
                       return <Select.Option key={el.value} label={el.label} value={el.value} />
                      })
                  }
                  </Select>天（0—7天）

                </span><br/><br/>
                <span>
                   样本时间： 从  <DatePicker
                    value={value1}
                    placeholder="选择月"
                    onChange={date=>{
                        console.debug('month DatePicker changed: ', date)
                        this.setState({value1: date})
                        this.state.Object.startTime=moment(date).format("YYYY-MM");
                        this.forceUpdate();
                    }}
                    selectionMode="month"
                />到  <DatePicker
                    value={value2}
                    placeholder="选择月"
                    onChange={date=>{
                        console.debug('month DatePicker changed: ', date)
                        this.setState({value2: date})
                        this.state.Object.endTime=moment(date).format("YYYY-MM");
                        this.forceUpdate();
                    }}
                    selectionMode="month"
                />
                </span><br/><br/>
                <span>
                   计算模型：<Checkbox.Group value={this.state.Object.checkBox} onChange={this.onChangeBox3.bind(this)}>
                    <Checkbox label="1"></Checkbox>
                    <Checkbox label="2"></Checkbox>
                </Checkbox.Group>
                </span><br/>
                <div>
                    <Button type="success" onClick={() =>this.handleClickForCheck()}>数据检查</Button>
                    <Button type="primary" onClick={() =>this.handleClickForCal()}>计算</Button>
                </div>
                <Layout.Col span={9}>
                    <div id="graph1"></div>
                </Layout.Col>
                <span>
                    <Button type="primary" size="small" onClick={() =>this.handleClickForCheckPre()}>查看以往分析结果</Button>
                </span>
                <Layout.Col span={9}>
                    <div id="graph2"></div>
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
                                        this.state.Options3.map(el => {
                                            return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                        })
                                    }
                                </Select>
                                <Input className="inline-input" onChange={this.onChange.bind(this,"dialog-search")}/>
                            </div>
                            <div>
                                <Radio value="1" checked={dialogBodyData.search.frequency === 1} onChange={this.onChangeRadio.bind(this)}>月度</Radio>
                                <Radio value="2" checked={dialogBodyData.search.frequency === 2} onChange={this.onChangeRadio.bind(this)}>季度</Radio>
                                <Radio value="3" checked={dialogBodyData.search.frequency === 3} onChange={this.onChangeRadio.bind(this)}>年度</Radio>
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
export default RelationAnalyse