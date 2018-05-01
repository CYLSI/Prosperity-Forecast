import React, { Component } from 'react';
import '../../App.css';
import './ModulesManage.css';
import { Layout,Input,Button,Dropdown,Table,Form,Dialog } from 'element-react';

class ModulesManage extends Component{

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
                    label: "操作",
                    prop: "zip",
                    width: '100%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small"  onClick={e => this.handleClickForEdit(e,row)}>编辑</Button>
                                    <Button type="text" size="small">删除</Button>
                                </span>
                    }
                },
                {
                    label: "模块名称",
                    prop: "modulesName",
                    width: '200%'
                },
                {
                    label: "实际页面",
                    prop: "page",
                },
                {
                    label: "说明",
                    prop: "illustrate",
                    width: '100%'
                }
            ],
            data: [{
                modulesName: '添加模块',
                page: '--',
                illustrate:''
            },{
                modulesName: '用户与权限管理',
                page: '--',
                illustrate:''
            },{
                modulesName: '部门管理',
                page: '--',
                illustrate:''
            },{
                modulesName: '用户管理',
                page: '--',
                illustrate:''
            },{
                modulesName: '添加用户',
                page: '--',
                illustrate:''
            },{
                modulesName: '用户组管理',
                page: '--',
                illustrate:''
            },{
                modulesName: '添加用户组',
                page: '--',
                illustrate:''
            },{
                modulesName: '角色管理',
                page: '--',
                illustrate:''
            },{
                modulesName: '添加角色',
                page: '--',
                illustrate:''
            },{
                modulesName: '模块管理',
                page: '--',
                illustrate:''
            }],
            dialogVisible: false,
            dialogData:''
        }
    }

    render(){
        const { dialogVisible,dialogData,columns,data } = this.state
        return(
            <div>
                <Layout.Col span={15}>
                    <div>
                        <h3>模块管理</h3>
                        <div className="ModulesManage">
                            <span>关键字查询：</span>
                            <Dropdown trigger="click" menu={(
                                <Dropdown.Menu>
                                    <Dropdown.Item>模块1</Dropdown.Item>
                                </Dropdown.Menu>
                            )}
                            >
                                <Button type="primary" size="small">
                                    >>全部<i className="el-icon-caret-bottom el-icon--right"></i>
                                </Button>
                            </Dropdown>
                            <Input placeholder="请输入内容" className="inline-input"/>
                            <Button type="primary" size="small">查询</Button>
                        </div>
                    </div>
                    <div className="ModulesManage-Table">
                        <Table
                            columns={columns}
                            data={data}
                            border={true}
                        />
                    </div>
                    <Button type="primary" size="small">添加新模块</Button>
                </Layout.Col>
                <div className="ModulesManage-dialog">
                    <Dialog
                        title="修改"
                        visible={ dialogVisible }
                        onCancel={ e => this.setState({ dialogVisible: false }) }
                        dialogData={ dialogData }
                        size="tiny"
                    >
                        <Dialog.Body>
                            <Form>
                                <Form.Item label="模块名称" labelWidth="80">
                                    <Input placeholder={dialogData.modulesName} className="inline-input"></Input>
                                </Form.Item>
                                <Form.Item label="实际页面" labelWidth="80">
                                    <Input placeholder={dialogData.page} className="inline-input"></Input>
                                </Form.Item>
                                <Form.Item label="说明" labelWidth="80">
                                    <Input placeholder={dialogData.illustrate} className="inline-input"></Input>
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

export default ModulesManage;