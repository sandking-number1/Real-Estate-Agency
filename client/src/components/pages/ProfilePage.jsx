import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import { Button, Grid, TextField } from '@mui/material';
import { getProfile, updateUserInfo, } from "../api/userApi";
import DealsSection from "./profilePage/DealsSection";
import CompletedSection from "./profilePage/CompletedSection";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [userId, setUserId] = useState(localStorage.getItem('id'));

  useEffect(() => {
    const loadData = async () => {
        console.log(userId);
        const response = await getProfile(userId);

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
     await updateUserInfo(userData.Id, editedData);

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
            name="firstName"
            value={editMode ? editedData.firstName || '' : userData.firstName || ''}
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
            name="lastName"
            value={editMode ? editedData.lastName || '' : userData.lastName || ''}
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
            value={editMode ? (editedData.birthDate || '').split('T')[0] : (userData.birthDate || '').split('T')[0]}
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
      <DealsSection/>
      <CompletedSection/>
    </div>
  );
};

export default Profile;