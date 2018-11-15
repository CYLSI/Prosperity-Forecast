import React, { Component } from 'react';
import {Layout, Input, Button, Select,Table,Dialog,Radio,Tree } from 'element-react';
import './PrimarySelectedQuota.less';

class PrimarySelectedQuota extends Component{

    getOptions(){
        this.$post('/type/list')
            .then(res=>{
                for(let i in res){
                    this.state.dialogOptions.push(
                        {
                            value: res[i].name,
                            label: res[i].name
                        }
                    )
                }
                this.forceUpdate()
            }).catch(e=>{
            console.log(e)
        })
    }

    componentDidMount(){
        this.getOptions()
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          dialogVisible:nextProps.dialogVisible,
          alt:nextProps.alt,
          theme:nextProps.theme
        })
        this.forceUpdate()
    }

    handleCancel(){
        this.setState({
            dialogVisible:false,
            alt:{
                altQuota:[],
                altQuotaId:[],
                altSearch:false
            },
            TableData:[]
        })
        this.forceUpdate()
    }

    handleIniOption(e){
        this.state.dialogBodyData.search.keyWord1 = e;
        this.setState({
            TreeData:[],
            TreeData2:[]
        })
    }

    onChange(key, value) {
        this.state.dialogBodyData.search.keyWord2 = value;
        this.forceUpdate();
    }

    onChangeDialogRadio(value) {
        this.state.dialogBodyData.search.keyNum1 = value;
        this.forceUpdate();
    }

    handleClickForSearching(){
        this.setState({
            TreeData:[]
        })
        this.$post('/quotaQuery/firstSearch',this.state.dialogBodyData.search)
            .then(res=>{
                for(let i in res){
                    this.state.TreeData.push(
                        {
                            id: res[i].id,
                            label: res[i].name
                        }
                    )
                }
                this.forceUpdate()
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForTree1(data){
        this.setState({
            TreeData2:[]
        })
        this.$post('/quotaQuery/secondSearch',{keyNum1:data.id,keyNum2:this.state.dialogBodyData.search.keyNum1})
            .then(res=>{
                for(let i in res){
                    this.state.TreeData2.push(
                        {
                            id: res[i].id,
                            label: res[i].item,
                            info:res[i].info
                        }
                    )
                }
                this.setState({
                    addedFrequency:res.info
                })
                this.forceUpdate()
            }).catch(e=>{
            console.log(e)
        })
        this.setState({
            addedName:data.label
        })
    }

    handleClickForTree2(data){
        this.setState({
            addedIndex:data,
            buttonForIndexAdd:false
        })
    }

    handleClickForIndexAdd(){
        if(this.state.alt.altSearch === true){
            this.state.alt.altQuotaId.push(this.state.addedIndex.id)
            this.state.alt.altQuota.push(this.state.addedName + "-" + this.state.addedIndex.label + "-" + this.state.addedIndex.info)
            this.$post('/quotaQuery/DuplicateChecking',{quotaList:this.state.alt.altQuota,subject:this.state.theme})
                .then(res=>{
                    if(res === 0){
                        alert("含有指标已添加！")
                        this.state.alt.altQuota.splice(this.state.alt.altQuota.length-1, 1)
                        this.state.alt.altQuotaId.splice(this.state.alt.altQuotaId.length-1, 1)
                    }else{
                        this.state.TableData.push({
                            quota:this.state.addedName + "-" + this.state.addedIndex.label + "-" + this.state.addedIndex.info
                        })
                        this.forceUpdate()
                    }
                }).catch(e=>{
                    console.log(e)
                })
        }else{
            this.setState({
                TableData:[{
                    quota:this.state.addedName + "-" + this.state.addedIndex.label + "-" + this.state.addedIndex.info
                }]
            })
        }
        this.setState({
            buttonForFinalAdd:false
        })
        this.forceUpdate()
    }

    handleClickForDialogDel(e,row,index){
        let tableData = this.state.TableData
        tableData.splice(index, 1)
        this.setState({
            TableData: tableData
        })
        this.forceUpdate()
    }

    handleConfirm(){
        if(this.state.alt.altSearch === true){
            this.props.handleConfirm(this.state.alt)
        }else{
            this.state.bas.basic = this.state.addedName + "-" + this.state.addedIndex.label + "-" + this.state.addedIndex.info
            this.state.bas.basicId = this.state.addedIndex.id
            this.forceUpdate()
            this.props.handleConfirm(this.state.bas)
        }
        this.setState({
            dialogVisible:false,
            TableData:[],
            buttonForFinalAdd:true,
            buttonForIndexAdd:true
        })
        this.state.alt.altSearch = false
        
    }

	constructor(props) {
        super(props);

        this.state = {
            theme:props.theme,
            alt:props.alt,
            bas:props.bas,
        	dialogVisible:props.dialogVisible,
            dialogOptions: [],
            dialogBodyData:{
                search:{
                    keyNum1:1,
                    keyWord1:'',
                    keyWord2:''
                }
            },
            TreeData:[],
            TreeOptions: {
                children: 'children',
                label: 'label'
            },
            TreeData2: [],
            TableColumns: [
                {
                    label: "指标",
                    prop: "quota"
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '80%',
                    render: (row,e,index) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDialogDel(e,row,index)}>删除</Button>
                                </span>
                    }
                }],
            TableData:[],
            addedName:'',
            addedIndex:'',
            buttonForIndexAdd:false,
            buttonForFinalAdd:false
        }
    }

    render(){
        const { dialogBodyData,dialogVisible } = this.state
    	return(
            <div className="PSIndex_Dialog">
                    <Dialog
                        visible={dialogVisible}
                        size="small"
                        title="指标初选"
                        top="20px"
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <Dialog.Body>
                            <div>
                                <div>
                                    <span>请选择指标类型：</span>
                                    <Select value={this.state.value} onChange={e => this.handleIniOption(e)} clearable={true}>
                                        {
                                            this.state.dialogOptions.map(el => {
                                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                            })
                                        }
                                    </Select>
                                    <Input className="inline-input" value={dialogBodyData.search.keyWord2} onChange={this.onChange.bind(this,"dialogkeyWord2")}/>
                                </div>
                                <div>
                                    <Radio.Group onChange={this.onChangeDialogRadio.bind(this)} value={dialogBodyData.search.keyNum1}>
                                        <Radio value={1}>月度</Radio>
                                        <Radio value={2}>季度</Radio>
                                        <Radio value={3}>年度</Radio>
                                    </Radio.Group>
                                    <Button type="primary" size="small" onClick={this.handleClickForSearching.bind(this) }>关键字查询</Button>
                                </div>
                                <Layout.Col span={11}>
                                    <div className="PSIndex_Dialog_indexName">
                                        <p>指标名称</p>
                                        <Tree
                                            data={this.state.TreeData}
                                            options={this.state.TreeOptions}
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
                                            data={this.state.TreeData2}
                                            options={this.state.TreeOptions}
                                            nodeKey="id"
                                            defaultExpandedKeys={[1]}
                                            onNodeClicked={this.handleClickForTree2.bind(this)}
                                            highlightCurrent={true}
                                        />
                                    </div>
                                </Layout.Col>
                                <div>
                                    <Button type="primary" size="small" onClick={this.handleClickForIndexAdd.bind(this)} disabled={this.state.buttonForIndexAdd}>添加指标</Button>
                                </div>
                                <div>
                                    <Table
                                        columns={this.state.TableColumns}
                                        data={this.state.TableData}
                                        border={true}
                                    />
                                </div>
                            </div>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button type="primary" size="small" onClick={() => this.handleConfirm()} disabled={this.state.buttonForFinalAdd}>确定</Button>
                        </Dialog.Footer>
                    </Dialog>
                </div>
    	)
    }
}

export default PrimarySelectedQuota