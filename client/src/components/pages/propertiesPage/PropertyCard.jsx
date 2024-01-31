import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const PropertyCard = ({ propertyData }) => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    axios.get(`/properties/avatar/${propertyData.Id}`, { responseType: 'blob' })
      .then(res => {
        setAvatarUrl(URL.createObjectURL(res.data));
      })
      .catch(error => {
        console.error(`Error fetching avatar for property ID ${propertyData.Id}:`, error);
      });
  }, []);

  return (
    <div>
      <Card
        style={{
          width: '300px',
          height: '350px',
          margin: '50px',
          cursor: 'pointer'
        }}
        onClick={() => {
          navigate("/properties/" + propertyData.Id);
          window.location.reload();
        }}
      >
        <CardMedia component="img" height="140" src={avatarUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {propertyData.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            ${propertyData.price}
          </Typography>
          <Typography variant="body2">Комнат: {propertyData.rooms}</Typography>
          <Typography variant="body2">{propertyData.PropertyType.name}</Typography>
          <Typography variant="body2">{propertyData.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyCard;