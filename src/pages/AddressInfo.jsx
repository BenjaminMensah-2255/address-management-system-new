// AddressInfo.js
import React from 'react';
import './AddressInfo.css'; 

function AddressInfo() {
  return (
    <section id="address-section" className="address-info-container">
      <h2>Our Location</h2>
      <div className="address-info">
        <div className="address-details">
          <p><strong>Company Name:</strong> ikolilu Tech Company</p>
          <p><strong>Address:</strong> 123 Main Street, Kanashie</p>
          <p><strong>City:</strong> Accra</p>
          <p><strong>State/Region:</strong> Greater Accra</p>
          <p><strong>Postal Code:</strong> 40202</p>
          <p><strong>Country:</strong> Ghana</p>
        </div>
      </div>
      <div className="map-container">
        {/* Embed a map here (Google Maps, OpenStreetMap, etc.) */}
        <iframe
          src="https://www.google.com/maps/embed?params=your-location"
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          title="Map"
        ></iframe>
      </div>
      <div className="map-links">
        <a href="https://maps.google.com/?q=123+Main+Street+Accra" target="_blank" rel="noopener noreferrer">
          Open in Google Maps
        </a>
      </div>
    </section>
  );
}

export default AddressInfo;
