import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import logo from "./img/logo.png";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundSize: 'cover',
  },
  form: {
    backgroundColor: '#F8F8F8',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',

  },
  logo: {
    marginBottom: '2rem',
    width: '206px',
    height: '167px',
    backgroundImage: `url(${logo})`,
    backgroundSize: 'cover',
  },
  input: {
    marginBottom: '1rem',
  },
  button: {
    width:'60%',
    backgroundColor: '#FED84C',
    color: 'white',
    borderRadius: '7px',
    '&:hover': {
      backgroundColor: '#FED84C',
    },
  },
  registerLink: {
    marginTop: '10px',
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#CCCCCC',
    color: '#000000',
    borderRadius: '7px',
    textDecoration: 'none',
    border: '1px solid #000000',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const AuthDataForm = ({ onNext, setUserData }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNext = (e) => {
    e.preventDefault();

    // Validate email, password, and confirmPassword
    if (!email || !password || !confirmPassword) {
      // Handle empty fields
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    }

    setUserData(prevUserData => ({
      ...prevUserData,
      email: email,
      password: password,
    }));
    

    // Handle successful validation
    onNext();
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleNext}>
        <div className={classes.logo} />
        <TextField
          className={classes.input}
          label="Е-мейл"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Пароль"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Повторите пароль"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={Boolean(passwordError)}
          helperText={passwordError}
        />
        <Button
          className={classes.button}
          style={
            {
                backgroundColor: "#1C3988"
            }
          }
          variant="contained"
          type="submit"
        >
          Далее
        </Button>
      </form>
    </div>
  );
};


export default AuthDataForm;