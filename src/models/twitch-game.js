class TwitchGame {
    constructor (clone) {
        /**
         * @type {Number}
         */
        this.ID = clone?.id;

        /**
         * @type {String}
         */
        this.Name = clone?.name;

        /**
         * @type {String}
         */
        this.Box_Art_URL = clone?.box_art_url;
    }
}

export default TwitchGame;