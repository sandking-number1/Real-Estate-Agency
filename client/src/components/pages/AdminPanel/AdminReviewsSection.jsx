import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Paper } from '@mui/material';

const AdminReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'positive', 'negative'

  useEffect(() => {
    axios
      .get('/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const filteredReviews = filter === 'all' ? reviews : reviews.filter(review => {
    if (filter === 'positive') {
      return review.isPositive;
    } else if (filter === 'negative') {
      return !review.isPositive;
    }
    return false;
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <FormControl component="fieldset">
        <RadioGroup value={filter} onChange={handleFilterChange} row>
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="positive" control={<Radio />} label="Positive" />
          <FormControlLabel value="negative" control={<Radio />} label="Negative" />
        </RadioGroup>
      </FormControl>

      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        {filteredReviews.map(review => (
          <Paper
            key={review.id}
            elevation={3}
            style={{ width: '80%', padding: '1rem', marginBottom: '1rem' }}
          >
            <Typography variant="body1" fontWeight="bold" align="center" mb={1}>
              {review.description}
            </Typography>
            <Typography variant="body2" align="center">
              <Typography variant="body2" color={review.isPositive ? 'green' : 'red'} align="center">
              {review.isPositive ? 'Positive' : 'Negative'}
            </Typography>
            <Typography>{review.User.firstName + ' ' + review.User.lastName}, {new Date(review.updatedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}</Typography>
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default AdminReviewsSection;