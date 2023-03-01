/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { IconButton, Menu as MuiMenu, MenuItem } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import routes from '../routes';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { HOMEDIR } from '../util/auth';

export const Menu = (props) => {
  const { atual, changeMode } = props;
  const [menuRoutes, setMenuRoutes] = React.useState([]);
  const navegate = useNavigate();

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
    if (changeMode) {
      navegate(`${HOMEDIR}/`);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (e) => {
    props.checkUser();
    setAnchorEl(null);
  };

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  // const handleClose = () => setAnchorEl(null);
  //console.l og("menuRoutes", menuRoutes);

  React.useEffect(() => {
    makeRoutes();
  }, [atual, changeMode]);

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
        <MenuItem> ... {props.mode.toUpperCase()}</MenuItem>
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
