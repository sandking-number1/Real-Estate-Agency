import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { createReview } from "../../api/reviewsApi";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px 0px 50px 0px',
    width: '100%',
    backgroundSize: 'cover',
  },
  form: {
    backgroundColor: '#F8F8F8',
    padding: '2rem',
    display: 'flex',
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',

  },
  logo: {
    marginBottom: '2rem',
    width: '206px',
    height: '167px',
    backgroundSize: 'cover',
  },
  input: {
    width: '100%',
    marginBottom: '1rem',
  },
  button: {
    width:'60%',
    backgroundColor: '#FED84C',
    color: 'white',
    borderRadius: '7px',
    '&:hover': {
      backgroundColor: '#FED84C',
    },
  },
  registerLink: {
    marginTop: '10px',
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#CCCCCC',
    color: '#000000',
    borderRadius: '7px',
    textDecoration: 'none',
    border: '1px solid #000000',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  photoContainer: {
    position: 'relative',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  uploadIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    backgroundSize: 'cover',
  },
  uploadButton: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '7px',
    marginLeft: '1rem',
  },
}));

const NewReviewForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [isPositive, setIsPositive] = useState(true);
  const [reviewData, setReviewData] = useState({
    description: description,
    isPositive: isPositive
  });


  const handleReview = (e) => {
    e.preventDefault();
    
    if (!description) {
      // Handle empty fields
      return;
    }

    const errorHandler = (errorMessage) => {
      // Handle the error, e.g., show an error message to the user
      console.error(errorMessage);
    };

    setReviewData({
      description: description,
      isPositive: isPositive,
    });
    console.log(reviewData);
    createReview(reviewData)
      .then((response) => {
        if (!response) {
          errorHandler("Сервис временно недоступен");
          return;
        }

        if (response.status >= 300) {
          errorHandler("Ошибка при размещении отзыва. Код: " + response.status);
          return;
        }

        navigate("/reviews");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error while creating review:", error);
        // Handle error
      });
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form}>
        <Typography variant="h4" component="h2" style={{ marginBottom: '2rem' }}>
          Ваш отзыв
        </Typography>
        <TextField
          className={classes.input}
          placeholder="Текст отзыва..."
            multiline
            minRows={4}
            maxRows={6}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPositive}
              onChange={(e) => setIsPositive(e.target.checked)}
              color="primary"
            />
          }
          label="Положительный отзыв"
        />
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleReview}
        >
          Готово
        </Button>
      </form>
    </div>
  );
};

export default NewReviewForm;