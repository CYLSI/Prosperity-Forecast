import React, {Component} from 'react'
import {Input, Button,Dialog, Form,Checkbox} from 'element-react';
import './Dialog.less'
class DialogForm extends Component{
  constructor(props){
    super(props)
    console.log(1)
    this.state = {
      dialogVisible:props.dialogVislble,//布尔类型
      dialogData:props.dialogData,
      form:props.form
    }

  }

  componentWillReceiveProps(nextProps){
    let checkBoxItems = []
    nextProps.form.map((item)=>{
      if(item.type === 'checkBox'){

        item.checkBoxItems.map((checkBoxItem,index)=>{
          for(let dataItem in nextProps.dialogData){
            for(let key in checkBoxItem){
              if(dataItem=== key && nextProps.dialogData[dataItem] === 1){
                checkBoxItems.push(key)
              }
            }

          }

        })
      }
    })
    this.setState({
      dialogData:nextProps.dialogData,
      dialogVisible:nextProps.dialogVislble,
      checkBoxItems
    })
  }
  handleCancel(){
    this.setState({dialogVisible: false})
  }
  onChange(key,value){
    this.state.dialogData[key] = value
    this.forceUpdate()
  }
  handleCheckBoxItems(){
    let checkBoxOptions = {}
    this.state.checkBoxItems.map((item)=>{


    })
    this.setState({
      dialogData:{...this.state.dialogData,}
    })
  }
  handleComfirm(){

    this.setState({
      dialogVisible: false,

    })
     this.props.handleComfirm({...this.state.dialogData,})
  }
  render(){
    const {dialogVisible,dialogData,form,checkBoxItems } = this.state
    return (<Dialog
      title="修改"
      visible={dialogVisible}
      onCancel={e =>this.handleCancel()}
      size="tiny"
    >
      <Dialog.Body>
        <Form  ref="form" model={dialogData}>
          {this.props.form.map((item)=>{
            if(item.type === 'checkBox'){

              return(
              <Form.Item label={item.label} labelWidth="80">
                <Checkbox.Group value={checkBoxItems}  onChange={this.onChange.bind(this,item.param)}>
                  {
                    item.checkBoxItems.map( checkBoxItem =>
                        <Checkbox label={item.label} name="type" checked={dialogData[item.param]}></Checkbox>
                    )

                  }
                </Checkbox.Group>
              </Form.Item>
            )}
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