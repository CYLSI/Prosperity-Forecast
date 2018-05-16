import React, {Component} from 'react'
import {Layout, Input, Button, Select, Checkbox, Table, Dialog, Form} from 'element-react';
import './IndInfoManage.less'
class IndInfoManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type:[],
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
          prop: "chinese_name",
          align: "center"
        },
        {
          label: "英文名称",
          prop: "english_name",
          align: "center"
        },
        {
          label: "备注",
          prop: "description",
          align: "center"
        },
        {
          label: "月度 季度 年度",
          prop: "fre_month",
          align: "center",
          render:()=>
            <Checkbox.Group value={this.state.type}>
              <Checkbox label="美食" name="type"></Checkbox>
              <Checkbox label="地推" name="type"></Checkbox>
              <Checkbox label="线下" name="type"></Checkbox>
            </Checkbox.Group>
        },
        // {
        //   label: "季度",
        //   prop: "fre_season",
        //   align: "center"
        // },
        // {
        //   label: "年度",
        //   prop: "fre_year",
        //   align: "center"
        // },
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
            return(
                <span>
              <Button type="text" size="small" onClick={e => this.handleClickForEdit(e, row)}>编辑</Button>
              <Button type="text" size="small">删除</Button>
                </span>
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
        id: '2016-05-02',
        code: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        zip:''
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      dialogVisible: false,
      dialogData:[]
    }
  }

  handleClickForEdit(e,row){
    this.setState({
      ...this.state,
      dialogData:row,
      dialogVisible: true
    })
  }
  render() {
    const {dialogData,dialogVisible} = this.state
    return (
      <Layout.Col span={19}>
        <div className="seacrh">
          <div className="keyword-seacrh">
            <span>关键字查询</span>
            <Select value={this.state.value}>
              {
                this.state.keywordOptions.map(el => {
                  return <Select.Option key={el.value} label={el.label} value={el.value} />
                })
              }

            </Select>
            <Input className="inline-input"></Input>
            <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>确 定</Button>
          </div>
          <div className="ind-search">
            <span>指标组查询</span>
            <Select value={this.state.value}>
              {
                this.state.keywordOptions.map(el => {
                  return <Select.Option key={el.value} label={el.label} value={el.value} />
                })
              }

            </Select>
            <Input className="inline-input"></Input>
            <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>确 定</Button>
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
          visible={ dialogVisible }
          onCancel={ e => this.setState({ dialogVisible: false }) }
          dialogData={ dialogData }
          size="tiny"
        >
          <Dialog.Body>
            <Form>
              <Form.Item label="登录名" labelWidth="80">
                <Input value={dialogData.code} className="inline-input"></Input>
              </Form.Item>
              <Form.Item label="用户名" labelWidth="80">
                <Input vlaue={dialogData.name} className="inline-input"></Input>
              </Form.Item>
              <Form.Item label="用户职务" labelWidth="80">
                <Input value={dialogData.duties} className="inline-input"></Input>
              </Form.Item>
              <Form.Item label="部门" labelWidth="80">
                <Input value={dialogData.apartment} className="inline-input"></Input>
              </Form.Item>
              <Form.Item label="用户组" labelWidth="80">
                <Input value={dialogData.userGroup} className="inline-input"></Input>
              </Form.Item>
              <Form.Item value="电子邮件" labelWidth="80">
                <Input value={dialogData.email} className="inline-input"></Input>
              </Form.Item>
              <Form.Item label="联系电话" labelWidth="80">
                <Input value={dialogData.contact} className="inline-input"></Input>
              </Form.Item>
            </Form>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>确 定</Button>
          </Dialog.Footer>
        </Dialog>
      </Layout.Col>
    );
  }
}

export default IndInfoManage