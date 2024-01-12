import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import { Avatar, Button, Typography, Grid, TextField } from '@mui/material';
import { getProfile, updateUserInfo, } from "../api/userApi";
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const loadData = async () => {
        const response = await getProfile();

        if (!response) {
            console.log("Сервис временно недоступен");
            return;
        }

        if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("role");
            window.location.reload();
        }

        if (response.status >= 300) {
            console.log("Ошибка при загрузке профиля. Код: " + response.status);
            console.log(response);
            return;
        }

        setUserData(response.data);
        setEditedData(response.data);
    };

    loadData();
}, []);


  const handleEdit = async () => {
    if (editMode) {
     const response = await updateUserInfo(userData.id, editedData);

    setUserData(editedData);
    setEditMode(false);

    } else {
      setEditMode(true);
    }
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <TextField
            label="Имя"
            fullWidth
            name="name"
            value={editMode ? editedData.name || '' : userData.name || ''}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <TextField
            label="Фамилия"
            fullWidth
            name="surname"
            value={editMode ? editedData.surname || '' : userData.surname || ''}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={editMode ? editedData.email || '' : userData.email || ''}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <TextField
            label="Номер телефона"
            fullWidth
            name="phone"
            value={editMode ? editedData.phone || '' : userData.phone || ''}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <TextField
            label="Дата рождения"
            fullWidth
            name="birth_date"
            value={editMode ? (editedData.birth_date || '').split('T')[0] : (userData.birth_date || '').split('T')[0]}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <TextField
            label="Описание профиля"
            fullWidth
            name="description"
            value={editMode ? editedData.description || '' : userData.description || ''}
            onChange={handleChange}
            margin="normal"
            disabled={!editMode}
            InputProps={{
              style: {
                color: 'black'
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#FED84C', marginTop: '16px', float: 'right' }}
            onClick={handleEdit}
          >
            {editMode ? 'Готово' : 'Редактировать'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;