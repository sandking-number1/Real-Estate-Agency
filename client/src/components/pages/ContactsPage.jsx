import React from 'react';

import Footer from '../header/Footer';
import Header from '../header/Header';
import ContactsComponent from './contactsPage/ContactsComponent';

const ContactsPage = () => {
  return (
    <div>
      <Header />  
      <ContactsComponent />
      <Footer />
    </div>
  );
};

export default ContactsPage;