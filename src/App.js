import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Breadcrumb,Layout,Menu,Tree,Input,Button,Dropdown,Table,Checkbox } from 'element-react';

/*---登陆界面开始---*/
class Login extends Component{
    render(){
        return(
            <div>
                <Layout.Col span={10}>
                    <div className="Login-left">
                        <h1>基于景气预测框架的</h1>
                        <h1>农产品市场预测系统</h1>
                    </div>
                </Layout.Col>
                <Layout.Col span={13}>
                    <div className="Login-right">
                        <h1>Welcome</h1>
                        <p>用户名</p>
                        <Input placeholder="请输入内容" />
                        <p>密码</p>
                        <Input placeholder="请输入内容" type="password"/>
                        <Checkbox className="Checkbox">记住密码</Checkbox>
                        <Button type="primary">登陆</Button>
                        <div>
                            <a href="#">忘记密码</a>|<a href="#">立即注册</a>
                        </div>
                    </div>
                </Layout.Col>
            </div>
        );
    }
}
/*---登陆界面结束---*/

/*---头部标题导航板块开始---*/
class Header extends Component{
    render(){
        return(
            <div className="App-header">
                <span className="App-title-center">基于景气预测框架的农产品市场预测系统</span>
                <span className="App-title-right">
                     <span>系统管理员</span>
                     <span className="el-icon-message"></span>
                     <span className="el-icon-d-arrow-right"></span>
                </span>
            </div>
        );
    }
}

class Nav extends Component{
    render(){
        return(
            <div className='App-header-Breadcrumb'>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
    }
}
/*---头部标题导航板块结束---*/

/*---左侧菜单板块开始---*/
class Menus extends Component{
    handleClick (e){
        if(e === "3-1"){
            ReactDOM.render(
                <ApartmentManage/>,
                document.getElementById("context")
            )
        }
        if(e === "3-2"){
            ReactDOM.render(
                <UserManage/>,
                document.getElementById("context")
            )
        }
        if(e === "3-3"){
            ReactDOM.render(
                <UserGroupManage/>,
                document.getElementById("context")
            )
        }
        if(e === "3-4"){
            ReactDOM.render(
                <RoleManage/>,
                document.getElementById("context")
            )
        }
        if(e === "3-5"){
            ReactDOM.render(
                <ModulesManage/>,
                document.getElementById("context")
            )
        }
    }
    render(){
        return(
            <Layout.Col span={5}>
                <Menu className="el-menu-vertical-demo" defaultOpeneds={['1']} uniqueOpened = "true" onSelect={e => {this.handleClick(e)}} >
                    <Menu.SubMenu index="1" title={<span>首页</span>}>
                        <Menu.SubMenu index='2' title="系统管理">
                            <Menu.SubMenu index='3' title="用户与数据管理">
                                <Menu.Item index="3-1">部门管理</Menu.Item>
                                <Menu.Item index="3-2">用户管理</Menu.Item>
                                <Menu.Item index="3-3">用户组管理</Menu.Item>
                                <Menu.Item index="3-4">角色管理</Menu.Item>
                                <Menu.Item index="3-5">模块管理</Menu.Item>
                            </Menu.SubMenu>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="4" title="数据管理">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="5" title="基本分析工具">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="6" title="模型配置">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="7" title="主题分析">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="8" title="景气预测">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu index="9" title="展示层配置">
                            <Menu.Item index="1-1">选项3</Menu.Item>
                        </Menu.SubMenu>
                    </Menu.SubMenu>
                </Menu>
            </Layout.Col>
        );
    }
}
/*---左侧菜单板块结束---*/

/*---内容板块---*/
/*---部门管理板块开始---*/
class ApartmentStructure extends Component{
    constructor(props) {
        super(props);

        this.state = {
            data: [{
                id: 1,
                label: '所有单位',
                children: [{
                    id: 2,
                    label: '华农',
                    children:[{
                        id: 4,
                        label: "数信"
                    },{
                        id: 5,
                        label: "农学院"
                    }]
                },{
                    id: 3,
                    label: "华工",
                    children:[{
                        id: 6,
                        label: "农学"
                    },{
                        id: 7,
                        label: "计算机"
                    }]
                }]
            }],
            options: {
                children: 'children',
                label: 'label'
            }
        }
    }

    render() {
        const { data, options } = this.state

        return (
            <div className="ApartmentManage-tree">
                <Tree
                    data={data}
                    options={options}
                    nodeKey="id"
                    defaultExpandedKeys={[1,2,3]}
                />
            </div>
        )
    }
}

class ApartmentManage extends Component{
    render(){
        return(
            <div>
                <h3>用户部门管理</h3>
                <Layout.Col span={4}>
                    <span>当前部门结构：</span>
                    <ApartmentStructure/>
                </Layout.Col>
                <Layout.Col span={13}>
                    <div className="ApartmentManage-context-1">
                        <span>您选择的部门是：</span>
                        <Input placeholder="请输入内容" className="inline-input"/>
                        <Button type="primary" size="small">修改部门名称</Button>
                        <Button type="primary" size="small">删除部门</Button>
                    </div>
                    <div className="ApartmentManage-context-2">
                        <span>在部门“华农”下添加新的部门：</span>
                        <Input placeholder="请输入内容" className="inline-input"/>
                        <Button type="primary" size="small">增加部门</Button>
                        <span>（十个汉字以内）</span>
                    </div>
                </Layout.Col>
            </div>
        );
    }
}
/*---部门管理板块结束---*/

/*---用户管理板块开始---*/
class UserManage extends Component{
    handleClickForAuthorize(e){
        ReactDOM.render(
            <UserManageAuthorization/>,
            document.getElementById("context")
        )
    }

