import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import PropertyCard from '../propertiesPage/PropertyCard';

const DealsSection = () => {
  const [properties, setProperties] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('id'));

  useEffect(() => {
    axios
      .get(`/deals/user/${userId}`, userId)
      .then(response => {
        setProperties(response.data);
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
        {properties.length > 0 ? (
          properties.map(property => {
            return <PropertyCard propertyData={property} />;
          })
        ) : (
          <Typography variant="body1" align="center" color={'Black'}>
            Пусто.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DealsSection;