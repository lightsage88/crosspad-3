import React from 'react';
import Button from '@mui/material/Button';
import TwitchService from '../../vendor-api-services/twitch-service.js';
import AsyncTools from '../../utilities/async-tools.js';
import PropTypes from 'prop-types';

/**
 * This class renders the Header component that will be on the top of the application. 
 * It will enable users to login, signup, and navigate to children pages throughout the application.
 */
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.twitch = new TwitchService();
        AsyncTools.attach(this);
    }

    //#region React LifeCycle Methods
    /**
     * This method is a React LifeCycle method which is called once the component mounts.
     */
    async componentDidMount() {
        this.twitch.getCredentials();
    }
    //#endregion


    //#region Event Handlers
    /**
     * This method handles the clicking of the button in the header.
     */
    handleClickEvent() {
        console.log('handleClickEvent running...', this.state.count);
        this.setStateAsync({ count: this.state.count + 1 })
    }
    //#endregion

    /**
     * This method renders the component.
     * @returns {*} - JSX
     */
    render() {
        return (
            <div id="header-div">
                <h1>Crosspad 3</h1>
                <strong>Number of times you clicked the button: {this.state.count}</strong>
                <br />
                <Button
                    onClick={() => this.handleClickEvent()}
                    variant="outlined"
                >
                    Click me, fool
                </Button>
            </div>
        );
    }
}

Header.propTypes = {

}

export default Header;