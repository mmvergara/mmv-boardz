import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuList from "@mui/material/MenuList";
import Avatar from "@mui/material/Avatar";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavButtons from "./Menus/NavButtons";
import MenuLinks from "./Menus/MenuLinks";
import { navButtonStlye } from "../Style/SXStyles";
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { CrownTheme } from "../Style/Theme";
import { useSelector } from "react-redux";
import { RootState } from "../../state/StoreIndex";
import { useState, useRef } from "react";


const Navbar: React.FC = () => {
  const { isAuthenticated, userpic } = useSelector((state: RootState) => state.AuthSlice);
  const appDiv = useRef<HTMLDivElement | null>(null!);
  const matches = useMediaQuery("(min-width:715px)");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = () => setAnchorEl(appDiv.current!);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Box component='div' sx={{ flexGrow: 1 }}>
        <AppBar ref={appDiv} position='fixed' sx={{ backgroundColor: "#272727", color: "white" }}>
          <Toolbar>
            <ThemeProvider theme={CrownTheme}>
              {isAuthenticated && (
                <>
                  <IconButton
                    size='large'
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}
                    onClick={handleClick}
                  >
                    <Avatar
                      alt='Remy Sharp'
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? "true" : undefined}
                      src={userpic || "https://i.ibb.co/LxryDqs/default.png"}
                      sx={{ width: 36, height: 36 }}
                    />
                  </IconButton>
                  <MenuList variant='selectedMenu'>
                    <Menu
                      id='basic-menu'
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      variant='selectedMenu'
                    >
                      <MenuLinks handleClose={handleClose} />
                    </Menu>
                  </MenuList>
                </>
              )}

              <Typography variant='h6' component='div'>
                <Link className='hoverWhite' to='/' style={{ color: "white" }}>
                  BoardZ <BorderColorIcon />
                </Link>
              </Typography>
              {isAuthenticated && <NavButtons matches={matches} />}

              {!isAuthenticated && (
                <Link className='hoverWhite' to='/auth/login' style={{ marginLeft: "auto" }}>
                  <Button variant='contained' color='primary' sx={navButtonStlye}>
                    Login
                  </Button>
                </Link>
              )}
            </ThemeProvider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
