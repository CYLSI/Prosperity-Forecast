import React, { Component } from 'react';
import {Layout, Select,Button} from 'element-react';

class IndexPortfolioManage extends  Component{

    getOptions(){
        this.$post('/user/listForm')
            .then(res=>{
                console.log(res)
                this.setState({
                    // Options: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    componentDidMount(){
        this.getOptions()
    }

    handleOption(e){
        this.setState({
            analysisTheme: e,
        })
    }

    handleConfirm(){
        console.log(this.state.analysisTheme)
        this.$post('/group/del',{analysisTheme:this.state.analysisTheme})
           .then(res=>{
               if(res == 1){
                   this.getOptions()
               }
           }).catch(e=>{
           console.log(e)
       })
    }

    constructor(props) {
        super(props);

        this.state = {
            Options: [{
                value: '1',
                label: '1'
            }],
            analysisTheme:''
        }
    }

    render(){
        return(
            <div>
                <h3>景气信号灯指标组合管理</h3>
                <Layout.Col span={9}>
                    <span>请选择要配置的分析主题：</span>
                    <Select value={this.state.value} onChange={e => this.handleOption(e)} clearable={true}>
                        {
                            this.state.Options.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                            })
                        }
                    </Select>
                </Layout.Col>
                <Layout.Col span={2}>
                    <Button type="primary" size="small" onClick={this.handleConfirm.bind(this)}>确定</Button>
                </Layout.Col>
            </div>
        )
    }
}

export default IndexPortfolioManage
