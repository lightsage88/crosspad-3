import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import {
    decrementCount,
    incrementCount
} from '../../redux/Counter/counter.actions';
import PropTypes from 'prop-types';

/**
 * This function renders the ButtonReduxExperiment Component
 * @param {Object} props - an object of properties from the parent of this component
 * @returns {*} - JSX
 */
function ButtonReduxExperiment(props) {

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

    return (
        <div>
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

ButtonReduxExperiment.propTypes = {
    count: PropTypes.number,
    decrementCount: PropTypes.func,
    incrementCount: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonReduxExperiment);