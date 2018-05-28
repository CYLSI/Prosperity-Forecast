import React, { Component } from 'react';
import '../../../../App.css';
import './UserGroupManage.css';
import { Layout,Input,Button,Table} from 'element-react';
import {PubSub} from "pubsub-js";
import DialogForm from '@components/Dialog/Dialog'

class UserGroupManage extends Component{

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
        PubSub.publish('route',this.props.location.pathname);
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
            id: row.id
        })
    }

    handleClickForDelete(e,row){
       this.$post('/group/del',{id:row.id})
           .then(res=>{
               if(res == 1){
                   this.getList()
               }
           }).catch(e=>{
           console.log(e)
       })
   }

    handleClickForAdd(){
        this.$post('/group/add',{name:this.state.addedUserGroup})
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleComfirm(){
        // let id = this.state.dialogData.id;
        console.log(this.state.dialogData)
        console.log(this.state.id)
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

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.handleClickForDelete = this.handleClickForDelete.bind(this);
        this.handleClickForEdit = this.handleClickForEdit.bind(this);
        this.handleClickForAdd = this.handleClickForAdd.bind(this);
        this.handleComfirm = this.handleComfirm.bind(this);

        this.state = {
            columns: [
                {
                    label: "ID",
                    prop: "id",
                    width: '100%',
                },
                {
                    label: "用户组名称",
                    prop: "name",
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '100%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>编辑</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                </span>
                    }
                }
            ],
            data: [{
                id: '1',
                userGroupName: '普通用户',
            },{
                id: '10',
                userGroupName: '管理人员',
            },{
                id: '8',
                userGroupName: '展示层用户',
            }],
            dialogVisible: false,
            dialogData:'',
            dialogForm:[
                {
                    label:'ID',
                    param:'id'
                },
                {
                    label:'用户组名称',
                    param:'userGroupName'
                }],
            id: '',
            addedUserGroup: '请输入内容'
        }
    }

    render(){
        const { dialogForm,dialogVisible,dialogData,columns,data,addedUserGroup } = this.state
        return (
            <div>
                <h3>用户组管理</h3>
                <Layout.Col span={8}>
                    <div className="UserGroupManage-table">
                        <Table
                            columns={columns}
                            data={data}
                            border={true}
                        />
                    </div>
                </Layout.Col>
                <h4>添加用户组</h4>
                <Layout.Col span={10}>
                    <div>
                        用户组名称：<Input placeholder={ addedUserGroup } className="inline-input" onChange={this.onChange.bind(this, 'addedUserGroup')}/>（十个汉字以内）
                    </div>
                    <div className="UserGroupManage-button">
                        <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this) }>添加用户组</Button>
                    </div>
                </Layout.Col>
                <div>
                   <DialogForm
                       dialogData={dialogData}
                       dialogVislble={dialogVisible}
                       form={dialogForm}
                       handleComfirm={this.handleComfirm.bind(this)}
                   >
                   </DialogForm>
                </div>
            </div>
        );
    }
}

export default UserGroupManage;