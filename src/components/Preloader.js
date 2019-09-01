import React from "react";

const Preloader = (props) => (
    <section className="App-wrapper" data-bg={props.time}>
        <div className="waiting">Loading...</div>
    </section>
);

export default Preloader;