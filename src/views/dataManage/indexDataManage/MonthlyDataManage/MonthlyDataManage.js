import React, { Component } from 'react';
import '../../../../App.css';
import './MonthlyDataManage.css'
import { Input,Button,Select,Table,Layout } from 'element-react';
import DialogForm from '@components/Dialog/Dialog'
import axios from 'axios'

class MonthlyDataQuery extends  Component {

    getList(){
        this.$post('/mq/listForm')
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

    onChangeFile(e){
        // let file = e.target.files[0]
        // console.log(file)
        // if(file) 
        //     this.setState({
        //         file: file,
        //         fileName:e.target.value
        //     })
        let formdata = new FormData();
        formdata.append('file',e.target.files[0]);
        axios({
            url:'http://172.18.92.226:414/quotaQuery/uploadFile',
            method:'post',
            data:"sada",
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((res)=>{console.log(res)})
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

    handleImportOption(e,name){
        if(name === "Select1"){
            this.setState({
                year: e
            })
        }else{
            this.setState({
                month: e
            })
        }
    }

    handleClickForSearch(){
        this.$post('/mq/ret',{year1:this.state.byear,month1:this.state.bmonth,year2:this.state.eyear,month2:this.state.emonth,condition:this.state.search})
            .then(res=>{
                console.log(res)
                this.setState({
                    data:res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForExport(){
        // console.log(this.state.data)
        // this.$post('/group/del',this.state.data)
        //     .then(res=>{
        //         let blob = new Blob([res], {type: "application/msword"});
        //         let fileName = `${row.task_name}.docx`
        //         this.downFile(blob, fileName)
        //     }).catch(e=>{
        //     console.log(e)
        // })
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

    handleClickForForm(){
        this.setState({
            fileName:''
        })
        let formData = new FormData()
        formData.append('file', this.state.file)
        this.$post('/quotaQuery/supload',formData)
            .then(res=>{
                alert(res)
            }).catch(e=>{
            console.log(e)
        })
    }

    constructor(props){
        super(props);

        this.handleOption = this.handleOption.bind(this)
        this.handleClickForEdit = this.handleClickForEdit.bind(this)
        this.handleClickForDelete = this.handleClickForDelete.bind(this)
        this.handleComfirm = this.handleComfirm.bind(this);
        this.handleImportOption = this.handleImportOption.bind(this);

        this.state = {
            file:{},
            fileName:'',
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
                value: '2000',
                label: '2000'
            }, {
                value: '1998',
                label: '1998'
            }],
            keywordOptions1: [{
                value: '1',
                label: '1'
            }, {
                value: '2',
                label: '2'
            }],
            keywordOptions2: [{
                value: '2020',
                label: '2020'
            }, {
                value: '2001',
                label: '2001'
            }],
            keywordOptions3: [{
                value: '7',
                label: '7'
            }, {
                value: '8',
                label: '8'
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
                }],
            options: [{
                value: '1997',
                label: '1997'
            }, {
                value: '1998',
                label: '1998'
            }],
            options1: [{
                value: '一月',
                label: '一月'
            }, {
                value: '二月',
                label: '二月'
            }],
            value: '',
            month: '',
            year: ''
        }
    }

    render(){
        const {columns,data,dialogData,dialogForm,dialogVisible} = this.state
        return(
            <div>
                <Layout.Col span={18}>
                    <div className="MonDataQuery">
                        <h3>月度数据查询</h3>
                        <div>
                            <span>开始时间：年份</span>
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"Select1")} className="MonDataQuery_Select" clearable={true}>
                                {
                                    this.state.keywordOptions.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                            <span>月份</span>
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"Select2")} className="MonDataQuery_Select" clearable={true}>
                                {
                                    this.state.keywordOptions1.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                            <span>结束时间：年份</span>
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"Select3")} className="MonDataQuery_Select" clearable={true}>
                                {
                                    this.state.keywordOptions2.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                            <span>月份</span>
                            <Select value={this.state.value} onChange={e => this.handleOption(e,"Select4")} className="MonDataQuery_Select" clearable={true}>
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
                        handleCancel={this.state.dialogVisible = false}
                    >
                    </DialogForm>
                </Layout.Col>
                <Layout.Col span={18}>
                    <div className="MonDataImport_1">
                        <h3>月度数据导入</h3>
                        <br />
                        <div>
                            <a href="" download="PanelTemplate.xlsx">月度面板模板</a>
                            <a href="" download="TemporalTemplate.xlsx">月度时序模板</a>
                        </div>
                    </div>
                    <div className="MonDataImport_2">
                        <div>
                            <h2>月度面板数据导入</h2>
                            <span>时间设定：年度</span>
                            <Select value={this.state.value} onChange={e => this.handleImportOption(e,"Select1")} className="QuaDataManage_Select" placeholder="--" clearable={true}>
                                {
                                    this.state.options.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                            <span>月份</span>
                            <Select value={this.state.value} onChange={e => this.handleImportOption(e,"Select2")} className="MonDataManage_Select" placeholder="--" clearable={true}>
                                {
                                    this.state.options1.map(el => {
                                        return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                    })
                                }
                            </Select>
                        </div>
                        <div>
                            <span>选择截面数据文件</span>
                            <input type="file" name="file" className="inline-input" onChange={this.onChangeFile.bind(this)} value={this.state.fileName}/>
                            <Button type="primary" size="small" onClick={this.handleClickForForm.bind(this)}>生成表格</Button>
                        </div>
                    </div>
                    <div className="MonDataImport_3">
                        <h2>月度时序数据导入</h2>
                        <span>选择时序数据文件</span>
                        <input type="file" className="inline-input"/>
                        <Button type="primary" size="small">生成表格</Button>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default MonthlyDataQuery