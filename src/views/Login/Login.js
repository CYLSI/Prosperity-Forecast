import React, { Component } from 'react';
import {Layout, Input, Button, Radio, Checkbox, DatePicker,Table,Dialog,Tag,Select} from 'element-react';
import './Login.less'
import Picture1 from'../../Picture1.jpeg'

class Login extends Component{

	constructor(props) {
        super(props);

        this.state = {

        }
    }

    render(){
    	return(
    		<div>
                <Layout.Col span={16}>
	                <div id="Login_image">
	                	
	                </div>
                </Layout.Col>
    		</div>
    	)
    }
}

export default Login