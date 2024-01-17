import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button } from '@material-ui/core';
import { getProfile } from "../../api/userApi";
import { createDeal } from "../../api/dealsApi";

const PropertyInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({});
  const [avatarUrl, setAvatarUrl] = useState('');
  const [dealData, setDealData] = useState({});
  const [userData, setUserData] = useState({});

  const createDealHandler = async () => {
        const userDataResponse = await getProfile();
  
        if (!userDataResponse) {
          console.log("Сервис временно недоступен");
          return;
        }
  
        if (userDataResponse.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("role");
          window.location.reload();
          return;
        }
  
        if (userDataResponse.status >= 300) {
          console.log("Ошибка при загрузке профиля. Код: " + userDataResponse.status);
          console.log(userDataResponse);
          return;
        }
  
        setUserData(userDataResponse.data);

    setDealData({
        ...dealData,
        isClosed: false,
        isSold: false,
        PropertyId: id,
        UserId: userData.Id
      });

      createDeal(dealData);

      navigate('profile');
  };

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`/properties/${id}`);
      setProperty(response.data.property);
    } catch (error) {
      console.error('Error fetching property:', error);
    }
  };

  useEffect(() => {
    fetchProperty();

    axios.get(`/properties/avatar/${id}`, { responseType: 'blob' })
      .then(res => {
        setAvatarUrl(URL.createObjectURL(res.data));
      })
      .catch(error => {
        console.error(`Error fetching avatar for property ID ${id}:`, error);
      });

    
  }, [id]);

  console.log(JSON.stringify(property, null, 2));

  if (Object.keys(property).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box
    style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "90%",
        margin: "50px 5% 50px 5%"
    }}>
        <Typography variant="h2">{property.name}</Typography>

        

        <Box
            style={
                {
                    display: "flex",
                    justifyContent: "space-around",
                    width: "100%",
                    margin: "20px 0px 20px 0px"
                }
            }>
        <Box
            style= {
                {
                    display: "flex",
                    justifyContent: "center",
                    width: "45%",
                    height: "500px",
                    overflow: "hidden"
                }
            }>
            <img src={avatarUrl} alt="Example Image" width="100%" height="auto"/>
        </Box>

            <Box
                style={
                    {
                        width: "45%",
                        height: "500px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }
                }>
                <Typography variant="h4" style={
                    {
                        color: "#6495ED",
                        fontFamily: "system-ui"
                    }
                }>{property.price}$</Typography>

                <Typography variant="body1"
                    style={
                        {
                            wordWrap: "break-word"
                        }
                    }>
                    {property.description}
                </Typography>

                <Button variant="contained" onClick={createDealHandler}>
                    Приобрести (с вами свяжутся)
                </Button>
            </Box>
         
        </Box>
    </Box>
  );
};

export default PropertyInfo;