import React from 'react';

import Footer from '../../header/Footer';
import Header from './AdminHeader';
import CatalogSection from '../propertiesPage/CatalogSection';
import AddPropertyForm from './AddPropertyForm'

const AdminPropertiesPage = () => {
  return (
    <div>
      <Header />  
      <AddPropertyForm/>
      <CatalogSection />  
      <Footer />
    </div>
  );
};

export default AdminPropertiesPage;