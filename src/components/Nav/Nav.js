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
        routes: routes
    }
  }
  componentWillReceiveProps(nextProps){
    let routes =nextProps.route.split('/').slice(1)
    this.state = {
      routes: routes
    }
  }
    render(){
    console.log("render")
        return(
            <div className='App-header-Breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    {this.state.routes.map((route) => <Breadcrumb.Item key={route}>{routes.get(route)}</Breadcrumb.Item> )}
                </Breadcrumb>
            </div>
        );
    }
}

export default Nav;