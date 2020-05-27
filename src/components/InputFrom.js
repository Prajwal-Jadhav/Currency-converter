import React from "react";

class InputFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: undefined };
  }

  onInputChange = event => {
    this.setState({ inputValue: event.target.value });
    this.props.onInput(event.target.value);
  };

  render() {
    return (
      <div>
        <input
          type="number"
          className="input"
          value={this.state.inputValue || ""}
          onChange={this.onInputChange}
        />
        <select name="convertfrom" id="convertfrom" className="select">
          <option value="USD">USD</option>
        </select>
      </div>
    );
  }
}

export default InputFrom;
