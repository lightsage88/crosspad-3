import VendorAPIServiceBase from './vendor-api-service-base';
import jsonpAdapter from 'axios-jsonp';

class GiantBombService extends VendorAPIServiceBase {
    constructor() {
        super();
        this.giantBombApiKey = process.env.GIANT_BOMB_API_KEY;
    }

    async getGamesFromServer(req, res) {
        // return {
        //     let response = this.axios({
        //         url: '/giant-bomb?queryString=Super Smash Bros&resourceName=search'
        //     });
        //    // data: ['Sonic 1', 'Mario 5', 'Metroid 6']
        // };
    }

    // /**
    //  * 
    //  * @param {Object} req -
    //  * @param {Object} res -
    //  */
    // async getGames(req, res) {
    //     let gameName = req.query.name;
    //     console.log('gameName', gameName);
    //     // let response = await this.axios.get(`https://www.giantbomb.com/api/games/?api_key=${process.env.REACT_APP_GIANT_BOMB_API_KEY}`, {
    //     //     params: {
    //     //         name: gameName
    //     //     }
    //     // });
    //     let response = await this.axios({
    //         adapter: jsonpAdapter,
    //         method: 'get',
    //         url: `https://www.giantbomb.com/api/games/?api_key=${process.env.REACT_APP_GIANT_BOMB_API_KEY}`,
    //         withCredentials: false,
    //         params: {
    //             name: gameName
    //         },
    //         dataType: 'jsonp'
    //     });
    //     console.log('getGames response: ', response);
    // }

    // async get(req, res) {
    //     let response = await this.axios.
    // }
}

export default GiantBombService;