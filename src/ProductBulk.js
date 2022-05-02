
import React from 'react';
import './index.css';

class ProductBulk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    }
  }
  componentDidMount() {
    fetch("http://localhost:3000/products/bulk")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("ProductBulk.componentDidMount()", result);
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          Bulk Requested
        </div>
      );
    }
  }
  
}

export default ProductBulk;