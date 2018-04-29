import React, { Component } from 'react';
import '../../../App.css';
import './UserManageAuthorization.css';
import { Layout,Button,Checkbox,Table } from 'element-react';

class UserManageAuthorization extends Component{
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
                    width: '100%',
                    render: () => {
                        return <span><Checkbox></Checkbox></span>
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
        return(
            <div>
                <h3>修改用户管理员（Admin）所属角色</h3>
                <Layout.Col span={8}>
                    <div className="UserManageAuthorization-table">
                        <Table
                            columns={this.state.columns}
                            data={this.state.data}
                            border={true}
                        />
                        <Button type="primary" size="small">修改</Button>
                        <Button type="primary" size="small">返回</Button>
                    </div>
                </Layout.Col>
            </div>
        );
    }
}

export default UserManageAuthorization;