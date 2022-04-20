class TwitchStream {
    constructor (clone) {
        
        /**
         * @type {String}
         */
        this.ID = clone?.id;

        /**
         * @type {String}
         */
        this.User_Name = clone?.user_name;

        /**
         * @type {String}
         */
        this.Game_Name = clone?.game_name;

        /**
         * @type {String}
         */
        this.Title = clone?.title;

        /**
         * @type {Number}
         */
        this.Viewer_Count = clone?.viewer_count;

        /**
         * @type {String}
         */
        this.Thumbnail_URL = clone?.thumbnail_url;

        /**
         * @type {Boolean}
         */
        this.Is_Mature = clone?.is_mature;

        /**
         * @type {any}
         */
        this.Started_At = clone?.started_at;
    }
};

export default TwitchStream;