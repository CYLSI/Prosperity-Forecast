import React, { Component } from 'react';
import {Layout, Button} from 'element-react';

class SynIndexView extends  Component{

    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div>
                <Layout.Col span={18}>
                    <h3>—合成指数计算结果列表—</h3>
                    <Button type="primary" size="small">计算新的合成指数</Button>
                </Layout.Col>
            </div>
        )
    }
}

export default SynIndexView
