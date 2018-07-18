import React, { Component } from 'react';
import {Layout, Button,Select,Input,Table} from 'element-react';
import './NewSynProsForeModel.less'

class NewSynProsForeModel extends  Component{

    getList(){
        this.$post('/group/list')
            .then(res=>{
                this.setState({
                    data: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    handleOption(e){
        this.setState({
            index: e
        });
        this.forceUpdate();
    }

    handleClickForShow(){
        console.log(this.state.index)
    }

    handleClickForModeling(){

    }

    constructor(props) {
        super(props);

        this.state = {
            Options: [{
                value: '1',
                label: '1'
            }],
            index:'',
            columns: [
                {
                    label: "序号",
                    prop: "id",
                    width: '100%',
                    align: 'center'
                },
                {
                    label: "指标组合名称",
                    prop: "name",
                    align: 'center'
                },
                {
                    label: "创建人",
                    prop: "founder",
                    width: '200%',
                    align: 'center'
                },
                {
                    label: "最后修改时间",
                    prop: "time",
                    width: '200%',
                    align: 'center'
                },
                {
                    label: "操作",
                    prop: "zip",
                    width: '100%',
                    align: 'center',
                    render: (row) => {
                        return <span>
                                    <Button type="text" size="small" onClick={e => this.handleClickForModeling(e,row)}>建模</Button>
                                </span>
                    }
                }],
            data: [{
                id: '1',
                name:'农业发展指标组合',
                founder: '管理员',
                time:'—'
            }],
        }
    }

    render(){
        const { columns,data } = this.state
        return(
            <div className="NewSynProsForeModel">
                <Layout.Col span={18}>
                    <h3>综合景情预测</h3>
                    <Select value={this.state.value} onChange={e => this.handleOption(e)} clearable={true}>
                        {
                            this.state.Options.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                            })
                        }
                    </Select>
                    <Button type="primary" size="small" onClick={this.handleClickForShow.bind(this)}>显示所有指标组合</Button>
                    <Table
                        columns={columns}
                        data={data}
                        border={true}
                    />
                </Layout.Col>
            </div>
        )
    }
}

export default NewSynProsForeModel
