import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@mui/material";
import mainInfoImage from "../img/mainInfo.JPG";

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '50px 0px 50px 0px'
    },
    container: {
        width: '85%',
        display: 'flex',
        alignContent: 'space-between',
        flexDirection: 'row',
        '& div': {
            width: '50%'
        }
    },
    left: {

    },
    right: {
        '& img': {
            height: 'auto',
            width: '100%'
        }
    }
  });

const MainInfo = () => {
    const classes = useStyles();
  
    return (
      <div class={classes.root}>
        <div class={classes.container}>
            <div class={classes.left}>
                <Typography variant='h1' style={{ fontFamily: "'Helvetica', 'Arial', sans-serif"}}>
                Современная жизнь для каждого
                </Typography>
                <Typography variant='h5' style={{ fontFamily: "'Helvetica', 'Arial', sans-serif"}}>
                Мы предоставляем комплекс услуг по продаже и покупке недвижимости. Мы работаем на территории Республики Беларусь более 15 лет.
                </Typography>
            </div>

            <div class={classes.right}>
                <img src={mainInfoImage} alt="" />
            </div>
        </div>
      </div>
    );
  };

export default MainInfo;