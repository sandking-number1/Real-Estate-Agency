import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const ReviewsComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    // Запрос на сервер для получения всех отзывов с данными о пользователе и заказе
    axios
      .get('/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleNextReview = () => {
    setCurrentReviewIndex(prevIndex => (prevIndex + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex(prevIndex => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const getStarRating = isPositive => {
    // Конвертирование рейтинга в звезды (можно использовать иконки звезд)
    switch (isPositive) {
      case false:
        return '👎';
      case true:
        return '👍';
      default:
        return '';
    }
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
        <Typography variant='h3'>
            Отзывы
        </Typography>
      <Box
        bgcolor="white"
        p={2}
        borderRadius="4px"
        display="flex"
        alignItems="center"
        flexDirection="column"
        marginBottom="16px"
        gap={'3vh'}
        style={{
            width: '50%',
            backgroundColor: '#F3F3FA',
            height: '300px',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'    
        }}
      >
        {reviews.length > 0 ? (
          <>
            <Typography variant="h4" align="center" marginBottom={'1vh'} >
              {getStarRating(reviews[currentReviewIndex].isPositive)}
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              «{reviews[currentReviewIndex].description}»
            </Typography>
            <Typography variant="body2" align="center" color="textSecondary">
                {reviews[currentReviewIndex].User.firstName+' '+reviews[currentReviewIndex].User.lastName} <br></br>
              {new Date(reviews[currentReviewIndex].createdAt).toLocaleDateString()+' '+new Date(reviews[currentReviewIndex].createdAt).toLocaleTimeString()}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" align="center" color={'Black'}>
            Нет доступных отзывов.
          </Typography>
        )}
      </Box>
      {reviews.length > 1 && (
        <Box display="flex" alignItems="center" justifyContent="center" marginTop="16px">
          <IconButton color="primary" onClick={handlePrevReview}>
            <ArrowBack />
          </IconButton>
          <IconButton color="primary" onClick={handleNextReview}>
            <ArrowForward />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ReviewsComponent;