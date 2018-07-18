import React, { Component } from 'react';
import {Layout, Button} from 'element-react';

class ProsSignalLampView extends  Component{

    constructor(props) {
        super(props);

    }

    render(){
        return(
            <div>
                <Layout.Col span={18}>
                    <h3>—景气信号灯计算结果列表—</h3>
                    <Button type="primary" size="small">计算新的景气信号灯</Button>
                </Layout.Col>
            </div>
        )
    }
}

export default ProsSignalLampView
