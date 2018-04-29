import React, { Component } from 'react';
import '../../App.css';
import { Layout,Input,Button,Table } from 'element-react';

class RoleManage extends Component{

    handleClickForEdit(e){
        this.setState({
            columns: [
                {
                    label: "角色名称",
                    prop: "roleName",
                    width: 255,
                    render: function(data){
                        return <Input placeholder={data.roleName} size="small"/>
                    }
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: 160,
                    render: () => {
                        return <span><Button type="text" size="small">更新</Button><Button type="text" size="small">取消</Button><Button type="text" size="small">删除</Button></span>
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
                    label: "角色名称",
                    prop: "roleName",
                    width: 255
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: 160,
                    render: () => {
                        return <span><Button type="text" size="small" onClick={e => {this.handleClickForEdit(e)}}>编辑</Button><Button type="text" size="small">授权</Button><Button type="text" size="small">删除</Button></span>
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
            }]
        }
    }

    render(){
        return (
            <div>
                <h3>用户角色管理</h3>
                <Layout.Col span={8}>
                    <div className="UserGroupManage-table">
                        <Table
                            columns={this.state.columns}
                            data={this.state.data}
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
            </div>
        );
    }
}

export default RoleManage;