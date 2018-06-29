import React, { Component } from 'react';
import {Table,Layout,Button} from 'element-react'
import DialogForm from '@components/Dialog/Dialog'

class IndProviderManage extends  Component {

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

    componentDidMount(){
        //this.getList()
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
        this.$post('/group/upd',{id:this.state.id,name:this.state.dialogData.name})
            .then(res=>{
                if(res === 1){
                    this.getList()
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
                    prop:"providerName",
                    align:"center",
                    width:'300%'
                },{
                    label:"备注",
                    prop:"remark",
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
                    "providerName":"人行",
                    "remark":"--"
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
                    param:"providerName"
                },
                {
                    label:"备注",
                    param:"remark"
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
                />
                <DialogForm
                    dialogData={dialogData}
                    dialogVislble={dialogVisible}
                    form={dialogForm}
                    handleComfirm={this.handleComfirm}
                >
                </DialogForm>
            </Layout.Col>
        )
    }
}
export default IndProviderManage