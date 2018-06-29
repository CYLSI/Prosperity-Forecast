import React, { Component } from 'react';
import {Layout, Input, Button, Radio, Select, Checkbox, DatePicker,Table, Form} from 'element-react';
import './relationAnalyse.less';
import moment from 'moment';
class relationAnalyse extends  Component{
    constructor(props) {
        super(props);

        this.state = {
            options1: [{
                value: '1天',
                label: '1'
            }, {
                value: '2天',
                label: '2'
            }, {
                value: '3天',
                label: '3'
            }, {
                value: '4天',
                label: '4'
            }, {
                value: '5天',
                label: '5'
            },{
                value: '6天',
                label: '6'
            }, {
                value: '7天',
                label: '7'
            }],
            options2:[{

            }],
            value: 1,
            Object:{
                text1:"指标1",
                text2:"指标2",
                box1:"年度",
                box2:false,
                select1:0,
                date1:"2018-05",
                date2:"2018-05",
                box3:["时差相关分析"]
            }
        }
    }

    onChangeText1(value) {
        this.state.Object.text1 = value;
        this.forceUpdate();
    }

    onChangeText2(value) {
        this.state.Object.text2 = value;
        this.forceUpdate();
    }

    onChangeBox1(value) {
      this.setState({value});
      if(value == 1)this.state.Object.box1 = "月度";
      else if(value == 2) this.state.Object.box1 = "季度";
      else this.state.Object.box1 = "年度";
      this.forceUpdate();
       //console.log(value);
    }

    onChangeBox2(value) {
        this.state.Object.box2 = value;
        this.forceUpdate();
    }

    onChangeSelect(value){
        this.state.Object.select1 = value;
        this.forceUpdate();
    }

    onChangeBox3(value) {
      this.setState({value});
      this.state.Object.box3 = value;
      this.forceUpdate();
    }

    handleConfirm(){
      var e=this.state.Object;
      console.log(e);
    }

  render(){
      const {value1,value2} = this.state
    return (
        <div id='aelation-analyse'>
            <br/>
            <span>
              基准指标：  <Input  className="inline-input"  placeholder={this.state.Object.text1} onChange={this.onChangeText1.bind(this)}/>
                <Button type="primary" size="large" >确定</Button>
            </span><br/><br/>
            <span>
              分析指标：  <Input className="inline-input"  type="textarea" autosize={{ minRows: 2, maxRows: 4}}
                            placeholder={this.state.Object.text2} onChange={this.onChangeText2.bind(this)}/>
              <Button type="primary" size="large" >确定</Button>
            </span><br/><br/>
            <span>
              相关设定：
            </span><br/><br/>
            <span>
               数据频度： <Radio.Group value={this.state.value} onChange={this.onChangeBox1.bind(this)}>
                <Radio value= "1">月度</Radio>
               <Radio value= "2">季度</Radio>
               <Radio value= "3">年度</Radio>
            </Radio.Group>
            </span><br/><br/>
            <span>
              季节调整：  <Checkbox checked={this.state.Object.box2}onChange={this.onChangeBox2.bind(this)}>
                需要进行季节调整，春节长度： </Checkbox>
               <Select  size="small"  disabled={!this.state.Object.box2}
                        value={this.state.Object.select1} onChange={this.onChangeSelect.bind(this)}>
              {
                this.state.options1.map(el => {
                   return <Select.Option key={el.value} label={el.label} value={el.value} />
                  })
              }
              </Select>天（0—7天）

            </span><br/><br/>
            <span>
               样本时间： 从  <DatePicker
                value={value1}
                placeholder="选择月"
                onChange={date=>{
                    console.debug('month DatePicker changed: ', date)
                    this.setState({value1: date})
                    this.state.Object.date1=moment(date).format("YYYY-MM");
                    this.forceUpdate();
                }}
                selectionMode="month"
            />到  <DatePicker
                value={value2}
                placeholder="选择月"
                onChange={date=>{
                    console.debug('month DatePicker changed: ', date)
                    this.setState({value2: date})
                    this.state.Object.date2=moment(date).format("YYYY-MM");
                    this.forceUpdate();
                }}
                selectionMode="month"
            />
            </span><br/><br/>
            <span>
               计算模型：<Checkbox.Group value={this.state.Object.box3} onChange={this.onChangeBox3.bind(this)}>
                <Checkbox label="时差相关分析"></Checkbox>
                <Checkbox label="KL信息量"></Checkbox>
            </Checkbox.Group>
            </span><br/>
            <Button type="success" size="large"onClick={() =>this.handleConfirm()}>数据检查</Button>
        </div>
    )
  }
}
export default relationAnalyse