import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    decrementCount,
    incrementCount
} from '../../redux/Counter/counter.actions';
import Button from '@mui/material/Button';
import TwitchService from '../../vendor-api-services/twitch-service.js';
import AsyncTools from '../../utilities/async-tools.js';
import PropTypes from 'prop-types';
let twitchService = new TwitchService();

/**
 * This function returns the Header component that will be on the top of the application. 
 * It will enable users to login, signup, and navigate to children pages throughout the application.
 */
function Header(props) {
    const [twitchExpiry, setTwitchExpiry] = useState(new Date());
    const [twitchKey, setTwitchKey] = useState(null);

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
    /**
     * This method handles the clicking of the button in the header.
     * @param {String} type - a string that will impact what happens in the switch case within the method
     */
    function handleClickEvent(type) {
        switch (type) {
            case 'add':
                props.incrementCount();
                break;
            case 'subtract':
                props.decrementCount();
                break;
            default:
                null;
                break;
        }
    }
    //#endregion

    /**
     * This method renders the component.
     * @returns {*} - JSX
     */
    return (
        <div id="header-div">
            <h1>Crosspad 3</h1>
            <strong>Number of times you clicked the button: {props.count}</strong>
            <br />
            <Button
                onClick={() => handleClickEvent('add')}
                variant="outlined"
            >
                Add
            </Button>
            <Button
                onClick={() => handleClickEvent('subtract')}
                variant="outlined"
            >
                Subtract
            </Button>
        </div>
    );
}

const mapStateToProps = state => ({
    count: state.counter.count
});

const mapDispatchToProps = {
    decrementCount,
    incrementCount
};

Header.propTypes = {
    count: PropTypes.number,
    decrementCount: PropTypes.func,
    incrementCount: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);