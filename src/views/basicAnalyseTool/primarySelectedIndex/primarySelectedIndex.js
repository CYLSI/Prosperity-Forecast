import React, { Component } from 'react';
import {Layout, Input, Button, Select,Table } from 'element-react';
import './primarySelectedIndex.less';
import DialogForm from '@components/Dialog/Dialog'

class primarySelectedIndex extends  Component{

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
        this.getList()
    }

    handleIniOption(e){
       this.setState({
           indexCategory: e
       })
    }

    onChange(key, value) {
        this.setState({
            [key]: value
        });
        this.forceUpdate();
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
                analysisIndex:'',
                setting:''
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

    handleClickForFilter(){
        this.$post('/group/list',{ indexCategory:this.state.indexCategory,keyword:this.state.keyword })
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

        this.state = {
            columns: [
                {
                    label: "分析指标",
                    prop: "analysisIndex",
                },
                {
                    label: "配置",
                    prop: "setting",
                    width: '180%'
                },
                {
                    label: "分析结果",
                    prop: "analysisResult",
                    width: '250%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small">相关性分析</Button>
                                    <Button type="text" size="small">峰谷分析</Button>
                                </span>
                    }
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '120%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>修改</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data: [{
                analysisIndex: '[A01]农业增加值-当期同比',
                setting: '先行 较好',
            }],
            keywordOptions: [{
                value: '1',
                label: '1'
            }],
            indexCategory:'',
            keyword:'请输入内容',
            dialogVisible: false,
            dialogData:'',
            dialogForm:[
                {
                    label:'分析指标',
                    param:'analysisIndex'
                },
                {
                    label:'配置',
                    param:'setting'
                }],
            upd: false,
            add: false
        }
    }

    render(){
        const { columns,data,dialogData,dialogVisible,dialogForm } = this.state;
        return(
            <Layout.Col span={18}>
                <div className="PSIndex">
                    <h3>指标初选</h3>
                    <div>
                        <span>基准指标：</span>
                        <Input className="inline-input"/>
                        <Button type="primary" size="small">查询</Button>
                        <Button type="primary" size="small">显示所有分析结果</Button>
                    </div>
                    <hr />
                    <div>
                        <span>指标类别：</span>
                        <Select value={this.state.value} onChange={e => this.handleIniOption(e)} clearable={true}>
                            {
                                this.state.keywordOptions.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                        <span>关键字：</span>
                        <Input placeholder={this.state.keyword} className="inline-input" onChange={this.onChange.bind(this, 'keyword')}/>
                        <Button type="primary" size="small" onClick={this.handleClickForFilter.bind(this)}>分析指标列表过滤</Button>
                    </div>
                    <div className="PSIndex_table">
                        <Table
                            columns={columns}
                            data={data}
                            border={true}
                        />
                    </div>
                    <div>
                        <blockquote />
                        <Button type="primary" size="small">全部重新计算相关性</Button>
                        <blockquote />
                        <span>选择备选指标：</span>
                        <Input className="inline-input-textarea"  type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
                        <Button type="primary" size="small">查询</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this) }>添加备选指标</Button>
                    </div>
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
        )
    }
}

export default primarySelectedIndex
