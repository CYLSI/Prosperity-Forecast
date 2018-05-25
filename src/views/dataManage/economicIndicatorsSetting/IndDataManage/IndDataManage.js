import React,{Component} from  'react'
import {Form,Checkbox} from 'element-react'
import { PubSub } from 'pubsub-js'

class IndDataManage extends Component{

    componentDidMount(){
        // this.getList()
        PubSub.publish('route',this.props.location.pathname);
    }

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
      }
    };
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
    return (
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
    )
  }

}
export default IndDataManage