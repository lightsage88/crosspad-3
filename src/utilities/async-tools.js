/**
 * AsyncTools a class of utilites meant to safeguard against lapses in information from React's 'this.setState' method that is part of its class components. It is meant to replace 'this.setState' in part of the code where you want to ensure that the seting of state completed before any subsequent operations occur. To use this feature, do the following:
 * add "import AsyncTools from '../../assets/utilities/async-tools" to the imports in your component.
 * in the bottom of your constructor add the following line: "AsyncTools.attach(this);"
 * now you can use 'this.setStateAsync(...)' whereever you like in your component.
 */
class AsyncTools {

    static attach(obj) {
        obj.setStateAsync = AsyncTools.setStateAsync.bind(obj);
    }

    static setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }
}

export default AsyncTools;