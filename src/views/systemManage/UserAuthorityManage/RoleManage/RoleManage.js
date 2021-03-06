import React, { Component } from 'react';
import '../../../../App.css';
import './RoleManage.css';
import { Layout,Input,Button,Table} from 'element-react';
import DialogForm from '@components/Dialog/Dialog'

class RoleManage extends Component{

    getList(){
        this.$post('/role/list')
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

    onChange(key, value) {
        this.setState({
            addedRoleName: value,
            roleName:value
        })
        this.forceUpdate();
    }

    handleClickForEdit(e,row){
        this.setState({
            dialogVisible: true,
            dialogData: this.$clone(row),
            id: row.id
        })
    }

    handleClickForDelete(e,row){
       this.$post('/role/del',row.id)
           .then(res=>{
               if(res === 1){
                   this.getList()
               }
           }).catch(e=>{
           console.log(e)
       })
   }

    handleClickForAdd(){
        this.$post('/role/add',{name: this.state.addedRoleName})
            .then(res=>{
                if(res === 1){
                    this.getList()
                    this.setState({
                        addedRoleName:''
                    })
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForSearch(){
        this.$post('/role/check',{name:this.state.roleName})
            .then(res=>{
                if(res){
                   alert("此角色可添加")
                }else{
                alert("此角色已存在")}
            }).catch(e=>{
            console.log(e)
        })
    }

    handleComfirm(){
        this.setState({
            dialogVisible: false
        })
        this.$post('/role/upd',{id:this.state.id,name:this.state.dialogData.name})
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    constructor(props) {
        super(props);

        this.handleClickForDelete = this.handleClickForDelete.bind(this);
        this.handleClickForEdit = this.handleClickForEdit.bind(this);
        this.handleClickForAdd = this.handleClickForAdd.bind(this);
        this.handleClickForSearch = this.handleClickForSearch.bind(this);
        this.handleComfirm = this.handleComfirm.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            columns: [
                {
                    label: "角色名称",
                    prop: "name",
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '140%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>编辑</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data: [{
                name: '系统管理员'
            },{
                name: '普通用户'
            },{
                name: '数据访问'
            },{
                name: '基本分析工具'
            }],
            dialogVisible: false,
            dialogData:'',
            dialogForm:[{
                    label:'角色名称',
                    param:'name'
                }],
            roleName: '',
            addedRoleName: '',
            id:''
        }
    }

    render(){
        const { dialogForm,dialogVisible,dialogData,columns,data,addedRoleName } = this.state
        return (
            <div>
                <h3>用户角色管理</h3>
                <Layout.Col span={8}>
                    <div className="UserGroupManage-table">
                        <Table
                            columns={columns}
                            data={data}
                            border={true}
                        />
                    </div>
                </Layout.Col>
                <h4>添加用户角色</h4>
                <Layout.Col span={10}>
                    <div>角色名称：<Input value={addedRoleName} className="inline-input" onChange={this.onChange.bind(this, 'addedRoleName')}/>（十个汉字以内）</div>
                    <div className="RoleManage-button">
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this) }>检查重复</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this) }>添加角色</Button>
                    </div>
                </Layout.Col>
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
            </div>
        );
    }
}

export default RoleManage;