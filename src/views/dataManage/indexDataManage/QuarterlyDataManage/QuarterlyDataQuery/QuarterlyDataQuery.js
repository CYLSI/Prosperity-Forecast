import React, { Component } from 'react';
import '../../../../../App.css';
import { Input,Button,Select,Table,Layout } from 'element-react';
import DialogForm from '@components/Dialog/Dialog'

class QuarterlyDataQuery extends  Component {

    getList(){
        this.$post('/user/listForm')
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
        //this.getList()
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
                byear: e,
            })
        }else if(name === "Select2"){
            this.setState({
                bmonth: e,
            })
        }else if(name === "Select3"){
            this.setState({
                eyear: e,
            })
        }else{
            this.setState({
                emonth: e,
            })
        }
    }

    handleClickForSearch(){
        console.log(this.state.byear,this.state.bmonth,this.state.eyear,this.state.emonth,this.state.search)
    }

    handleClickForDelete(){
        /*this.$post('/group/del',{id:row.id})
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })*/
    }

    handleClickForEdit(e,row){
        this.setState({
            dialogVisible: true,
            dialogData: this.$clone(row)
        })
    }

    handleComfirm(){
        this.setState({
            dialogVisible: false
        })
        /*this.$post('/user/edit',{id,form})
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })*/
    }

    handleClickForExport(){
        console.log(this.state.data)
        /*this.$post('/user/edit',{id,form})
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })*/
    }

    constructor(props){
        super(props);

        this.handleOption = this.handleOption.bind(this)
        this.handleClickForEdit = this.handleClickForEdit.bind(this)
        this.handleClickForDelete = this.handleClickForDelete.bind(this)
        this.handleComfirm = this.handleComfirm.bind(this);

        this.state = {
            columns: [
                {
                    label: "年度",
                    prop: "year",
                    width: '80%'
                },{
                    label: "1月",
                    prop: "jan",
                    width: '70%'
                },{
                    label: "2月",
                    prop: "feb",
                    width: '70%'
                },{
                    label: "3月",
                    prop: "mar",
                    width: '70%'
                },{
                    label: "4月",
                    prop: "apr",
                    width: '70%'
                },{
                    label: "5月",
                    prop: "may",
                    width: '70%'
                },{
                    label: "6月",
                    prop: "jun",
                    width: '70%'
                },{
                    label: "7月",
                    prop: "jul",
                    width: '70%'
                },{
                    label: "8月",
                    prop: "aug",
                    width: '70%'
                },{
                    label: "9月",
                    prop: "sep",
                    width: '70%'
                },{
                    label: "10月",
                    prop: "oct",
                    width: '70%'
                },{
                    label: "11月",
                    prop: "nov",
                    width: '70%'
                },{
                    label: "12月",
                    prop: "dec",
                    width: '80%'
                },{
                    label: "操作",
                    prop: "zip",
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>编辑</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }],
            data: [{
                year: '1998',
                jan: '--',
                feb: '--',
                mar: '--',
                apr: '--',
                may: '--',
                jun: '--',
                jul: '--',
                aug: '--',
                sep: '--',
                oct: '--',
                nov: '--',
                dec: '--'
            }],
            keywordOptions: [{
                value: '1997',
                label: '1997'
            }, {
                value: '1998',
                label: '1998'
            }],
            keywordOptions1: [{
                value: '一月',
                label: '一月'
            }, {
                value: '二月',
                label: '二月'
            }],
            keywordOptions2: [{
                value: '2000',
                label: '2000'
            }, {
                value: '2001',
                label: '2001'
            }],
            keywordOptions3: [{
                value: '七月',
                label: '七月'
            }, {
                value: '八月',
                label: '八月'
            }],
            byear:'',
            bmonth:'',
            eyear:'',
            emonth:'',
            search:'请输入内容',
            dialogVisible: false,
            dialogData:'',
            dialogForm: [
                {
                    label:'一月',
                    param:'jan'
                },{
                    label:'二月',
                    param:'feb'
                },{
                    label:'三月',
                    param:'mar'
                },{
                    label:'四月',
                    param:'apr'
                },{
                    label:'五月',
                    param:'may'
                },{
                    label:'六月',
                    param:'jun'
                },{
                    label:'七月',
                    param:'jul'
                },{
                    label:'八月',
                    param:'aug'
                }, {
                    label:'九月',
                    param:'sept'
                },{
                    label:'十月',
                    param:'oct'
                },{
                    label:'十一月',
                    param:'nov'
                },{
                    label:'十二月',
                    param:'dec'
                }]
        }
    }

    render(){
        const {columns,data,dialogData,dialogForm,dialogVisible} = this.state
        return(
            <div>
                <Layout.Col span={18}>
                    <div className="QuaDataQuery">
                        <h3>季度数据查询</h3>
                        <div>
                            <span>开始时间：年份</span>
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"Select1")} className="QuaDataQuery_Select" clearable={true}>
                                {
                                    this.state.keywordOptions.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                            <span>月份</span>
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"Select2")} className="QuaDataQuery_Select" clearable={true}>
                                {
                                    this.state.keywordOptions1.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                            <span>结束时间：年份</span>
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"Select3")} className="QuaDataQuery_Select" clearable={true}>
                                {
                                    this.state.keywordOptions2.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                            <span>月份</span>
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"Select4")} className="QuaDataQuery_Select" clearable={true}>
                                {
                                    this.state.keywordOptions3.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                            <span>指标名称</span>
                            <Input placeholder={this.state.search} className="inline-input" onChange={this.onChange.bind(this, 'search')}/>
                            <Button type="primary" size="small" onClick={e => this.handleClickForSearch(e)}>查询</Button>
                            <Button type="primary" size="small" onClick={e => this.handleClickForExport(e)}>导出</Button>
                        </div>
                        <div className="QuaDataManage_table">
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
            </div>
        )
    }
}
export default QuarterlyDataQuery