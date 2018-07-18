import React, { Component } from 'react';
import {Layout, Button,Select} from 'element-react';

class SignalIndexMonitor extends  Component{

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
                scene: e,
            })
        }
        if(name === "Select2"){
            this.setState({
                configurer: e,
            })
        }
    }

    handleConfirm(){
        console.log(this.state.scene,this.state.configurer)
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
            scene:'',
            configurer:''
        }
    }

    render(){
        return(
            <div>
                <h3>单指标监测</h3>
                <Layout.Col span={8}>
                    <span>请选场景：</span>
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

export default SignalIndexMonitor
