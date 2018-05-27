sadasfasdasfasasfasfa
import React, {Component} from 'react'
import {Input, Button,Dialog, Form,Checkbox,Select} from 'element-react';
import './Dialog.less'
class DialogForm extends Component{
  constructor(props){
    super(props)
    console.log(1)
    this.state = {
      dialogVisible:props.dialogVislble,//布尔类型
      dialogData:props.dialogData,
      form:props.form,
      checkBoxOptions:[],

    }

  }
  componentWillReceiveProps(nextProps){
    nextProps.form.map((item)=>{
      if(item.type === 'checkBox'){
        this.setState({
          checkBoxItems: item.checkBoxItems,
          checkBoxParams: item.checkBoxParams
        })

      }
    })
    this.setState({
      dialogData:nextProps.dialogData,
      dialogVisible:nextProps.dialogVislble,
      checkBoxOptions:[]
    })
  }
  handleCancel(){
    this.setState({dialogVisible: false})
  }
  onChange(key,value){
    console.log(key,value)
    this.state.dialogData[key] = value
    this.forceUpdate()
  }
  renderCheckBoxItems(checkBoxItem,index,checkBoxParams){

             if(this.state.dialogData[checkBoxParams[index]]) {
               this.state.checkBoxOptions.push(checkBoxItem)
             }
    return <Checkbox label={checkBoxItem} key={checkBoxItem}  name="type"></Checkbox>

  }
  handleComfirm(){
    const {checkBoxOptions,dialogData,checkBoxItems,checkBoxParams} = this.state

      checkBoxItems && checkBoxItems.map((item,index) => {
        if(checkBoxOptions.indexOf(item)!== -1){
          dialogData[checkBoxParams[index]] = 1
        }else{
          dialogData[checkBoxParams[index]] = 0
        }
      })
    //不用setState而采用this.state来修改state的话，页面是不会渲染的，但state中的值却会变化
    //除非等到下一次setState或this.forceUpdate()才会将state中的值渲染到页面中

    this.setState({
      dialogVisible: false
    })
     this.props.handleComfirm({...dialogData})
  }
  render(){
    const {dialogVisible,dialogData,form,checkBoxOptions } = this.state
    return (<Dialog
      title="修改"
      visible={dialogVisible}
      onCancel={e =>this.handleCancel()}
      size="tiny"
    >
      <Dialog.Body>
        <Form  ref="form" model={dialogData}>
          {form.map((item)=>{
            if(item.type === 'checkBox'){

              return(
              <Form.Item label={item.label} labelWidth="80">
                <Checkbox.Group value={checkBoxOptions}>
                  {
                    item.checkBoxItems.map( (checkBoxItem,index) =>

                      this.renderCheckBoxItems(checkBoxItem,index,item.checkBoxParams)
                    )
                  }
                </Checkbox.Group>
              </Form.Item>
            )}else if(item.type === "Select"){
               return(
                <Form.Item label={item.label} labelWidth="80">
                    <Select value={dialogData[item.param]} onChange={this.onChange.bind(this,item.param)}>
                        {
                            item.options.map(el => {
                                return <Select.Option key={el.value} label={el.label} value={el.value} />
                            })
                        }
                    </Select>
                </Form.Item>)
            }
              else{
                return  (
                  <Form.Item label={item.label} labelWidth="80">
                    <Input value={dialogData[item.param]} onChange={this.onChange.bind(this,item.param)} className="inline-input"/>
                  </Form.Item>)
            }

          })}

        </Form>
      </Dialog.Body>
      <Dialog.Footer className="dialog-footer">
        <Button type="primary" onClick={() =>this.handleComfirm() }>确 定</Button>
      </Dialog.Footer>
      </Dialog>
      );}


          }
export default DialogForm
