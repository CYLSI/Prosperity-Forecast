import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Foot from './components/Foot/Foot';
import Menus from "./components/Menu/Menu";
import { post,get } from './utils/httpUtil.js';
import clone from './utils/clone';
Component.prototype.$post = post;
Component.prototype.$get = get;
Component.prototype.$clone = clone
class App extends Component {
    render() {
      console.log(this.props)
        return (
            <div className="App" >
                <Header/>
                <Nav route={window.location.hash}/>
                <Menus/>
                {this.props.children}
                <Foot/>
            </div>
        );
    }
}

export default App;
