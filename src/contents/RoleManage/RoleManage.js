import React, { Component } from 'react';
import '../../App.css';
import './RoleManage.css';
import { Layout,Input,Button,Table,Form,Dialog } from 'element-react';

class RoleManage extends Component{

    /*componentDidMount(){
        getList()
    }*/

    handleClick(e,row){
        this.setState({
            dialogVisible: true,
            dialogData: row,
            roleName: row.roleName
        })
    }

    onChange(key, value) {
        this.setState({
            [key]: value,
            form:{
                [key]: value
            }
        });
        this.forceUpdate();
    }

    handleClickForEdit(){
        this.setState({
            dialogVisible: false
        });
        /*let roleName = this.state.roleName;
       let form = this.state.form;
       this.$post('/role/edit',{roleName,form})
           .then(res=>{
              if(res == 1){
                   getList()
              }
           }).catch(e=>{
           console.log(e)
       })*/
    }

    handleClickForDelete(e,row){
       /*this.$post('/role/del',row.roleName)
           .then(res=>{
               if(res == 1){
                   getList()
               }
           }).catch(e=>{
           console.log(e)
       })*/
   }

    handleClickForAdd(){
        /*this.$post('/role/add',this.state.addedRoleName)
            .then(res=>{
                if(res == 1){
                    getList()
                }
            }).catch(e=>{
            console.log(e)
        })*/
    }

    handleClickForSearch(){
        /*this.$post('/role/search',this.state.addedRoleName)
            .then(res=>{
                if(res == 1){
                   alert("此角色可添加")
                }else{
                alert("此角色已存在")}
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
        this.handleClickForSearch = this.handleClickForSearch.bind(this);

        this.state = {
            columns: [
                {
                    label: "角色名称",
                    prop: "roleName",
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '140%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClick(e,row)}>编辑</Button>
                                    <Button type="text" size="small" onClick={e => this.handleClickForDelete(e,row)}>删除</Button>
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
            dialogData:'',
            form: {
                roleName: ''
            },
            roleName: '',
            addedRoleName: '请输入内容'
        }
    }

    render(){
        const { dialogVisible,dialogData,columns,data,addedRoleName } = this.state
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
                    <div>角色名称：<Input placeholder={addedRoleName} onChange={this.onChange.bind(this, 'addedRoleName')} className="inline-input"/>（十个汉字以内）</div>
                    <div className="RoleManage-button">
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this) }>检查重复</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this) }>添加角色</Button>
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
                                <Form.Item label="角色名称" labelWidth="80">
                                    <Input placeholder={dialogData.roleName} onChange={this.onChange.bind(this, 'roleName')} className="inline-input"></Input>
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
    this.$post('/role/list')
        .then(res=>{
            this.setState({
                data: res.data
            })
        }).catch(e=>{
        console.log(e)
    })
}

export default RoleManage;