import React from 'react';

import Footer from '../header/Footer';
import Header from '../header/Header';
import ContactsComponent from './contactsPage/ContactsComponent';
import AgentsComponent from './contactsPage/AgentsComponent';

const ContactsPage = () => {
  return (
    <div>
      <Header />  
      <ContactsComponent />
      <AgentsComponent />
      <Footer />
    </div>
  );
};

export default ContactsPage;