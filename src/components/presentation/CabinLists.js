import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const CabinLists = (props) => {
  const { cabin } = props;
  const srcImg = 'https://images.unsplash.com/photo-1575263977165-207a71e8f31f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9';
  const cabinDetails = cabin ? (
    <div className="card shadow-lg p-0">
      <Card.Img
        variant="top"
        src={cabin.body.image ? cabin.body.image : srcImg}
      />
      {cabin.body && (
        <div className="house-status">
          <div className="house-state">{cabin.body.status}</div>
          {cabin.body.status === 'available' && (
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
          <p>{cabin.body.location}</p>
        </div>
        <div className="card-details">
          <p>Country:</p>
          <p>{cabin.body.country}</p>
        </div>
        <div className="card-details">
          <p>Region:</p>
          <p>{cabin.body.region}</p>
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
