import React, { useState } from 'react';
import './ContactForm.css';
import Footer from './Footer';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendReport = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const { name, email, subject, message } = formData;

    if (name && email && subject && message) {
      // Regular expression to validate email format
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (emailPattern.test(email)) {
        // Prepare the data to send
        const postData = {
          name,
          email,
          subject,
          message,
        };

        // Make an HTTP POST request to the PHP backend
        fetch('http://localhost:8000/api/contact-us.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            // Handle the response from the PHP backend as needed
            console.log(data);
            window.location.reload();

          })
          .catch((error) => {
            // Handle errors, e.g., network issues or errors from the backend
            console.error('There was a problem with the fetch operation:', error);
          });
      } else {
        // Display an alert message
        alert('Email address is not in the correct format.');
      }
    } else {
      // Display an alert message
      alert('All fields (except Email) are required.');
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <h3 className="send">send us a message</h3>
      <form onSubmit={sendReport} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Send</button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default ContactForm;
