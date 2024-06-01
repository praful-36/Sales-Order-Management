import React from 'react';
import '../App.css'; // Importing the CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About My Website - Sale Order Management</h1>
        <p>
          Welcome to my website! This platform is designed to provide users with an intuitive interface to manage sales orders efficiently.
        </p>
        <div className="tech-stack">
          <h2>Technologies Used:</h2>
          <ul>
            <li>React 18+ with optimization hooks</li>
            <li>React Router DOM for routing purposes</li>
            <li>Tanstack React Query for managing server state and API calls</li>
            <li>React Hook Form for managing form state</li>
            <li>Chakra-UI for styling, with Chakra MultiSelect for select components</li>
          </ul>
        </div>
        <div className="features">
          <h2>Features:</h2>
          <ul>
            <li>Login page with username "user" and password "password".</li>
            <li>Main page displaying user info, active, completed, and sale orders, with a dark mode switch and logout button.</li>
            <li>Table buttons for viewing, deleting, and marking orders as complete.</li>
            <li>LocalStorage for storing order information.</li>
            <li>API calls mimicked for all events.</li>
            <li>+Sale order feature to add new orders.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
