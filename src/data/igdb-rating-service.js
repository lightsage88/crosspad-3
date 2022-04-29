import IGDBRating from '../models/igdb-rating.js';
import DataStorage from './data-storage.js';

const IGDBRatingStorage = new DataStorage(IGDBRating, '/api/igdb');

export default IGDBRatingStorage;