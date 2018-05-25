import React, { Component } from 'react';
import {PubSub} from "pubsub-js";

class MonthlyDataImport extends  Component {

    componentDidMount(){
        // this.getList()
        PubSub.publish('route',this.props.location.pathname);
    }

    render() {
        return (
            <div>
                here
            </div>
        )

    }
}
export default MonthlyDataImport