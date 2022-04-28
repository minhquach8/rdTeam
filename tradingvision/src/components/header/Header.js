import { 
    AppBar, Avatar,
    Container, 
    Toolbar, 
    Typography, InputBase, 
    IconButton, createTheme, 
    ThemeProvider, CssBaseline,} from "@material-ui/core";
import React, {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import useStyles from "./style";
import Navbar from './Navbar'
import Modal from '@mui/material/Modal';
import SearchPopup from "../search/SearchPopup";
import 'react-toastify/dist/ReactToastify.css';

const darkTheme = createTheme({
palette: {
  primary: {
    main: "#000",
  },
  type: "dark",
},
});

const Header = ({user}) =>{ 

    const classes = useStyles();
    const history = useNavigate(); 
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [test, setTest] = useState(false);
    const handleOpen = () => setTest(true);
    const handleClosed = () => setTest(false); 
    const logout = () => {
        window.open("http://ec2-3-14-136-159.us-east-2.compute.amazonaws.com/auth/logout", "_self");
    };
    const [click, setClick] = useState(false); 

return ( 
    <ThemeProvider theme={darkTheme}>
        <AppBar position="static" className={classes.appbar}>
            <CssBaseline/>
            <Container>
                <Toolbar>

                    <Typography 
                    onClick={() => history("/")} 
                    className={classes.title}
                    > Trading Vision </Typography>
                    <div className={ user ? classes.search : classes.searchNotLogin}>
                        
                        {user ? (
                            <>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        onClick={handleOpen}
                                        style={{fontFamily: "Montserrat"}}
                                        readOnly={true}
                                        />
                            </>
                        ):(
                            <>

                            
                            </>
                        )}
                        
                        
                        
                        <Modal
                            keepMounted
                            open={test}
                            onClose={handleClosed}
                            
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
                            style={{ alignItems: "center", justifyContent: "center", paddingTop: 100}}
                            BackdropProps={{ style: { backgroundColor: 'rgba(1,1,1,0.9)',
                             } }}
                        >
                            <SearchPopup user={user}/>
                        </Modal>
                    </div>

                    <div className={classes.navlinks}>
                       {user ?(
                        <Navbar className={classes.link} click={click} setClick={setClick}/>
                       ):(
                        <></>
                       )}
                       
                        
                    </div>
                    {auth && (
                    <div className={classes.menu} >
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit">
                            
                            {user ? (
                                <Avatar src={user.image} alt='avatar' style={{height: "33px", width: "33px"}}/>
                            ):(
                                <AccountCircle style={{height: "33px", width: "33px"}}/>
                            )}
                        </IconButton>
                        {user ? (
                            <Menu 
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => {history("/profile"); handleClose()}}
                                        >
                                <AccountCircle/>  
                                <Typography
                                style={{ marginLeft: '10px', fontFamily:"Montserrat"}}>Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {history("/login"); handleClose(); logout();}}>
                                <LogoutIcon/>
                                <Typography
                                style={{ marginLeft: '10px', fontFamily:"Montserrat"}}>Sign Out</Typography>
                            </MenuItem>
                        </Menu>
                        ):(
                            <Menu id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}>
                                <MenuItem onClick={() => {history("/login"); handleClose();}}>
                                    <LogoutIcon/>
                                    <Typography
                                    style={{ marginLeft: '10px', fontFamily:"Montserrat"}}>Sign In</Typography>
                                </MenuItem>
                            </Menu>
                        )}
                        
                    </div>
                    )}
                </Toolbar>
            </Container>

        </AppBar>
        </ThemeProvider>
)
}

export default Header