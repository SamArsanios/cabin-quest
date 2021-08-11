import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import { unloadError } from '../../redux/actions/utilityActions';

class Errors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  componentWillUnmount() {
    const { unloadError } = this.props;
    unloadError();
  }

  render() {
    const { show } = this.state;
    const { errors } = this.props;

    const setShow = () => {
      const { unloadError } = this.props;
      unloadError();
      this.setState({
        show: false,
      });
    };

    return (
      <div>
        <Alert show={show} variant="danger">
          <Alert.Heading>Sorry Something went wrong!</Alert.Heading>
          <div>
            {errors.request && (
            <h6 className="my-4">{errors.request.response}</h6>
            )}

            {errors.message && (
            <h6 className="my-4">
              {errors.message}
              {' '}
            </h6>
            )}
            {errors.response && (
            <h6 className="my-4">{errors.response.data.error}</h6>
            )}

            {errors.response && errors.response.status === 401 && (
            <h6 className="my-4 text-center">
              Your Login session has expired. Kindly login again.
            </h6>
            )}

            {errors.response && (
            <h6 className="my-4">{errors.response.data.error}</h6>
            )}
            <h6 className="content">
              If you are trying to login double check your username,email and
              password
            </h6>
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={setShow} variant="outline-danger">
              close
            </Button>
          </div>
        </Alert>
      </div>
    );
  }
}

Errors.propTypes = {
  errors: PropTypes.shape,
  unloadError: PropTypes.func.isRequired,
};

Errors.defaultProps = {
  errors: PropTypes.shape,
};

const mapStateToProps = (state) => ({
  errors: state.error.err,
});

export default connect(mapStateToProps, { unloadError })(Errors);
