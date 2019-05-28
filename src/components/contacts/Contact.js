import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../components/context';
import axios from 'axios';

class Contact extends Component {
    state = {
        showContactInfo: false
    };

    onDeleteClick = async (id, dispatch) => {

        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

        dispatch({ type: 'DELETE_CONTACT', payload: id });
    };

    render() {
        const { id, name, email, phone } = this.props.contact;
        const { showContactInfo } = this.state;

        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (

                        <div className="card card-body mb-3 bg-light">
                            <h5>Name:</h5>
                            <div>{name}
                                <div>
                                    <i className="fas fa-times" style={{ cursor: 'pointer', float: 'right', color: 'red' }} onClick={this.onDeleteClick.bind(this, id, dispatch)}>
                                    </i>
                                </div>
                                <div>
                                    <Link to={`contact/edit/${id}`}>
                                        <i
                                            className="fas fa-pencil-alt"
                                            style={{ cursor: 'pointer', float: 'right', color: 'black', marginRight: '0.5rem' }} ></i>
                                    </Link>
                                </div>
                                <div onClick={() => this.setState({ showContactInfo: !this.state.showContactInfo })}
                                    style={{ cursor: 'pointer' }} >
                                    <b className="text-default">
                                        {showContactInfo ? <span className="text-secondary">Show Less</span> : 'Show More'}
                                        {showContactInfo ? <i className="fas fa-sort-up text-secondary"></i> : <i className="fas fa-sort-down"></i>}
                                    </b>
                                </div>
                            </div>

                            {
                                showContactInfo ? (<ul className="list-group">
                                    <li className="list-group-item"><h5 className="font-weight-bold">Email:</h5>
                                        <p>{email}</p></li>

                                    <li className="list-group-item bg-light"><h5 className="font-weight-bold ">Phone:</h5>
                                        <p>{phone}</p></li>
                                </ul>) : null
                            }
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}
Contact.propTypes = {
    contact: PropTypes.object.isRequired,
};
export default Contact;