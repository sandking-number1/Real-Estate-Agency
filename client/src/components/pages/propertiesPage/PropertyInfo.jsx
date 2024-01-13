import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PropertyInfo = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/properties/${id}`);
        setProperty(response.data.property);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  console.log(JSON.stringify(property, null, 2));

  if (Object.keys(property).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Property Page</h2>
      <p>Property ID: {property.Id}</p>
      <p>Property Name: {property.name}</p>
      <p>Property Description: {property.description}</p>
      <p>Property Price: {property.price}</p>
      <p>Property Status: {property.isSold ? 'Sold' : 'Available'}</p>
      <p>Created At: {property.createdAt}</p>
      <p>Updated At: {property.updatedAt}</p>
      {/* Render other property details */}
    </div>
  );
};

export default PropertyInfo;