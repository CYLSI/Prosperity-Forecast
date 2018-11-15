import React, { Component } from 'react';
import {Table,Layout,Button,Input} from 'element-react'
import DialogForm from '@components/Dialog/Dialog'
import './IndProviderManage.less'

class IndProviderManage extends  Component {

    getList(){
        this.$post('/provider/list')
            .then(res=>{
                this.setState({
                    data: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    componentDidMount(){
        this.getList()
    }

    handleClickForEdit(e, row) {
        this.setState({
            dialogData: this.$clone(row),
            dialogVisible: true
        })
    }

    handleComfirm(){
        console.log(this.state.dialogData)
        this.setState({
            dialogVisible: false
        })
        this.$post('/provider/upd',this.state.dialogData)
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForDelete(e,row){
        this.$post('/provider/del',row.id)
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    onChange(key, value) {
        this.state.add[key] = value;
        this.forceUpdate()
    }

    handleClickForCheck(){
        this.$post('/provider/list',this.state.add.name)
            .then(res => {
                this.setState({
                    // data:res
                })
            })
    }

    handleClickForAdd(){
        this.$post('/provider/add',this.state.add)
            .then(res => {
                if(res === 1){
                    this.getList()
                }
            })
    }

    constructor(props){
        super(props);

        this.state = {
            columns:[
                {
                    label:"指标提供者名称",
                    prop:"name",
                    align:"center",
                },{
                    label:"备注",
                    prop:"description",
                    align:"center"
                },{
                    label:"操作",
                    prop:"zip",
                    align:"center",
                    render: (row) => {
                        return (
                            <div>
                                <Button type="text" size="small" onClick={e => this.handleClickForEdit(e, row)}>编辑</Button>
                                <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            data:[{
                    "name":"人行",
                    "description":"--"
                }],
            dialogVisible: false,
            dialogData: '',
            dialogForm:[
                {
                    label:"指标提供者名称",
                    param:"name"
                },
                {
                    label:"备注",
                    param:"description"
                }
            ],
            add:{
                name:'',
                description:''
            }
        }
    }

    render() {
        const {dialogData, dialogVisible,dialogForm} = this.state
        return (
            <div className="IndProvMan">
                <Layout.Col span={10}>
                    <h3>指标提供者管理</h3>
                    <Table
                        columns={this.state.columns}
                        data={this.state.data}
                        border={true}
                    />
                    <DialogForm
                        dialogData={dialogData}
                        dialogVislble={dialogVisible}
                        form={dialogForm}
                        handleComfirm={this.handleComfirm.bind(this)}
                        handleCancel={this.state.dialogVisible = false}
                    >
                    </DialogForm>
                </Layout.Col>
                <Layout.Col span={8}>
                    <div  className="IndProvMan_add">
                        <h4>添加指标提供者</h4>
                        <span>指标提供者名称</span><Input className="inline-input" onChange={this.onChange.bind(this,'name')} value={this.state.add.name}/><br/>
                        <span className="IndProvMan_add_span">备注</span><Input className="inline-input" onChange={this.onChange.bind(this,'description')} value={this.state.add.description}/><br/>
                        <div>
                            <br/>
                            <Button type="primary" size="small" onClick={this.handleClickForCheck.bind(this)}>查看是否重复</Button>
                            <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>增加</Button>
                        </div>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}
export default IndProviderManage