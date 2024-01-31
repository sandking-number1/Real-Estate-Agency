import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button } from '@mui/material';
import PropertyCard from './PropertyCard';

const CatalogSection = () => {
  const [properties, setProperties] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    axios
      .get('/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      axios
        .get(`/properties/search/${searchValue}`)
        .then(response => {
          setProperties(response.data); // Update properties state with search results
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      getAll(); // Reset properties state to all properties
    }
  };

  const handleInputChange = event => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    handleSearch(); // Trigger search on each input change
  }, [searchValue]);

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
        <Typography variant="h3">Поиск предложения</Typography>
      <Box display="flex" alignItems="center" width="40%" justifyContent="space-around" margin="25px 0px">
        <TextField
            label="Поиск..."
            variant="outlined"          
            value={searchValue}
            onChange={handleInputChange} />
      </Box>
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

export default CatalogSection;