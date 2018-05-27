import React, { Component } from 'react';
import {Button,Table,Layout} from 'element-react'
import DialogForm from '@components/Dialog/Dialog'
class IndTypeManage extends  Component {

    constructor(props){
        super(props);

        this.state={
            type:[],
            columns:[
                {
                    label:"指标类别标识",
                    prop:"data_id",
                    align:"center"
                },
                {
                    label:"指标类别名称",
                    prop:"data_name",
                    align:"center"
                },
                {
                    label:"备注",
                    prop:"data_text",
                    align:"center"
                },
                {
                    label:"操作",
                    prop:"zip",
                    align:"center",
                    render: (row) => {
                        return (
                            <div>
                                <Button type="text" size="small"  onClick={e => this.handleClickForEdit(e, row)}>编辑</Button>
                                <Button type="text" size="small">删除</Button>
                            </div>
                        )
                    }
                }
            ],
            data:[
                {
                    "data_id":"A",
                    "data_name":"指标1",
                    "data_text":"备注1"
                },
                {
                    "data_id":"B",
                    "data_name":"指标2",
                    "data_text":"备注2"
                },
                {
                    "data_id":"C",
                    "data_name":"指标3",
                    "data_text":"备注3"
                },
                {
                    "data_id":"D",
                    "data_name":"指标4",
                    "data_text":"备注4"
                }
            ],
            dialogVisible: false,
            dialogData: {},
            dialogForm:[
                {
                    label:"指标类别标识",
                    param:"data_id"
                },
                {
                    label:"指标类别名称",
                    param:"data_name"
                },
                {
                    label:"备注",
                    param:"data_text"
                }
            ]
        }
    }

    handleClickForEdit(e, row) {
        //this.state.checkboxOptions = "123"
        this.setState({
            dialogData: this.$clone(row),
            dialogVisible: true
        })
    }

    handleComfirm(e){
        console.log(e)
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        console.log(key)
        console.log(value)
        this.state.form[key] = value;
        this.forceUpdate();
    }
    render() {
        const {dialogData, dialogVisible,dialogForm} = this.state
        return (
            <Layout.Col span={19}>
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}

                    //headerAlign="center"
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
export default IndTypeManage