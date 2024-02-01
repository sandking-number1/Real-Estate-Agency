import React from 'react';

import Footer from '../../header/Footer';
import Header from './AdminHeader';
import AdminReviewsSection from './AdminReviewsSection';

const ReviewsPage = () => {
  return (
    <div>
      <Header />  
      <AdminReviewsSection />
      <Footer />
    </div>
  );
};

export default ReviewsPage;