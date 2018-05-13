import React, { Component } from 'react';
import '../../App.css';
import './UserGroupManage.css';
import { Layout,Input,Button,Table,Form,Dialog } from 'element-react';

class UserGroupManage extends Component{

    /*componentDidMount(){
       getList()
    }*/

    onChange(key, value) {
        this.state.form[key] = value;
        this.setState({
            [key]: value
        });
        this.forceUpdate();
    }

    handleClick(e,row){
        this.setState({
            dialogVisible: true,
            dialogData: row,
            id: row.id
        })
    }

    handleClickForEdit(){
        this.setState({
            dialogVisible: false
        })
        /*let id = this.state.id;
        let form = this.state.form;
        this.$post('/usergroup/edit',{id,form})
            .then(res=>{
               if(res == 1){
                    getList()
               }
            }).catch(e=>{
            console.log(e)
        })*/
    }

    handleClickForDelete(e,row){
       /*this.$post('/usergroup/del',row.id)
           .then(res=>{
               if(res == 1){
                   getList()
               }
           }).catch(e=>{
           console.log(e)
       })*/
   }

    handleClickForAdd(){
        /*this.$post('/usergroup/add',this.state.addedUserGroup)
            .then(res=>{
                if(res == 1){
                    getList()
                }
            }).catch(e=>{
            console.log(e)
        })*/
    }

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClickForDelete = this.handleClickForDelete.bind(this);
        this.handleClickForEdit = this.handleClickForEdit.bind(this);
        this.handleClickForAdd = this.handleClickForAdd.bind(this);

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
                                    <Button type="text" size="small" onClick={e => this.handleClick(e,row)}>编辑</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
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
            dialogData:'',
            form: {
                id: '',
                userGroupName: ''
            },
            id: '',
            addedUserGroup: '请输入内容'
        }
    }

    render(){
        const { dialogVisible,dialogData,columns,data,addedUserGroup } = this.state
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
                        用户组名称：<Input placeholder={ addedUserGroup } onChange={this.onChange.bind(this, 'addedUserGroup')} className="inline-input"/>（十个汉字以内）
                    </div>
                    <div className="UserGroupManage-button">
                        <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this) }>添加用户组</Button>
                    </div>
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
                                    <Input placeholder={dialogData.id} onChange={this.onChange.bind(this, 'id')} className="inline-input"></Input>
                                </Form.Item>
                                <Form.Item label="用户组名称" labelWidth="80">
                                    <Input placeholder={dialogData.userGroupName} onChange={this.onChange.bind(this, 'userGroupName')} className="inline-input"></Input>
                                </Form.Item>
                            </Form>
                        </Dialog.Body>
                        <Dialog.Footer className="dialog-footer">
                            <Button type="primary" onClick={this.handleClickForEdit.bind(this) }>确 定</Button>
                        </Dialog.Footer>
                    </Dialog>
                </div>
            </div>
        );
    }
}

function  getList(){
    this.$post('/usergroup/list')
        .then(res=>{
            this.setState({
                data: res.data
            })
        }).catch(e=>{
        console.log(e)
    })
}

export default UserGroupManage;