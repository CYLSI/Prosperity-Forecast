import React, { Component } from 'react';
import {Layout, Input, Button, Select,Table,Dialog,Radio,Checkbox,Tree,DatePicker } from 'element-react';
import './BasicStatistics.less';
import moment from "moment/moment";
import PrimarySelectedQuota from '@components/PrimarySelectedQuota/PrimarySelectedQuota'

class BasicStatistics extends Component{

    handleClickForSearch(name){
        this.setState({
            dialogVisible:true
        })
        this.state.alt.altSearch = true
    }

    onChangeRadio(value) {
        this.state.settings.frequency = value;
        this.forceUpdate();
    }

    handleClickForCheck(){
        this.$post('/analysis/check',this.state.settings)
            .then(res=>{
                if(res === 1){
                    alert("数据完整！")
                }else{
                    alert("数据不完整！")
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForCal(){
        this.$post('/analysis/statistics',this.state.settings)
            .then(res=>{
               this.setState({
                   data:res
               })
            }).catch(e=>{
            console.log(e)
        })
    }

    //PrimaryDialogMethod

    handleConfirm(e){
        this.setState({
            dialogVisible:false,
            alt:e
        })
        this.state.settings.analysisQuota = e.altQuotaId
        this.forceUpdate()
    }

    //PrimaryDialogMethod

    constructor(props) {
        super(props);

        this.state = {
            //dialogData
            alt:{
                altQuota:[],
                altQuotaId:[],
                altSearch:false
            },
            dialogVisible:false,
            //dialogData
            settings:{
                analysisQuota:[1,2],
                analysisQuotaId:[],
                frequency:1,
                startTime: '2001-04',
                endTime: '2004-06',
            },
            columns: [
                {
                    label: "最大值",
                    prop: "max",
                    align: 'center'
                },
                {
                    label: "最小值",
                    prop: "min",
                    align: 'center'
                },
                {
                    label: "平均值",
                    prop: "avg",
                    align: 'center'
                },
                {
                    label: "标准差",
                    prop: "stdev",
                    align: 'center'
                },
                {
                    label: "中位数",
                    prop: "mid",
                    align: 'center'
                },
                {
                    label: "峰度",
                    prop: "kurtosis",
                    align: 'center'
                },
                {
                    label: "偏度",
                    prop: "skewness",
                    align: 'center'
                }
            ],
            data: [{
                max: '--',
                min:'--',
                avg: '--',
                stdev:'--',
                mid:'—',
                kurtosis:'--',
                skewness:'--'
            }],
            value1: new Date("2001-04"),
            value2: new Date('2004-06')
        }
    }

    render(){
        const { dialogBodyData,settings,value1,value2 } = this.state
        return(
            <div className="BasicStatistics">
                <Layout.Col span={18}>
                    <h3>基本统计量</h3>
                    <div>
                        <span>选择备选指标：</span>
                        <Input className="inline-input-textarea" value={settings.analysisQuota} type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this) }>查询</Button>
                    </div>
                    <div>
                        <span>数据频度：</span>
                        <Radio value="1" checked={settings.frequency === 1} onChange={this.onChangeRadio.bind(this)}>月度</Radio>
                        <Radio value="2" checked={settings.frequency === 2} onChange={this.onChangeRadio.bind(this)}>季度</Radio>
                        <Radio value="3" checked={settings.frequency === 3} onChange={this.onChangeRadio.bind(this)}>年度</Radio>
                    </div>
                    <div>
                        <span>样本时间：从</span>
                        <DatePicker
                            value={value1}
                            placeholder="选择月"
                            onChange={date=>{
                                console.log(value1)
                                this.setState({value1: date})
                                settings.startTime = moment(date).format("YYYY-MM");
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
                                settings.endTime = moment(date).format("YYYY-MM");
                                this.forceUpdate();
                            }}
                            selectionMode="month"
                        />
                        <span>(格式：2007-04)</span>
                    </div>
                    <div>
                        <Button type="primary" size="small" onClick={this.handleClickForCheck.bind(this,"altSearch") }>数据检查</Button>
                        <Button type="primary" size="small" onClick={this.handleClickForCal.bind(this,"altSearch") }>计算统计量</Button>
                    </div>
                    <div>
                        <Table
                            columns={this.state.columns}
                            data={this.state.data}
                            border={true}
                        />
                    </div>
                    <div>
                        <PrimarySelectedQuota
                            dialogVisible={this.state.dialogVisible}
                            alt={this.state.alt}
                            handleConfirm={this.handleConfirm.bind(this)}
                            handleCancel={this.state.dialogVisible = false}
                        >
                        </PrimarySelectedQuota>
                </div>
                </Layout.Col>
            </div>
        )
    }
}

export default BasicStatistics