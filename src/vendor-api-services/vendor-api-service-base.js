import axios from 'axios';

class VendorAPIServiceBase {
    constructor() {
        /**
         * @type {axios}
         */
        this.axios = axios;
    }
}

export default VendorAPIServiceBase;