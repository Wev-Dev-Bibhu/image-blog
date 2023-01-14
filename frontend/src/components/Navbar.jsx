import * as React from 'react';
import { Avatar, Button, Tooltip, MenuItem, Container, Toolbar, Menu, Typography, IconButton, Box, AppBar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const pages = [{
    key: "about",
    value: "ABOUT"
}, {
    key: "contact",
    value: "CONTACT US"
}, {
    key: "signin",
    value: "SIGN IN"
}];

const settings = [{
    key: "favourites",
    value: "Liked Pics"
}, {
    key: "dashboard",
    value: "Dashboard"
}, {
    key: "logout",
    value: "Logout"
}];

const Navbar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        props.setProgress(50)
        setAnchorElNav(null);
        props.setProgress(100)
    };

    const handleCloseUserMenu = () => {
        props.setProgress(50)
        setAnchorElUser(null);
        props.setProgress(100)
    };

    return (<>
        <AppBar position="sticky">
            <Container maxWidth="xl" sx={{ background: '#0f0f0fd1' }}>
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="span"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    // onClick={props.setProgress(100)}
                    >
                        <NavLink to='/' onClick={() => {
                            props.setProgress(60)
                            setTimeout(() => {
                                props.setProgress(100)
                            }, 400);
                        }} style={{ color: '#fff', textDecoration: "none" }}>LOGO</NavLink>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.key} onClick={handleCloseNavMenu}>
                                    <NavLink to={'/' + page.key} style={{ textDecoration: "none" }}><Typography textAlign="center" style={{ color: "#000" }}>{page.value}</Typography></NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="span"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <NavLink to='/' style={{ color: '#fff', textDecoration: "none" }}  >LOGO</NavLink>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <NavLink to={'/' + page.key} style={{ textDecoration: "none" }}>
                                <Button
                                    key={page.key}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Typography textAlign="center" style={{ color: "#fff" }}>{page.value}</Typography>
                                </Button>
                            </NavLink>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="See Profile">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="B" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.key} onClick={handleCloseUserMenu}>
                                    <NavLink to={'/' + setting.key} style={{ textDecoration: "none", color: '#000' }}> <Typography textAlign="center" noWrap>{setting.value}&nbsp;&nbsp;&nbsp;</Typography></NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
        <LoadingBar color='red' progress={props.progress} onLoaderFinished={() => props.setProgress(0)} />
    </>
    );
}
export default Navbar;
