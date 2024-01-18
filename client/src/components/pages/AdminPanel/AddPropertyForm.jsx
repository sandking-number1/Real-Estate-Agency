import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { createProperty } from "../../api/propertiesApi"

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    margin: '50px 0px 50px 0px'
  },
  form: {
    backgroundColor: '#F8F8F8',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    width: '90%'
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

const PersonalInfoForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [propertyData, setPropertyData] = useState({});

  const handleCreateProperty = (e) => {
    e.preventDefault();

    // Validate firstName, lastName, phone, and birthdate
    if (!name || !description || !price) {
      // Handle empty fields
      return;
    }

    const errorHandler = (errorMessage) => {
      // Handle the error, e.g., show an error message to the user
      console.error(errorMessage);
    };

    createProperty({
        name: name,
        description: description,
        price: price
      })
      .then((response) => {
        if (!response) {
          errorHandler("Сервис временно недоступен");
          return;
        }

        if (response.status >= 300) {
          errorHandler("Ошибка при размещении предложения. Код: " + response.status);
          return;
        }

        window.alert("Предложение добавлено");

        navigate("/admin-properties-page");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error while creating property:", error);
        // Handle error
      });
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form}>
        <Typography variant="h4" component="h2" style={{ marginBottom: '2rem' }}>
          Добавить предложение
        </Typography>
        <TextField
          className={classes.input}
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
    
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleCreateProperty}
        >
          Готово
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;