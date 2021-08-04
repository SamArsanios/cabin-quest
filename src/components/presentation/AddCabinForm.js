import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Errors from './Errors';

import {
  createCabin,
  fetchCabins,
  updateCabin,
  unLoad,
} from '../../redux/actions/cabinActions';

class AddCabinForm extends Component {
  constructor(props) {
    super(props);
    const { cabin, status } = this.props;
    this.state = {
      name: cabin.name && status === 'Update' ? cabin.name : '',
      country: 'Ug',
      address: cabin.body && status === 'Update' ? cabin.body.address : '',
      region: 'K City',
      image: cabin.body && status === 'Update' ? cabin.body.image : '',
      location: cabin.body && status === 'Update' ? cabin.body.location : '',
      status:
        cabin.body && status === 'Update' ? cabin.body.status : 'available',
      user_id: cabin.body && status === 'Update' ? cabin.body.user : 0,
    };
  }

  componentDidMount() {
    const { currentUser, history } = this.props;

    currentUser
      ? this.setState({
        ...this.state,
        user_id: currentUser.id,
      })
      : history.push('/signin');
  }

  render() {
    const {
      createCabin,
      cabin,
      status,
      close,
      loading,
      updateCabin,
      unLoad,
      history,
      type,
      errors,
      cabinImgUrl,
    } = this.props;

    const availability = ['available', 'processing', 'unavailable'];
    const handleChange = e => {
      const { id, value } = e.target;
      this.setState({
        [id]: value,
      });
    };

    const handleSubmit = e => {
      e.preventDefault();
      if (status === 'Add') {
        unLoad({ loading: true });
        cabinImgUrl.image
          && this.setState(
            {
              ...this.state,
              image: cabinImgUrl.image,
            },
            () => {
              createCabin(this.state);
              if (type === 'create_cabin' && !loading) {
                cabin.id && status !== 'Update' && history.push(`/cabins/${cabin.id}`);
                close();
              }
            },
          );
      } else if (status === 'Update') {
        unLoad({ loading: true });

        if (cabinImgUrl.image) {
          this.setState(
            {
              ...this.state,
              image: cabinImgUrl.image,
            },
            () => {
              updateCabin(this.state, cabin.id);
              close();
            },
          );
        } else {
          updateCabin(this.state, cabin.id);
          close();
        }
      }
    };

    const { name, address, location } = this.state;
    const { status: stateUs } = this.state;

    return (
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          {errors && <Errors />}
          <Form.Group controlId="name" className="pb-3">
            <Form.Control
              required
              type="text"
              placeholder="Enter a unique Cabin name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="address" className="pb-3">
            <Form.Control
              required
              type="text"
              placeholder="Enter cabin address"
              value={address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="location" className="pb-3">
            <Form.Control
              required
              type="text"
              placeholder="Enter cabin location"
              value={location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Select a Cabin Status</Form.Label>
            <Form.Control as="select" value={stateUs} onChange={handleChange}>
              {availability.map(hstate => (
                <option key={hstate}>{hstate}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button className="btn hero-btn w-100" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

AddCabinForm.propTypes = {
  errors: PropTypes.any,
  unLoad: PropTypes.any,
  cabinImgUrl: PropTypes.any,
  loading: PropTypes.any,
  status: PropTypes.string.isRequired,
  currentUser: PropTypes.any,
  updateCabin: PropTypes.any,
  cabin: PropTypes.any,
  createCabin: PropTypes.any,
  close: PropTypes.func.isRequired,
  history: PropTypes.any,
  type: PropTypes.string,
};

const mapStateToProps = state => ({
  errors: state.error.err,
  cabinImgUrl: state.data.cabinImgUrl,
  currentUser: state.userData.currentUser,
  cabin: state.data.cabin,
  loading: state.userData.loading,
  type: state.succMsg.type,
});

const ShowTheLocationWithRouter = withRouter(AddCabinForm);

export default connect(mapStateToProps, {
  createCabin,
  fetchCabins,
  updateCabin,
  unLoad,
})(ShowTheLocationWithRouter);
