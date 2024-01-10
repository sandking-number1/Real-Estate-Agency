import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
    alignItems: 'center'
  }
});

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <div className={classes.logo}>
            <img src="../img/logo.png" alt="" />
            <p className={classes.text}>Rental Estate Agency</p>
        </div>
    </div>
  );
};

export default Footer;