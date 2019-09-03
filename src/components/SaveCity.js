import React, { Component } from "react";

export default class Hero extends Component {
    render() {
        return (
            <button href="#" onClick={this.props.saveCity}>
                Save City
            </button>
        );
    }
}
