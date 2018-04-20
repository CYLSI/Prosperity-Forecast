import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Foot from './components/Foot/Foot';
import Menus from "./components/Menu/Menu";

class App extends Component {
    render() {
        return (
            <div className="App" >
                <Header/>
                <Nav/>
                <Menus/>
                {this.props.children}
                <Foot/>
            </div>
        );
    }
}

export default App;
