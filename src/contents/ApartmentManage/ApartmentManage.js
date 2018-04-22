import React, { Component } from 'react';
import '../../App.css';
import './ApartmentManage.css';
import $ from "jquery";
import { Layout,Tree,Input,Button } from 'element-react';

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

    handleClick(e){
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:414/dept/add",
            success:function(data){
                //TODO
            }
        })
    }

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
                        <form>
                            <span>在部门“华农”下添加新的部门：</span>
                            <Input placeholder="请输入内容" className="inline-input"/>
                            <Button type="primary" size="small" onClick={e => {this.handleClick(e)}}>增加部门</Button>
                            <span>（十个汉字以内）</span>
                        </form>
                    </div>
                </Layout.Col>
            </div>
        );
    }
}

export default ApartmentManage;