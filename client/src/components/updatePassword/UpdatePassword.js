import React, { Component } from 'react';
import axios from 'axios';
class UpdatePassword extends Component {
  state = { password: '' };
  render() {
    return (
      <div>
        <input
          type='password'
          name='password'
          // value={this.state.password}
          onChange={e => {
            this.setState({ password: e.target.value });
          }}
        />
        <button
          // disabled={this.state.password ? false : true}
          onClick={() => {
            axios.post(
              'https://forum-server.netlify.app/.netlify/functions/app/updatepassword',
              {
                password: this.state.password,
                token: this.props.match.params.token
              }
            );
          }}
        >
          click here
        </button>
      </div>
    );
  }
}

export default UpdatePassword;
