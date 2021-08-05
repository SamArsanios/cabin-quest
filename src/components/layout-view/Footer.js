import React from 'react';
import Icofont from 'react-icofont';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand font-weight-bolder py-5">
        <Icofont icon="building" />
        CABIN QUEST
      </div>
      <div className="footer-address py-3">
        <h6 className="text-secondary">
          Choose us, Visit us
          <br />
          Some Address &apos; Street.
          {' '}
          <br />
          <hr />
          +12323445343
        </h6>
      </div>
    </div>
    <p className="footer-copy pt-4">CABIN QUEST || &copy; 2021</p>
  </footer>
);

export default Footer;
