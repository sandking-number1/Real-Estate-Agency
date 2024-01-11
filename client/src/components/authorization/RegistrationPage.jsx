import React, { useState } from 'react';
import AuthDataForm from '../forms/AuthDataForm';
import PersonalInfoForm from '../forms/PersonalInfoForm';

const RegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    birthDate: '',
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleRegister = () => {
    alert('User registered successfully!');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AuthDataForm
            onNext={handleNext}
            userData={userData}
            setUserData={setUserData}
          />
        );
      case 2:
        return (
          <PersonalInfoForm
            onRegister={handleRegister}
            userData={userData}
            setUserData={setUserData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default RegistrationPage;