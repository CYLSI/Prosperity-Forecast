import React, { Component } from 'react';
import {Layout, Input, Button, Select,Table,Dialog,Radio,Checkbox } from 'element-react';
import './PrimarySelectedIndex.less';
import DialogForm from '@components/Dialog/Dialog'

class PrimarySelectedIndex extends  Component{

    getList(){
        this.$post('/group/list')
            .then(res=>{
                this.setState({
                    data: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    onChangeRadio(value) {
        this.state.dialogBodyData.search.frequency = value;
        this.forceUpdate();
    }

    onChangeCheckbox(e){
        this.state.dialogBodyData.reverse = e
    }

    componentDidMount(){
        this.getList()
    }

    handleIniOption(e,name){
        if(name === "Select1"){
            this.setState({
                indexCategory: e
            })
        }else{
            this.state.dialogBodyData.search.keywordSelect = e;
        }
    }

    onChange(key, value) {
        if(key === "dialog-search"){
            this.state.dialogBodyData.search.keywordInput = value;
        }else{
            this.setState({
                [key]: value
            });
        }
        this.forceUpdate();
    }

    handleClickForSearch(){
        this.setState({
            dialogVisible2:true
        })
    }

    handleClickForSearching(){
        console.log(this.state.dialogBodyData.search)
    }

    handleClickForEdit(e,row){
        this.setState({
            dialogVisible: true,
            dialogData: this.$clone(row),
            id: row.id,
            upd: true
        })
    }

    handleClickForAdd(){
        this.setState({
            dialogVisible: true,
            add: true,
            dialogData:{
                analysisIndex:'',
                setting:''
            }
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
        this.$post('/group/list',{ indexCategory:this.state.indexCategory,keyword:this.state.keyword })
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleComfirm(){
        console.log(this.state.dialogData)
        this.setState({
            dialogVisible: false,
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
    }

    handleComfirm2(){

    }

    handleCancel(){
        this.setState({dialogVisible2:false})
    }

    constructor(props) {
        super(props);

        this.handleClickForDelete = this.handleClickForDelete.bind(this);
        this.handleClickForEdit = this.handleClickForEdit.bind(this);

        this.state = {
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
            keywordOptions: [{
                value: '1',
                label: '1'
            }],
            indexCategory:'',
            keyword:'请输入内容',
            dialogVisible: false,
            dialogVisible2:false,
            dialogData:'',
            dialogForm:[
                {
                    label:'分析指标',
                    param:'analysisIndex'
                },
                {
                    label:'配置',
                    param:'setting'
                }],
            upd: false,
            add: false,
            columns1: [
                {
                    label: "指标名称",
                    prop: "name"
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '80%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small">添加</Button>
                                </span>
                    }
                }],
            data1:[{
                name:1
            },{
                name:2
            },{
                name:1
            }],
            columns2: [
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
                                    <Button type="text" size="small">添加</Button>
                                </span>
                    }
                }],
            data2:[{
                type:1
            },{
                type:2
            }],
            columns3: [
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
                                    <Button type="text" size="small">删除</Button>
                                </span>
                    }
                }],
            data3:[{
                type:1
            },{
                type:2
            }],
            Options: [{
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
            }
        }
    }

    render(){
        const { columns,data,dialogData,dialogVisible,dialogForm,dialogBodyData } = this.state;
        return(
            <Layout.Col span={18}>
                <div className="PSIndex">
                    <h3>指标初选</h3>
                    <div>
                        <span>基准指标：</span>
                        <Input className="inline-input"/>
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this)}>查询</Button>
                        <Button type="primary" size="small">显示所有分析结果</Button>
                    </div>
                    <hr />
                    <div>
                        <span>指标类别：</span>
                        <Select value={this.state.value} onChange={e => this.handleIniOption(e,"Select1")} clearable={true}>
                            {
                                this.state.keywordOptions.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                        <span>关键字：</span>
                        <Input placeholder={this.state.keyword} className="inline-input" onChange={this.onChange.bind(this, 'keyword')}/>
                        <Button type="primary" size="small" onClick={this.handleClickForFilter.bind(this)}>分析指标列表过滤</Button>
                    </div>
                    <div className="PSIndex_table">
                        <Table
                            columns={columns}
                            data={data}
                            border={true}
                        />
                    </div>
                    <div>
                        <blockquote />
                        <Button type="primary" size="small">全部重新计算相关性</Button>
                        <blockquote />
                        <span>选择备选指标：</span>
                        <Input className="inline-input-textarea"  type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
                        <Button type="primary" size="small">查询</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this) }>添加备选指标</Button>
                    </div>
                </div>
                <div>
                    <DialogForm
                        dialogData={dialogData}
                        dialogVislble={dialogVisible}
                        form={dialogForm}
                        handleComfirm={this.handleComfirm.bind(this)}
                    >
                    </DialogForm>
                </div>
                <div className="PSIndex_Dialog">
                    <Dialog
visible={this.state.dialogVisible2}
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
        this.state.Options.map(el => {
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
<div className="PSIndex_Dialog-indexName">
    <p>指标名称</p>
    <Table
        columns={this.state.columns1}
        data={this.state.data1}
        border={true}
        scrollY={true}
        height="100px"
    />
</div>
<div className="PSIndex_Dialog-indexType">
    <p>指标-数据类型</p>
    <Table
        columns={this.state.columns2}
        data={this.state.data2}
        border={true}
        scrollY={true}
        height="100px"
    />
</div>
<div>
    <Button type="primary" size="small">添加指标</Button>
    <Checkbox checked={dialogBodyData.reverse} onChange={e => this.onChangeCheckbox(e)}>逆转</Checkbox>
</div>
<div>
    <Table
        columns={this.state.columns3}
        data={this.state.data3}
        border={true}
        scrollY={true}
        height="100px"
    />
    <Button type="primary" size="small">删除指标</Button>
    <Button type="primary" size="small">删除所有已选指标</Button>
</div>
</div>
</Dialog.Body>
<Dialog.Footer>
    <Button type="primary" size="small" onClick={this.handleComfirm2.bind(this) }>确定</Button>
</Dialog.Footer>
</Dialog>
</div>
</Layout.Col>
)
}
}

export default PrimarySelectedIndex
