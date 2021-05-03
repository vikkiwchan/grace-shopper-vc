import React, { Component } from 'react';
import { connect } from 'react-redux';

// use token to access cart items and add to store
// attemptTokenLogin = async () => {
//   const token = window.localStorage.getItem('token');
//   if (token) {
//     const { data: auth } = await axios.get('/api/auth', {
//       headers: {
//         authorization: token,
//       },
//     });
//     // for future referenc: {headers: { authorization: token }} may be required for loading user orders
//     this.setState({ auth });
//   }
// };

class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div>Cart if Empty</div>
        ) : (
          <div>You have {cartItems.length} in the cart</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
