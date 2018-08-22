import React, { Component } from 'react';
import {Layout, Input, Button, Radio, Checkbox, DatePicker,Table,Dialog,Tag,Select} from 'element-react';
import moment from "moment/moment";
import './IndexConfiguration.less'
import DialogForm from '@components/Dialog/Dialog'

class IndexConfiguration extends  Component{

    getOptions(){
        this.$post('/user/listForm')
            .then(res=>{
                console.log(res)
                this.setState({
                    // Options: res,
                    // Options1: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    componentDidMount(){
        this.getOptions()
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
    }

    onChange(key,value){
        this.state.settings[key] = value;
        this.forceUpdate();
    }

    onBlur(e,name){
        if(e.target.value !== '')
            this.state.settings[name].push(e.target.value)
        this.forceUpdate();
    }

    onChangeRadio(value){
        this.state.settings.dataFrequency = value;
        this.forceUpdate();
    }

    onChangeCheckbox(e){
        this.state.settings.seasonalAdjust = e;
        this.forceUpdate();
    }

    handleOption(e,name){
        if(name === "Select1"){
            this.setState({
                theme: e,
            })
        }
        if(name === "Select2"){
            this.setState({
                configurer: e,
            })
        }
    }

    handleConfirm1(){
        console.log(this.state.theme,this.state.configurer)
        /*this.$post('/group/del',{id:row.id})
           .then(res=>{
               if(res == 1){
                   this.getList()
               }
           }).catch(e=>{
           console.log(e)
       })*/
    }

    handleClickForInfo(e,row){
        let page1 = document.getElementById("page1")
        page1.style.display = "none";
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
        this.setState({
            transferName:row.name,
            transferDataItem:row.dataItem
        })
    }

    handleClickForDelete(e,row){
        this.$post('/group/del',{id:row.id})
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForCheck(){
        console.log(this.state.settings)
        this.$post('/group/del',)
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
        console.log(this.state.settings)
        this.$post('/group/del',)
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForSave(){
        console.log(this.state.settings)
        this.$post('/group/del',)
            .then(res=>{
                if(res === 1){
                    alert("保存成功！")
                }else{
                    alert("保存失败！")
                }
                let page1 = document.getElementById("page1")
                page1.style.display = "block";
                let page2 = document.getElementById("page2")
                page2.style.display = "none";
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForAdd(){
        this.setState({
            dialogVisible:true,
            dialogData:{
                name:'',
                dataItem:'',
                thresholdInfo:''
            }
        })
    }

    handleConfirm2(){
        console.log(this.state.dialogData)
        this.setState({
            dialogVisible:false
        })
        this.$post('/group/del',this.state.dialogData)
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            Options: [{
                value: '1',
                label: '1'
            }],
            Options1: [{
                value: 'manager',
                label: '管理员'
            }],
            theme:'',
            configurer:'',
            columns: [
                {
                    label: "指标名称",
                    prop: "name",
                },
                {
                    label: "数据项",
                    prop: "dataItem",
                    width: '200%'
                },
                {
                    label: "阈值信息",
                    prop: "thresholdInfo",
                    width: '200%'
                },
                {
                    label: "操作",
                    prop: "analysisResult",
                    width: '200%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForInfo(e,row)}>详细信息</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data: [{
                name: '农业增加值(广东)',
                dataItem: '累计数据',
                thresholdInfo:'--'
            }],
            transferName:'',
            transferDataItem:'',
            settings: {
                dataFrequency: 1,
                date1: '2018-06',
                date2: '2018-07',
                seasonalAdjust: true,
                springLength: '0',
                artificialAdjust:[],
                statisticalFeatures:"10,10,10,10",
                blueZone:'',
                greenZone:'',
                yellowZone:'',
                redZone:''
            },
            dialogVisible:false,
            dialogData:'',
            dialogForm:[
                {
                    label:'指标名称',
                    param:'name'
                },{
                    label:'数据项',
                    param:'dataItem'
                },{
                    label:'阈值信息',
                    param:'thresholdInfo'
                }]
        }
    }

    render(){
        const {value1,value2,settings} = this.state
        return(
            <div>
                <h3>景气信号灯指标配置</h3>
                <Layout.Col span={9}>
                   <span>请选择要配置的主题：</span>
                   <Select value={this.state.value} onChange={e => this.handleOption(e,"Select1")} clearable={true}>
                       {
                           this.state.Options.map(el => {
                               return <Select.Option key={el.value} label={el.label} value={el.value}/>
                           })
                       }
                   </Select>
                </Layout.Col>
                <Layout.Col span={5}>
                    <span>配置人：</span>
                    <Select value={this.state.value} onChange={e => this.handleOption(e,"Select2")} clearable={true}>
                        {
                            this.state.Options1.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                            })
                        }
                    </Select>
                </Layout.Col>
                <div>
                    <Button type="primary" size="small" onClick={this.handleConfirm1.bind(this)}>确定</Button>
                </div>
                <Layout.Col span={18}>
                    <br />
                    <hr />
                    <div id="page1">
                        <span>景气信号灯指标配置：</span>
                        <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>增加配置指标</Button>
                        <div>
                            <br />
                            <Table
                                columns={this.state.columns}
                                data={this.state.data}
                                border={true}
                            />
                        </div>
                        <DialogForm
                            dialogData={this.state.dialogData}
                            dialogVislble={this.state.dialogVisible}
                            form={this.state.dialogForm}
                            handleComfirm={this.handleConfirm2.bind(this)}
                        >
                        </DialogForm>
                    </div>
                    <div id="page2">
                        <div>
                            <span>{this.state.transferName} - {this.state.transferDataItem}</span>
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
                                <Radio.Group onChange={this.onChangeRadio.bind(this)} value={this.state.settings.dataFrequency}>
                                    <Radio value={1}>月度</Radio>
                                    <Radio value={2}>季度</Radio>
                                    <Radio value={3}>年度</Radio>
                                </Radio.Group>
                                <Checkbox className="PVGAnalysis_Checkbox" checked={settings.seasonalAdjust} onChange={e => this.onChangeCheckbox(e,"checkbox_1")}>需要进行季节调整</Checkbox>
                                <span>春节长度：</span>
                                <Input className="inline-input-smaller" placeholder={settings.springLength} onChange={this.onChange.bind(this,'seasonLength')}/>
                                <span>天(0-7天)</span>
                            </div>
                            <Layout.Col span={10}>
                                <div>
                                    <span>阈值理论</span>
                                    <Tag color="blue">蓝灯</Tag>
                                    <Tag color="green">绿灯</Tag>
                                    <Tag color="yellow">黄灯</Tag>
                                    <Tag color="red">红灯</Tag>
                                </div>
                                <div className="page2_theory">
                                    <div>
                                        统计特征:{settings.statisticalFeatures}
                                    </div>
                                    <div>
                                        人工调整
                                        <Input className="inline-input-smaller" onBlur={e => this.onBlur(e,"artificialAdjust")}/>
                                        <Input className="inline-input-smaller" onBlur={e => this.onBlur(e,"artificialAdjust")}/>
                                        <Input className="inline-input-smaller" onBlur={e => this.onBlur(e,"artificialAdjust")}/>
                                        <Input className="inline-input-smaller" onBlur={e => this.onBlur(e,"artificialAdjust")}/>
                                    </div>
                                </div>
                            </Layout.Col>
                            <Layout.Col span={10}>
                                <div>用指标原值进行统计特征阈值计算</div>
                                <div className="LampZone">累计蓝灯区域：<Input className="inline-input-smaller" onChange={this.onChange.bind(this,'blueZone')} />%</div>
                                <div className="LampZone">累计绿灯区域：<Input className="inline-input-smaller" onChange={this.onChange.bind(this,'greenZone')} />%</div>
                                <div className="LampZone">累计黄灯区域：<Input className="inline-input-smaller" onChange={this.onChange.bind(this,'yellowZone')}/>%</div>
                                <div className="LampZone">累计红灯区域：<Input className="inline-input-smaller" onChange={this.onChange.bind(this,'redZone')}/>%</div>
                                <div className="page2_buttons">
                                    <Button type="primary" size="small" onClick={this.handleClickForCheck.bind(this)}>数据检查</Button>
                                    <Button type="primary" size="small" onClick={this.handleClickForCal.bind(this)}>计算概率</Button>
                                    <Button type="primary" size="small" onClick={this.handleClickForSave.bind(this)}>保存阈值</Button>
                                </div>
                            </Layout.Col>
                        </div>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default IndexConfiguration
