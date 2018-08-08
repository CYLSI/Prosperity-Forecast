import React, { Component } from 'react';
import {Layout, Select,Button,Table,Input} from 'element-react';
import './IndexPortfolioManage.less';

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

    onChange(key, value) {
        this.setState({
            [key]: value
        })
        this.forceUpdate();
    }

    componentDidMount(){
        this.getOptions()
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
        let page3 = document.getElementById("page3")
        page3.style.display = "none";
    }

    handleOption(e,name){
        if(name === "page3_Select"){
            this.$post('/user/listForm',e)
                .then(res=>{
                    this.setState({
                        // data3: res
                    })
                }).catch(e=>{
                console.log(e)
            })
        }else{
            this.setState({
                analysisTheme: e,
            })
        }
    }

    handleConfirm(){
        this.$post('/group/del',{analysisTheme:this.state.analysisTheme})
           .then(res=>{
               if(res === 1){
                   this.getList()
                   let page1 = document.getElementById("page1")
                   page1.style.display = "block";
               }
           }).catch(e=>{
           console.log(e)
       })
    }

    handleClickForAdd(){
        this.$post('/group/del',{addIndex:this.state.addIndex})
            .then(res=>{
                if(res === 1){
                    this.getOptions()
                }
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

    handleClickForInfo(e,row){
        let page1 = document.getElementById("page1")
        page1.style.display = "none";
        this.setState({
            transferId: "ID[" + row.id + "]:",
            transferName: row.name
        })
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
    }

    handleClickForUpdName(){
        this.$post('/group/del',{transferName:this.state.transferName})
            .then(res=>{
                if(res === 1){
                    alert("修改成功！")
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForUpdGroup(){
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
        let page3 = document.getElementById("page3")
        page3.style.display = "block";
    }

    handleClickForReturn(){
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
        let page3 = document.getElementById("page3")
        page3.style.display = "none";
    }

    handleClickForFinish(){
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
        let page3 = document.getElementById("page3")
        page3.style.display = "none";
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
                    label: "ID",
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
                    label: "创建时间",
                    prop: "buildTime",
                    width: '180%'
                },
                {
                    label: "最后修改时间",
                    prop: "lastUpdTime",
                    width: '180%'
                },
                {
                    label: "备注",
                    prop: "remark",
                    width: '70%'
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
                buildTime: '2018-7-19 17:34:54',
                lastUpdTime: '2018-7-19 17:34:54',
                remark:'--'
            }],
            addIndex:'',
            transferId:'',
            transferName:'',
            columns2: [
                {
                    label: "先行指标",
                    prop: "leadingIndex",
                },{
                    label: "一致指标",
                    prop: "unanimousIndex",
                },{
                    label: "滞后指标",
                    prop: "LagIndex",
                }],
            data2: [{
                leadingIndex:"--",
                unanimousIndex:'--',
                LagIndex:'--'
            }],
            page3Options: [{
                value: '先行指标',
                label: '先行指标'
            },{
                value: '一致指标',
                label: '一致指标'
            },{
                value: '滞后指标',
                label: '滞后指标'
            }],
            columns3: [
                {
                    label: "指标信息",
                    prop: "indexInfo",
                },{
                    label: "配置",
                    prop: "settings",
                    width: '100%'
                },{
                    label: "配置人",
                    prop: "constructor",
                    width: '100%'
                },{
                    label: "评价",
                    prop: "comment",
                    width: '100%'
                },{
                    label: "修改时间",
                    prop: "updTime",
                    width: '180%'
                },{
                    label: "操作",
                    prop: "zip",
                    width: '120%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small">选择</Button>
                                </span>
                    }
                }],
            data3: [{
                indexInfo:"[C01]固定资产投资-投资完成额-累计数据",
                settings:'先行',
                constructor:'管理员',
                comment:'较好',
                updTime:'2018-7-19 17:34:54',
            }],
        }
    }

    render(){
        return(
            <div>
                <h3>合成指数/扩散指数配置指标组合管理</h3>
                <Layout.Col span={11}>
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
                    <Button type="primary" size="small" onClick={this.handleConfirm.bind(this)}>确定</Button>
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
                            <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>创建新的指标组合</Button>
                        </div>
                    </div>
                    <div id="page2">
                        <br />
                        <span>指标组合：{this.state.transferId}</span>
                        <Input className="inline-input" placeholder={this.state.transferName} onChange={this.onChange.bind(this,"transferName")}/>
                        <div>
                            <br />
                            <Button type="primary" size="small" onClick={this.handleClickForUpdName.bind(this)}>修改组合名称</Button>
                            <Button type="primary" size="small" onClick={this.handleClickForUpdGroup.bind(this)}>修改指标组合组成</Button>
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
                    </div>
                    <div id="page3">
                        <br />
                        <span>指标组合：{this.state.transferId}</span>
                        <Input className="inline-input" placeholder={this.state.transferName} onChange={this.onChange.bind(this,"transferName")}/>
                        <div>
                            <br />
                            <Button type="primary" size="small" onClick={this.handleClickForUpdName.bind(this)}>修改组合名称</Button>
                            <Button type="primary" size="small" onClick={this.handleClickForFinish.bind(this)}>结束指标组合修改</Button>
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
                        <br />
                        <span>请选择指标类别：</span>
                        <Select value={this.state.value} onChange={e => this.handleOption(e,"page3_Select")} clearable={true}>
                            {
                                this.state.page3Options.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                        <div>
                            <br />
                            <Table
                                columns={this.state.columns3}
                                data={this.state.data3}
                                border={true}
                            />
                        </div>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default IndexPortfolioManage
