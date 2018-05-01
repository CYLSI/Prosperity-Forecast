import React, { Component } from 'react';
import '../../App.css';
import './UserManage.css';
import { Layout,Input,Button,Dropdown,Table,Dialog,Form } from 'element-react';
import { Link } from 'react-router';

class UserManage extends Component{

    handleClickForEdit(e,row){
        this.setState({
            dialogVisible: true,
            dialogData: row
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
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small"><Link to='/contents/UserManage/UserManageAuthorization'>授权</Link></Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>编辑</Button>
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
            }],
            dialogVisible: false,
            dialogData:''
        }
    }

    render(){
        const { dialogVisible,dialogData,columns,data } = this.state
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
                    <Dialog
                        title="修改"
                        visible={ dialogVisible }
                        onCancel={ e => this.setState({ dialogVisible: false }) }
                        dialogData={ dialogData }
                        size="tiny"
                    >
                        <Dialog.Body>
                            <Form>
                                <Form.Item label="登录名" labelWidth="80">
                                    <Input placeholder={dialogData.loginName} className="inline-input"></Input>
                                </Form.Item>
                                <Form.Item label="用户名" labelWidth="80">
                                    <Input placeholder={dialogData.name} className="inline-input"></Input>
                                </Form.Item>
                                <Form.Item label="用户职务" labelWidth="80">
                                    <Input placeholder={dialogData.duties} className="inline-input"></Input>
                                </Form.Item>
                                <Form.Item label="部门" labelWidth="80">
                                    <Input placeholder={dialogData.apartment} className="inline-input"></Input>
                                </Form.Item>
                                <Form.Item label="用户组" labelWidth="80">
                                    <Input placeholder={dialogData.userGroup} className="inline-input"></Input>
                                </Form.Item>
                                <Form.Item label="电子邮件" labelWidth="80">
                                    <Input placeholder={dialogData.email} className="inline-input"></Input>
                                </Form.Item>
                                <Form.Item label="联系电话" labelWidth="80">
                                    <Input placeholder={dialogData.contact} className="inline-input"></Input>
                                </Form.Item>
                            </Form>
                        </Dialog.Body>
                        <Dialog.Footer className="dialog-footer">
                            <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>确 定</Button>
                        </Dialog.Footer>
                    </Dialog>
                </div>
            </Layout.Col>
        );
    }
}

export default UserManage;