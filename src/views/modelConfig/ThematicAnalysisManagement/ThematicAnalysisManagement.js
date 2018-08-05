import React, { Component } from 'react';
import {Layout, Button,Table} from 'element-react';
import './ThematicAnalysisManagement.less';
import DialogForm from '@components/Dialog/Dialog'

class ThematicAnalysisManagement extends  Component{

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

    handleClickForInfo(e,row){
        this.setState({
            dialogVisible: true,
            dialogData: this.$clone(row),
            upd: true
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

    handleClickForAdd(){
        this.setState({
            dialogVisible: true,
            add:true,
            dialogData:{
                name:'',
                menuDescription:'',
                benchmarkIndex:'',
                compConIndex:'',
                industry:'',
                function:'',
                remarks:'',
            }
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
        this.handleClickForAdd = this.handleClickForAdd.bind(this);

        this.state = {
            columns: [
                {
                    label: "序号",
                    prop: "id",
                    width: '80%',
                    align: 'center'
                },
                {
                    label: "主题名称",
                    prop: "name",
                    width: '120%',
                    align: 'center'
                },
                {
                    label: "基准指标",
                    prop: "benchmarkIndex ",
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
                    prop: "founder",
                    width: '80%',
                    align: 'center'
                },
                {
                    label: "建立时间",
                    prop: "settingTime",
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
                                    <Button type="text" size="small" onClick={e => this.handleClickForInfo(e,row)}>详细信息</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
                ],
            data: [{
                id: '23',
                name:'农业发展',
                benchmarkIndex: '[A01]农业增加值-当期同比',
                industry:'--',
                remark:'—',
                founder:'管理员',
                settingTime:'2018-3-28 21:28:17'
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
                    label:'菜单描述',
                    param:'menuDescription'
                },
                {
                    label:'基准指标',
                    param:'benchmarkIndex'
                },
                {
                    label:'复合一致指标',
                    param:'compConIndex',
                    type:'Select',
                    options:[{
                        value:"华农",
                        label:"华农"
                    }]
                },
                {
                    label:'所属行业',
                    param:'industry'
                },
                {
                    label:'包含功能',
                    param:'function',
                    type:'checkBox',
                    checkBoxItems:['合成指数','综合警情指数','扩散指数','单指标监测'],
                    checkBoxParams:['1','2','3','4']
                },
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
                        <Button type="primary" size="small">更新网站地图</Button>
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
                </Layout.Col>
            </div>
        )
    }
}

export default ThematicAnalysisManagement
