class GiantBombGameSearch {
    constructor (clone) {
        /**
         * @type {String}
         */
        this.Deck = clone?.deck;

        /**
         * @type {String}
         */
        this.GUID = clone?.guid;

        /**
         * @type {String}
         */
        this.Name = clone?.name;

        /**
         * @type {String}
         */
        this.Original_Release_Date = clone?.original_release_date;

        /**
         * @type {String}
         */
        this.Icon_Image_URL = clone?.image?.icon_url;

        /**
         * @type {String}
         */
        this.Thumb_Image_URL = clone?.image?.thumb_url;
    }
}

export default GiantBombGameSearch;