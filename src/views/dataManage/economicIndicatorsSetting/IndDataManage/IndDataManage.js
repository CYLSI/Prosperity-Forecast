import React,{Component} from  'react'
import {Form,Checkbox,Button,Table,Layout} from 'element-react'
import DialogForm from '@components/Dialog/Dialog'
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
                prop: "data_name",
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
                            <Button type="text" size="small">删除</Button>
                        </div>
                    )
                }

            }
        ],
        data: [{"data_name":"name1"},
            {"data_name":"name2"},
            {"data_name":"name3"},
            {"data_name":"name4"}],
        checkboxOptions:[],
        dialogVisible: false,
        dialogData: {},
        dialogForm:[{label:"数据项",param:'data_name'}]
    }
  }

    handleClickForEdit(e, row) {
        //this.state.checkboxOptions = "123"
        this.setState({
            dialogData: this.$clone(row),
            dialogVisible: true
        })
    }

    handleComfirm(e){
        console.log(e)
    }

  onSubmit(e) {
    e.preventDefault();
  }

  onChange(key, value) {
    console.log(key)
    console.log(value)
    this.state.form[key] = value;
    this.forceUpdate();
  }

  render() {
      const {dialogData, dialogVisible,dialogForm,checkboxOptions} = this.state
    return (
        <Layout.Col span={18}>
      <Form  labelWidth="80" onSubmit={this.onSubmit.bind(this)}>


  <Form.Item label="活动性质">
          <Checkbox.Group onChange={this.onChange.bind(this, 'type')}>
  <Checkbox label="美食/餐厅线上活动" name="type"></Checkbox>
      <Checkbox label="地推活动" name="type"></Checkbox>
      <Checkbox label="线下主题活动" name="type"></Checkbox>
      <Checkbox label="单纯品牌曝光" name="type"></Checkbox>
      </Checkbox.Group>
  </Form.Item>



  </Form>

            <Table
                style={{width: '100%'}}
                columns={this.state.columns}

                //headerAlign="center"
                data={this.state.data}
                border={true}
            />
            <DialogForm
                dialogData={dialogData}
                dialogVislble={dialogVisible}
                form={dialogForm}
                handleComfirm={this.handleComfirm}
            >
            </DialogForm>

        </Layout.Col>

    );
  }

}
export default IndDataManage