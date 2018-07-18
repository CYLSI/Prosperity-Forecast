import React, { Component } from 'react';
import {Table,Layout,Button} from 'element-react'
import DialogForm from '@components/Dialog/Dialog'

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
        this.setState({
            dialogVisible: false
        })
        this.$post('/provider/upd',this.state.dialogData)
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForDelete(e,row){
        this.$post('/provider/del',{id:row.id})
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    constructor(props){
        super(props);

        this.state = {
            columns:[
                {
                    label:"ID",
                    prop:"id",
                    align:"center",
                    width:'100%'
                },{
                    label:"指标提供者名称",
                    prop:"name",
                    align:"center",
                    width:'300%'
                },{
                    label:"备注",
                    prop:"description",
                    align:"center"
                },{
                    label:"操作",
                    prop:"zip",
                    align:"center",
                    width:'150%',
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
                    "id":"1",
                    "name":"人行",
                    "description":"--"
                }],
            dialogVisible: false,
            dialogData: '',
            dialogForm:[
                {
                    label:"ID",
                    param:"id"
                },
                {
                    label:"指标提供者名称",
                    param:"name"
                },
                {
                    label:"备注",
                    param:"description"
                }
            ]
        }
    }

    render() {
        const {dialogData, dialogVisible,dialogForm} = this.state
        return (
            <Layout.Col span={18}>
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
                >
                </DialogForm>
            </Layout.Col>
        )
    }
}
export default IndProviderManage