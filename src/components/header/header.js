import React from 'react';
import { connect } from 'react-redux';
import { 
    decrementCount,
    incrementCount
} from '../../redux/Counter/counter.actions';
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
     * @param {String} type - a string that will impact what happens in the switch case within the method
     */
    handleClickEvent(type) {
        switch (type) {
            case 'add':
                this.props.incrementCount();
                break;
            case 'subtract':
                this.props.decrementCount();
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
    render() {
        return (
            <div id="header-div">
                <h1>Crosspad 3</h1>
                <strong>Number of times you clicked the button: {this.props.count}</strong>
                <br />
                <Button
                    onClick={() => this.handleClickEvent('add')}
                    variant="outlined"
                >
                    Add
                </Button>
                <Button
                    onClick={() => this.handleClickEvent('subtract')}
                    variant="outlined"
                >
                    Subtract
                </Button>
            </div>
        );
    }
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