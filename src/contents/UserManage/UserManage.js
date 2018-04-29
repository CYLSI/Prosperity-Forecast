import React, { Component } from 'react';
import '../../App.css';
import './UserManage.css';
import { Layout,Input,Button,Dropdown,Table } from 'element-react';
import { Link } from 'react-router';

class UserManage extends Component{

    handleClickForEdit(e){
        this.setState({
            columns: [
                {
                    label: "登录名",
                    prop: "loginName",
                    width: '100%',
                    render: function(data){
                        return <Input placeholder={data.loginName} size="small"/>
                    }
                }, {
                    label: "用户名",
                    prop: "name",
                    width: '100%',
                    render: function(data){
                        return <Input placeholder={data.name} size="small"/>
                    }
                },{
                    label: "用户职务",
                    prop: "duties",
                    render: function(data){
                        return <Input placeholder={data.duties} size="small"/>
                    }
                },{
                    label: "部门",
                    prop: "apartment",
                    width: '80%',
                    render: function(data){
                        return <Input placeholder={data.apartment} size="small"/>
                    }
                },{
                    label: "用户组",
                    prop: "userGroup",
                    width: '100%',
                    render: function(data){
                        return <Input placeholder={data.userGroup} size="small"/>
                    }
                },{
                    label: "电子邮件",
                    prop: "email",
                    width: '170%',
                    render: function(data){
                        return <Input placeholder={data.email} size="small"/>
                    }
                },{
                    label: "联系电话",
                    prop: "contact",
                    width: '130%',
                    render: function(data){
                        return <Input placeholder={data.contact} size="small"/>
                    }
                },{
                    label: "操作",
                    prop: "zip",
                    width: '160%',
                    render: ()=>{
                        return<span>
                                    <Button type="text" size="small">更新</Button>
                                    <Button type="text" size="small">取消</Button>
                                    <Button type="text" size="small"><Link to='/contents/UserManage/ModifyPassword'>修改密码</Link></Button>
                              </span>
                    }
                }
            ]
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    label: "登录名",
                    prop: "loginName",
                    width: '80%'
                },
                {
                    label: "用户名",
                    prop: "name",
                    width: '80%'
                },
                {
                    label: "用户职务",
                    prop: "duties",
                },
                {
                    label: "部门",
                    prop: "apartment",
                    width: '70%'
                },
                {
                    label: "用户组",
                    prop: "userGroup",
                    width: '100%'
                },
                {
                    label: "电子邮件",
                    prop: "email",
                    width: '170%'
                },
                {
                    label: "联系电话",
                    prop: "contact",
                    width: '130%'
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '190%',
                    render: ()=>{
                        return <span>
                                    <Button type="text" size="small"><Link to='/contents/UserManage/UserManageAuthorization'>授权</Link></Button>
                                    <Button type="text" size="small" onClick={e => {this.handleClickForEdit(e)}}>编辑</Button>
                                    <Button type="text" size="small">删除</Button>
                                    <Button type="text" size="small"><Link to='/contents/UserManage/ModifyPassword'>修改密码</Link></Button>
                                </span>
                    }
                }
            ],
            data: [{
                loginName: 'Admin',
                name: '管理员',
                duties: '--',
                apartment: '华农',
                userGroup: '普通用户',
                email: '000000',
                contact: '13300000000',
                remark: '',
            },{
                loginName: 'Admin',
                name: '管理员',
                duties: '--',
                apartment: '华农',
                userGroup: '普通用户',
                email: '000000',
                contact: '13300000000',
                remark: '',
            }]
        }
    }

    render(){
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
                        columns={this.state.columns}
                        data={this.state.data}
                        border={true}
                    />
                </div>
            </Layout.Col>
        );
    }
}

export default UserManage;