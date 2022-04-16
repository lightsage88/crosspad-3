import axios from "axios";
import VendorAPIServiceBase from "./vendor-api-service-base";

class TwitchService extends VendorAPIServiceBase {
    constructor() {
        super();
    }

    async getCredentials() {
        console.log('hohoho', process.env);
        // let response = await axios.create({
        //     headers: {
        //         'Client-ID': process.env.TWITCH_CLIENT_ID
        //     }
        // })
        let response = await axios.post(
            `https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&client_secret=${process.env.REACT_APP_TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
        );
        console.log('TwitchService: getCredentials running: ', response);
    }


};

export default TwitchService;