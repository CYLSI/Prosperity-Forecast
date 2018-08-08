import React, { Component } from 'react';
import {Layout, Input, Button, Select,Table,Dialog,Radio,Checkbox,Tree } from 'element-react';
import './PrimarySelectedIndex.less';
import DialogForm from '@components/Dialog/Dialog'

class PrimarySelectedIndex extends  Component{

    getList(){
        this.$post('/anaRes/list')
            .then(res=>{
                this.setState({
                    data: res,
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    onChangeRadio(value) {
        this.state.dialogBodyData.search.frequency = value;
        this.forceUpdate();
    }

    onChangeCheckbox(e){
        this.state.dialogBodyData.reverse = e
    }

    componentDidMount(){
        this.getList()
    }

    handleIniOption(e,name){
        if(name === "Select1"){
            this.setState({
                indexCategory: e
            })
        }else{
            this.state.dialogBodyData.search.keywordSelect = e;
        }
    }

    onChange(key, value) {
        if(key === "dialog-search"){
            this.state.dialogBodyData.search.keywordInput = value;
        }else{
            this.setState({
                [key]: value
            });
        }
        this.forceUpdate();
    }

    handleClickForSearch(name){
        if(name === "altSearch"){
            this.setState({altSearch:true})
        }else{
            this.setState({altSearch:false})
        }
        this.setState({
            dialogVisible2:true
        })
    }

    handleClickForSearching(){
        console.log(this.state.dialogBodyData.search)
        this.$post('/group/del')
            .then(res=>{
                if(res === 1){
                    this.setState({
                        data1:res
                    })
                }
            }).catch(e=>{
            console.log(e)
        })
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

    handleComfirm2(){
        if(this.state.altSearch === false){
            this.setState({
                basicIndex:this.state.addedIndex.label,
                basicIndexId:this.state.addedIndex.id
            })
        }else {
            if (this.state.altIndexId.length === 0) {
                this.state.altIndexId.push(this.state.addedIndex.id)
                this.state.altIndex.push(this.state.addedIndex.label)
            } else {
                let flag = false
                for (let i in this.state.altIndexId) {
                    if (this.state.altIndexId[i] === this.state.addedIndex.id) {
                        alert("该指标已添加！")
                        flag = true
                        break;
                    }
                }
                if(!flag){
                    this.state.altIndexId.push(this.state.addedIndex.id)
                    this.state.altIndex.push(this.state.addedIndex.label)
                }
            }
        }
        this.setState({
            dialogVisible2:false,
            data3:[{type:"-"}]
        })
    }

    handleCancel(){
        this.setState({dialogVisible2:false})
    }

    handleClickForTree1(data){
        /*this.$post('/group/list',data)
            .then(res=>{
                this.setState({
                    data2:''
                })
            }).catch(e=>{
            console.log(e)
        })*/
    }

    handleClickForTree2(data){
        this.setState({
            addedIndex:data
        })
    }

    handleClickForIndexAdd(){
        this.setState({
            data3:[{
                type:this.state.addedIndex.label
            }]
        })
        this.forceUpdate()
    }

    handleClickForDialogDel(e,row){
        console.log(this.state.addedIndex.id)
        this.$post('/role/del',{type: row.type})
            .then(res=>{
                this.setState({
                    data3:res
                })
            }).catch(e=>{
            console.log(e)
        })
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
            dialogVisible2:false,
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
            add: false,
            columns3: [
                {
                    label: "指标类型",
                    prop: "type"
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '80%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDialogDel(e,row)}>删除</Button>
                                </span>
                    }
                }],
            data3:[{
                type: "-"
            }],
            Options: [{
                value: '1',
                label: '1'
            }],
            dialogBodyData:{
                search:{
                  frequency:1,
                  keywordSelect:'',
                  keywordInput:''
                },
                reverse:true,
            },
            data1:[{
                id: 1,
                label: 'A01',
            },{
                id: 2,
                label: 'A01',
            },{
                id: 3,
                label: 'A01',
            }],
            options: {
                children: 'children',
                label: 'label'
            },
            data2: [{
                id: 1,
                label: 'A02',
            }],
            addedIndex:'',
            basicIndex:'',
            basicIndexId:'',
            altSearch:false,
            altIndex:[],
            altIndexId:[]
        }
    }

    render(){
        const { columns,data,dialogData,dialogVisible,dialogForm,dialogBodyData } = this.state;
        return(
            <Layout.Col span={18}>
                <div className="PSIndex">
                    <h3>指标初选</h3>
                    <div>
                        <span>基准指标：</span>
                        <Input className="inline-input" value={this.state.basicIndex} onChange={this.onChange.bind(this, 'basicIndex')}/>
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this)}>查询</Button>
                        <Button type="primary" size="small">显示所有分析结果</Button>
                    </div>
                    <hr />
                    <div>
                        <span>指标类别：</span>
                        <Select value={this.state.value} onChange={e => this.handleIniOption(e,"Select1")} clearable={true}>
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
                        <Input className="inline-input-textarea" value={this.state.altIndex} type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this,"altSearch") }>查询</Button>
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
                <div className="PSIndex_Dialog">
                    <Dialog
                        visible={this.state.dialogVisible2}
                        size="small"
                        title="指标初选"
                        top="20px"
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <Dialog.Body>
                        <div>
                        <div>
                        <span>请选择一组指标：</span>
                        <Select value={this.state.value} onChange={e => this.handleIniOption(e,"Select2")} clearable={true}>
                            {
                                this.state.Options.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                        <Input className="inline-input" onChange={this.onChange.bind(this,"dialog-search")}/>
                        </div>
                        <div>
                            <Radio value="1" checked={dialogBodyData.search.frequency === 1} onChange={this.onChangeRadio.bind(this)}>月度</Radio>
                            <Radio value="2" checked={dialogBodyData.search.frequency === 2} onChange={this.onChangeRadio.bind(this)}>季度</Radio>
                            <Radio value="3" checked={dialogBodyData.search.frequency === 3} onChange={this.onChangeRadio.bind(this)}>年度</Radio>
                            <Button type="primary" size="small" onClick={this.handleClickForSearching.bind(this) }>关键字查询</Button>
                        </div>
                        <Layout.Col span={11}>
                            <div className="PSIndex_Dialog_indexName">
                                <p>指标名称</p>
                                <Tree
                                    data={this.state.data1}
                                    options={this.state.options}
                                    nodeKey="id"
                                    defaultExpandedKeys={[1]}
                                    onNodeClicked={this.handleClickForTree1.bind(this)}
                                    highlightCurrent={true}
                                />
                            </div>
                        </Layout.Col>
                        <Layout.Col span={11}>
                            <div className="PSIndex_Dialog_indexType">
                                <p>指标类型</p>
                                <Tree
                                    data={this.state.data2}
                                    options={this.state.options}
                                    nodeKey="id"
                                    defaultExpandedKeys={[1]}
                                    onNodeClicked={this.handleClickForTree2.bind(this)}
                                    highlightCurrent={true}
                                />
                            </div>
                        </Layout.Col>
                        <div>
                            <Button type="primary" size="small" onClick={this.handleClickForIndexAdd.bind(this)}>添加指标</Button>
                            <Checkbox checked={dialogBodyData.reverse} onChange={e => this.onChangeCheckbox(e)}>逆转</Checkbox>
                        </div>
                        <div>
                            <Table
                                columns={this.state.columns3}
                                data={this.state.data3}
                                border={true}
                                height="80px"
                            />
                        </div>
                        </div>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button type="primary" size="small" onClick={this.handleComfirm2.bind(this) }>确定</Button>
                        </Dialog.Footer>
                    </Dialog>
                </div>
            </Layout.Col>
        )
    }
}

export default PrimarySelectedIndex
