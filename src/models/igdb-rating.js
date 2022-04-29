class IGDBRating {
    constructor(clone) {
        /**
         * @type {String}
         */
        this.Name = clone?.name;

        /**
         * @type {String}
         */
        this.Total_Rating = clone?.total_rating;
    }
}

export default IGDBRating;