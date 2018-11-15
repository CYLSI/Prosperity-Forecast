import React, { Component } from 'react';
import {Layout, Button,Table} from 'element-react';
import './ThematicAnalysisManagement.less';
import DialogForm from '@components/Dialog/Dialog'
import moment from "moment";

class ThematicAnalysisManagement extends  Component{

    getList(){
        this.$post('/subjectAnalytic/list')
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

    handleClickForEdit(e,row){
        this.setState({
            dialogVisible: true,
            dialogData: this.$clone(row),
            upd: true,
            add:false
        })
        this.state.dialogForm[0].disabled = true
        this.state.dialogForm[1].disabled = true
        this.forceUpdate()
    }

    handleClickForDelete(e,row){
        this.$post('/subjectAnalytic/del',{subject:row.subject})
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForAdd(){
        this.state.dialogForm[0].disabled = false
        this.state.dialogForm[1].disabled = false
        this.setState({
            dialogVisible: true,
            add:true,
            upd:false,
            dialogData:{
                name:'',
                benchmark:'',
                industry:'',
                function:'',
                remarks:'',
            }
        })
    }

    handleComfirm(){
        this.setState({
            dialogVisible: false,
        });
        if(this.state.upd === true){
            this.$post('/subjectAnalytic/cha',this.state.dialogData)
                .then(res=>{
                    if(res === 1){
                        this.getList()
                    }
                    this.setState({
                        upd: false
                    })
                    this.state.dialogForm[0].disabled = false
                    this.state.dialogForm[1].disabled = false
                }).catch(e=>{
                console.log(e)
            })
        }
        if(this.state.add === true){
            let date  = moment().format('YYYY-MM-DD')
            Object.assign(this.state.dialogData,{creator:'管理员'},{time:date})
            this.$post('/subjectAnalytic/add',this.state.dialogData)
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
        this.handleClickForAdd = this.handleClickForAdd.bind(this);

        this.state = {
            columns: [
                {
                    label: "主题名称",
                    prop: "subject",
                    width: '160%',
                    align: 'center'
                },
                {
                    label: "基准指标",
                    prop: "benchmark",
                    align: 'center'
                },
                {
                    label: "行业",
                    prop: "industry",
                    width: '80%',
                    align: 'center'
                },
                {
                    label: "备注",
                    prop: "remarks",
                    width: '80%',
                    align: 'center'
                },
                {
                    label: "建立人",
                    prop: "creator",
                    width: '80%',
                    align: 'center'
                },
                {
                    label: "建立时间",
                    prop: "creTime",
                    width: '180%',
                    align: 'center'
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '120%',
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
                subject:'农业发展',
                benchmark: '[A01]农业增加值-当期同比',
                industry:'--',
                remark:'—',
                creator:'管理员',
                creTime:'2018-3-28 21:28:17'
            }],
            upd:false,
            add:false,
            dialogVisible: false,
            dialogData:'',
            dialogForm:[
                {
                    label:'主题名称',
                    param:'name'
                },
                {
                    label:'基准指标',
                    param:'benchmark'
                },
                {
                    label:'所属行业',
                    param:'industry'
                },
                // {
                //     label:'包含功能',
                //     param:'function',
                //     type:'checkBox',
                //     checkBoxItems:['合成指数','综合警情指数','扩散指数'],
                //     checkBoxParams:['ci','di','coIndex']
                // },
                {
                    label:'备注',
                    param:'remarks'
                }]
        }
    }

    render(){
        const { columns,data,dialogData,dialogVisible,dialogForm } = this.state
        return(
            <div className="themeAnaMan">
                <Layout.Col span={18}>
                    <h3>主题分析管理</h3>
                    <div>
                        <Table
                            columns={columns}
                            data={data}
                            border={true}
                        />
                    </div>
                    <div className="themeAnaMan_button">
                        <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this) }>--增加分析主题--</Button>
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
            </div>
        )
    }
}

export default ThematicAnalysisManagement
