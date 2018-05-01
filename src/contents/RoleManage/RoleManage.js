import React, { Component } from 'react';
import '../../App.css';
import { Layout,Input,Button,Table,Form,Dialog } from 'element-react';

class RoleManage extends Component{

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
                    label: "角色名称",
                    prop: "roleName",
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '160%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>编辑</Button>
                                    <Button type="text" size="small">授权</Button><Button type="text" size="small">删除</Button>
                                </span>
                    }
                }
            ],
            data: [{
                roleName: '系统管理员'
            },{
                roleName: '普通用户'
            },{
                roleName: '数据访问'
            },{
                roleName: '基本分析工具'
            }],
            dialogVisible: false,
            dialogData:''
        }
    }

    render(){
        const { dialogVisible,dialogData,columns,data } = this.state
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
                    <p>角色名称：<Input placeholder="请输入内容" className="inline-input"/>（十个汉字以内）</p>
                    <Button type="primary" size="small">检查重复</Button>
                    <Button type="primary" size="small">添加角色</Button>
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
                                <Form.Item label="角色名称" labelWidth="80">
                                    <Input placeholder={dialogData.roleName} className="inline-input"></Input>
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

export default RoleManage;