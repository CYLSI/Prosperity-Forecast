import React, { Component } from 'react';
import {Layout, Select,Button,Table,Input,Checkbox} from 'element-react';
import './IndexPortfolioManage.less';
import moment from "moment";

class IndexPortfolioManage extends Component{

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
    }

    getList(){
        this.$post('/IndexCombination/list')
            .then(res=>{
                this.setState({
                    data1: res
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

    onChange1(key, value) {
        this.state.addIndex[key] = value
        this.forceUpdate();
    }

    onChangeCheckbox(e,row,index){
        this.state.data3[index].select = e
        Object.assign(row,{combination:this.state.transferId})
        if(!row.select){
            this.$post('/IndexManagement/deleteInCombination',row.id)
            .then(res=>{
                if(res === 1)
                    this.$post('/IndexManagement/quotaByCombinationList',{keyNum1:this.state.transferId})
                    .then(res=>{
                        this.setState({
                            data2: res
                        })
                    }).catch(e=>{
                    console.log(e)
                })
            }).catch(e=>{
                console.log(e)
            })
        }else{
            this.$post('/IndexManagement/addToCombination',row)
            .then(res=>{
                if(res === 1)
                    this.$post('/IndexManagement/quotaByCombinationList',{keyNum1:this.state.transferId})
                    .then(res=>{
                        this.setState({
                            data2: res
                        })
                    }).catch(e=>{
                    console.log(e)
                })
            }).catch(e=>{
                console.log(e)
            })
        }
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
            this.setState({
                typeSelect: e
            })
            this.$post('/IndexManagement/ifIncombination',{keyNum1:this.state.transferId,keyWord2:e})
                .then(res=>{
                    this.setState({
                        data3: res
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
        this.$post('/IndexCombination/SelectBySubject',{keyWord1:this.state.analysisTheme})
           .then(res=>{
               if(res){
                    this.getList()
                    let page1 = document.getElementById("page1")
                    page1.style.display = "block";
                    let page2 = document.getElementById("page2")
                    page2.style.display = "none";
                    let page3 = document.getElementById("page3")
                    page3.style.display = "none";
               }
           }).catch(e=>{
           console.log(e)
       })
    }

    handleClickForAdd(){
        let date  = moment().format('YYYY-MM-DD HH:mm:ss')
        this.state.addIndex.creatTime = date
        this.state.addIndex.lastChange = date
        this.$post('/IndexCombination/add',this.state.addIndex)
            .then(res=>{
                if(res === 1){
                    this.getList()
                    this.state.addIndex.name = ""
                    this.state.addIndex.remarks = ""
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForDelete(e,row){
        this.$post('/IndexCombination/del',{id:row.id})
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
            transferId: row.id,
            transferName: row.name
        })
        let page2 = document.getElementById("page2")
        page2.style.display = "block";
        this.$post('/IndexManagement/quotaByCombinationList',{keyNum1:row.id})
            .then(res=>{
                this.setState({
                    data2: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForUpdName(){
        let date  = moment().format('YYYY-MM-DD HH:mm:ss')
        this.$post('/IndexCombination/cha',{id:this.state.transferId,name:this.state.transferName,lastChange:date})
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
        this.setState({
            typeSelect:""
        })
    }

    handleClickForReturn(){
        let page1 = document.getElementById("page1")
        page1.style.display = "block";
        let page2 = document.getElementById("page2")
        page2.style.display = "none";
        let page3 = document.getElementById("page3")
        page3.style.display = "none";
        this.getList()
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
            Options: [],
            analysisTheme:'',
            columns1: [
                {
                    label: "指标组合名称",
                    prop: "name",
                    align:"center"
                },
                {
                    label: "创建人",
                    prop: "creator",
                    width: '100%',
                    align:"center"
                },
                {
                    label: "创建时间",
                    prop: "creatTime",
                    width: '180%',
                    align:"center"
                },
                {
                    label: "最后修改时间",
                    prop: "lastChange",
                    width: '180%',
                    align:"center"
                },
                {
                    label: "备注",
                    prop: "remarks",
                    width: '70%',
                    align:"center"
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '120%',
                    align:"center",
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForInfo(e,row)}>选择</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data1: [{
                name: '--',
                creator:'--',
                creatTime: '--',
                lastChange: '--',
                remark:'--'
            }],
            addIndex:{
                name:'',
                remarks:'',
                creator:'管理员',
                creatTime:'',
                lastChange:''
            },
            transferId:'',
            transferName:'',
            columns2: [
                {
                    label: "先行指标",
                    prop: "leadQuota",
                },{
                    label: "一致指标",
                    prop: "coinQuota",
                },{
                    label: "滞后指标",
                    prop: "lagQuota",
                }],
            data2: [{
                leadQuota:"--",
                coinQuota:'--',
                lagQuota:'--'
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
                    prop: "quota",
                    align: "center"
                },{
                    label: "配置",
                    prop: "uniformity",
                    align: "center"
                },{
                    label: "评价",
                    prop: "evaluate",
                    align: "center"
                },{
                    label: "操作",
                    prop: "zip",
                    align: "center",
                    render: (row,event,index) =>
                        <Checkbox name="select" checked={row.select?true:false} onChange={e => this.onChangeCheckbox(e,row,index)}></Checkbox>
                }],
            data3: [{
                quota:"--",
                uniformity:'--',
                evaluate:'--',
                select:false
            }],
            typeSelect:''
        }
    }

    render(){
        return(
            <div className="IndexPorMan">
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
                            <Input className="inline-input" value={this.state.addIndex.name} onChange={this.onChange1.bind(this,"name")}/>
                            <span>备注：</span>
                            <Input className="inline-input" value={this.state.addIndex.remarks} onChange={this.onChange1.bind(this,"remarks")}/>
                            <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>创建新的指标组合</Button>
                        </div>
                    </div>
                    <div id="page2">
                        <br />
                        <span>指标组合：ID:[{this.state.transferId}]</span>
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
                        <span>指标组合：ID:[{this.state.transferId}]</span>
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
                        <Select value={this.state.typeSelect} id="page3_Select" onChange={e => this.handleOption(e,"page3_Select")} clearable={true}>
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
