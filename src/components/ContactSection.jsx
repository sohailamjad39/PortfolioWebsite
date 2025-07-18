import React from "react";

function ContactSection() {
  return (
    <>
      <div className="contact-section">
        <div className="contact-left">
          <h1>You Think It, </h1>
          <h1>I Build It</h1>
        </div>
        <div className="contact-right">
          <div className="contact-info">
            <h2>Let's Get in Touch!</h2>
            <p>Phone: 123-456-7890</p>
            <p>Email: sohailamjad39sgd@gmail.com</p>
            <h3>Or Connect on</h3>
            <div className="linkedIn"><a href="" target="_blank"><img src="linkedIn.svg" alt="LinkedIn" /></a></div>
            <div className="github">
              <a href="" target="_blank"><img src="github.svg" alt="GitHub"/></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactSection;
