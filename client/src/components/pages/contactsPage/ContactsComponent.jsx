import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from "@mui/material";
import contactsImage from "../img/contacts.jpg";
import { getContacts } from "../../api/contactsApi";

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '50px 0px 50px 0px'
    },
    container: {
        width: '85%',
        display: 'flex',
        alignContent: 'space-between',
        flexDirection: 'row',
        '& div': {
            width: '50%'
        }
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
    },
    left: {
        '& img': {
            height: 'auto',
            width: '100%'
        }
    }
  });

const ContactsComponent = () => {
    const classes = useStyles();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const loadData = async () => {
          try {
            const contactsDataResponse = await getContacts();
      
            if (!contactsDataResponse) {
              console.log("Сервис временно недоступен");
              return;
            }
      
            if (contactsDataResponse.status === 401) {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("role");
              window.location.reload();
              return;
            }
      
            if (contactsDataResponse.status >= 300) {
              console.log("Ошибка при загрузке контактов. Код: " + contactsDataResponse.status);
              console.log(contactsDataResponse);
              return;
            }

            setContacts(contactsDataResponse.data);
          } catch (error) {
            console.error('Error loading data:', error);
          }
        };
      
        loadData();
      }, []);
  
    return (
      <div class={classes.root}>
        <div class={classes.container}>
            <div class={classes.left}>
                <img src={contactsImage} alt="" />
            </div>

            <div class={classes.right}>
                <Typography variant='h2' style={{ fontFamily: "'Helvetica', 'Arial', sans-serif"}}>
                Связаться с нами
                </Typography>

                <Typography variant='body' style={{ fontFamily: "'Helvetica', 'Arial', sans-serif"}}>
                Возникла проблема? Мы постараемся ее решить.
                </Typography>

                {contacts.map(contact => {
                    console.log(JSON.stringify(contact, null, 2));
                    if(contact.ContactType.name === 'email') {
                        return (<Button
                            variant="contained"
                            size="large"
                            color="primary"
                            target="_top"
                            rel="noopener noreferrer"
                            href={'mailto:'+contact.value}
                            style={{margin: '10px 0px 10px 0px'}}
                         >
                            <Typography variant="button" style={{ fontSize: '0.69rem' }}>
                            Электронная почта: {contact.value}
                            </Typography>
                         </Button>)
                    }
                    else return (<Button
                        variant="contained"
                        size="large"
                        color="primary"
                        target="_top"
                        rel="noopener noreferrer"
                        href={'tel:'+contact.value}
                        style={{margin: '10px 0px 10px 0px'}}
                     >
                        <Typography variant="button" style={{ fontSize: '0.69rem' }}>
                        Телефон: {contact.value}
                        </Typography>
                     </Button>);
                })}
            </div>
        </div>
      </div>
    );
  };

export default ContactsComponent;