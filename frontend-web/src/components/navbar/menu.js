/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { IconButton, Menu as MuiMenu, MenuItem } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import routes from '../routes';
import { Link as RouterLink } from 'react-router-dom';

export const Menu = (props) => {
  const { atual } = props;
  const [menuRoutes, setMenuRoutes] = React.useState([]);

  const makeRoutes = () => {
    const tempRoutes = [];

    routes
      .filter((route) => route.menuOrder > 0)
      .sort((route) => route.menuOrder)
      .forEach((route) => {
        const permUser = atual.usuarioPermit.find((pu) => pu.modulo === route.modulo);
        if (permUser && permUser.permit >= route.permit) {
          tempRoutes.push(route);
        }
      });

    setMenuRoutes(tempRoutes);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (e) => {
    props.checkUser();
    setAnchorEl(null);
  };

  const handleOpen = (event) => setAnchorEl(event.currentTarget);

  React.useEffect(() => {
    console.log('atual em menu:', atual);
    makeRoutes();
  }, [atual]);

  if (menuRoutes.length === 0) {
    return <></>;
  }

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="abrir menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <MenuIcon />
      </IconButton>
      <MuiMenu
        id="menu-appbar"
        open={open}
        anchorEl={anchorEl}
        onClose={handleMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {menuRoutes.map((route, key) => {
          const path = route.path;
          const label = route.menuTitle;
          return (
            <MenuItem key={key} onClick={handleMenu} component={RouterLink} to={path}>
              {label}
            </MenuItem>
          );
        })}
      </MuiMenu>
    </React.Fragment>
  );
};
