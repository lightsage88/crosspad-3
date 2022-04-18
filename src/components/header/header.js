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
 * This class renders the Header component that will be on the top of the application. 
 * It will enable users to login, signup, and navigate to children pages throughout the application.
 */
// class Header extends React.Component {
function Header(props) {
    const [twitchExpiry, setTwitchExpiry] = useState(new Date());
    const [twitchKey, setTwitchKey] = useState(null);
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         count: 0
    //     };
    //     this.twitch = new TwitchService();
    //     AsyncTools.attach(this);
    // }

    //#region React LifeCycle Methods
    /**
     * This method is a React LifeCycle method which is called once the component mounts.
     */
    // componentDidMount = () => {
    //     twitchService.getCredentials();
    // }
    useEffect(() => {
        console.log('useEffectGoing');
        async function fetchTwitchKey() {
            console.log('in the async');
            let twitchCredentialResponse = await twitchService.getCredentials();
            console.log('twitchCredentialResponse', twitchCredentialResponse);
            let twitchKeyExpiry = twitchCredentialResponse.data.expires_in;
            let refreshTwitchTime = moment().add(twitchKeyExpiry, 'ms');
            console.log('refreshTwitchTime', refreshTwitchTime);
            console.log('refreshTwitchTime as Date', new Date(refreshTwitchTime));
            setTwitchExpiry(new Date(refreshTwitchTime));
            setTwitchKey(twitchCredentialResponse.data);
        }
        if (new Date() > twitchExpiry || !twitchKey) {
            fetchTwitchKey();
        } 
    });
    //#endregion

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