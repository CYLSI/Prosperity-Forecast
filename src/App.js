import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menus from './components/Menu/Menu';
import Nav from './components/Nav/Nav';
import Foot from './components/Foot/Foot';

class App extends Component {
    render() {
        return (
            <div className="App" >
                <Header/>
                <Nav/>
                <Menus/>
                <div id="context"></div>
                <Foot/>
            </div>
        );
    }
}

export default App;
