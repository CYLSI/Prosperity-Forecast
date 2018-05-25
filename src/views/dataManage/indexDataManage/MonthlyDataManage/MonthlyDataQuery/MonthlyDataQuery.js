import React, { Component } from 'react';
import {PubSub} from "pubsub-js";
import '../../../../../App.css';
import './MonthlyDataQuery.css'
import { Input,Button,Dropdown,Table,Layout } from 'element-react';

class MonthlyDataQuery extends  Component {

    componentDidMount(){
        PubSub.publish('route',this.props.location.pathname);
    }

    render(){
        return(
            <div>

            </div>
        )
    }
}
export default MonthlyDataQuery