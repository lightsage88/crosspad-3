class GiantBombReview {
    constructor (clone) {
        /**
         * @type {String}
         */
        this.API_Detail_URL = clone?.api_detail_url;

        /**
         * @type {String} 
         */
        this.Deck = clone?.deck;

        /**
         * @type {String}
         */
        this.Description = clone?.description;

        /**
         * @type {any}
         * @todo -what is this?
         */
        this.DLC = clone?.dlc;

        /**
         * @type {any}
         * @todo - what is this?
         */
        this.DLC_Name = clone?.dlc_name;

        /**
         * @type {Number}
         */
        this.ID = clone?.id;

        /**
         * @type {String}
         */
        this.GUID = clone?.guid;

        /**
         * @type {String}
         */
        this.Publish_Date = clone?.publish_date;

        /**
         * @type {Number}
         */
        this.Score = clone?.score;
    }
}

export default GiantBombReview;