import React, { Component } from 'react';
import {Layout, Input, Button, Radio, Checkbox, DatePicker,Table,Dialog,Tag,Select} from 'element-react';
import moment from "moment/moment";
import './IndexConfiguration.less'
import DialogForm from '@components/Dialog/Dialog'
import PrimarySelectedQuota from '@components/PrimarySelectedQuota/PrimarySelectedQuota'

class IndexConfiguration extends  Component{

    getOptions(){
        this.$post('/SignalQuotaManagement/findSubject')
            .then(res=>{
                for(let i in res){
                    this.state.Options.push(
                        {
                            value: res[i].subject,
                            label: res[i].subject
                        }
                    )
                }
                this.forceUpdate()
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
        if(key === "basicIndex")
            this.state.bas.basic = value
        else if(key === "seasonLength"){
            this.state.settings[key] = value;
        }else{
            let finalvalue = value / 100
            this.state.settings[key] = finalvalue;
        }
        this.forceUpdate();
    }

    onBlur(e,name){
        if(e.target.value !== '')
            this.state.settings[name] = e.target.value;
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
            this.state.settings.subject = e
        }
        if(name === "Select2"){
            this.setState({
                configurer: e,
            })
        }
    }

    handleConfirm1(){
        this.$post('/SignalQuotaManagement/subjectQuotaList',{condition:this.state.theme})
           .then(res=>{
               this.setState({
                    data: res
               })
           }).catch(e=>{
           console.log(e)
       })
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
    }

    handleClickForInfo(e,row){
        let page1 = document.getElementById("page1")
        page1.style.display = "none";
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
        this.setState({
            transferName:row.quota,
        })
        this.state.settings.quota = row.quota
    }

    handleClickForDelete(e,row){
        this.$post('/SignalQuotaManagement/delectInSubject',{id:row.id})
            .then(res=>{
                if(res === 1){
                    this.$post('/SignalQuotaManagement/subjectQuotaList',{condition:this.state.theme})
                    .then(res=>{
                        this.setState({
                            data: res
                        })
                    }).catch(e=>{
                        console.log(e)
                    })
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForCheck(){
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
        this.state.settings.thresholdPercentList = []
        this.state.settings.thresholdPercentList.push(this.state.settings.blueZone)
        this.state.settings.thresholdPercentList.push(this.state.settings.greenZone)
        this.state.settings.thresholdPercentList.push(this.state.settings.yellowZone)
        this.state.settings.thresholdPercentList.push(this.state.settings.redZone)
        this.forceUpdate()
        let TPL = this.state.settings.thresholdPercentList
        let flag = true
        for(let i = 0;i < TPL.length-1;i++){
            let min = TPL[i]
            for(let j = i+1;j < TPL.length;j++){
                if(min > TPL[j]){
                    flag = false
                }
            }
        }
        if(flag){
            this.$post('/SignalQuotaManagement/calculateThreshold',this.state.settings)
            .then(res=>{
                this.state.settings.statisticalFeatures = []
                this.state.settings.statisticalFeatures.push(res.blueValue)
                this.state.settings.statisticalFeatures.push(res.greenValue)
                this.state.settings.statisticalFeatures.push(res.yellowValue)
                this.state.settings.statisticalFeatures.push(res.redValue)
                this.forceUpdate()
            }).catch(e=>{
                console.log(e)
            })
        }else{
            alert("请按从小到大的顺序填写阈值信息！")
        }
    }

    handleClickForSave(){
        this.$post('/SignalQuotaManagement/saveThreshold',this.state.settings)
            .then(res=>{
                if(res === 1){
                    alert("保存成功！")
                }else{
                    alert("保存失败！")
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForAdd(){
        this.$post('/SignalQuotaManagement/addToSubject',{subject:this.state.theme,quota:this.state.bas.basic})
            .then(res=>{
                if(res === 1){
                    this.$post('/SignalQuotaManagement/subjectQuotaList',{condition:this.state.theme})
                    .then(res=>{
                        this.setState({
                            data: res,
                            bas:{
                                basic:[],
                                basicId:[]
                            }
                        })
                    }).catch(e=>{
                        console.log(e)
                    })
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForReturn(){
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
    }


    handleClickForSearch(){
        this.setState({
            dialogVisible:true
        })
    }

    handleConfirm(e){
        this.setState({
            dialogVisible:false,
            bas:e
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            Options: [],
            Options1: [{
                value: 'manager',
                label: '管理员'
            }],
            theme:'',
            configurer:'',
            columns: [
                {
                    label: "指标名称",
                    prop: "quota",
                    align:"center"
                },
                {
                    label: "操作",
                    prop: "zip",
                    align:"center",
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForInfo(e,row)}>详细信息</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data: [{
                quota: '--'
            }],
            transferName:'',
            settings: {
                subject:'',
                quota:'',
                dataFrequency: 1,
                startTime: '1999-01',
                endTime: '2003-01',
                seasonalAdjust: true,
                springLength: '0',
                artificialAdjust:[],
                statisticalFeatures:['-','-','-','-'],
                thresholdPercentList:[],
                blueValue:'',
                greenValue:'',
                yellowValue:'',
                redValue:'',
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
                    param:'quota'
                }],
            bas:{
                basic:[],
                basicId:[]
            },
            alt:{
                altSearch:false
            },
            dialogVisible:false,
            value1: new Date("1999-01"),
            value2: new Date('2003-01'),
        }
    }

    render(){
        const {value1,value2,settings} = this.state
        return(
            <div className="Pros_IndexConfig">
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
                        <Input className="inline-input" value={this.state.bas.basic} onChange={this.onChange.bind(this, 'basicIndex')}/>
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this) }>查询</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>增加配置指标</Button>
                        <div>
                            <PrimarySelectedQuota
                                dialogVisible={this.state.dialogVisible}
                                bas={this.state.bas}
                                alt={this.state.alt}
                                handleConfirm={this.handleConfirm.bind(this)}
                                theme={this.state.theme}
                                handleCancel={this.state.dialogVisible = false}
                            >
                            </PrimarySelectedQuota>
                        </div>
                        <div>
                            <br />
                            <Table
                                columns={this.state.columns}
                                data={this.state.data}
                                border={true}
                            />
                        </div>
                    </div>
                    <div id="page2">
                        <div>
                            <span>{this.state.transferName}</span>
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
                                <div>用指标原值进行统计特征阈值计算</div>
                                <div className="LampZone">累计蓝灯区域：<Input className="inline-input-smaller" onChange={this.onChange.bind(this,'blueZone')} />%</div>
                                <div className="LampZone">累计绿灯区域：<Input className="inline-input-smaller" onChange={this.onChange.bind(this,'greenZone')} />%</div>
                                <div className="LampZone">累计黄灯区域：<Input className="inline-input-smaller" onChange={this.onChange.bind(this,'yellowZone')}/>%</div>
                                <div className="LampZone">累计红灯区域：<Input className="inline-input-smaller" onChange={this.onChange.bind(this,'redZone')}/>%</div>
                                <div className="page2_buttons">
                                    <Button type="primary" size="small" onClick={this.handleClickForCheck.bind(this)}>数据检查</Button>
                                    <Button type="primary" size="small" onClick={this.handleClickForCal.bind(this)}>计算概率</Button>
                                    <Button type="primary" size="small" onClick={this.handleClickForSave.bind(this)}>保存阈值</Button>
                                    <Button type="primary" size="small" onClick={this.handleClickForReturn.bind(this)}>返回列表</Button>
                                </div>
                            </Layout.Col>
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
                                        统计特征:
                                        {
                                            settings.statisticalFeatures.map((el,index) => {
                                                return <span className="page2_StaChar" key={index}>{el}</span>
                                            })
                                        }
                                    </div>
                                    <div>
                                        人工调整
                                        <Input className="inline-input-smaller" onBlur={e => this.onBlur(e,"blueValue")}/>
                                        <Input className="inline-input-smaller" onBlur={e => this.onBlur(e,"greenValue")}/>
                                        <Input className="inline-input-smaller" onBlur={e => this.onBlur(e,"yellowValue")}/>
                                        <Input className="inline-input-smaller" onBlur={e => this.onBlur(e,"redValue")}/>
                                    </div>
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
