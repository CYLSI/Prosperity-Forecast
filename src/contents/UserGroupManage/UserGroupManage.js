import React, { Component } from 'react';
import '../../App.css';
import './UserGroupManage.css';
import { Layout,Input,Button,Table } from 'element-react';

class UserGroupManage extends Component{

    handleClickForEdit(e){
        this.setState ({
            columns: [
                {
                    label: "ID",
                    prop: "id",
                    width: 100,
                    render: function(data){
                        return <Input placeholder={data.id} size="small"/>
                    }
                },{
                    label: "用户组名称",
                    prop: "userGroupName",
                    width: 160,
                    render: function(data){
                        return <Input placeholder={data.userGroupName} size="small"/>
                    }
                },{
                    label: "操作",
                    prop: "zip",
                    width: 150,
                    render: ()=>{
                        return <span>
                                    <Button type="text" size="small">更新</Button>
                                    <Button type="text" size="small">取消</Button>
                                    <Button type="text" size="small">删除</Button>
                                </span>
                    }
                }]
        })
    }
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    label: "ID",
                    prop: "id",
                    width: 100
                },
                {
                    label: "用户组名称",
                    prop: "userGroupName",
                    width: 200
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: 120,
                    render: () => {
                        return <span><Button type="text" size="small"onClick={e => {this.handleClickForEdit(e)}}>编辑</Button><Button type="text" size="small">删除</Button></span>
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
            refresh: 'false'
        }
    }

    render(){
        return (
            <div>
                <h3>用户组管理</h3>
                <Layout.Col span={8}>
                    <div className="UserGroupManage-table">
                        <Table
                            columns={this.state.columns}
                            data={this.state.data}
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
            </div>
        );
    }
}

export default UserGroupManage;