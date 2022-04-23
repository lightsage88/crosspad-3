class GiantBombGameSearch {
    constructor(clone) {
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
        this.Medium_Image_URL = clone?.image?.medium_url;

        /**
         * @type {String}
         */
        this.Original_Image_URL = clone?.image?.original_url;

        /**
         * @type {String}
         */
        this.Screen_Image_URL = clone?.image?.screen_url;

        /**
         * @type {String}
         */
        this.Small_Image_URL = clone?.image?.small_url;

        /**
         * @type {String}
         */
        this.Tiny_Image_URL = clone?.image?.tiny_url;

        /**
         * @type {String}
         */
        this.Thumb_Image_URL = clone?.image?.thumb_url;
    }
}

export default GiantBombGameSearch;