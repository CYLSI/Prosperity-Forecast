import React, { Component } from 'react';
import '../../App.css';
import { Layout,Input,Button,Dropdown,Table } from 'element-react';

class ModulesManage extends Component{
    handleClickForEdit(e){
        this.setState({
            columns: [
                {
                    label: "操作",
                    prop: "zip",
                    width: 150,
                    render: () => {
                        return <span><Button type="text" size="small">更新</Button><Button type="text" size="small">取消</Button><Button type="text" size="small">删除</Button></span>
                    }
                },
                {
                    label: "模块名称",
                    prop: "modulesName",
                    width: 180,
                    render: function(data){
                        return <Input placeholder={data.modulesName} size="small"/>
                    }
                },
                {
                    label: "实际页面",
                    prop: "page",
                    width: 400,
                    render: function(data){
                        return <Input placeholder={data.page} size="small"/>
                    }
                },
                {
                    label: "说明",
                    prop: "illustrate",
                    width: 85,
                    render: function(data){
                        return <Input placeholder={data.illustrate} size="small"/>
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
                    label: "操作",
                    prop: "zip",
                    width: 120,
                    render: () => {
                        return <span><Button type="text" size="small" onClick={e => {this.handleClickForEdit(e)}}>编辑</Button><Button type="text" size="small">删除</Button></span>
                    }
                },
                {
                    label: "模块名称",
                    prop: "modulesName",
                    width: 200
                },
                {
                    label: "实际页面",
                    prop: "page",
                    width: 400
                },
                {
                    label: "说明",
                    prop: "illustrate",
                    width: 85
                }
            ],
            data: [{
                modulesName: '添加模块',
                page: '--'
            },{
                modulesName: '用户与权限管理',
                page: '--'
            },{
                modulesName: '部门管理',
                page: '--'
            },{
                modulesName: '用户管理',
                page: '--'
            },{
                modulesName: '添加用户',
                page: '--'
            },{
                modulesName: '用户组管理',
                page: '--'
            },{
                modulesName: '添加用户组',
                page: '--'
            },{
                modulesName: '角色管理',
                page: '--'
            },{
                modulesName: '添加角色',
                page: '--'
            },{
                modulesName: '模块管理',
                page: '--'
            }]
        }
    }

    render(){
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
                            columns={this.state.columns}
                            data={this.state.data}
                            border={true}
                        />
                    </div>
                    <Button type="primary" size="small">添加新模块</Button>
                </Layout.Col>
            </div>
        );
    }
}

export default ModulesManage;