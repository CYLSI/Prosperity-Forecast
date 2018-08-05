import React, { Component } from 'react';
import {Layout, Input, Button, Select,Table,Dialog,Radio,Checkbox,Tree } from 'element-react';
import './IndexConfiguration.less';

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
        //this.getOptions()
    }

    onChange(key, value) {
        if(key === "keyword")
            this.state.filter.keyword = value;
        else
            this.state.dialogBodyData.search.keywordInput = value;
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
            this.state.filter.type = e
        }
    }

    handleClickForEdit(e,row){
        this.setState({
            dialogVisible: true,
            dialogData: this.$clone(row),
            id: row.id
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

    handleClickForFilter(){
        this.$post('/group/list',this.state.filter)
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
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
    }

    handleConfirm(){
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

    handleClickForAddAltIndex(){
        this.$post('/group/list',this.state.filter)
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    //PrimaryDialogMethod

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
            TableData:[{
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
                    TableData:res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleComfirmForDialog(){
        if (this.state.altQuotaId.length === 0) {
            this.state.altQuotaId.push(this.state.addedIndex.id)
            this.state.altQuota.push(this.state.addedIndex.label)
        } else {
            let flag = false
            for (let i in this.state.altQuotaId) {
                if (this.state.altQuotaId[i] === this.state.addedIndex.id) {
                    alert("该指标已添加！")
                    flag = true
                    break;
                }
            }
            if(!flag){
                this.state.altQuotaId.push(this.state.addedIndex.id)
                this.state.altQuota.push(this.state.addedIndex.label)
            }
        }
        this.setState({
            dialogVisible:false,
            TableData:[{type:"-"}]
        })
    }

    //PrimaryDialogMethod

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
            Options2: [{
                value: 'manager',
                label: '管理员'
            }],
            theme:'',
            configurer:'',
            filter:{
                type:'',
                keyword:''
            },
            columns: [
                {
                    label: "分析指标",
                    prop: "analysisIndex",
                },
                {
                    label: "配置",
                    prop: "setting",
                    width: '180%'
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
                analysisIndex: '[A01]农业增加值-当期同比',
                setting: '先行 较好',
            }],
            altQuota:[],
            altQuotaId:[],
            //dialogData
            dialogVisible:false,
            dialogOptions: [{
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
            TreeData:[{
                id: 1,
                label: 'A01',
            },{
                id: 2,
                label: 'A01',
            },{
                id: 3,
                label: 'A01',
            }],
            TreeOptions: {
                children: 'children',
                label: 'label'
            },
            TreeData2: [{
                id: 1,
                label: 'A02',
            }],
            TableColumns: [
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
            TableData:[{
                type: "-"
            }],
            addedIndex:'',
            //dialogData
        }
    }

    render(){
        const { dialogBodyData } = this.state
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
                    <Button type="primary" size="small" onClick={this.handleConfirm.bind(this)}>确定</Button>
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
                    <Input placeholder={this.state.keyword} className="inline-input" onChange={this.onChange.bind(this,"keyword")}/>
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
                    <Input className="inline-input-textarea" value={this.state.altQuota} type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
                    <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this) }>查询</Button>
                    <Button type="primary" size="small" onClick={this.handleClickForAddAltIndex.bind(this) }>添加备选指标</Button>
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
                                            this.state.dialogOptions.map(el => {
                                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                            })
                                        }
                                    </Select>
                                    <Input className="inline-input" onChange={this.onChange.bind(this)}/>
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
                                            data={this.state.TreeData}
                                            options={this.state.TreeOptions}
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
                                            data={this.state.TreeData2}
                                            options={this.state.TreeOptions}
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
                                        columns={this.state.TableColumns}
                                        data={this.state.TableData}
                                        border={true}
                                        height="80px"
                                    />
                                </div>
                            </div>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button type="primary" size="small" onClick={this.handleComfirmForDialog.bind(this) }>确定</Button>
                        </Dialog.Footer>
                    </Dialog>
                </div>
                </Layout.Col>
            </div>
        )
    }
}

export default IndexConfiguration
