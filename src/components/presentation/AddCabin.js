import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddCabinForm from './AddCabinForm';
import ImageUploader from './ImageUploader';

class AddCabin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  render() {
    const handleShow = () => {
      this.setState({
        show: true,
      });
    };

    const handleClose = () => {
      this.setState({
        show: false,
      });
    };
    const { cabin, status } = this.props;
    const { show } = this.state;

    return (
      <div>
        <Button
          variant="transparent"
          className="btn hero-btn cus-btn w-100"
          onClick={handleShow}
        >
          {`${status}  Cabin`}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new Cabin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ImageUploader status={status} />
            <AddCabinForm close={handleClose} cabin={cabin} status={status} />
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </div>
    );
  }
}
AddCabin.propTypes = {
  cabin: PropTypes.any,
  status: PropTypes.any,
};

export default AddCabin;
