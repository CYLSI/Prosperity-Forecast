import React, { Component } from 'react';
import '../../App.css';
import './UserGroupManage.css';
import { Layout,Input,Button,Table,Form,Dialog } from 'element-react';

class UserGroupManage extends Component{

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
                    label: "ID",
                    prop: "id",
                    width: '100%',
                },
                {
                    label: "用户组名称",
                    prop: "userGroupName",
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '100%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>编辑</Button>
                                    <Button type="text" size="small">删除</Button>
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
            dialogData:''
        }
    }

    render(){
        const { dialogVisible,dialogData,columns,data } = this.state
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
                        用户组名称：<Input placeholder="请输入内容" className="inline-input"/>（十个汉字以内）
                    </div>
                    <div className="UserGroupManage-button"><Button type="primary" size="small">添加用户组</Button></div>
                </Layout.Col>
                <div>
                    <Dialog
                        title="修改"
                        visible={ dialogVisible }
                        onCancel={ e => this.setState({ dialogVisible: false }) }
                        dialogData={ dialogData }
                        size="tiny"
                    >
                        <Dialog.Body>
                            <Form>
                                <Form.Item label="ID" labelWidth="80">
                                    <Input placeholder={dialogData.id} className="inline-input"></Input>
                                </Form.Item>
                                <Form.Item label="用户组名称" labelWidth="80">
                                    <Input placeholder={dialogData.userGroupName} className="inline-input"></Input>
                                </Form.Item>
                            </Form>
                        </Dialog.Body>
                        <Dialog.Footer className="dialog-footer">
                            <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>确 定</Button>
                        </Dialog.Footer>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default UserGroupManage;