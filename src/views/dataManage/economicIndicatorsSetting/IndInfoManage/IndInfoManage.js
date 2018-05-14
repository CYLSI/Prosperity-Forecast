import React, {Component} from 'react'
import {Layout, Input, Button, Select, Checkbox, Table, Dialog, Form} from 'element-react';
import './IndInfoManage.less'

class IndInfoManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: [],
      columns: [
        {
          label: "ID",
          prop: "id",
          align: "center"
        },
        {
          label: "代码",
          prop: "code",
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
          render: (row,column,index) =>

                <Checkbox.Group >
                  <Checkbox disabled={true}  name="type" checked={row.freqMonth}></Checkbox>
                </Checkbox.Group>


        },
        {
          label: "季度",
          prop: "freSeason",
          align: "center",
          render: (row,column,index) =>
            <Checkbox.Group>
              <Checkbox disabled={true}  name="type" checked={row.freqSeason}></Checkbox>
            </Checkbox.Group>

        },
        {
          label: "年度",
          prop: "freqYear",
          align: "center",
          render: (row,column,index) =>
            <Checkbox.Group >
              <Checkbox disabled={true}  name="type" checked={row.freqYear}></Checkbox>
            </Checkbox.Group>
        },
        {
          label: "复合指标",
          prop: "date",
          align: "center"
        },
        {
          label: "类别",
          prop: "type",
          align: "center"
        },
        {
          label: "部门",
          prop: "dept",
          align: "center"
        },
        {
          label: "操作",
          prop: "zip",
          render: (row) => {
            return (
              <div className="operation">
              <Button type="text" size="small" onClick={e => this.handleClickForEdit(e, row)}>编辑</Button>
              <Button type="text" size="small">删除</Button>
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
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
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
        "type": 1,
        "dept": 1,
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
        "type": 1,
        "dept": 1,
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
        "type": 2,
        "dept": 2,
        "englishName": "quota3"
      }, {
        "id": 4,
        "code": "D",
        "chineseName": "指标4",
        "description": "quota4",
        "freqMonth": 1,
        "freqSeason": 1,
        "freqYear": 1,
        "composite": 0,
        "type": 2,
        "dept": 2,
        "englishName": "quota4"
      }],
      dialogVisible: false,
      dialogData: []
    }
  }

  handleClickForEdit(e, row) {
    this.setState({
      ...this.state,
      dialogData: row,
      dialogVisible: true
    })
  }
  onchange(key,value){
    console.log(key)
    console.log(value)
    console.log(arguments)
    this.forceUpdate();
  }

  render() {
    const {dialogData, dialogVisible} = this.state
    return (
      <Layout.Col span={19}>
        <div className="search">
          <div className="keyword-search">
            <span>关键字查询</span>
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

          headerAlign="center"
          data={this.state.data}
        />

        <Dialog
          title="修改"
          visible={dialogVisible}
          onCancel={e => this.setState({dialogVisible: false})}
          dialogData={dialogData}
          size="tiny"
        >
          <Dialog.Body>
            <Form>
              <Form.Item label="ID" labelWidth="80">
                <Input value={dialogData.id} className="inline-input"></Input>
              </Form.Item>
              <Form.Item label="代码" labelWidth="80">
                <Input value={dialogData.code} className="inline-input"></Input>
              </Form.Item>
              <Form.Item label="中文名称" labelWidth="80">
                <Input value={dialogData.chinesesName} className="inline-input"></Input>
              </Form.Item>
              <Form.Item label="英文名称" labelWidth="80">
                <Input value={dialogData.englishName} className="inline-input"></Input>
              </Form.Item>
              <Form.Item label="备注" labelWidth="80">
                <Input value={dialogData.description} className="inline-input"></Input>
              </Form.Item>
              <Form.Item value="类型" labelWidth="80">
                <Input value={dialogData.type} className="inline-input"></Input>
              </Form.Item>
              <Form.Item label="部门" labelWidth="80">
                <Input value={dialogData.dept} className="inline-input"></Input>
              </Form.Item>
            </Form>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button type="primary" onClick={() => this.setState({dialogVisible: false})}>确 定</Button>
          </Dialog.Footer>
        </Dialog>
      </Layout.Col>
    );
  }
}

export default IndInfoManage