
import React from 'react';
import './index.css';

class ProductParsed extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { }
  }
  componentDidMount() {
    fetch("http://localhost:3000/products/parsed")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("ProductParsed.componentDidMount()", result);
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
          <h2>{items.length} Parsed local products</h2>
          {items.map(item => (
            <div key={item.ItemLookupCode}>
              <h3>
                {item.ItemLookupCode} - {item.Price} - {item.Quantity}
              </h3>
            </div>
          ))}
        </div>
      );
    }
  }
  
}

export default ProductParsed;