import React, { Component } from 'react';
import {Layout, Button} from 'element-react';

class DiffIndexView extends  Component{

    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div>
                <Layout.Col span={18}>
                    <h3>—扩散指数计算结果列表—</h3>
                    <Button type="primary" size="small">计算新的扩散指数</Button>
                </Layout.Col>
            </div>
        )
    }
}

export default DiffIndexView
