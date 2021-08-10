import React from 'react';
import Icofont from 'react-icofont';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand font-weight-bolder">
        <Icofont icon="building" />
        CABIN QUEST
      </div>
      <div className="footer-address">
        <h6 className="text-secondary">
          Choose us, Visit us
          {' '}
          <br />
          <hr />
        </h6>
      </div>
    </div>
  </footer>
);

export default Footer;
