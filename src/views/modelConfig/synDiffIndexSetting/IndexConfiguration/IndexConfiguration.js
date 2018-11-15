import React, { Component } from 'react';
import {Layout, Input, Button, Select,Table,Dialog,Radio,Checkbox,Tree } from 'element-react';
import DialogForm from '@components/Dialog/Dialog'
import './IndexConfiguration.less';
import PrimarySelectedQuota from '@components/PrimarySelectedQuota/PrimarySelectedQuota'

class IndexConfiguration extends  Component{

    getOptions(){
        this.$post('/IndexManagement/subjectList')
            .then(res=>{
                for(let i in res){
                    this.state.Options.push(
                        {
                            value: res[i].name,
                            label: res[i].name
                        }
                    )
                }
                this.forceUpdate()
            }).catch(e=>{
            console.log(e)
        })
        this.$post('/type/list')
            .then(res=>{
                for(let i in res){
                    this.state.Options2.push(
                        {
                            value: res[i].name,
                            label: res[i].name
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
    }

    onChange(key, value) {
        if(key === "keyWord2")
            this.state.filter.keyWord2 = value;
        else
            this.state.dialogBodyData.search.keyWord2 = value;
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
        if(name === "Select3"){
            this.state.filter.keyWord1 = e
        }
    }

    handleClickForEdit(e,row){
        this.setState({
            dialogVisible1: true,
            dialogData: this.$clone(row),
            id: row.id
        })
        this.state.dialogForm[0].disabled = true
        this.forceUpdate()
    }

    handleClickForDelete(e,row){
        this.$post('/IndexManagement/delInSubject',{keyWord1:row.subject,keyNum1:row.id})
            .then(res=>{
                this.setState({
                    data: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForFilter(){
        this.$post('/IndexManagement/searchInSubject',this.state.filter)
            .then(res=>{
                this.setState({
                    data: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForCal(){

    }

    handleClickForSearch(){
        this.setState({
            dialogVisible:true
        })
        this.state.alt.altSearch = true
    }

    handleConfirm1(){
        this.$post('/IndexManagement/quotaBySubjectList',{keyWord1:this.state.theme})
           .then(res=>{
               this.setState({
                   data: res
               })
           }).catch(e=>{
           console.log(e)
       })
    }

    handleClickForAddAltIndex(){
        this.$post('/IndexManagement/addToSubject',{list:this.state.alt.altQuota,subject:this.state.theme})
            .then(res=>{
                this.setState({
                    data: res
                })
                document.getElementById("altIndex").value = ""
            }).catch(e=>{
            console.log(e)
        })
    }

    handleComfirm1(){
        this.setState({
            dialogVisible1:false
        })
        this.$post('/IndexManagement/upd',this.state.dialogData)
            .then(res=>{
                this.setState({
                    data: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    //PrimaryDialogMethod

    handleConfirm(e){
        this.setState({
            dialogVisible:false,
            alt:e
        })
        if(this.state.theme === ''){
            alert("请先选择配置的主题！")
            this.setState({
                alt:{
                    altQuota:[],
                    altQuotaId:[]
                }
            })
        }
    }

    //PrimaryDialogMethod

    constructor(props) {
        super(props);

        this.state = {
            Options: [],
            Options1: [{
                value: 'manager',
                label: '管理员'
            }],
            Options2:[],
            theme:'',
            configurer:'',
            filter:{
                keyWord1:'',
                keyWord2:''
            },
            columns: [
                {
                    label: "分析指标",
                    prop: "quota",
                },
                {
                    label: "一致性",
                    prop: "uniformity",
                    width: '100%'
                },
                {
                    label: "评价",
                    prop: "evaluate",
                    width: '100%'
                },
                {
                    label: "分析结果",
                    prop: "analysisResult",
                    width: '250%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small">相关性分析</Button>
                                    <Button type="text" size="small">峰谷分析</Button>
                                </span>
                    }
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '120%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>修改</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data: [{
                quota: '--',
                uniformity: '--',
                evaluate: '--',
            }],
            dialogForm:[
                {
                    label:'分析指标',
                    param:'quota'
                },
                {
                    label:'一致性',
                    param:'uniformity'
                },
                {
                    label:'评价',
                    param:'evaluate'
                }],
            dialogData:'',
            dialogVisible1:false,
            //dialogData
            alt:{
                altQuota:[],
                altQuotaId:[],
                altSearch:false
            },
            dialogVisible:false,
            //dialogData
        }
    }

    render(){
        const { dialogBodyData,dialogData,dialogForm,dialogVisible1 } = this.state
        return(
            <div>
                <h3>合成指数/扩散指数配置指标配置</h3>
                <Layout.Col span={10}>
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
                <div className="IndexConfig">
                    <span>指标类别：</span>
                    <Select value={this.state.value} onChange={e => this.handleOption(e,"Select3")} clearable={true}>
                        {
                            this.state.Options2.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                            })
                        }
                    </Select>
                    <span>关键字：</span>
                    <Input placeholder={this.state.keyword} className="inline-input" onChange={this.onChange.bind(this,"keyWord2")}/>
                    <Button type="primary" size="small" onClick={this.handleClickForFilter.bind(this)}>分析指标列表过滤</Button>
                </div>
                <div>
                    <Table
                        columns={this.state.columns}
                        data={this.state.data}
                        border={true}
                    />
                </div>
                <div>
                    <blockquote />
                    <Button type="primary" size="small" onClick={this.handleClickForCal.bind(this)}>全部重新计算相关性</Button>
                </div>
                <div>
                    <span>选择备选指标：</span>
                    <Input className="inline-input-textarea" id="altIndex" value={this.state.alt.altQuota} type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
                    <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this) }>查询</Button>
                    <Button type="primary" size="small" onClick={this.handleClickForAddAltIndex.bind(this) }>添加备选指标</Button>
                </div>
                <div>
                    <DialogForm
                        dialogData={dialogData}
                        dialogVislble={dialogVisible1}
                        form={dialogForm}
                        handleComfirm={this.handleComfirm1.bind(this)}
                        handleCancel={this.state.dialogVisible1 = false}
                    >
                    </DialogForm>
                </div>
                <div>
                    <PrimarySelectedQuota
                        dialogVisible={this.state.dialogVisible}
                        alt={this.state.alt}
                        handleConfirm={this.handleConfirm.bind(this)}
                        theme={this.state.theme}
                        handleCancel={this.state.dialogVisible = false}
                    >
                    </PrimarySelectedQuota>
                </div>
                </Layout.Col>
            </div>
        )
    }
}

export default IndexConfiguration
