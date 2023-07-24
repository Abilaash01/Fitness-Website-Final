import React from 'react';
import { Button } from 'react-bootstrap';
import aboutUsImage from '../images/aboutus.jpg';

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            Achieve your fitness goals with personalized workout routines targeting various muscle groups. Track your
            progress, stay motivated, and join a supportive community of fitness enthusiasts. Start your journey to a
            healthier you today!
          </p>
          <a href="/Planner" className="read-more">
            <Button> Plan Your Next Workout</Button>
          </a>
        </div>
        <div className="about-image">
          <img src={aboutUsImage} alt="About Us" style={{ width: '400px', height: '200px', float: 'right' }} />
        </div>
      </div>
    </section>
  );
};

export default About;
