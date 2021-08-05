/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCabins } from '../../redux/actions/cabinActions';
import CabinLists from '../presentation/CabinLists';
import Loading from '../presentation/Loading';
import Errors from '../presentation/Errors';

class Cabins extends Component {
  componentDidMount() {
    const { fetchCabins } = this.props;
    fetchCabins();
  }

  render() {
    const { cabins, errors, loading } = this.props;

    const cabinsLoad = cabins.length ? (
      <div className="container-xl">
        <div className="cabin-container my-4 py-3">
          {cabins
            && cabins.map((cabin) => (
              <CabinLists cabin={cabin} key={cabin.id} errors={errors} />
            ))}
        </div>
      </div>
    ) : (
      <div className="loading">
        {loading && <Loading />}
        {errors && <Errors />}
      </div>
    );

    return cabinsLoad;
  }
}

Cabins.propTypes = {
  errors: PropTypes.any,
  cabins: PropTypes.any,
  loading: PropTypes.any,
  fetchCabins: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cabins: state.data.cabins,
  loading: state.data.loading,
  errors: state.error.err,
  cabin: state.data.cabin,
});

export default connect(mapStateToProps, { fetchCabins })(Cabins);
