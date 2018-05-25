import React, { Component } from 'react';
import '../../App.css';
import './Nav.css';
import { Breadcrumb } from 'element-react';
import routes from '../../router/routes'
import { PubSub } from 'pubsub-js'

class Nav extends Component{

    componentDidMount(){
        this.pubsub_token = PubSub.subscribe('route', function (topic,message) {
            let routes = message.split('/').slice(1);
            this.setState({
                routes: routes
            })
        }.bind(this));
    }

    componentWillUnmount(){
       PubSub.unsubscribe(this.pubsub_token);
    }

  constructor(props){
      super(props)
      let routes = this.props.route.split('/').slice(1);
      this.state = {
        routes: routes
    }
  }
  componentWillReceiveProps(nextProps){
    let routes =nextProps.route.split('/').slice(1)
    this.setState({
      routes: routes
    })
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