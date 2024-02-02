import React from 'react';

import Footer from '../header/Footer';
import Header from '../header/Header';
import MainInfo from './mainPage/MainInfo';
import RecentPropertiesSection from './mainPage/RecentPropertiesSection';

const MainPage = () => {
  return (
    <div>
      <Header />  
      <MainInfo />
      <RecentPropertiesSection />
      <Footer />
    </div>
  );
};

export default MainPage;