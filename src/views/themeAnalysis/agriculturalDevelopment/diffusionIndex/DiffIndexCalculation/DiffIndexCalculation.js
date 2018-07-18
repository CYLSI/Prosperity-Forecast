import React, { Component } from 'react';
import {Layout, Button,Checkbox,DatePicker,Input} from 'element-react';
import moment from "moment/moment";
import './DiffIndexCalculation.less';

class DiffIndexCalculation extends  Component{

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

    render(){
        const { value1,value2,settings } = this.state
        return(
            <div className="diffIndexCal">
                <Layout.Col span={18}>
                    <h3>扩散指数计算</h3>
                    <div>
                        <span>从</span>
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
                        <Checkbox className="diffIndexCal_checkbox" checked onChange={e => this.onChangeCheckbox(e)}>需要进行季节调整</Checkbox>
                        <span>季节长度：</span>
                        <Input className="inline-input-smaller" placeholder={settings.seasonLength} onChange={this.onChange.bind(this,'seasonLength')}/>
                        <span>天(0-7天)</span>
                    </div>
                    <div className="diffIndexCal_button">
                        <Button type="primary" size="small" onClick={this.handleClickForCheck.bind(this)}>数据检查</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForCalculate.bind(this)}>计算新的扩散指数</Button>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default DiffIndexCalculation
