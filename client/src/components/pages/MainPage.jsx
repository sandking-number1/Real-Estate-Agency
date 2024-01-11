import React from 'react';

import Footer from './mainPage/Footer';
import Header from '../header/Header';
import MainInfo from './mainPage/MainInfo';

const MainPage = () => {
  return (
    <div>
      <Header />  
      <MainInfo />
      <Footer />
    </div>
  );
};

export default MainPage;