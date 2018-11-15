import React,{Component} from  'react'
import {Form,Checkbox,Button,Table,Layout,Input} from 'element-react'
import DialogForm from '@components/Dialog/Dialog'
import './IndDataManage.less'

class IndDataManage extends Component{

  constructor(props) {
    super(props);

    this.state = {
        form: {
            name: '',
            region: '',
            date1: null,
            date2: null,
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        type:[],
        columns: [
            {
                label: "数据项名称",
                prop: "name",
                align: "center"
            },
            {
                label: "描述",
                prop: "description",
                align: "center"
            },
            {
                label: "操作",
                prop: "zip",
                align: "center",
                render: (row) => {
                    return (
                        <div>
                            <Button type="text" size="small" onClick={e => this.handleClickForEdit(e, row)}>编辑</Button>
                            <Button type="text" size="small" onClick={e => this.handleClickForDel(e, row)}>删除</Button>
                        </div>
                    )
                }

            }
        ],
        data: [
            {
                "name":"name1",
                "description":"备注1"
            },
            {
                "name":"name1",
                "description":"备注2"
            }],
        checkboxOptions:[],
        dialogVisible: false,
        dialogData: {},
        dialogForm:[{label:"数据项",param:'name'},{label:"备注", param:"description"}],
        add:{
            name:'',
            description:''
        }
    }
  }

    handleClickForEdit(e, row) {
        this.setState({
            dialogData: this.$clone(row),
            dialogVisible: true
        })
    }

    handleClickForDel(e,row){
        this.$post('/dataItem/del',row.id)
            .then(res => {
                if(res === 1)
                    this.getList()
            })
    }

    handleComfirm(e){
        this.setState({dialogVisible:false})
        this.$post('/dataItem/upd',this.state.dialogData)
            .then(res=>{
                if(res === 1){
                    this.getList()
                }
            }).catch(e=>{
            console.log(e)
        })
    }

    onChange(key, value) {
      if(key == "type")
          this.state.form[key] = value;
      else
        this.state.add[key] = value;
      this.forceUpdate()
    }

    handleClickForCheck(){
      this.$post('/quota/list',this.state.addQuotaItem)
            .then(res => {
                this.setState({
                    // data:res
                })
            })
    }

    handleClickForAdd(){
        this.$post('/dataItem/add',this.state.add)
            .then(res => {
                if(res === 1){
                    this.setState({
                        add:{
                            name:'',
                            description:''
                        }
                    })
                    this.forceUpdate()
                    this.getList()
                }
            })
    }

    getList(){
        this.$post('/dataItem/list')
            .then(res=>{
                this.setState({
                    data: res
                })
            }).catch(e=>{
            console.log(e)
        })
    }

    componentDidMount(){
        this.getList();
    }

  render() {
      const {dialogData, dialogVisible,dialogForm,checkboxOptions} = this.state
    return (
        <div className="IndDataMan">
            <Layout.Col span={18}>
                <Form  labelWidth="80">
                  <Form.Item label="活动性质">
                      <Checkbox.Group onChange={this.onChange.bind(this, 'type')}>
                          <Checkbox label="美食/餐厅线上活动" name="type"></Checkbox>
                          <Checkbox label="地推活动" name="type"></Checkbox>
                          <Checkbox label="线下主题活动" name="type"></Checkbox>
                          <Checkbox label="单纯品牌曝光" name="type"></Checkbox>
                      </Checkbox.Group>
                  </Form.Item>
              </Form>
            </Layout.Col>
            <Layout.Col span={10}>
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                />
                <DialogForm
                    dialogData={dialogData}
                    dialogVislble={dialogVisible}
                    form={dialogForm}
                    handleComfirm={this.handleComfirm.bind(this)}
                    handleCancel={this.state.dialogVisible = false}
                >
                </DialogForm>
            </Layout.Col>
            <Layout.Col span={8}>
                <h4>添加指标数据项</h4>
                <span>数据项名称：</span><Input className="inline-input" onChange={this.onChange.bind(this,'name')} value={this.state.add.name}/><br />
                <span className="IndTypeMan_add_span">备注</span><Input className="inline-input" onChange={this.onChange.bind(this,'description')} value={this.state.add.description}/><br/>
                <div>
                    <br/>
                    <Button type="primary" size="small" onClick={this.handleClickForAdd.bind(this)}>增加</Button>
                </div>
            </Layout.Col>
        </div>
    );
  }

}
export default IndDataManage