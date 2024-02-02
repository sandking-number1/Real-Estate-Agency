import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import PropertyCard from '../propertiesPage/PropertyCard';

const RecentPropertiesSection = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    axios
      .get('/properties/recent')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error(error);
      });
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
      
      <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin="25px 0px"
      width="100%"
    >
        <Typography variant="h3">Новые предложения</Typography>
    </Box>
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
            Нет доступных предложений.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RecentPropertiesSection;