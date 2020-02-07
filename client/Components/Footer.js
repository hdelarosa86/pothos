import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="copyright">{new Date().getFullYear()} Pothos.com</div>
      </div>
    </footer>
  );
};

export default Footer;
