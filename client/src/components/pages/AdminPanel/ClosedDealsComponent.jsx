import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { List, ListItem, ListItemText, Link, Button } from '@material-ui/core';

const ClosedDealsComponent = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    axios
      .get(`/deals/closed`)
      .then(response => {
        setDeals(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
      <Typography variant="h3">Отчет о завершенных сделках</Typography>
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
                  secondary={`Имя: ${item.User.firstName+' '+item.User.lastName}`}
                />
                <ListItemText
                  primary={
                    <Link href={`/properties/${item.PropertyId}`} target="_blank" rel="noopener">
                      Ссылка на предложение&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Link>
                  }
                  secondary={`Дата: ${item.updatedAt}`}
                />
                <ListItemText
                  primary={
                    'Стоимость'
                  }
                  secondary={`Стоимость: ${'$'+item.Property.price}`}
                />

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

export default ClosedDealsComponent;