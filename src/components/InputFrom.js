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

  onSelectChange = event => {
    this.props.onSelectInputFrom(event.target.value);
  };

  render() {
    const renderedList = this.props.selectOptions.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });

    return (
      <div>
        <input
          type="number"
          className="input"
          value={this.state.inputValue || ""}
          onChange={this.onInputChange}
        />
        <select
          name="convertfrom"
          id="convertfrom"
          className="select"
          onChange={this.onSelectChange}
        >
          {renderedList}
        </select>
      </div>
    );
  }
}

export default InputFrom;
