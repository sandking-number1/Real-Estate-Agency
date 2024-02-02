import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Select, InputLabel, MenuItem, FormControl, Button, List, ListItem, ListItemText, Link } from '@mui/material';

const AgentsComponent = () => {
  const [agents, setAgents] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [speciality, setSpeciality] = useState(0);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    handleSearch();

      axios
      .get(`/agents/specialities`)
      .then(response => {
        setSpecialities(response.data); // Update properties state with search results
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSearch = () => {
      axios.get('agents', { params: {
        specialityId: speciality,
      } })
      .then(response => {
        setAgents(response.data);
      })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
  };

  const handleSpecialityChange = event => {
    setSpeciality(event.target.value);
  }

  useEffect(() => {
    handleSearch(); // Trigger search on each input change
  }, [speciality]);

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
        <Typography variant="h3">Наши риэлторы</Typography>

      <Box display="flex" alignItems="center" width="100%" justifyContent="space-around" margin="25px 0px">

<Box style={{
  "width":"25%",
}}>
    <FormControl style={{ width: "100%" }}>
    <InputLabel id="combo-box-label">Специальность:</InputLabel>
      <Select
        labelId="combo-box-label"
        value={speciality}
        onChange={handleSpecialityChange}
      >
        <MenuItem key={0} value={0}>
            Все
          </MenuItem>
        {specialities.map((option) => (
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
        {agents.length > 0 ? (
          <List style={
            {
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
          }>
            {agents.map((item) => (
              <ListItem style={
                {
                    width: "50%",
                    display: 'flex'
                }
              }>
                <ListItemText
                style={
                    {
                        width: "33%"
                    }
                  }

                  primary={
                    'ФИО'
                  }
                  secondary={`${item.name}`}
                />
                <ListItemText
                                style={
                                    {
                                        width: "33%"
                                    }
                                  }
                  primary={
                    'Специальность'
                  }
                  secondary={`${item.Speciality.name}`}
                />
                <ListItemText
                                style={
                                    {
                                        width: "33%"
                                    }
                                  }
                  primary={
                    <Link href={`tel:${item.phone}`} target="_blank" rel="noopener">
                      {item.phone}
                    </Link>
                  }
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

export default AgentsComponent;