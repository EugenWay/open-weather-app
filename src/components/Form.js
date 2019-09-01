import React from "react";

class Form extends React.Component {
    render() {
        const { error } = this.props;

        if (error) console.log(error);

        return (
            <section>
                <form id="form" onSubmit={this.props.weatherMetod}>
                    <input
                        type="text"
                        name="city"
                        placeholder="Paris, Moscow, New York etc..."
                        className="form-input"
                        required
                    ></input>
                    <button className="form-button">GO</button>
                </form>
                <div className="error-msg">{error}</div>
            </section>
        );
    }
}
export default Form;
