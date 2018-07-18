import React, { Component } from 'react';
import {Layout, Table,Checkbox,Input,Button} from 'element-react';
import './SignalIndexMonitor.less';

class SignalIndexMonitor extends  Component{

    onChangeCheckbox(e){
        this.state.settings.seasonalAdjust = e
    }

    onChange(key,value){
        this.state.settings[key] = value;
        this.forceUpdate();
    }

    handleConfirm(){
        console.log(this.state.settings)
        this.$post('/user/psw',)
            .then(res=>{
                if(res === 1){

                }
            }).catch(e=>{
            console.log(e)
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    label: "监测指标",
                    prop: "monitorIndex",
                    align: 'center'
                }],
            data: [{
                monitorIndex: '居民消费价格指数',
            }],
            settings: {
                seasonalAdjust: true,
                seasonLength: '0'
            }
        }
    }

    render(){
        const { columns,data,settings } = this.state
        return(
            <div>
                <Layout.Col span={18}>
                   <h3>单指标监测</h3>
                    <div>
                        <Checkbox className="sigIndexMon_checkbox" checked onChange={e => this.onChangeCheckbox(e,"checkbox_1")}>需要进行季节调整</Checkbox>
                        <span>季节长度：</span>
                        <Input className="inline-input-smaller" placeholder={settings.seasonLength} onChange={this.onChange.bind(this,'seasonLength')}/>
                        <span className="sigIndexMon_span">天(0-7天)</span>
                        <Button type="primary" size="small" onClick={this.handleConfirm.bind(this)}>确定</Button>
                    </div>
                    <div className="sigIndexMon_Table">
                        <Table
                            columns={columns}
                            data={data}
                            border={true}
                        />
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default SignalIndexMonitor
