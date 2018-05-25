import React, { Component } from 'react';
import '../../../../App.css';
import './UserManage.css';
import DialogForm from '@components/Dialog/Dialog'
import { Layout,Input,Button,Dropdown,Table} from 'element-react';
import { Link } from 'react-router';
import {PubSub} from "pubsub-js";

class UserManage extends Component{

    getList(){
        this.$post('/user/list')
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

    modifyPassword(e,row){
        this.setState({
            dialogData2: this.$clone(row),
            dialogVisible2: true,
            id: row.userName
        })
    }

    handleClickForEdit(e,row){
        this.setState({
            dialogVisible1: true,
            dialogData1: this.$clone(row),
            id: row.userName
        })
    }

    handleClickForDelete(e,row){
        /*this.$post('/user/del',row.loginName)
            .then(res=>{
                if(res == 1){
                    getList()
                }
            }).catch(e=>{
            console.log(e)
        })*/
    }

    handleComfirm1(){
        let form = this.state.dialogData1;
        this.setState({
            dialogVisible1: false
        })
        this.$post('/user/upd',form)
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleComfirm2(){
        let op = this.state.dialogData2.oldPassword;
        let np = this.state.dialogData2.newPassword;
        let id = this.state.id;
        console.log(op,np,id)
        this.setState({
            dialogVisible2: false
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

        this.handleClickForDelete = this.handleClickForDelete.bind(this);
        this.handleClickForEdit = this.handleClickForEdit.bind(this);
        this.handleComfirm1 = this.handleComfirm1.bind(this);
        this.handleComfirm2 = this.handleComfirm2.bind(this);

        this.state = {
            columns: [
                {
                    label: "登录名",
                    prop: "userName",
                    width: '80%'
                },
                {
                    label: "用户名",
                    prop: "name",
                    width: '80%'
                },
                {
                    label: "用户职务",
                    prop: "post"
                },
                {
                    label: "部门",
                    prop: "dept",
                    width: '70%'
                },
                {
                    label: "角色",
                    prop: "role",
                    width: '110%'
                },
                {
                    label: "电子邮件",
                    prop: "email",
                    width: '170%'
                },
                {
                    label: "联系电话",
                    prop: "phone",
                    width: '130%'
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '190%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small"><Link to='/systemManage/UserAuthorityManage/UserManage/UserManageAuthorization'>授权</Link></Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>编辑</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                    <Button type="text" size="small" onClick={e => this.modifyPassword(e,row)}>修改密码</Button>
                                </span>
                    }
                }
            ],
            data: [{
                userName: 'Admin',
                name: '管理员',
                duties: '--',
                department: '华农',
                role: '普通用户',
                email: '000000',
                phone: '13300000000',
                remark: '',
            }],
            dialogVisible1: false,
            dialogVisible2: false,
            dialogData1:'',
            dialogData2:'',
            dialogForm1: [
                {
                    label:'登录名',
                    param:'userName'
                },
                {
                    label:'用户名',
                    param:'name'
                },{
                    label:'用户职务',
                    param:'duties'
                },
                {
                    label:'部门',
                    param:'department'
                },{
                    label:'角色',
                    param:'role'
                },
                {
                    label:'电子邮件',
                    param:'email'
                },{
                    label:'联系电话',
                    param:'phone'
                }],
            dialogForm2:[
                {
                    label:'旧密码',
                    param:'oldPassword'
                },
                {
                    label:'新密码',
                    param:'newPassword'
                }],
            id:''
        }
    }

    render(){
        const { dialogForm1,dialogData1,dialogVisible1,dialogVisible2,dialogData2,dialogForm2,columns,data } = this.state
        return(
            <Layout.Col span={18}>
                <div>
                    <h3>系统用户管理</h3>
                    <div className="UserManage">
                        <span>关键字查询：按部门名称</span>
                        <Dropdown trigger="click" menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item>华农</Dropdown.Item>
                            </Dropdown.Menu>
                        )}
                        >
                            <Button type="primary" size="small">
                                >>全部<i className="el-icon-caret-bottom el-icon--right"></i>
                            </Button>
                        </Dropdown>
                        <span>按用户组名</span>
                        <Dropdown menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item>华农</Dropdown.Item>
                            </Dropdown.Menu>
                        )}
                        >
                            <Button type="primary" size="small">
                                全部<i className="el-icon-caret-bottom el-icon--right"></i>
                            </Button>
                        </Dropdown>
                        <span>按用户名称</span>
                        <Dropdown menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item>华农</Dropdown.Item>
                            </Dropdown.Menu>
                        )}
                        >
                            <Button type="primary" size="small">
                                登陆名<i className="el-icon-caret-bottom el-icon--right"></i>
                            </Button>
                        </Dropdown>
                        <Input placeholder="请输入内容" className="inline-input"/>
                        <Button type="primary" size="small">查询</Button>
                    </div>
                </div>
                <div className="UserManage-Table">
                    <Table
                        columns={columns}
                        data={data}
                        border={true}
                    />
                    <DialogForm
                        dialogData={dialogData1}
                        dialogVislble={dialogVisible1}
                        form={dialogForm1}
                        handleComfirm={this.handleComfirm1.bind(this)}
                    >
                    </DialogForm>
                    <DialogForm
                        dialogData={dialogData2}
                        dialogVislble={dialogVisible2}
                        form={dialogForm2}
                        handleComfirm={this.handleComfirm2.bind(this)}
                    >
                    </DialogForm>
                </div>
            </Layout.Col>
        );
    }
}


export default UserManage;