    handleClickForModify(e){
        ReactDOM.render(
            <ModifyPassword/>,
            document.getElementById("context")
        )
    }

    handleClickForEdit(e){
        this.setState({
            columns: [
                {
                    label: "登录名",
                    prop: "loginName",
                    width: 130,
                    render: function(data){
                        return <Input placeholder={data.loginName} size="small"/>
                    }
                }, {
                    label: "用户名",
                    prop: "name",
                    width: 120,
                    render: function(data){
                        return <Input placeholder={data.name} size="small"/>
                    }
                },{
                    label: "用户职务",
                    prop: "duties",
                    width: 100,
                    render: function(data){
                        return <Input placeholder={data.duties} size="small"/>
                    }
                },{
                    label: "部门",
                    prop: "apartment",
                    width: 100,
                    render: function(data){
                        return <Input placeholder={data.apartment} size="small"/>
                    }
                },{
                    label: "用户组",
                    prop: "userGroup",
                    width: 150,
                    render: function(data){
                        return <Input placeholder={data.userGroup} size="small"/>
                    }
                },{
                    label: "电子邮件",
                    prop: "email",
                    width: 140,
                    render: function(data){
                        return <Input placeholder={data.email} size="small"/>
                    }
                },{
                    label: "联系电话",
                    prop: "contact",
                    width: 150,
                    render: function(data){
                        return <Input placeholder={data.contact} size="small"/>
                    }
                },{
                    label: "备注",
                    prop: "remark",
                    width: 80,
                    render: function(data){
                        return <Input placeholder={data.remark} size="small"/>
                    }
                },{
                    label: "操作",
                    prop: "zip",
                    fixed: 'right',
                    width: 200,
                    render: ()=>{
                        return <span><Button type="text" size="small">更新</Button><Button type="text" size="small">取消</Button><Button type="text" size="small" onClick={e => {this.handleClickForModify(e)}}>修改密码</Button></span>
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
                    width: 130
                },
                {
                    label: "用户名",
                    prop: "name",
                    width: 120
                },
                {
                    label: "用户职务",
                    prop: "duties",
                    width: 100
                },
                {
                    label: "部门",
                    prop: "apartment",
                    width: 100
                },
                {
                    label: "用户组",
                    prop: "userGroup",
                    width: 100
                },
                {
                    label: "电子邮件",
                    prop: "email",
                    width: 140
                },
                {
                    label: "联系电话",
                    prop: "contact",
                    width: 130
                },
                {
                    label: "备注",
                    prop: "remark",
                    width: 80
                },
                {
                    label: "操作",
                    prop: "zip",
                    fixed: 'right',
                    width: 200,
                    render: ()=>{
                        return <span><Button type="text" size="small" onClick={e => {this.handleClickForAuthorize(e)}}>授权</Button><Button type="text" size="small" onClick={e => {this.handleClickForEdit(e)}}>编辑</Button><Button type="text" size="small">删除</Button><Button type="text" size="small" onClick={e => {this.handleClickForModify(e)}}>修改密码</Button></span>
                    }
                }
            ],
            data: [{
                loginName: 'Admin',
                name: '管理员',
                duties: '--',
                apartment: '华农',
                userGroup: '普通用户',
                email: '000',
                contact: '13300000000',
                remark: '',
            },{
                loginName: 'Admin',
                name: '管理员',
                duties: '--',
                apartment: '华农',
                userGroup: '普通用户',
                email: '000',
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
/*---用户管理板块结束---*/

/*---用户管理授权板块开始---*/
class UserManageAuthorization extends Component{
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    label: "角色名称",
                    prop: "roleName",
                    width: 270
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: 100,
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
/*---用户管理授权板块结束---*/

/*---用户管理修改密码板块开始---*/
class ModifyPassword extends Component{
    render(){
        return(
            <div className="ModifyPassword">
                <h3>修改密码</h3>
                <Layout.Col span={30}>
                    <div>您的登录名是：管理员</div>
                    <div>请输入您的密码：<Input className="inline-input"/></div>
                    <div>请输入新密码：<Input className="inline-input"/>10位以内数字字母</div>
                    <Button type="primary" size="small">修改</Button>
                    <Button type="primary" size="small">返回</Button>
                </Layout.Col>
            </div>
        );
    }
}
/*---用户管理修改密码板块结束---*/

/*---用户组管理板块开始---*/
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
                        return <span><Button type="text" size="small">更新</Button><Button type="text" size="small">取消</Button><Button type="text" size="small">删除</Button></span>
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
            }]
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
                    <p>用户组名称：<Input placeholder="请输入内容" className="inline-input"/>（十个汉字以内）</p>
                </Layout.Col>
            </div>
        );
    }
}
/*---用户组管理板块结束---*/

/*---角色管理板块开始---*/
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
/*---角色管理板块结束---*/

/*---模块管理板块开始---*/
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
/*---模块管理板块结束---*/
/*---内容板块---*/

/*---底部板块开始---*/
class Foot extends Component{
    render(){
        return(
            <div className="App-foot"></div>
        );
    }
}
/*---底部板块结束---*/

class App extends Component {
  render() {
    return (
      <div className="App" >
          <Header/>
          <Nav/>
          <Menus/>
          <div id="context"></div>
          <Foot/>
      </div>
    );
  }
}

export default App;
