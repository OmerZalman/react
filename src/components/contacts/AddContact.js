import React, { Component } from 'react';
import { Consumer } from '../../components/context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

class AddContact extends Component {

  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;


    //check for errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is reuired' } })
      return;
    };
    if (email === '') {
      this.setState({ errors: { email: 'Email is reuired' } })
      return;
    };
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is reuired' } })
      return;
    };

    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios
      .post(
        'https://jsonplaceholder.typicode.com/users',
        newContact);

    dispatch({
      type: 'ADD_CONTACT',
      payload: res.data
    })

    //clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  onChange = e => this.setState({
    [e.target.name]:
      e.target.value
  });

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (

            <div className="card mb-3">
              <div className="bg-light text-primary card-header text-center">
                <b>
                  Add Contact
                </b>
              </div>
              <div className="card-body">

                <form onSubmit={this.onSubmit.bind(this, dispatch)}>

                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label="email"
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    label="phone"
                    name="phone"
                    type="phone"
                    placeholder="Enter your Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input type="submit" value="Add Contact" className="btn btn-light btn-block" />

                </form>
              </div>
            </div>

          )
        }}
      </Consumer>
    )

  }
}


export default AddContact;