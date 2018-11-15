import React, {Component} from 'react'
import {Layout, Input, Button, Select, Checkbox, Table} from 'element-react';
import DialogForm from '@components/Dialog/Dialog'
import './IndInfoManage.less'

class IndInfoManage extends Component {

    getList(){
        this.$post('/quota/list')
            .then(res => {
                console.log(res)
                this.setState({
                    data:res
                })
            })
    }

    componentDidMount(){
      this.getList()
    }

    handleDelete(e,row){
      this.$post('/quota/del',row.id)
        .then(res => {
          if(res === 1){
              this.getList()
          }
        })
    }

    handleClickForAdd(){
      document.getElementById("page1").style.display = "none"
        document.getElementById("page2").style.display = "block"
    }

    onChangeCheckbox(e,name){
        this.state.addObject[name] = e;
        this.forceUpdate();
    }

    page2onChange(key,value){
        this.state.addObject[key] = value;
        this.forceUpdate();
    }

    handleIniOption(e,name){
        if(name === 'Select1')
            this.state.addObject.typeName = e
        else
            this.state.addObject.deptName = e
    }

    handleClickForEdit(e, row) {
        this.state.checkboxOptions = "123"
        this.setState({
            dialogData: this.$clone(row),
            dialogVisible: true
        })
    }

    handleComfirm(e){
        console.log(e)
    }

    onChange(key,value){
        this.state.dialogData[key] = value
        this.forceUpdate()
    }

    page2handleConfirm(){
        this.$post('/quota/add',this.state.addObject)
            .then(res => {
                this.getList()
                alert("添加成功，点击确定返回列表！")
                document.getElementById("page1").style.display = "block"
                document.getElementById("page2").style.display = "none"
            })
    }

    handleClickForReturn(){
        document.getElementById("page1").style.display = "block"
        document.getElementById("page2").style.display = "none"
    }

    handleClickForCodeCheck(){
        this.$post('/quota/list',this.state.addObject.quota)
            .then(res => {
                this.setState({
                    // data:res
                })
            })
    }

    handleClickForNameCheck(){
        this.$post('/quota/list',this.state.addObject.ChineseName)
            .then(res => {
                this.setState({
                    // data:res
                })
            })
    }

    constructor(props) {
    super(props)
    this.state = {
      type:[],
      columns: [
        {
          label: "ID",
          prop: "id",
            width:'60px',
          align: "center"
        },
        {
          label: "代码",
          prop: "code",
            width:'70px',
          align: "center"
        },
        {
          label: "中文名称",
          prop: "chineseName",
          align: "center"
        },
        {
          label: "英文名称",
          prop: "englishName",
          align: "center"
        },
        {
          label: "备注",
          prop: "description",
          align: "center"
        },
        {
          label: "月度",
          prop: "freqMonth",
          align: "center",
            width:'70px',
          render: (row,column,index) =>

                <Checkbox.Group >
                  <Checkbox disabled={true}  name="type" checked={row.freqMonth?true:false}></Checkbox>
                </Checkbox.Group>


        },
        {
          label: "季度",
          prop: "freSeason",
          align: "center",
            width:'70px',
          render: (row,column,index) =>
            <Checkbox.Group>
              <Checkbox disabled={true}  name="type" checked={row.freqSeason?true:false}></Checkbox>
            </Checkbox.Group>

        },
        {
          label: "年度",
          prop: "freqYear",
          align: "center",
            width:'70px',
          render: (row,column,index) =>
            <Checkbox.Group >
              <Checkbox disabled={true}  name="type" checked={row.freqYear?true:false}></Checkbox>
            </Checkbox.Group>
        },
        {
          label: "复合指标",
          prop: "composite",
          align: "center"
        },
        {
          label: "类别",
          prop: "typeName",
          align: "center"
        },
        {
          label: "部门",
          prop: "deptName",
          align: "center"
        },
        {
          label: "操作",
          prop: "zip",
          render: (row) => {
            return (
              <div className="operation">
              <Button type="text" size="small" onClick={e => this.handleClickForEdit(e, row)}>编辑</Button>
              <Button type="text" size="small" onClick={e => this.handleDelete(e, row)}>删除</Button>
                </div>
            )
          }
        }
      ],
      keywordOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }],
      value: '',

