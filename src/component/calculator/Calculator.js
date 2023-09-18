import React, { Component } from "react";
import "./Calculator.css";

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: "0",
      prevValue: null,
      operator: null,
      waitingForInput: false,
    };
  }

  handleNumberClick = (number) => {
    const { display, waitingForInput } = this.state;
    if (waitingForInput) {
      this.setState({ display: String(number), waitingForInput: false });
    } else {
      this.setState({
        display: display === "0" ? String(number) : display + String(number),
      });
    }
  };

  handleOperatorClick = (operator) => {
    const { display, operator: currentOperator, prevValue } = this.state;
    if (currentOperator !== null) {
      this.calculateResult();
    } else {
      this.setState({
        operator,
        prevValue: parseFloat(display),
        waitingForInput: true,
      });
    }
  };

  calculateResult = () => {
    const { display, operator, prevValue } = this.state;
    const currentValue = parseFloat(display);
    let result = 0;

    switch (operator) {
      case "+":
        result = prevValue + currentValue;
        break;
      case "-":
        result = prevValue - currentValue;
        break;
      case "*":
        result = prevValue * currentValue;
        break;
      case "/":
        result = prevValue / currentValue;
        break;
      default:
        break;
    }

    this.setState({
      display: String(result),
      operator: null,
      prevValue: result,
      waitingForInput: true,
    });
  };

  handleEqualsClick = () => {
    if (this.state.operator !== null) {
      this.calculateResult();
    }
  };

  handleClearClick = () => {
    this.setState({
      display: "0",
      prevValue: null,
      operator: null,
      waitingForInput: false,
    });
  };

  render() {
    return (
      <div className="calculator">
        <div className="display">{this.state.display}</div>
        <div className="buttons">
          <button onClick={() => this.handleNumberClick(7)}>7</button>
          <button onClick={() => this.handleNumberClick(8)}>8</button>
          <button onClick={() => this.handleNumberClick(9)}>9</button>
          <button
            className="operator"
            onClick={() => this.handleOperatorClick("/")}
          >
            /
          </button>

          <button onClick={() => this.handleNumberClick(4)}>4</button>
          <button onClick={() => this.handleNumberClick(5)}>5</button>
          <button onClick={() => this.handleNumberClick(6)}>6</button>
          <button
            className="operator"
            onClick={() => this.handleOperatorClick("*")}
          >
            *
          </button>

          <button onClick={() => this.handleNumberClick(1)}>1</button>
          <button onClick={() => this.handleNumberClick(2)}>2</button>
          <button onClick={() => this.handleNumberClick(3)}>3</button>
          <button
            className="operator"
            onClick={() => this.handleOperatorClick("-")}
          >
            -
          </button>

          <button className="zero" onClick={() => this.handleNumberClick(0)}>
            0
          </button>
          <button onClick={() => this.handleClearClick()}>C</button>
          <button
            className="operator"
            onClick={() => this.handleOperatorClick("+")}
          >
            +
          </button>

          <button className="equals" onClick={() => this.handleEqualsClick()}>
            =
          </button>
        </div>
      </div>
    );
  }
}

export default Calculator;
