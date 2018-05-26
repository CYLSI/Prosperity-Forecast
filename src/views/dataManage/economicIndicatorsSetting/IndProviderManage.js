import React, { Component } from 'react';
import {PubSub} from "pubsub-js";
class IndProviderManage extends  Component {

    componentDidMount(){
        // this.getList()
        PubSub.publish('route',this.props.location.pathname);
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
export default IndProviderManage