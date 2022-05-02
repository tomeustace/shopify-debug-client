import './App.css';
import React from 'react';
import Product from './Product';
import ProductMismatch from './ProductMismatch';
import ProductParsed from './ProductParsed';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mismatches: false,
      parsed: false
    }
  }
  displayMismatches = () => {
    this.setState({
      mismatches: !this.state.mismatches
    })
  }
  displayParsed = () => {
    this.setState({
      parsed: !this.state.parsed
    })
  }

  render() {
      if (this.state.mismatches && !this.state.parsed) {
        return ( 
          <div>
            <button onClick={this.displayMismatches}>Show Products</button>
            <ProductMismatch />
          </div>
        )
      } else if (!this.state.mismatches && !this.state.parsed) {
        return (
          <div>
            <button onClick={this.displayMismatches}>Show Mismatches</button>
            <button onClick={this.displayParsed}>Show Parsed</button>
            <Product />
          </div>
        )
      } else if (this.state.parsed) {
        return ( 
          <div>
            <button onClick={this.displayParsed}>Show Products</button>
            <ProductParsed />
          </div>
        )
      } 
  };
}

export default App;
