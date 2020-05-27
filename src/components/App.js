import React from "react";
import "./App.css";
import InputFrom from "./InputFrom";
import InputTo from "./InputTo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listKeys: [], rates: {}, dest: "CAD", destValue: "" };
  }

  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=USD")
      .then(response => response.json())
      .then(data => {
        this.setState({ listKeys: Object.keys(data.rates) });
        this.setState({ rates: data.rates });
      })
      .catch(e => alert("Please check your internet connection"));
  }

  onSelect = dest => {
    this.setState({ dest: dest });
  };

  onInput = amount => {
    const convertedAmount =
      Math.round(this.state.rates[this.state.dest] * amount * 100) / 100;

    this.setState({ destValue: convertedAmount });
  };

  render() {
    return (
      <div>
        <h1 className="heading">Convert</h1>
        <InputFrom onInput={this.onInput} />
        <div className="equals">=</div>
        <InputTo
          onSelect={this.onSelect}
          selectOptions={this.state.listKeys}
          inputValue={this.state.destValue}
        />
      </div>
    );
  }
}

export default App;
