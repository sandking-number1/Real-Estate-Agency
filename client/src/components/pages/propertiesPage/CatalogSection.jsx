import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Slider, Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import PropertyCard from './PropertyCard';

const CatalogSection = () => {
  const [properties, setProperties] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [roomsValue, setRoomsValue] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [propertyType, setPropertyType] = useState(0);

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

      axios
      .get(`/properties/types`)
      .then(response => {
        setPropertyTypes(response.data); // Update properties state with search results
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSearch = () => {
    const requestData = {
        price: priceValue,
        rooms: roomsValue,
        propertyTypeId: propertyType,
        search: searchValue
      };
  
      axios.get('properties/search', { params: requestData })
      .then(response => {
        setProperties(response.data);
      })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
  };

  const handleInputChange = event => {
    setSearchValue(event.target.value);
  };

  const handleRoomsChange = event => {
    setRoomsValue(event.target.value);
  }

  const handlePriceChange = event => {
    setPriceValue(event.target.value);
  }

  const handlePropertyTypeChange = event => {
    setPropertyType(event.target.value);
  }

  useEffect(() => {
    handleSearch(); // Trigger search on each input change
  }, [searchValue, roomsValue, priceValue, propertyType]);

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
      <Box display="flex" alignItems="center" width="100%" justifyContent="space-around" margin="25px 0px">

            <Box width="25%">
            <InputLabel id="rooms-label">Комнат:</InputLabel>
      <Slider
      labelId="rooms-label"
        value={roomsValue}
        onChange={handleRoomsChange}
        min={0}
        max={10}
        step={1}
        marks
        valueLabelDisplay="auto"
        />
    </Box>

    <Box width="25%">
    <InputLabel id="price-label">Макс. цена:</InputLabel>
      <Slider
      labelId="price-label"
        value={priceValue}
        onChange={handlePriceChange}
        min={0}
        max={100000}
        step={1000}
        marks
        valueLabelDisplay="auto"
        />
    </Box>

<Box style={{
  "width":"25%",
}}>
    <FormControl style={{ width: "100%" }}>
    <InputLabel id="combo-box-label">Тип:</InputLabel>
      <Select
        labelId="combo-box-label"
        value={propertyType}
        onChange={handlePropertyTypeChange}
      >
        <MenuItem key={0} value={0}>
            Все
          </MenuItem>
        {propertyTypes.map((option) => (
          <MenuItem key={option.Id} value={option.Id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

</Box>


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