      data: [{
        "id": 1,
        "code": "A",
        "chineseName": "指标1",
        "description": "quota1",
        "freqMonth": 1,
        "freqSeason": 0,
        "freqYear": 0,
        "composite": 0,
        "typeName": 1,
        "deptName": 1,
        "englishName": "quota1"
      }, {
        "id": 2,
        "code": "B",
        "chineseName": "指标2",
        "description": "quota2",
        "freqMonth": 0,
        "freqSeason": 1,
        "freqYear": 0,
        "composite": 0,
        "typeName": 1,
        "deptName": 1,
        "englishName": "quota2"
      }, {
        "id": 3,
        "code": "C",
        "chineseName": "指标3",
        "description": "quota3",
        "freqMonth": 0,
        "freqSeason": 0,
        "freqYear": 1,
        "composite": 0,
        "typeName": 2,
        "deptName": 2,
        "englishName": "quota3"
      }],
      checkboxOptions:[],
      dialogVisible: false,
      dialogData: {},
      dialogForm:[
        {
          label:'ID',
          param:'id'
        },
        {
          label:'代码',
          param:'code'
        },
        {
          label:'中文名',
          param:'chineseName'
        },
        {
          label:'英文名',
          param:'englishName'
        },
        {
          label:'备注',
          param:'description'
        },
        {
          label:'类型',
          param:'type'
        },
        {
          label:'部门',
          param:'dept'
        },
        {
          label:'fuck',
          type:'checkBox',
          checkBoxItems:['月度','季度','年度'],
          checkBoxParams:['freqMonth','freqSeason','freqYear']
        }
      ],
        Options1: [{
            value: '1',
            label: '1'
        }],
        Options2: [{
            value: '1',
            label: '1'
        }],
        addObject:{
            code:'',
            chineseName:'',
            englishName:'',
            description:'',
            monthlyData: false,
            quarterlyData: false,
            annualData: false,
            compositeIndex: false,
            typeName:'',
            deptName:''
        }
    }

  }

  render() {
    const {dialogData, dialogVisible,dialogForm,checkboxOptions,addObject} = this.state
    return (
      <Layout.Col span={18}>
          <div className="IndInfoMan">
        <div id="page1">
          <div className="search">
            <div className="keyword-search">
              <span>关键字搜索</span>
              <Select value={this.state.value}>
                {
                  this.state.keywordOptions.map(el => {
                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                  })
                }

              </Select>
              <Input className="inline-input"></Input>
              <Button type="primary" size="small" onClick={() =>this.setState({dialogVisible: false})}>确 定</Button>
            </div>
            <div className="ind-search">
              <span>指标组查询</span>
              <Select value={this.state.value}>
                {
                  this.state.keywordOptions.map(el => {
                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                  })
                }

              </Select>
              <Input className="inline-input"></Input>
              <Button type="primary" size="small" onClick={() => this.setState({dialogVisible: false})}>确 定</Button>
            </div>
          </div>
          <Table
            style={{width: '100%'}}
            columns={this.state.columns}
            border={true}
            headerAlign="center"
            data={this.state.data}
          />
          <DialogForm
            dialogData={dialogData}
            dialogVislble={dialogVisible}
            form={dialogForm}
            handleComfirm={this.handleComfirm}
            handleCancel={this.state.dialogVisible = false}
          >
          </DialogForm>
          <div>
            <br />
              <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>添加指标</Button>
          </div>
        </div>
        <div id="page2">
          <h3>添加指标信息</h3>
          <div>
            <span>指标代码</span><Input className="inline-input" placeholder={addObject.code} onChange={this.page2onChange.bind(this,'code')}/><Button type="primary" size="small" onClick={this.handleClickForCodeCheck.bind(this)}>查看代码是否重复</Button><br />
              <span>中文名称</span><Input className="inline-input" placeholder={addObject.chineseName} onChange={this.page2onChange.bind(this,'chineseName')}/><Button type="primary" size="small" onClick={this.handleClickForNameCheck.bind(this)}>查看名称是否重复</Button><br />
              <span>英文名称</span><Input className="inline-input" placeholder={addObject.englishName} onChange={this.page2onChange.bind(this,'englishName')}/><br />
              <span className="page2_span">备注</span><Input className="inline-input" placeholder={addObject.description} onChange={this.page2onChange.bind(this,'description')}/><br />
              <span>是否月度数据</span><Checkbox checked={addObject.monthlyData} onChange={e => this.onChangeCheckbox(e,"monthlyData")}>是</Checkbox><br />
              <span>是否季度数据</span><Checkbox checked={addObject.quarterlyData} onChange={e => this.onChangeCheckbox(e,"quarterlyData")}>是</Checkbox><br />
              <span>是否年度数据</span><Checkbox checked={addObject.annualData} onChange={e => this.onChangeCheckbox(e,"annualData")}>是</Checkbox><br />
              <span>是否复合指数</span><Checkbox checked={addObject.compositeIndex} onChange={e => this.onChangeCheckbox(e,"compositeIndex")}>是</Checkbox><br />
            <span>指标类别</span>
              <Select value={this.state.value} onChange={e => this.handleIniOption(e,"Select1")} clearable={true}>
                  {
                      this.state.Options1.map(el => {
                          return <Select.Option key={el.value} label={el.label} value={el.value}/>
                      })
                  }
              </Select><br />
            <span>所属部门</span>
              <Select value={this.state.value} onChange={e => this.handleIniOption(e,"Select2")} clearable={true}>
                  {
                      this.state.Options2.map(el => {
                          return <Select.Option key={el.value} label={el.label} value={el.value}/>
                      })
                  }
              </Select><br />
              <Button type="primary" onClick={this.page2handleConfirm.bind(this)}>添加</Button>
              <Button type="primary" onClick={this.handleClickForReturn.bind(this)}>返回</Button>
          </div>
        </div>
          </div>
      </Layout.Col>
    );
  }
}

export default IndInfoManage