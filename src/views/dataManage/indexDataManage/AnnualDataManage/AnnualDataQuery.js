import React, { Component } from 'react';
import {PubSub} from "pubsub-js";

class AnnualDataQuery extends  Component {

    componentDidMount(){
        // this.getList()
        PubSub.publish('route',this.props.location.pathname);
    }

    render() {
        return (
            <div>
                AnnualQuery
            </div>
        )

    }
}
export default AnnualDataQuery