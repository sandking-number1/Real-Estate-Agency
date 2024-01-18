import React from 'react';

import Footer from '../../header/Footer';
import Header from './AdminHeader';
import DealsComponent from './DealsComponent'

const AdminPropertiesPage = () => {
  return (
    <div>
      <Header />  
      <DealsComponent/>
      <Footer />
    </div>
  );
};

export default AdminPropertiesPage;