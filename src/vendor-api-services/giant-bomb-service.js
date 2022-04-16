import VendorAPIServiceBase from "./vendor-api-service-base";

class GiantBombService extends VendorAPIServiceBase {
    constructor() {
        this.giantBombApiKey = process.env.GIANT_BOMB_API_KEY
    }

    // async get(req, res) {
    //     let response = await this.axios.
    // }
}

export default GiantBombService;