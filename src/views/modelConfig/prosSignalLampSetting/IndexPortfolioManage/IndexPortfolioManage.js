import React, { Component } from 'react';
import {Layout, Select,Button,Input,Table} from 'element-react';
import DialogForm from '@components/Dialog/Dialog'

class IndexPortfolioManage extends  Component{

    getOptions(){
        this.$post('/user/listForm')
            .then(res=>{
                console.log(res)
                this.setState({
                    // Options: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    getList(){
        this.$post('/user/listForm')
            .then(res=>{
                console.log(res)
                this.setState({
                    // data: res
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

    onChange(key, value) {
        this.setState({
            [key]: value
        })
        this.forceUpdate();
    }

    handleOption(e){
        this.setState({
            analysisTheme: e,
        })
    }

    handleConfirm1(){
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        this.$post('/group/del',{analysisTheme:this.state.analysisTheme})
           .then(res=>{
               this.setState({
                   data: res
               })
           }).catch(e=>{
           console.log(e)
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

    handleClickForPage2Delete(e,row){
        this.$post('/group/del',{id:row.id})
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForAddIndexPor(){
        this.$post('/group/del',{addIndexPor:this.state.addIndexPor})
            .then(res=>{
                if(res === 1){
                    this.getOptions()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForInfo(e,row){
        let page1 = document.getElementById("page1")
        page1.style.display = "none";
        this.setState({
            transferName: row.name,
            transferId: row.id
        })
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
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
                name: '',
                dataItem: '',
                thresholdInfo:''
            },
            dialogVisible1:false,
            dialogVisible2:true,
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
            this.$post('/group/upd',{})
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
            this.$post('/group/add',{})
                .then(res=>{
                    if(res === 1){
                        this.getList()
                    }
                    this.setState({
                        add: false
                    })
                }).catch(e=>{
                console.log(e)
            })
        }
        console.log(this.state.dialogData)
    }

    constructor(props) {
        super(props);

        this.state = {
            Options: [{
                value: '1',
                label: '1'
            }],
            analysisTheme:'',
            columns1: [
                {
                    label: "序号",
                    prop: "id",
                    width: '80%'
                },
                {
                    label: "指标组合名称",
                    prop: "name",
                },
                {
                    label: "创建人",
                    prop: "founder",
                    width: '100%'
                },
                {
                    label: "修改时间",
                    prop: "updTime",
                    width: '180%'
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '120%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForInfo(e,row)}>选择</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data1: [{
                id:1,
                name: '合成扩散指数指标组合',
                founder:'管理员',
                updTime: '2018-7-19 17:34:54'
            }],
            columns2: [
                {
                    label: "指标名称",
                    prop: "name",
                },{
                    label: "数据项",
                    prop: "dataItem",
                },{
                    label: "阈值信息",
                    prop: "thresholdInfo",
                },{
                    label: "操作",
                    prop: "zip",
                    width: '100%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForPage2Delete(e,row)}>删除</Button>
                                </span>
                    }
                }],
            data2: [{
                name:"--",
                dataItem:'--',
                thresholdInfo:'--'
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
                    param:"name"
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
                    <Select value={this.state.value} onChange={e => this.handleOption(e)} clearable={true}>
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
                            <Input className="inline-input" placeholder={this.state.addIndex} onChange={this.onChange.bind(this,"addIndex")}/>
                            <Button type="primary" size="small" onClick={this.handleClickForAddIndexPor.bind(this)}>创建新的指标组合</Button>
                        </div>
                    </div>
                    <div id="page2">
                        <br />
                        <span>指标组合：{this.state.transferName}</span>
                        <div>
                            <br />
                            <Button type="primary" size="small" onClick={this.handleClickForUpdName.bind(this)}>编辑指标组合名称</Button>
                            <Button type="primary" size="small" onClick={this.handleClickForAddIndex.bind(this)}>增加指标</Button>
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
