import React, { Component } from 'react';
import {Button,Table,Layout} from 'element-react'
import DialogForm from '@components/Dialog/Dialog'
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
        console.log(this.state.dialogData)
    }

    handleComfirm(e){
        console.log(e)
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }

    handleClickForDelete(e,row){
        this.$post('/quota/del',{id:row.id})
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    constructor(props){
        super(props);

        this.state={
            type:[],
            columns:[
                {
                    label:"指标类别标识",
                    prop:"id",
                    align:"center"
                },
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
                    "id":"A",
                    "name":"指标1",
                    "description":"备注1"
                },
                {
                    "id":"B",
                    "name":"指标2",
                    "description":"备注2"
                },
                {
                    "id":"C",
                    "name":"指标3",
                    "description":"备注3"
                },
                {
                    "id":"D",
                    "name":"指标4",
                    "description":"备注4"
                }
            ],
            dialogVisible: false,
            dialogData: {},
            dialogForm:[
                {
                    label:"指标类别标识",
                    param:"id"
                },
                {
                    label:"指标类别名称",
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
                    handleComfirm={this.handleComfirm}
                >
                </DialogForm>
            </Layout.Col>
        )

    }
}
export default IndTypeManage