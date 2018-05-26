import React, { Component } from 'react';
import {PubSub} from "pubsub-js";

class QuarterlyDataImport extends  Component {

    componentDidMount(){
        // this.getList()
        PubSub.publish('route',this.props.location.pathname);
    }

    render() {
        return (
            <div>
                quarterlyImport
            </div>
        )

    }
}
export default QuarterlyDataImport