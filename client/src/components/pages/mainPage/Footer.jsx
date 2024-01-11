import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
    backgroundColor: '#1C3988'
  },
  text: {
    color: '#F3F3FA',
    fontSize: '20px',
    textAlign: 'center',
  },
  logo: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    height: '100%',
    '& img': {
        width: 'auto',
        height: '25%'
    }
  },
});

const Footer = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
        <div className={classes.logo}
        onClick={() => {
            navigate("/main");
            window.location.reload()
          }}
          >
            <img src={logo} alt="" />
            <p className={classes.text}>Rental Estate Agency</p>
        </div>
    </div>
  );
};

export default Footer;