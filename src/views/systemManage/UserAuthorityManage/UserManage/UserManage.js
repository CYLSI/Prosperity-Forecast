import React, { Component } from 'react';
import '../../../../App.css';
import './UserManage.css';
import DialogForm from '@components/Dialog/Dialog'
import { Layout,Input,Button,Select,Table} from 'element-react';

class UserManage extends Component{

    getList(){
        this.$post('/user/listForm')
            .then(res=>{
                this.setState({
                    data:res.userList,
                    deptOption:res.deptOption,
                    roleOption:res.roleOption
                },()=>{
                    this.handleOption()
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    componentDidMount(){
        this.getList()
    }

    handleOption(){
        const {deptOption,roleOption} = this.state
            this.state.dialogForm1[3].options = deptOption;
            this.state.dialogForm1[4].options = roleOption;
            this.forceUpdate()
    }

    handleIniOption(e,name){
        if(name === "Select1"){
            this.setState({
                keyword: e
            })
        }else if(name === "Select2"){
            this.setState({
                groupName: e
            })
        }else{
            this.setState({
                userName: e
            })
        }
    }

    modifyPassword(e,row){
        this.setState({
            dialogData2: this.$clone(row),
            dialogVisible2: true,
            id: row.id
        })
    }

    handleClickForCheck(){
        console.log(this.state.keyword,this.state.groupName,this.state.userName,this.state.search)
        /*this.$post('/user/del',{id:row.id})
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })*/
    }

    handleClickForEdit(e,row){
        this.setState({
            dialogVisible1: true,
            dialogData1: this.$clone(row),
            id: row.id,
            dept: row.dept,
            role: row.role
        })
    }

    handleClickForDelete(e,row){
        this.$post('/user/del',{id:row.id})
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    onChange(key, value) {
        this.setState({
            [key]: value
        });
        this.forceUpdate();
    }

    handleComfirm1(){
        this.setState({
            dialogVisible1: false
        })
        this.$post('/user/upd',this.state.dialogData1)
            .then(res=>{
                if(res == 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleComfirm2(){
        this.setState({
            dialogVisible2: false
        })
        this.$post('/user/psw',{id:this.state.id,oldPsw:this.state.dialogData2.oldPassword,newPsw:this.state.dialogData2.newPassword})
           .then(res=>{
               if(res == 1){
                   this.getList()
               }
           }).catch(e=>{
           console.log(e)
       })
    }

    constructor(props) {
        super(props);

        this.handleClickForDelete = this.handleClickForDelete.bind(this);
        this.handleClickForEdit = this.handleClickForEdit.bind(this);
        this.handleComfirm1 = this.handleComfirm1.bind(this);
        this.handleComfirm2 = this.handleComfirm2.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.handleIniOption = this.handleIniOption.bind(this);
        this.handleClickForCheck = this.handleClickForCheck.bind(this);

        this.state = {
            columns: [
                {
                    label: "登录名",
                    prop: "userName",
                    width: '80%'
                },
                {
                    label: "用户名",
                    prop: "name",
                    width: '80%'
                },
                {
                    label: "用户职务",
                    prop: "post",
                },
                {
                    label: "部门",
                    prop: "dept",
                    width: '70%'
                },
                {
                    label: "角色",
                    prop: "role",
                    width: '140%'
                },
                {
                    label: "电子邮件",
                    prop: "email",
                    width: '170%'
                },
                {
                    label: "联系电话",
                    prop: "phone",
                    width: '130%'
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '170%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForEdit(e,row)}>编辑</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
                                    <Button type="text" size="small" onClick={e => this.modifyPassword(e,row)}>修改密码</Button>
                                </span>
                    }
                }
            ],
            data: [{
                userName: 'Admin',
                name: '管理员',
                post: '--',
                dept: '华农',
                role: '普通用户',
                email: '000000',
                phone: '13300000000'
            }],
            dialogVisible1: false,
            dialogVisible2: false,
            dialogData1:'',
            dialogData2:'',
            dialogForm1: [
                {
                    label:'登录名',
                    param:'userName'
                },
                {
                    label:'用户名',
                    param:'name'
                },
                {
                    label:'用户职务',
                    param:'post'
                },
                {
                    label:'部门',
                    param:'dept',
                    type:'Select',
                    options:[{
                        value:"华农",
                        label:"华农"
                    }]
                },{
                    label:'角色',
                    param:'role',
                    type:'Select',
                    options:[{
                        value:"普通用户",
                        label:"普通用户"
                    }]
                },
                {
                    label:'电子邮件',
                    param:'email'
                },{
                    label:'联系电话',
                    param:'phone'
                }],
            dialogForm2:[
                {
                    label:'旧密码',
                    param:'oldPassword'
                },
                {
                    label:'新密码',
                    param:'newPassword'
                }],
            id:'',
            dept:'',
            role:'',
            keywordOptions: [{
                value: '华农',
                label: '华农'
            }],
            keywordOptions1: [{
                value: '普通用户',
                label: '普通用户'
            }],
            keywordOptions2: [{
                value: 'admin',
                label: 'admin'
            }],
            keyword:'',
            groupName:'',
            userName:'',
            search:'请输入内容'
        }
    }

    render(){
        const { dialogForm1,dialogData1,dialogVisible1,dialogVisible2,dialogData2,dialogForm2,columns,data } = this.state
        return(
            <Layout.Col span={18}>
                <div>
                    <h3>系统用户管理</h3>
                    <div className="UserManage">
                        <span>关键字查询：按部门名称</span>
                        <Select value={this.state.value} className="UserManage_Select"  onChange={e => this.handleIniOption(e,"Select1")} clearable={true}>
                            {
                                this.state.keywordOptions.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                        <span>按用户组名</span>
                        <Select value={this.state.value} className="UserManage_Select"  onChange={e => this.handleIniOption(e,"Select2")} clearable={true}>
                            {
                                this.state.keywordOptions1.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                        <span>按用户名称</span>
                        <Select value={this.state.value} className="UserManage_Select"  onChange={e => this.handleIniOption(e,"Select3")} clearable={true}>
                            {
                                this.state.keywordOptions2.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                        <Input placeholder={this.state.search} className="inline-input" onChange={this.onChange.bind(this, 'search')}/>
                        <Button type="primary" size="small" onClick={e => this.handleClickForCheck(e)}>查询</Button>
                    </div>
                </div>
                <div className="UserManage-Table">
                    <Table
                        columns={columns}
                        data={data}
                        border={true}
                    />
                    <DialogForm
                        dialogData={dialogData1}
                        dialogVislble={dialogVisible1}
                        form={dialogForm1}
                        handleComfirm={this.handleComfirm1.bind(this)}
                    >
                    </DialogForm>
                    <DialogForm
                        dialogData={dialogData2}
                        dialogVislble={dialogVisible2}
                        form={dialogForm2}
                        handleComfirm={this.handleComfirm2.bind(this)}
                    >
                    </DialogForm>
                </div>
            </Layout.Col>
        );
    }
}


export default UserManage;