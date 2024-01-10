import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Checkbox,  FormControlLabel} from '@material-ui/core';
import { Link } from "react-router-dom";
import { login } from "../api/authApi";
import logo from "./img/logo.png";
import back from "./img/back.png";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundImage: `url(${back})`,
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
      cursor: 'pointer',
    },
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [rememberMe, setRememberMe] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
});

    const submit = async () => {

      const response = await login(loginData);

      if (!response) {
          console.log("Сервис временно недоступен")
          return;
      }

      if (response.status === 500) {
          console.log("Повторите попытку позже");
          return;
      }

      if (response.status >= 300) {
          console.log("Неверные данные аккаунта");
          return;
      }

      if (rememberMe) {
        // Save token to local storage for persistent session
        localStorage.setItem('token', response.data.token);
        localStorage.setItem("role", response.data.role);
      } else {
        // Save token to session storage for one session
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem("role", response.data.role);
      }
      
      window.location.reload();
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form}>
        <div className={classes.logo} />
        <TextField
          className={classes.input}
          label="Е-мейл"
          type="email"
          variant="outlined"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
        <TextField
          className={classes.input}
          label="Пароль"
          type="password"
          variant="outlined"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color="primary"
            />
          }
          label="Запомнить меня"
        />
        <Button
          className={classes.button}
          variant="contained"
          
          onClick={submit}
        >
          Войти
        </Button>
        <Link className={classes.registerLink} to={"/register"}>
          РЕГИСТРАЦИЯ
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;