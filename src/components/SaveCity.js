import React, { Component } from "react";

export default class Hero extends Component {
    render() {
        return (
            <button href="#" className="btn" onClick={this.props.saveCity}>
                Save City
            </button>
        );
    }
}
