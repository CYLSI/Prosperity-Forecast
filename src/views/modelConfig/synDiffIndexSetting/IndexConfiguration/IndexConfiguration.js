import React, { Component } from 'react';
import {Layout, Select,Button} from 'element-react';

class IndexConfiguration extends  Component{

    getOptions(){
        this.$post('/user/listForm')
            .then(res=>{
                console.log(res)
                this.setState({
                    // Options: res,
                    // Options1: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    componentDidMount(){
        //this.getOptions()
    }

    handleOption(e,name){
        if(name === "Select1"){
            this.setState({
                theme: e,
            })
        }
        if(name === "Select2"){
            this.setState({
                configurer: e,
            })
        }
    }

    handleConfirm(){
        console.log(this.state.theme,this.state.configurer)
        /*this.$post('/group/del',{id:row.id})
           .then(res=>{
               if(res == 1){
                   this.getList()
               }
           }).catch(e=>{
           console.log(e)
       })*/
    }

    constructor(props) {
        super(props);

        this.state = {
            Options: [{
                value: '1',
                label: '1'
            }],
            Options1: [{
                value: 'manager',
                label: '管理员'
            }],
            theme:'',
            configurer:''
        }
    }

    render(){
        return(
            <div>
                <h3>合成指数/扩散指数配置指标配置</h3>
                <Layout.Col span={10}>
                   <span>请选择要配置的主题：</span>
                   <Select value={this.state.value} onChange={e => this.handleOption(e,"Select1")} clearable={true}>
                       {
                           this.state.Options.map(el => {
                               return <Select.Option key={el.value} label={el.label} value={el.value}/>
                           })
                       }
                   </Select>
                </Layout.Col>
                <Layout.Col span={5}>
                    <span>配置人：</span>
                    <Select value={this.state.value} onChange={e => this.handleOption(e,"Select2")} clearable={true}>
                        {
                            this.state.Options1.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value}/>
                            })
                        }
                    </Select>
                </Layout.Col>
                <div>
                    <Button type="primary" size="small" onClick={this.handleConfirm.bind(this)}>确定</Button>
                </div>
            </div>
        )
    }
}

export default IndexConfiguration
