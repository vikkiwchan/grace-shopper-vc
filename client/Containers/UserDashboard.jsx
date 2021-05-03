import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import AdminConsole from './AdminConsole';
import Button from '../components/styles/Button';
import Cart from './';

// Filter users based on 'isAdmin' attribute
class UserDashboard extends Component {
  state = {
    user: {},
    cartItems: [],
  };

  logout = () => {
    window.localStorage.removeItem('token');
    this.setState({ user: {}, cartItems: [] });
  };

  // get user and their cart items, if they have anything
  attemptTokenLogin = async () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const {
        data: { user, cartItems },
      } = await axios.get('/api/user', {
        headers: {
          authorization: token,
        },
      });
      // for future referenc: {headers: { userorization: token }} may be required for loading user orders
      this.setState({ user, cartItems });
    }
  };
  componentDidMount() {
    this.attemptTokenLogin();
  }
  signIn = async (credentials) => {
    let response = await axios.post('/api/user', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    this.attemptTokenLogin();
  };
  render() {
    const { user } = this.state;
    const { signIn, logout } = this;
    if (!user.id) {
      return <Login signIn={signIn} />;
    } else {
      return (
        <div>
          <h3>Welcome {user.firstName}</h3>
          {user.isAdmin && <AdminConsole />}
          {!user.isAdmin && <Cart />}
          <Button onClick={logout}>Logout</Button>
        </div>
      );
    }
  }
}

export default UserDashboard;
