import React from 'react';
import ContactForm from './ContactForm';
import AddressInfo from './AddressInfo';

function ContactPage() {
  return (
    <div className="page-content">
      <ContactForm />
      <AddressInfo />
    </div>
  );
}

export default ContactPage;
