import React, { Component } from 'react';
import {PubSub} from "pubsub-js";
import '../../../../App.css';
import './MonthlyDataManage.css'
import { Input,Button,Dropdown,Table,Layout } from 'element-react';

class MonthlyDataManage extends  Component {

    componentDidMount(){
        PubSub.publish('route',this.props.location.pathname);
    }

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    label: "时间",
                    prop: "time",
                    width: '120%'
                },{
                    label: "指标名称",
                    prop: "indexName",
                    width: '100%'
                },{
                    label: "数据项名称",
                    prop: "dataItemName",
                    width: '130%'
                },{
                    label: "数据值",
                    prop: "data"
                },{
                    label: "单位",
                    prop: "unit",
                    width: '80%'
                },{
                    label: "操作",
                    prop: "zip",
                    width: '130%',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small">编辑</Button>
                                    <Button type="text" size="small">删除</Button>
                                </span>
                    }
                }],
            data: [{
                time: '1998-1',
                indexName: '--',
                dataItemName: '--',
                data: '--',
                unit: '--'
            }]
        }
    }

    render() {
        const {columns,data} = this.state
        return (
            <Layout.Col span={18}>
                <div>
                    <h3>月度数据管理</h3>
                    <div>
                        <span>关键字查询</span>
                        <Dropdown trigger="click" menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item>优</Dropdown.Item>
                            </Dropdown.Menu>
                        )}
                        >
                            <Button type="primary" size="small" className="MonDataManage_button">
                                农业状况<i className="el-icon-caret-bottom el-icon--right"></i>
                            </Button>
                        </Dropdown>
                        <Input placeholder="请输入内容" className="inline-input"/>
                        <Button type="primary" size="small">查看数据信息汇总</Button>
                        <span>年度</span>
                        <Dropdown trigger="click" menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item>1980</Dropdown.Item>
                            </Dropdown.Menu>
                        )}
                        >
                            <Button type="primary" size="small" className="MonDataManage_button">
                                ——<i className="el-icon-caret-bottom el-icon--right"></i>
                            </Button>
                        </Dropdown>
                        <span>月份</span>
                        <Dropdown trigger="click" menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item>一月</Dropdown.Item>
                            </Dropdown.Menu>
                        )}
                        >
                            <Button type="primary" size="small" className="MonDataManage_button">
                                ——<i className="el-icon-caret-bottom el-icon--right"></i>
                            </Button>
                        </Dropdown>
                        <span>数据项</span>
                        <Dropdown trigger="click" menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item>datas</Dropdown.Item>
                            </Dropdown.Menu>
                        )}
                        >
                            <Button type="primary" size="small" className="MonDataManage_button">
                                当期数据<i className="el-icon-caret-bottom el-icon--right"></i>
                            </Button>
                        </Dropdown>
                        <Button type="primary" size="small">显示数据</Button>
                        <Button type="primary" size="small">增加</Button>
                        <div className="MonDataManage_table">
                            <Table
                                columns={columns}
                                data={data}
                                border={true}
                            />
                        </div>
                    </div>
                </div>
            </Layout.Col>
        )

    }
}
export default MonthlyDataManage