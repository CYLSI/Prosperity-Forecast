import React, { Component } from 'react';
import {Layout, Button,Table} from 'element-react';
import './CompoundConsistentIndex.less';
import DialogForm from '@components/Dialog/Dialog'

class CompoundConsistentIndex extends  Component{

    getList(){
        // this.$post('/group/list')
        //     .then(res=>{
        //         this.setState({
        //             data: res
        //         })
        //     }).catch(e=>{
        //     console.log(e)
        // })
    }

    componentDidMount(){
        this.getList();
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
                id:'',
                code:'',
                indexName:'',
                remark:''
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

    constructor(props) {
        super(props);

        this.handleClickForDelete = this.handleClickForDelete.bind(this);
        this.handleClickForEdit = this.handleClickForEdit.bind(this);
        this.handleClickForAdd = this.handleClickForAdd.bind(this);
        this.handleComfirm = this.handleComfirm.bind(this);

        this.state = {
            columns: [
                {
                    label: "ID",
                    prop: "id",
                    width: '100%',
                    align: 'center'
                },
                {
                    label: "代码",
                    prop: "code",
                    width: '100%',
                    align: 'center'
                },
                {
                    label: "指标名称",
                    prop: "indexName",
                    align: 'center'
                },
                {
                    label: "备注",
                    prop: "remark",
                    width:'100%',
                    align: 'center'
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '100%',
                    align: 'center',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>编辑</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data: [{
                id: '4118',
                code:'FHD2',
                indexName: '复合一致指标2',
                remark:'—'
            }],
            dialogVisible: false,
            dialogData:'',
            dialogForm:[
                {
                    label:'ID',
                    param:'id'
                },
                {
                    label:'代码',
                    param:'code'
                },
                {
                    label:'指标名称',
                    param:'indexName'
                },
                {
                    label:'备注',
                    param:'remark'
                }],
            upd: false,
            add: false
        }
    }

    render(){
        const { columns,data,dialogData,dialogVisible,dialogForm } = this.state;
        return(
            <Layout.Col span={18}>
                <h3>复合一致指标</h3>
                <div>
                    <Table
                        columns={columns}
                        data={data}
                        border={true}
                    />
                </div>
                <div className="CCIndex_button">
                    <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this) }>建立新的复合一致指标</Button>
                </div>
                <div>
                    <DialogForm
                        dialogData={dialogData}
                        dialogVislble={dialogVisible}
                        form={dialogForm}
                        handleComfirm={this.handleComfirm.bind(this)}
                        handleCancel={this.state.dialogVisible = false}
                    >
                    </DialogForm>
                </div>
            </Layout.Col>
        )
    }
}

export default CompoundConsistentIndex
