import React from "react";
import { connect } from "react-redux";

class Counter extends React.Component {
  increment = () => {
    this.props.dispatch({ type: "INCREMENT" });
  };

  decrement = () => {
    this.props.dispatch({ type: "DECREMENT" });
  };

  globalIncrement = () => {
    this.props.globalEventDistributor.dispatch({ type: "INCREMENT" });
  };

  globalDecrement = () => {
    this.props.globalEventDistributor.dispatch({ type: "DECREMENT" });
  };

  render() {
    return (
      <div>
        <br />
        <div>
          <b> Contador: {this.props.count}</b>
          <br />
          <br />
          <button onClick={this.increment}>+1 local</button>
          &nbsp;
          <button onClick={this.decrement}>-1 local</button>
          &nbsp;
          <button onClick={this.globalIncrement}>+1 global</button>
          &nbsp;
          <button onClick={this.globalDecrement}>-1 global</button>
          &nbsp;
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

export default connect(mapStateToProps)(Counter);
