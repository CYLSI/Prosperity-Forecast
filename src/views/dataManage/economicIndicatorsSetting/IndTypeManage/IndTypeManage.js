import React, { Component } from 'react';
import {Button,Table,Layout,Input} from 'element-react'
import DialogForm from '@components/Dialog/Dialog'
import './IndTypeManage.less'

class IndTypeManage extends  Component {

    getList(){
        this.$post('/type/list')
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
        this.setState({dialogVisible:false})
        this.$post('/type/upd',this.state.dialogData)
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForDelete(e,row){
        console.log(row.id)
        this.$post('/type/del',row.id)
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
        this.$post('/type/list',this.state.add.id)
            .then(res => {
                this.setState({
                    // data:res
                })
            })
    }

    handleClickForAdd(){
        this.$post('/type/add',this.state.add)
            .then(res => {
                if(res === 1){
                    this.setState({
                        add:{
                            name:'',
                            description:''
                        }
                    })
                    this.forceUpdate()
                    this.getList()
                }
            })
    }

    constructor(props){
        super(props);

        this.state={
            type:[],
            columns:[
                {
                    label:"指标类别名称",
                    prop:"name",
                    align:"center"
                },
                {
                    label:"备注",
                    prop:"description",
                    align:"center"
                },
                {
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
            data:[
                {
                    "name":"指标1",
                    "description":"备注1"
                },
                {
                    "name":"指标2",
                    "description":"备注2"
                }
            ],
            dialogVisible: false,
            dialogData: {},
            dialogForm:[
                {
                    label:"指标类别名称",
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
            <div className="IndTypeMan">
                <Layout.Col span={10}>
                    <div>
                        <h3>指标类别管理</h3>
                        <Table
                            columns={this.state.columns}
                            border={true}
                            //headerAlign="center"
                            data={this.state.data}
                        />
                    </div>
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
                    <div className="IndTypeMan_add">
                        <h4>添加指标类别</h4>
                        <span>指标类别名称</span><Input className="inline-input" onChange={this.onChange.bind(this,'name')} value={this.state.add.name}/><br/>
                        <span className="IndTypeMan_add_span">备注</span><Input className="inline-input" onChange={this.onChange.bind(this,'description')} value={this.state.add.description}/><br/>
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
export default IndTypeManage