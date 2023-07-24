import React, { useState } from 'react';

const Contact = () => {
  const [isMessageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
  };

  const handleDismiss = () => {
    setMessageSent(false);
  };

  return (
    <section className="contact-us">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>Have any questions or feedback? We'd love to hear from you!</p>
      </div>
      <div className="contact-content">
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required/>
            <input type="email" placeholder="Your Email" required/>
            <textarea placeholder="Your Message" rows="6" required/>
            <button type="submit" className="send-button">Send Message</button>
          </form>
        </div>
        <div className="contact-info">
          <h3>Our Location</h3>
          <p>105 R. O'Connor St</p>
          <p>Ottawa ON, K2P 0C7</p>
          <h3>Email</h3>
          <p>fitlife@gmail.com</p>
          <h3>Phone</h3>
          <p>+1 (800) 278-2001</p>
        </div>
      </div>
      {isMessageSent && (
        <div className="notification-modal">
          <div className="notification-content">
            <p>Message sent successfully!</p>
            <button className="dismiss-button" onClick={handleDismiss}>Dismiss</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
