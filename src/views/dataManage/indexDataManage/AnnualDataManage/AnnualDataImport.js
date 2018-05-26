import React, { Component } from 'react';
import {PubSub} from "pubsub-js";

class AnnualDataImport extends  Component {

    componentDidMount(){
        // this.getList()
        PubSub.publish('route',this.props.location.pathname);
    }

    render() {
        return (
            <div>
                AnnualImport
            </div>
        )

    }
}
export default AnnualDataImport