/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import './main.css'; // Link to custom CSS

const Main = () => {
  const [activeImage, setActiveImage] = useState(0); // State to track the current image

  const images = [
    '/images/login-page-image-1.png',  // Image 1
    '/images/login-page-2.jpg',        // Image 2
    '/images/login-page-image-3.jpg',  // Image 3
    '/images/login-page-image-4.jpg',  // Image 4
  ];

  // Function to go to the next image
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-play feature using useEffect
  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // Change image every 3 seconds

    // Clear interval when the component is unmounted or when the interval changes
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-left">
          {/* Image Carousel */}
          <div className="carousel-container">
            <img
              src={images[activeImage]}
              alt={`Medical Image ${activeImage + 1}`}
              className="modal-image"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="carousel-controls">
            <button className="prev" onClick={prevImage}>Previous</button>
            <button className="next" onClick={nextImage}>Next</button>
          </div>
        </div>
        <div className="modal-right">
          <h1>Sign Up</h1>
          {/* Sign Up Form */}
          <form>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="Enter Full Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter Password" required />
            </div>
            <button type="submit" className="btn-submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
