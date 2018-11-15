import React, { Component } from 'react';
import {Layout, Select,Button,Input,Table} from 'element-react';
import DialogForm from '@components/Dialog/Dialog'
import moment from "moment";
import './IndexPortfolioManage.less';

class IndexPortfolioManage extends  Component{

    getOptions(){
        this.$post('/SignalQuotaManagement/findSubject')
            .then(res=>{
                for(let i in res){
                    this.state.Options.push(
                        {
                            value: res[i].id,
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

    onChange(key, value) {
        this.setState({
            [key]: value
        })
        this.forceUpdate();
    }

    handleOption(e,name){
        this.setState({
            name:e
        })
        this.forceUpdate()
    }

    handleConfirm1(){
        this.$post('/SignalQuotaManagement/combination',{condition:this.state.analysisTheme})
           .then(res=>{
               this.setState({
                   data1: res
               })
           }).catch(e=>{
           console.log(e)
       })
    }

    handleClickForDelete(e,row){
        this.$post('/SignalQuotaManagement/delectCombination',{id:row.id})
            .then(res=>{
                if(res === 1){
                    this.$post('/SignalQuotaManagement/combination',{condition:this.state.analysisTheme})
                    .then(res=>{
                        this.setState({
                            data1: res
                        })
                    }).catch(e=>{
                        console.log(e)
                    })
                }else{
                    this.setState({
                        data1: [{
                            combination: '-',
                            creator:'-',
                            lastChange: '-'
                        }]
                    })
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForPage2Delete(e,row){
        this.$post('/SignalQuotaManagement/delectInCombination',{id:row.id})
            .then(res=>{
                if(res === 1){
                    this.$post('/SignalQuotaManagement/combinationQuotaList',{keyNum2:this.state.transferId,keyNum1:this.state.analysisTheme})
                    .then(res=>{
                        this.setState({
                            data2:res
                        })
                    }).catch(e=>{
                        console.log(e)
                    })
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForAddIndexPor(){
        let date  = moment().format('YYYY-MM-DD hh:mm:ss')
        this.$post('/SignalQuotaManagement/addCombination',{creator:'管理员',subject:this.state.analysisTheme,lastChange:date,combination:this.state.addIndex,creatTime:date})
            .then(res=>{
                if(res === 1){
                    this.$post('/SignalQuotaManagement/combination',{condition:this.state.analysisTheme})
                    .then(res=>{
                        this.setState({
                            data1: res,
                            addIndex:''
                        })
                    }).catch(e=>{
                        console.log(e)
                    })
                }else{
                    alert("添加失败！")
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForInfo(e,row){
        let page1 = document.getElementById("page1")
        page1.style.display = "none";
        this.setState({
            transferName: row.combination,
            transferId: row.id
        })
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
        this.$post('/SignalQuotaManagement/combinationQuotaList',{keyNum2:row.id,keyNum1:this.state.analysisTheme})
            .then(res=>{
                this.setState({
                    data2:res
                })
            }).catch(e=>{
                console.log(e)
            })
        this.$post('/SignalQuotaManagement/findSubject')
            .then(res=>{
                for(let i in res){
                    this.state.Options2.push(
                        {
                            value: res[i].id,
                            label: res[i].quota
                        }
                    )
                }
                this.forceUpdate()
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForUpdName(){
        this.setState({
            dialogData:{
                name:this.state.transferName,
                id: this.state.transferId
            },
            dialogVisible1:true,
            dialogVisible2:false,
            upd:true,
            add:false
        })
        this.forceUpdate()
    }

    handleClickForAddIndex(){
        this.setState({
            dialogData:{
                quota: '',
            },
            dialogVisible1:true,
            dialogVisible2:false,
            upd:false,
            add:true
        })
    }

    handleClickForReturn(){
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
    }

    handleConfirm2(){
        this.setState({
            dialogVisible1: false,
            dialogVisible2: false,
        });
        if(this.state.upd === true){
            this.$post('/SignalQuotaManagement/upd',{})
                .then(res=>{
                    if(res === 1){
                        this.getList()
                    }
                    this.setState({
                        upd: false
                    })
                }).catch(e=>{
                console.log(e)
            })
        }
        if(this.state.add === true){
            let id = "" + this.state.transferId
            Object.assign(this.state.dialogData,{combination:id})
            this.$post('/SignalQuotaManagement/addToCombination',this.state.dialogData)
                .then(res=>{
                    if(res === 1){
                        this.$post('/SignalQuotaManagement/combinationQuotaList',{keyNum2:this.state.transferId,keyNum1:this.state.analysisTheme})
                        .then(res=>{
                            this.setState({
                                data2:res
                            })
                        }).catch(e=>{
                            console.log(e)
                        })
                    }else{
                        alert("添加失败！")
                    }
                    this.setState({
                        add: false
                    })
                }).catch(e=>{
                console.log(e)
            })
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            Options: [],
            Options2:[],
            analysisTheme:'',
            columns1: [
                {
                    label: "指标组合名称",
                    prop: "combination",
                    align:'center'
                },
                {
                    label: "创建人",
                    prop: "creator",
                    width: '200%',
                    align:'center'
                },
                {
                    label: "修改时间",
                    prop: "lastChange",
                    width: '200%',
                    align:'center'
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '150%',
                    align:'center',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForInfo(e,row)}>选择</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data1: [{
                combination: '-',
                creator:'-',
                lastChange: '-'
            }],
            columns2: [
                {
                    label: "指标名称",
                    prop: "quota",
                    align:'center'
                },{
                    label: "阈值信息",
                    align:'center',
                    subColumns: [
                      {
                        label: "蓝灯",
                        prop: "blueValue",
                        width: 100,
                        align:'center'
                      },
                      {
                        label: "绿灯",
                        prop: "greenValue",
                        width: 100,
                        align:'center'
                      },
                      {
                        label: "黄灯",
                        prop: "yellowValue",
                        width: 100,
                        align:'center'
                      },{
                        label: "红灯",
                        prop: "redValue",
                        width: 100,
                        align:'center'
                      }
                    ]
                },{
                    label: "操作",
                    prop: "zip",
                    width: '100%',
                    align:'center',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForPage2Delete(e,row)}>删除</Button>
                                </span>
                    }
                }],
            data2: [{
                quota:"--",
                blueValue:'--',
                greenValue:'--',
                yellowValue:'--',
                redValue:'--'
            }],
            addIndex:'',
            addIndexPor:'',
            transferName:'',
            transferId:'',
            dialogVisible1: false,
            dialogVisible2: false,
            dialogData: '',
            dialogForm1:[
                {
                    label:"指标名称",
                    param:"quota"
                }
            ],
            dialogForm2:[
                {
                    label:"指标名称",
                    param:"name"
                },{
                    label:"数据项",
                    param:"dataItem"
                },{
                    label:"阈值信息",
                    param:"thresholdInfo"
                }
            ],
            upd:'',
            add:''
        }
    }

    render(){
        return(
            <div>
                <h3>景气信号灯指标组合管理</h3>
                <Layout.Col span={9}>
                    <span>请选择要配置的分析主题：</span>
                    <Select value={this.state.value} onChange={e => this.handleOption(e,"analysisTheme")} clearable={true}>
                        {
                            this.state.Options.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                            })
                        }
                    </Select>
                </Layout.Col>
                <Layout.Col span={2}>
                    <Button type="primary" size="small" onClick={this.handleConfirm1.bind(this)}>确定</Button>
                </Layout.Col>
                <Layout.Col span={18}>
                    <div id="page1">
                        <h4>当前指标组合：</h4>
                        <div>
                            <Table
                                columns={this.state.columns1}
                                data={this.state.data1}
                                border={true}
                            />
                        </div>
                        <div>
                            <blockquote />
                            <span>添加新的指标组合：</span>
                            <Input className="inline-input" value={this.state.addIndex} onChange={this.onChange.bind(this,"addIndex")}/>
                            <Button type="primary" size="small" onClick={this.handleClickForAddIndexPor.bind(this)}>创建新的指标组合</Button>                            
                        </div>
                    </div>
                    <div id="page2">
                        <br />
                        <span>指标组合：{this.state.transferName}</span>
                        <div>
                            <br />
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"addIndexPor")} clearable={true}>
                                {
                                    this.state.Options2.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                            <Button type="primary" size="small" onClick={this.handleClickForAddIndex.bind(this)}>增加指标</Button>
                            <Button type="primary" size="small" onClick={this.handleClickForUpdName.bind(this)}>编辑指标组合名称</Button>
                            <Button type="primary" size="small" onClick={this.handleClickForReturn.bind(this)}>返回指标组合列表</Button>
                            <blockquote />
                        </div>
                        <div>
                            <Table
                                columns={this.state.columns2}
                                data={this.state.data2}
                                border={true}
                            />
                        </div>
                        <DialogForm
                                dialogData={this.state.dialogData}
                                dialogVislble={this.state.dialogVisible1}
                                form={this.state.dialogForm1}
                                handleComfirm={this.handleConfirm2.bind(this)}
                        >
                        </DialogForm>
                        <DialogForm
                            dialogData={this.state.dialogData}
                            dialogVislble={this.state.dialogVisible2}
                            form={this.state.dialogForm2}
                            handleComfirm={this.handleConfirm2.bind(this)}
                        >
                        </DialogForm>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default IndexPortfolioManage
