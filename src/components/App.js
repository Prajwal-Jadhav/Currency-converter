import React from "react";
import "./App.css";
import InputFrom from "./InputFrom";
import InputTo from "./InputTo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listKeys: [],
      rates: {},
      dest: "CAD",
      destValue: "",
      inputFromAmount: 0,
    };
  }

  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=CAD")
      .then(response => response.json())
      .then(data => {
        this.setState({ listKeys: Object.keys(data.rates) });
        this.setState({ rates: data.rates });
      })
      .catch(e => alert("Please check your internet connection"));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dest !== this.state.dest) {
      let convertedAmount =
        Math.round(
          this.state.rates[this.state.dest] * this.state.inputFromAmount * 1000
        ) / 1000;
      this.setState({ destValue: convertedAmount });
    }
  }

  onSelect = dest => {
    this.setState({ dest: dest });
  };

  onInput = amount => {
    const convertedAmount =
      Math.round(this.state.rates[this.state.dest] * amount * 1000) / 1000;
    this.setState({ inputFromAmount: amount });
    this.setState({ destValue: convertedAmount });
  };

  onSelectInputFrom = apiQuery => {
    fetch("https://api.exchangeratesapi.io/latest?base=" + apiQuery)
      .then(response => response.json())
      .then(data => {
        this.setState({ rates: data.rates });
        return data;
      })
      .then(data => {
        let convertedAmount =
          Math.round(
            this.state.rates[this.state.dest] *
              this.state.inputFromAmount *
              1000
          ) / 1000;
        this.setState({ destValue: convertedAmount });
      });
  };

  render() {
    return (
      <div>
        <h1 className="heading">Convert</h1>
        <InputFrom
          onInput={this.onInput}
          onSelectInputFrom={this.onSelectInputFrom}
          selectOptions={this.state.listKeys}
        />
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
