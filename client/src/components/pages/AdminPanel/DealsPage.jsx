import React from 'react';

import Footer from '../../header/Footer';
import Header from './AdminHeader';
import DealsComponent from './DealsComponent'
import ClosedDealsComponent from './ClosedDealsComponent'

const AdminPropertiesPage = () => {
  return (
    <div>
      <Header />  
      <DealsComponent/>
      <ClosedDealsComponent/> 
      <Footer />
    </div>
  );
};

export default AdminPropertiesPage;