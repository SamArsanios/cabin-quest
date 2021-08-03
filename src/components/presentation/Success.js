import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {successMessage} from '../../redux/actions/utilityActions';
import { Alert, Button } from 'react-bootstrap';

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  componentWillUnmount() {
    const { successMessage } = this.props;
    successMessage('');
  }

    render() {
      const { show } = this.state;
      const { success } = this.props;

      const setShow = () => {
        const { successMessage } = this.props;
        successMessage('');
        this.setState({
          show: false,
        });
      };
        return (
          <div className="alert-success col-sm-10 col-md-6 col-ld-4 mx-auto">
          <Alert show={show} variant="success">
            <Alert.Heading>{success.message}</Alert.Heading>
  
            <div className="d-flex justify-content-end">
              <Button onClick={setShow} variant="outline-success">
                close
              </Button>
            </div>
          </Alert>
        </div>
        );
    }
}

Success.propTypes = {
  success: PropTypes.shape,
  successMessage: PropTypes.func.isRequired,
};

Success.defaultProps = {
  success: PropTypes.shape,
};

const mapStateToProps = (state) => ({
  success: state.succMsg.message
})


export default connect(mapStateToProps, {successMessage})(Success);
