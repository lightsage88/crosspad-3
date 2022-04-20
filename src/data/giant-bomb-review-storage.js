import GiantBombReview from '../models/giant-bomb-review';
import DataStorage from './data-storage';

const GiantBombReviewStorage = new DataStorage(GiantBombReview, '/api/giant-bomb');

export { GiantBombReview, GiantBombReviewStorage };