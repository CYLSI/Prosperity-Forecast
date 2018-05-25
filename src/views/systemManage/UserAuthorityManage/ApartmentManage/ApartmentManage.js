import React, { Component } from 'react';
import '../../../../App.css';
import './ApartmentManage.css';
import { Layout,Tree,Input,Button } from 'element-react';
import {PubSub} from "pubsub-js";

class ApartmentManage extends Component{

    getList(){
        this.$post('/dept/list')
            .then(res=>{
                this.setState({
                    data: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    componentDidMount(){
       this.getList()
        PubSub.publish('route',this.props.location.pathname);
    }

    onChange1(key, value) {
        this.setState({
            newApartmentName: value
        });
        this.forceUpdate();
    }

    onChange2(key, value) {
        this.setState({
            addedApartmentName: value
        });
        this.forceUpdate();
    }

    handleClick(data){
        this.setState({
            placeholder: data.label,
            id: data.id
        })
    }

    handleClickForEdit(e){
        let name = this.state.newApartmentName;
        let id = this.state.id;
            this.$post('/dept/upd',{id,name})
            .then(res=>{
                if(res === 1){
                   this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForDelete(e){
      let id = this.state.id
            this.$post('/dept/del',{id})
            .then(res=>{
               if(res === 1){
                  this.getList()
               }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForAdd(e){
        let name = this.state.addedApartmentName;
        let parent = this.state.id;
            this.$post('/dept/add',{parent,name})
            .then(res=>{
                if(res === 1){
                   this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.onChange1 = this.onChange1.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.handleClickForDelete = this.handleClickForDelete.bind(this);
        this.handleClickForEdit = this.handleClickForEdit.bind(this);
        this.handleClickForAdd = this.handleClickForAdd.bind(this);

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
            },
            placeholder : '请输入内容',
            id: 0,
            newApartmentName: '请输入内容',
            addedApartmentName: '请输入内容'
        };
    }

    render(){
        const { data,options,placeholder,newApartmentName,addedApartmentName } = this.state;
        return(
            <div>
                <h3>用户部门管理</h3>
                <Layout.Col span={4}>
                    <span>当前部门结构：</span>
                    <div className="ApartmentManage-tree">
                        <Tree
                            data={data}
                            options={options}
                            nodeKey="id"
                            defaultExpandedKeys={[1,2,3]}
                            onNodeClicked={this.handleClick.bind(data)}
                        />
                    </div>
                </Layout.Col>
                <Layout.Col span={13}>
                    <div className="ApartmentManage-context-1">
                        <span>您选择的部门是：</span>
                        <Input placeholder={ placeholder } className="inline-input"/>
                        <Button type="primary" size="small" onClick={this.handleClickForDelete.bind(this)}>删除部门</Button>
                    </div>
                    <div className="ApartmentManage-context-2">
                        <span>您选择的部门是：</span>
                        <Input placeholder={ placeholder } className="inline-input"/>
                        <span>修改部门：</span>
                        <Input placeholder={ newApartmentName } onChange={this.onChange1.bind(this, 'placeholder')} className="inline-input"/>
                        <Button type="primary" size="small" onClick={this.handleClickForEdit.bind(this)}>修改</Button>
                    </div>
                    <div className="ApartmentManage-context-2">
                        <div>在部门<Input placeholder={ placeholder } className="inline-input"/>下</div>
                        <div>
                            添加新的部门：<Input placeholder={ addedApartmentName } onChange={this.onChange2.bind(this, 'placeholder')}  className="inline-input"/>
                            <span>（十个汉字以内）</span>
                        </div>
                        <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>增加部门</Button>
                    </div>
                </Layout.Col>
            </div>
        );
    }
}



export default ApartmentManage;