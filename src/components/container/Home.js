import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/scss/Home.scss';
// import ilus1 from '../../assets/images/ilus1.svg';
// import ilus2 from '../../assets/images/ilus2.svg';
import Header from '../layout-view/Header';

const Home = () => (
  <div className="content">
    <Header />
    <div className="hero">
      <h1 className="hero-header">Your quest for a serendipitous cabin begins here</h1>
      {/* <p className="hero-desc">
        The best offers for you at any point of your journey. A home is
        priceless, let &apos; s offer you an opportunity to make one.
      </p> */}
      <div className="hero-buttons">
        <Link to="/signin" className="btn shadow-lg hero-btn">
          Join Us
        </Link>
      </div>
    </div>

    <section className="some py-5 container">
      <h5 className=" my-4 some-header text-center text-uppercase text-secondary">
        The simplest way to rent.
      </h5>
      <h3 className="some-header py-3 text-center text-secondary">
        Comfortable Rooms from Reliable People.
      </h3>
      <div className="some-one d-sm-flex">
        <div className="col-md-4">
          <h4 className="text-center py-4">All at your fingertip</h4>
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

    <section className="some bg-light my-5 py-5">
      <h5 className=" py-4 some-header text-center text-uppercase text-secondary">
        The simplest way to rent.
      </h5>
      <h3 className="some-header py-3 text-center text-secondary">
        Comfortable Rooms from Reliable People.
      </h3>
      <div className="some-two d-sm-flex container">
        <div className="col-md-4">
          <h4 className="text-center py-4">All at your fingertip</h4>
          <p className="some-content py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            natus nostrum rem provident eligendi tempore, omnis saepe, quidem
            consectetur perspiciatis nulla et dicta, rerum laboriosam excepturi
            ea assumenda. Provident repellendus blanditiis eos modi, neque
            laboriosam, recusandae quibusdam, porro laudantium architecto dicta
            rem at praesentium explicabo natus sequi tenetur nobis aliquam.
          </p>

          <a href="/signin" className="btn shadow-lg hero-btn">
            Learn More
          </a>
        </div>

        <div className="row">
          {/* <img src={ilus2} className="ilus" alt="illustration 2" /> */}
        </div>
      </div>
    </section>

    {/* <section className="pre-footer text-light">
      <h5 className="text-center font-weight-bolder text-uppercase mb-4">
        Cabin Quest!
      </h5>
      <Link to="/#" className="btn hero-btn shadow-lg">
        {' '}
        Free Trial
      </Link>
    </section> */}
  </div>
);

export default Home;
