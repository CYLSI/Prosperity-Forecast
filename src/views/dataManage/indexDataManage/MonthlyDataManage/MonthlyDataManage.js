import React, { Component } from 'react';
import '../../../../App.css';
import './MonthlyDataManage.css'
import DialogForm from '@components/Dialog/Dialog'
import { Input,Button,Table,Layout,Select } from 'element-react';

class MonthlyDataManage extends  Component {

    getList(){
        this.$post('/mq/list')
            .then(res=>{
                console.log(res)
                this.setState({
                    data:res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    componentDidMount(){
        this.getList()
    }

    onChange(key, value) {
        this.setState({
            [key]: value
        });
        this.forceUpdate();
    }

    handleOption(e,name){
        if(name === "Select1"){
            this.setState({
                keyword: e,
            })
        }else if(name === "Select2"){
            this.setState({
                year: e,
            })
        }else if(name === "Select3"){
            this.setState({
                month: e,
            })
        }else{
            this.setState({
                CurrentData: e,
            })
        }
    }

    handleClickForEdit(e,row){
        this.setState({
            dialogVisible: true,
            dialogData: this.$clone(row),
            upd: true
        })
    }

    handleClickForAdd(){
        this.setState({
            dialogVisible: true,
            add: true,
            dialogData:{
                time:'',
                indexName:'',
                dataItemName:'',
                data:'',
                unit:''
            }
        })
    }

    handleClickForDelete(e,row){
        /*this.$post('/group/del',{id:row.id})
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })*/
    }

    handleClickForSearchByKeyword(){
        console.log(this.state.keyword)
        console.log(this.state.search)
        /*this.$post('/user/edit',{id,form})
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })*/
    }

    handleClickForSearchByTime(){
        console.log(this.state.year)
        console.log(this.state.month)
        console.log(this.state.CurrentData)
        /*this.$post('/user/edit',{id,form})
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })*/
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

        this.handleClickForEdit = this.handleClickForEdit.bind(this);
        this.handleClickForDelete = this.handleClickForDelete.bind(this);
        this.handleClickForSearchByKeyword = this.handleClickForSearchByKeyword.bind(this);
        this.handleComfirm = this.handleComfirm.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.handleClickForSearchByTime = this.handleClickForSearchByTime.bind(this)
        this.onChange = this.onChange.bind(this);

        this.state = {
            columns: [
                {
                    label: "时间",
                    prop: "time",
                    width: '120%'
                },{
                    label: "指标名称",
                    prop: "indexName",
                    width: '100%'
                },{
                    label: "数据项名称",
                    prop: "dataItemName",
                    width: '130%'
                },{
                    label: "数据值",
                    prop: "data"
                },{
                    label: "单位",
                    prop: "unit",
                    width: '80%'
                },{
                    label: "操作",
                    prop: "zip",
                    width: '130%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>编辑</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }],
            data: [{
                time: '1998-1',
                indexName: '--',
                dataItemName: '--',
                data: '--',
                unit: '--'
            }],
            dialogVisible: false,
            dialogData:'',
            dialogForm: [
                {
                    label:'时间',
                    param:'time',
                    type:'Select',
                    options:[{
                        value:"2018",
                        label:"2018"
                    },{
                        value:"2019",
                        label:"2019"
                    }]
                },
                {
                    label:'指标名称',
                    param:'indexName'
                },
                {
                    label:'数据项名称',
                    param:'dataItemName'
                },
                {
                    label:'数据值',
                    param:'data'
                },{
                    label:'单位',
                    param:'unit'
                }],
            keywordOptions: [{
                value: 'superior',
                label: '优'
            }, {
                value: 'fine',
                label: '良'
            }],
            keywordOptions1: [{
                value: '1997',
                label: '1997'
            }, {
                value: '1998',
                label: '1998'
            }],
            keywordOptions2: [{
                value: '一月',
                label: '一月'
            }, {
                value: '二月',
                label: '二月'
            }],
            keywordOptions3: [{
                value: 'data1',
                label: '数据1'
            }],
            search:'请输入内容',
            keyword:'',
            year:'',
            month:'',
            CurrentData:"",
            upd: false,
            add: false
        }
    }

    render() {
        const {columns,data,dialogData,dialogForm,dialogVisible} = this.state
        return (
            <Layout.Col span={18}>
                <div className="MonDataManage">
                    <h3>月度数据管理</h3>
                    <div>
                        <span>关键字查询</span>
                        <Select value={this.state.value} onChange={e => this.handleOption(e,"Select1")} className="MonDataManage_Select" placeholder="农业状况" clearable={true}>
                            {
                                this.state.keywordOptions.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                        <Input placeholder={this.state.search} className="inline-input" onChange={this.onChange.bind(this, 'search')}/>
                        <Button type="primary" size="small" onClick={e => this.handleClickForSearchByKeyword(e)}>查看数据信息汇总</Button>
                        <span>年度</span>
                        <Select value={this.state.value} className="MonDataManage_Select" placeholder="----" clearable={true} onChange={e => this.handleOption(e,"Select2")}>
                            {
                                this.state.keywordOptions1.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                             }
                         </Select>
                         <span>月份</span>
                         <Select value={this.state.value} className="MonDataManage_Select" placeholder="--" clearable={true} onChange={e => this.handleOption(e,"Select3")}>
                             {
                                 this.state.keywordOptions2.map(el => {
                                     return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                 })
                             }
                         </Select>
                         <span>数据项</span>
                         <Select value={this.state.value} className="MonDataManage_Select" placeholder="当期数据" clearable={true} onChange={e => this.handleOption(e,"Select4")}>
                            {
                              this.state.keywordOptions3.map(el => {
                                  return <Select.Option key={el.value} label={el.label} value={el.value}/>
                              })
                             }
                         </Select>
                         <Button type="primary" size="small" onClick={e => this.handleClickForSearchByTime(e)}>显示数据</Button>
                         <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>增加</Button>
                        </div>
                        <div className="MonDataManage_table">
                            <Table
                                columns={columns}
                                data={data}
                                border={true}
                            />
                    </div>
                </div>
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
export default MonthlyDataManage