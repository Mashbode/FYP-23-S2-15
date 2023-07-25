import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

<<<<<<< HEAD
import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
=======
import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
>>>>>>> main

import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            {/* <Link to="/users/test">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </Link> */}
<<<<<<< HEAD

            <React.Fragment>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
=======
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
>>>>>>> main
                {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 0 }}
<<<<<<< HEAD
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
=======
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
>>>>>>> main
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
<<<<<<< HEAD
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
=======
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
>>>>>>> main
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
<<<<<<< HEAD
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
=======
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
>>>>>>> main
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
<<<<<<< HEAD
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
=======
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
>>>>>>> main
                      zIndex: 0,
                    },
                  },
                }}
<<<<<<< HEAD
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Link to="/users/test" style={{ textDecoration: "none"}}>
                  <MenuItem onClick={handleClose} sx={{fontSize:15}}>
=======
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Link to="/users/test" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={handleClose} sx={{ fontSize: 15 }}>
>>>>>>> main
                    <Avatar /> Full Name
                  </MenuItem>
                </Link>
                <MenuItem>
                  Username1
<<<<<<< HEAD
                  <br/>user1@example.com
=======
                  <br />
                  user1@example.com
>>>>>>> main
                </MenuItem>
                <Divider />
                {/* <MenuItem onClick={handleClose} sx={{fontSize:15}}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem> */}
                <Link to="/users/edit" style={{ textDecoration: "none" }}>
<<<<<<< HEAD
                  <MenuItem onClick={handleClose} sx={{fontSize:15}}>
=======
                  <MenuItem onClick={handleClose} sx={{ fontSize: 15 }}>
>>>>>>> main
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                </Link>
<<<<<<< HEAD
                <MenuItem onClick={handleClose} sx={{fontSize:15}}>
=======
                <MenuItem onClick={handleClose} sx={{ fontSize: 15 }}>
>>>>>>> main
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
