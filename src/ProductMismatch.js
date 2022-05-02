
import React from 'react';
import './index.css';

class ProductMismatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  componentDidMount() {
    fetch("http://localhost:3000/products/mismatch")
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
          <h2>{items.length} Shopify products without matching bar codes</h2>
          {items.map(item => (
            <div key={item.title}>
              <h3>
                {item.shopifyId} - {item.title}  
              </h3>
            </div>
          ))}
        </div>
      );
    }
  }
  
}

export default ProductMismatch;