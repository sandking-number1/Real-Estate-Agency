import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    window.location.reload();
  };
  
  const [scale, setScale] = useState(0.65);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 320) {
        setScale(0.3);
      } else {
        setScale(0.65);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <AppBar position="static" style={{ backgroundColor: "#F8F8F8" }}>
      <Toolbar>
        {/* Лого */}
        <div 
          onClick={() => {
            navigate("/main");
            window.location.reload()
          }}
          style={{
            backgroundImage: `url(${logo})`,
            width: "206px",
            height: "21.5vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: `scale(${scale})`,
            cursor: "pointer", 
          }} 
        />


        {/* Иконки */}
        <div style={{ marginLeft: "auto" }}>
          {/* Профиль */}
          <IconButton color="inherit" onClick={() => {
            navigate("/profile");
            window.location.reload()
          }}>
          <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #000000",
              }}
            >
            <PersonIcon sx={{ fontSize: 24, color: "#000000" }} />
            </Box>
          </IconButton>

          {/* Кнопка выхода */}
          <IconButton color="inherit" onClick={handleLogoutClick}>
          <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #000000",
              }}
            >
            <ExitToAppIcon sx={{ fontSize: 24, color: "#000000" }} />
            </Box>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;