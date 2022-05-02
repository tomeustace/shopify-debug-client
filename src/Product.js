
import React from 'react';
import './index.css';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    }
  }
  componentDidMount() {
    // call bulk update on load
    // Bulk is called when server starts so don't need this ATM
    // fetch("http://localhost:3000/products/bulk").then(res => res.json());

    fetch("http://localhost:3000/products/list")
      .then(res => res.json())
      .then(
        (result) => {
          const qntyMismatch = result.filter(res => {
            return (res.local.Quantity * 1) !== +res.quantity;
          })
          const prcMismatch = result.filter(res => {
            return (res.local.Price * 1) !== +(res.price / 100);
          })
          this.setState({
            isLoaded: true,
            items: result,
            quantityMismatch: qntyMismatch,
            priceMismatch: prcMismatch 
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
    const { error, isLoaded, items, quantityMismatch, priceMismatch } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } 
    // else if (quantityMismatch.length > 0) {
    //   return (
    //     <div>
    //       <h3>Quantity Mismatch</h3>
    //       {quantityMismatch.map(item => (
    //           <h3 key={item.title}>
    //             {item.title}
    //           </h3>
    //       ))}
    //     </div>
    //   );
    // } else if (priceMismatch.length > 0) {
    //   return (
    //     <div>
    //       <h3>Price Mismatch</h3>
    //       {priceMismatch.map(item => (
    //           <h3 key={item.title}>
    //             {item.title}
    //           </h3>
    //       ))}
    //     </div>
    //   );
    // }
     else {
      return (
        <div>
          <h2>{items.length} products with matching bar codes</h2>
          {items.map(item => (
            <div key={item.title}>
              <h3>
                {item.title} - {item.local.ItemLookupCode}
              </h3>
              
              <div>
                <p>
                  Local Price: {item.local.Price * 1} 
                </p>
                <p>
                  Shopify Price: {item.price / 100} 
                </p>
              </div>

              <div>
                <p>
                  Local Quantity: {item.local.Quantity * 1} 
                </p>
                <p>
                  Shopify Quantity: {item.quantity} 
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
  
}

export default Product;