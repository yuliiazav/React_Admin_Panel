import React from "react";

const Footer = () => {
  return (
    <div className="form-footer">
      <p>
        💙This is a simple admin panel for user management. Developed with an
        incredible desire to create IT solutions by Jul Zavistovska💙
      </p>
      <p>
        &copy; {new Date().getFullYear()} - Admin Panel. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
