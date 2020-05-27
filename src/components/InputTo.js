import React from "react";

class InputTo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { destCurrency: "CAD" };
  }

  onSelectChange = event => {
    this.setState({ destCurrency: event.target.value });
    this.props.onSelect(event.target.value);
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
          value={this.props.inputValue}
          readOnly
        />
        <select
          onChange={this.onSelectChange}
          name="convertfrom"
          id="convertfrom"
          className="select"
          value={this.state.destCurrency}
        >
          {renderedList}
        </select>
      </div>
    );
  }
}

export default InputTo;
