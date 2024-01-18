import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { List, ListItem, ListItemText, Link, Button } from '@material-ui/core';

const DealsPage = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    axios
      .get(`/deals/opened`)
      .then(response => {
        setDeals(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSell = (param) => {
    axios
      .post(`/deals/sell/${param}`)
      .then(response => {
        setDeals(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      console.log(1);
      window.location.reload();
  };

  const handleClose = (param) => {
    axios
      .post(`/deals/close/${param}`)
      .then(response => {
        setDeals(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      window.location.reload();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      padding="16px"
      borderRadius="4px"
      boxShadow={1}
    >
      <Typography variant="h3">Активные сделки</Typography>
      <Box
        style={{
          width: '100%',
          padding: '15px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexWrap: 'wrap',
          flexDirection: 'row'
        }}
      >
        {deals.length > 0 ? (
          <List style={
            {
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
          }>
            {deals.map((item) => (
              <ListItem style={
                {
                    width: "80%",
                    display: 'flex',
                    alignItems: 'spaceBetween'
                }
              }>
                <ListItemText
                  primary={
                    'Данные покупателя'
                  }
                  secondary={`Id: ${item.UserId}`}
                />
                <ListItemText
                  primary={
                    <Link href={`/properties/${item.PropertyId}`} target="_blank" rel="noopener">
                      Ссылка на предложение&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Link>
                  }
                  secondary={`Дата: ${item.createdAt}`}
                />
                <Button variant="contained" color="primary" onClick={() => handleSell(item.Id)}>
                  Подтвердить
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleClose(item.Id)}>
                 Отклонить
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" align="center" color={'Black'}>
            Пусто.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DealsPage;