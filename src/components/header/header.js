import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import moment from 'moment';
import Button from '@mui/material/Button';
import TwitchService from '../../vendor-api-services/twitch-service.js';
import AsyncTools from '../../utilities/async-tools.js';
import PropTypes from 'prop-types';
import ButtonReduxExperiment from '../button-redux-experiment/button-redux-experiment';
let twitchService = new TwitchService();

/**
 * This function returns the Header component that will be on the top of the application. 
 * It will enable users to login, signup, and navigate to children pages throughout the application.
 */
function Header(props) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [twitchExpiry, setTwitchExpiry] = useState(new Date());
    const [twitchKey, setTwitchKey] = useState(null);
    const [giantBombKey, setGiantBombKey] = useState(null);
    const pages = ['Home', 'About', 'Projects', 'Contact'];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout', 'Delete THIS'];

    /**
     * This is a React Hook comprising 'componentDidMount', 'componentDidUpdate', and 'componentWillUnmount'
     * React LifeCycle methods. It is comprised of the following areas from top to bottom:
     * 1. Declaration Zone - Where variables global to the scope of the entire 'useEffect' method and methods WITHIN
     * the hook will be defined.
     * 2. Conditional Zone - Where conditionals involving various props, state values within the component are leveraged
     * to perform effects on the component and application.
     * 3. Terminal Zone (optional) - Location of method defined to be run during the 'componentWillUnmount' segment
     * of the useEffect hook happens.
     */
    useEffect(() => {
        //#region Declaration Zone
        /**
         * This method gets the API Key needed to make requests to the Twitch API.
         * It then sets the key value in state, and sets a timer for when a reset will occur based
         * on the expiry received in the response from Twitch.
         */
        async function fetchTwitchKey() {
            let twitchCredentialResponse = await twitchService.getCredentials();
            let twitchKeyExpiry = twitchCredentialResponse.data.expires_in;
            let refreshTwitchTime = moment().add(twitchKeyExpiry, 'ms');
            setTwitchExpiry(new Date(refreshTwitchTime));
            setTwitchKey(twitchCredentialResponse.data);
        }
        //#endregion
        //#region Conditional Zone
        /**
         * "If there is no twitchKey state property OR the current date is more advanced than our expiry target,
         * fetch the TwitchKey"
         */
        if (new Date() > twitchExpiry || !twitchKey) {
            fetchTwitchKey();
        }
        //#endregion
    });

    //#region Event Handlers
    function handleOpenNavMenu(event) {
        setAnchorElNav(event.currentTarget);
    }

    function handleOpenUserMenu(event) {
        setAnchorElUser(event.currentTarget);
    }

    function handleCloseNavMenu(event) {
        setAnchorElNav(null);
    }

    function handleCloseUserMenu(event) {
        setAnchorElUser(null);
    }
    //#endregion

    /**
     * This method renders the component.
     * @returns {*} - JSX
     */
    return (
        <div id="header-div">
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            LOGO
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
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            CROSSPAD 3
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default Header;