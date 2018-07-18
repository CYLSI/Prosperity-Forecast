import React, { Component } from 'react';
import {Layout, Button,Select,Input} from 'element-react';
import './CommentManage.less'

class CommentManage extends  Component{

    onChange(key,value){
        this.setState({
            search: value
        })
        this.forceUpdate();
    }

    handleOption(e){
        this.setState({
            keyword: e
        });
        this.forceUpdate();
    }

    handleClickForSearch(){
        console.log(this.state.keyword,this.state.search)
    }

    constructor(props) {
        super(props);

        this.state = {
            Options: [{
                value: '作者',
                label: '作者'
            }],
            keyword:'',
            search:''
        }
    }

    render(){
        return(
            <div className="CommentManage">
                <Layout.Col span={18}>
                    <h3>展示层评论管理：</h3>
                    <div>
                        <span>关键字查询：</span>
                        <Select value={this.state.value} onChange={e => this.handleOption(e)} clearable={true}>
                            {
                                this.state.Options.map(el => {
                                    return <Select.Option key={el.value} label={el.label} value={el.value}/>
                                })
                            }
                        </Select>
                        <Input placeholder={this.state.search} className="inline-input" onChange={this.onChange.bind(this, 'search')}/>
                        <Button type="primary" size="small" onClick={e => this.handleClickForSearch(e)}>查询</Button>
                    </div>
                </Layout.Col>
            </div>
        )
    }
}

export default CommentManage
