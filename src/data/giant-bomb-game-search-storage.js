import GiantBombGameSearch from '../models/giant-bomb-game-search.js';
import DataStorage from './data-storage.js';

const GiantBombGameSearchStorage = new DataStorage(GiantBombGameSearch, '/api/giant-bomb');

export default GiantBombGameSearchStorage;