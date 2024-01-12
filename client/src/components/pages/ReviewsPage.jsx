import React from 'react';

import Footer from '../header/Footer';
import Header from '../header/Header';
import NewReviewForm from './reviewsPage/NewReviewForm';
import ReviewsComponent from './reviewsPage/ReviewsComponent';

const ReviewsPage = () => {
  return (
    <div>
      <Header />  
      <NewReviewForm />
      <ReviewsComponent /> 
      <Footer />
    </div>
  );
};

export default ReviewsPage;