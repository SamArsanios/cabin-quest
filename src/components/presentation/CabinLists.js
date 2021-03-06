import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const CabinLists = (props) => {
  const { cabin } = props;
  const srcImg = 'https://images.pexels.com/photos/2444349/pexels-photo-2444349.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
  const cabinDetails = cabin ? (
    <div className="card shadow-lg p-0">
      <Card.Img
        variant="top"
        src={cabin.image ? cabin.image : srcImg}
      />
      {cabin.body && (
        <div className="house-status">
          <div className="house-state">{cabin.status}</div>
          {cabin.status === 'available' && (
            <button type="button" className="house-btn btn hero-btn">
              Make an offer
            </button>
          )}
        </div>
      )}
      <Card.Body>
        <Card.Title className="text-uppercase font-weight-bolder">
          {cabin.name}
        </Card.Title>
        <div className="card-details">
          <p>Location:</p>
          <p>{cabin.location}</p>
        </div>
        <div className="card-details">
          <p>Address:</p>
          <p>{cabin.address}</p>
        </div>
        <div className="card-details">
          <p>Region:</p>
          <p>{cabin.region}</p>
        </div>
        <div className="card-details">
          <p>Country:</p>
          <p>{cabin.country}</p>
        </div>

        <hr />
        <Link to={`/cabins/${cabin.id}`} className="btn hero-btn w-100">
          View Cabin
        </Link>
      </Card.Body>
    </div>
  ) : (
    <div className="loading">
      <Loading />
    </div>
  );
  return cabinDetails;
};

export default CabinLists;
