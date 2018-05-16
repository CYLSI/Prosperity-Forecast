import React, { Component } from 'react';
import '../../App.css';
import './Nav.css';
import { Breadcrumb } from 'element-react';
import routes from '../../router/routes'
class Nav extends Component{
  constructor(props){
    super(props)
    let routes = props.route.split('/').slice(1)
    this.state = {
      routes
    }

  }

    render(){
        return(
            <div className='App-header-Breadcrumb'>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    {this.state.routes.map((route)=> <Breadcrumb.Item>{routes.get(route)}</Breadcrumb.Item> )}
                </Breadcrumb>
            </div>
        );
    }
}

export default Nav;