import React, { Component } from 'react';
import {Layout, Button,Input,DatePicker,Checkbox} from 'element-react';
import moment from "moment/moment";
import './SyntheticalProsIndexCal.less';

class SyntheticalProsIndexCal extends  Component{

    onChangeCheckbox(e){
        this.state.settings.seasonalAdjust = e
    }

    onChange(key,value){
        this.state.settings[key] = value;
        this.forceUpdate();
    }

    handleClickForCheck(){
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
            settings: {
                date1: '2018-06',
                date2: '2018-07',
                seasonalAdjust: true,
                seasonLength: '0'
            }
        }
    }

    handleClickForCalculate(){
        console.log(this.state.settings)
        this.$post('/user/psw',)
            .then(res=>{
                if(res === 1){

                }
            }).catch(e=>{
            console.log(e)
        })
    }

    render(){
        const { value1,value2,settings } = this.state
        return(
            <div className="synProsIndexCal">
                <Layout.Col span={18}>
                    <h3>景气信号灯-综合景情指数计算</h3>
                    <div>
                        <p>请选择指标组合：</p>
                        <span>添加新的指标组合：</span>
                        <Input className="inline-input"/>
                        <Button type="primary" size="small">创建新的指标组合</Button>
                    </div>
                    <hr/>
                    <div>
                        <span>样本时间：从</span>
                        <DatePicker
                            value={value1}
                            placeholder="选择月"
                            onChange={date=>{
                                this.setState({value1: date})
                                settings.date1 = moment(date).format("YYYY-MM");
                                this.forceUpdate();
                            }}
                            selectionMode="month"
                        />
                        <span>到</span>
                        <DatePicker
                            value={value2}
                            placeholder="选择月"
                            onChange={date=>{
                                this.setState({value2: date})
                                settings.date2 = moment(date).format("YYYY-MM");
                                this.forceUpdate();
                            }}
                            selectionMode="month"
                        />
                        <span>(格式：2007-04)</span>
                    </div>
                    <div>
                        <span>季节调整：</span>
                        <Checkbox className="synProsIndexCal_checkbox" checked onChange={e => this.onChangeCheckbox(e,"checkbox_1")}>需要进行季节调整</Checkbox>
                        <span>季节长度：</span>
                        <Input className="inline-input-smaller" placeholder={settings.seasonLength} onChange={this.onChange.bind(this,'seasonLength')}/>
                        <span>天(0-7天)</span>
                    </div>
                    <div className="synProsIndexCal_button">
                        <Button type="primary" size="small" onClick={this.handleClickForCheck.bind(this)}>数据检查</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForCalculate.bind(this)}>综合景情指数计算</Button>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default SyntheticalProsIndexCal
