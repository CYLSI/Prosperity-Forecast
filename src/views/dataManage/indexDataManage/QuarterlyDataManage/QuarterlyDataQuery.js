import React, { Component } from 'react';
import {PubSub} from "pubsub-js";

class QuarterlyDataQuery extends  Component {

    componentDidMount(){
        // this.getList()
        PubSub.publish('route',this.props.location.pathname);
    }

    render() {
        return (
            <div>
                quarterlyQuery
            </div>
        )

    }
}
export default QuarterlyDataQuery