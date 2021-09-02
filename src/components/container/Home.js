import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/scss/Home.scss';
import Header from '../layout-view/Header';

const Home = () => (
  <div className="content">
    <Header />
    <div className="hero">
      <h1 className="hero-header">Your quest for a serendipitous cabin begins here</h1>
      <div className="hero-buttons">
        <Link to="/signin" className="btn shadow-lg hero-btn">
          Join Us
        </Link>
      </div>
    </div>

    <section className="some container">
      <h5 className=" my-3 some-header text-center text-uppercase text-secondary">
        We offer the best cabins
      </h5>
      <div className="some-one d-sm-flex py-5">
        <div className="col-md-4">
          <h4 className="text-center py-4">Affordable cabins</h4>
          <p className="some-content py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            natus nostrum rem provident eligendi tempore, omnis saepe, quidem
            consectetur perspiciatis nulla et dicta, rerum laboriosam excepturi
            ea assumenda. Provident repellendus blanditiis eos modi, neque
            laboriosam, recusandae quibusdam, porro laudantium architecto dicta
            rem at praesentium explicabo natus sequi tenetur nobis aliquam.
          </p>

          <a href="/sigin" className="btn shadow-lg hero-btn">
            Learn More
          </a>
        </div>
        <div className="row">
          <img src="https://images.pexels.com/photos/259571/pexels-photo-259571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="ilus" alt="illustration" />
        </div>
      </div>
    </section>
  </div>
);

export default Home;
