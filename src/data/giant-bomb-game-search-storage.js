import GiantBombGameSearch from '../models/giant-bomb-game-search.js';
import DataStorage from './data-storage';

const GiantBombGameSearchStorage = new DataStorage(GiantBombReview, '/api/giant-bomb');

export { GiantBombGameSearch, GiantBombGameSearchStorage };