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
          height: '400px',
          margin: '25px',
          cursor: 'pointer'
        }}
        onClick={() => {
          navigate("/properties/" + propertyData.Id);
          window.location.reload();
        }}
      >
        <CardMedia component="img" height="140" src={avatarUrl} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
          {propertyData.name.length > 30
      ? propertyData.name.slice(0, 40) + '...'
      : propertyData.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            ${propertyData.price}
          </Typography>
          <Typography variant="subtitle1">{propertyData.PropertyType.name}</Typography>
          <Typography variant="body2">Комнат: {propertyData.rooms}</Typography>
          <Typography variant="body2">{propertyData.description.length > 90
      ? propertyData.description.slice(0, 90) + '...'
      : propertyData.description}</Typography>
      <Typography variant="caption">{new Date(propertyData.updatedAt).toLocaleString()}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyCard;