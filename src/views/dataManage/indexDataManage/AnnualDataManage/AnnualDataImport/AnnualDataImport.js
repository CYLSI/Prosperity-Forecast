import React, { Component } from 'react';
import { Input,Button,Select,Layout } from 'element-react';

class AnnualDataImport extends  Component {

    handleOption(e,name){
        if(name === "Select1"){
            this.setState({
                year: e
            })
        }else{
            this.setState({
                month: e
            })
        }
    }


    constructor(props){
        super(props);

        this.handleOption = this.handleOption.bind(this);

        this.state = {
            options: [{
                value: '1997',
                label: '1997'
            }, {
                value: '1998',
                label: '1998'
            }],
            options1: [{
                value: '一月',
                label: '一月'
            }, {
                value: '二月',
                label: '二月'
            }],
            value: '',
            month: '',
            year: ''
        }
    }

    render() {
        return (
            <Layout.Col span={18}>
                <div className="AnnDataImport_1">
                    <h3>年度数据导入</h3>
                    <div>
                        <a href="#">年度面板模板</a>
                        <a href="#">年度时序模板</a>
                    </div>
                </div>
                <div className="AnnDataImport_2">
                    <div>
                        <h2>年度面板数据导入</h2>
                        <span>时间设定：年度</span>
                        <Select value={this.state.value} onChange={e => this.handleOption(e,"Select1")} className="QuaDataManage_Select" placeholder="--" clearable={true}>
                            {
                                this.state.options.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                        <span>月份</span>
                        <Select value={this.state.value} onChange={e => this.handleOption(e,"Select2")} className="MonDataManage_Select" placeholder="--" clearable={true}>
                            {
                                this.state.options1.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                    </div>
                    <div>
                        <span>选择截面数据文件</span>
                        <input type="file" className="inline-input"/>
                        <Button type="primary" size="small">生成表格</Button>
                    </div>
                </div>
                <div className="AnnDataImport_3">
                    <h2>年度时序数据导入</h2>
                    <span>选择时序数据文件</span>
                    <input type="file" className="inline-input"/>
                    <Button type="primary" size="small">生成表格</Button>
                </div>
            </Layout.Col>
        )
    }
}
export default AnnualDataImport