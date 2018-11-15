import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Layout, Input, Button, Radio, Table,Checkbox,DatePicker,Dialog,Tree,Select,Collapse} from 'element-react';
import './PeakValleyGraphicAnalysis.less';
import moment from 'moment';
import PrimarySelectedQuota from '@components/PrimarySelectedQuota/PrimarySelectedQuota'

class PeakValleyGraphicAnalysis extends  Component{

    getTable(){
        return(
            <Table
                columns={this.state.columns}
                data={this.state.data}
                border={true}
            />
        )
    }

    onChange(key,value){
        this.state.settings[key] = value;
        this.forceUpdate();
    }

    onChangeRadio(value) {
        this.state.settings.frequency = value;
        this.forceUpdate();
    }

    onChangeCheckbox(e,name){
        this.state.settings.seasonalAdjust = e
    }

    handleClickForSearch(name){
        if(name === "altSearch"){
            this.state.alt.altSearch = true
        }else{
            this.state.alt.altSearch = false
        }
        this.setState({
            dialogVisible:true
        })
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

    handleClickForAnalysis(e){
        this.$post('/analysis/bb',this.state.settings)
            .then(res=>{
                this.setState({
                    finalBaseQuota:res.baseInflexion
                })
                let baseQuota = res.baseQuotaName
                let analysisQuota = res.anaQuotaNames
                if(baseQuota){
                    this.state.columns = [{
                        label: baseQuota,
                        prop: "baseQuota"
                    }]
                }
                if(analysisQuota){
                    for(let i = 0;i < analysisQuota.length;i++){
                        this.state.columns.push({
                            label: analysisQuota[i],
                            prop: String.fromCharCode(i+97),
                            render: (row,columns,index) => {
                                    return <div>
                                        <select name="date" onChange={e => this.handleOptions(e,row,columns,index)} value={this.state.value} className="table_select" id="table_select">
                                            {
                                                row[String.fromCharCode(i+97)].map(el => {
                                                    return <option value={el} key={el} className="options">{el}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                            }
                        })
                    }
                }
                let array = new Array()
                for(let i = 0;i < analysisQuota.length;i++){
                    array[i] = new Array()
                    for(let j = 0;j < res.baseInflexion.length;j++){
                        array[i][j] = "--"
                    }
                }
                this.setState({
                    finalAnaQuota:array
                })
                if(res.baseInflexion && res.anaInflexion){
                    for(let i in res.baseInflexion){
                        this.state.tableData.push({
                            baseQuota: res.baseInflexion[i]
                        })
                    }
                    let temp = res.anaInflexion
                    for(let i = 0;i < res.anaInflexion.length;i++){
                        for(let j = 0;j < res.baseInflexion.length;j++){
                            this.state.tableData[j][String.fromCharCode(i+97)] = res.anaInflexion[i]
                        }
                    }
                    this.setState({
                        data:this.state.tableData
                    })
                    this.setState({
                        tableData:[]
                    })
                    this.table.pop()
                    this.table.push(this.getTable())
                    this.forceUpdate()
                    document.getElementById('BBAnalysis').style.display = "block"
                }else{
                    alert("该指标无法进行计算！")
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    handleClickForGraphAnalysis(){
        const {settings,finalAnaQuota,finalBaseQuota} = this.state
        this.$post('/analysis/pv',{startTime:settings.startTime,endTime:settings.endTime,
            baseQuota:settings.baseQuota,analysisQuota:settings.analysisQuota,
            basePV:finalBaseQuota,anasPV:finalAnaQuota})
            .then(res=>{
                this.setState({
                    calcuResult:res
                })
            }).catch(e=>{
            console.log(e)
        })
        document.getElementById('calcuResult').style.display = "block"
    }

    handleOptions(e,row,columns,index){
        let r = columns.prop.charCodeAt()-97
        let c = index
        this.state.finalAnaQuota[r][c] = e.target.value
        this.forceUpdate()
    }

    handleConfirm(e){
        if(this.state.alt.altSearch === true){
            this.setState({
                dialogVisible:false,
                alt:e
            })
            this.state.settings.analysisQuota = this.state.alt.altQuota
            this.state.settings.altQuotaId = this.state.alt.altQuotaId
        }else{
            this.setState({
                dialogVisible:false,
                bas:e
            })
            this.state.settings.baseQuota = this.state.bas.basic
            this.state.settings.quotaId = this.state.bas.basicId
        }
    }

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this)
        this.handleClickForAnalysis = this.handleClickForAnalysis.bind(this)

        this.state = {
            settings: {
                frequency: 1,
                startTime: '2001-01',
                endTime: '2006-12',
                seasonalAdjust: true,
                springLength: '0',
                halfPeriod: 6,
                onePeriod: 15,
                baseQuota:1,
                quotaId:'',
                analysisQuota:[2,3],
                altQuotaId:[]
            },
            value1: new Date("2001-04"),
            value2: new Date('2004-06'),
            columns: [],
            data:[],
            tableData:[],
            alt:{
                altQuota:[],
                altQuotaId:[],
                altSearch:false
            },
            bas:{
                basic:'',
                basicId:''
            },
            dialogVisible:false,
            finalBaseQuota:[],
            finalAnaQuota:[],
            calcuResult:[]
        }
        this.table = [this.getTable()]
    }

    render(){
        const { settings,value1,value2,multiAxisDisplay,dialogBodyData } = this.state
        const activeName = "1";
        return(
            <Layout.Col span={18}>
                <div className="PVGAnalysis">
                    <div>
                        <h3>—BB算法及峰谷图形分析—</h3>
                        <span>基准指标：</span>
                        <Input className="inline-input" value={this.state.settings.baseQuota}/>
                        <Button type="primary" size="small" onClick={this.handleClickForSearch.bind(this)}>查询</Button>
                    </div>
                    <div>
                        <span>分析指标：</span>
                        <Input className="inline-input-textarea" value={this.state.settings.analysisQuota} type="textarea" autosize={{ minRows: 3, maxRows: 4}} />
                        <Button type="primary" size="small"  onClick={this.handleClickForSearch.bind(this,"altSearch") }>查询</Button>
                    </div>
                    <div>
                        <h4>相关设定：</h4>
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
                            <span>季节调整：</span>
                            <Checkbox className="PVGAnalysis_Checkbox" checked={settings.seasonalAdjust} onChange={e => this.onChangeCheckbox(e,"checkbox_1")}>需要进行季节调整</Checkbox>
                            <span>春节长度：</span>
                            <Input className="inline-input-smaller" placeholder={settings.springLength} onChange={this.onChange.bind(this,'seasonLength')}/>
                            <span>天(0-7天)</span>
                            <div id="PVG_dataCheck">
                                <Button type="success" size="small" onClick={this.handleClickForCheck.bind(this)}>数据检查</Button>
                            </div>
                        </div>
                        <div>
                            <span>峰谷距离：</span>
                            <Input className="inline-input-smaller" value={settings.halfPeriod} onChange={this.onChange.bind(this,'halfPeriod')}/>
                            <span>峰峰距离：</span>
                            <Input className="inline-input-smaller" value={settings.onePeriod} onChange={this.onChange.bind(this,'onePeriod')}/>
                            <span>季节长度：</span>
                            <Input className="inline-input-smaller" value={0}/>
                            <Button type="primary" size="small" onClick={e => this.handleClickForAnalysis(e)}>BB算法识别峰谷</Button>
                        </div>
                    </div>
                    <Layout.Col span={18}>
                        <div id="BBAnalysis">
                            <hr />
                            <div id="BB_Table">
                            {
                                this.table.map(el => el)
                            }
                            </div>
                            <Button type="primary" size="small" onClick={this.handleClickForGraphAnalysis.bind(this)} id="BB_Button">峰谷图形分析</Button>
                        </div>
                    </Layout.Col>
                    <Layout.Col span={18}>
                        <div id="calcuResult">
                            <Collapse value={activeName}>
                            {
                                this.state.calcuResult.map(el => {
                                    return <Collapse.Item title={el.name} name="1">
                                            <div>{el.result}</div>
                                          </Collapse.Item>
                                })
                            }
                            </Collapse>
                        </div>
                    </Layout.Col>
                </div>
                <div>
                    <PrimarySelectedQuota
                        dialogVisible={this.state.dialogVisible}
                        alt={this.state.alt}
                        handleConfirm={this.handleConfirm.bind(this)}
                        bas={this.state.bas}
                        handleCancel={this.state.dialogVisible = false}
                    >
                    </PrimarySelectedQuota>
                </div>
            </Layout.Col>
        )
    }
}

export default PeakValleyGraphicAnalysis
