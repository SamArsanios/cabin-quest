/* eslint-disable no-unused-expressions */
/* eslint-disable   react/no-did-update-set-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadImage, clearImage } from '../../redux/actions/favActions';
import Loading from './Loading';

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      image: {},
    };
  }

  componentDidUpdate() {
    const { cabinImgUrl } = this.props;
    const { loading } = this.state;
    loading
      && cabinImgUrl.image
      && this.setState({
        ...this.state,
        loading: false,
      });
  }

  onChange = (e) => {
    e.preventDefault();
    e.persist();
    this.setState({
      image: e.target.files,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      loading: true,
    });
    const { image } = this.state;

    const form = new FormData();
    form.append('image', image[0]);
    const { uploadImage, clearImage } = this.props;
    clearImage();
    uploadImage(form);
  };

  render() {
    const { cabinImgUrl, status } = this.props;
    const { loading } = this.state;
    return (
      <div className="uploader-container">
        <h1 className="uploader-header">
          {status}
          {' '}
          {' '}
          Image
          {' '}
        </h1>
        <form onSubmit={this.onSubmit} className="uploader-form">
          {!loading ? (
            <div className="uploader-input">
              <input type="file" name="image" onChange={this.onChange} />
              <p className="uploader-desc">
                Click here to update or add an image.
              </p>
              <br />
            </div>
          ) : (
            <div className="loading">
              <Loading />
            </div>
          )}

          {!loading && (
            <button
              type="submit"
              className="btn hero-btn"
              // value={cabinImgUrl.image ? 'Update' : 'Add'}
            >
              Add
            </button>
          )}
        </form>
        {cabinImgUrl.image && (
          <div className="uploaded">
            <img
              className="uploaded-img"
              src={cabinImgUrl.image && cabinImgUrl.image}
              alt={cabinImgUrl.image}
            />
          </div>
        )}
      </div>
    );
  }
}

ImageUploader.propTypes = {
  cabinImgUrl: PropTypes.any,
  uploadImage: PropTypes.func.isRequired,
  status: PropTypes.string,
  clearImage: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  cabinImgUrl: state.data.cabinImgUrl,
});

export default connect(mapStateToProps, { uploadImage, clearImage })(ImageUploader);
