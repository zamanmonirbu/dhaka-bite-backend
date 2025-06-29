import express from 'express';
import {
  createReviewRatingController,
  getReviewRatingByIdController,
  getReviewRatingByUserIdController,
  deleteReviewRatingController,
  updateReviewRatingController,
  getLatestAcceptedReviewsController,
  adminApprovalController,
} from './reviewRating.controller.js';

const router = express.Router();

// ✅ Keep static routes first
router.get('/latest-accepted', getLatestAcceptedReviewsController);
router.get('/admin-under-approval', adminApprovalController); // Assuming this is the same as latest accepted reviews
router.get('/user/:userId', getReviewRatingByUserIdController);
router.post('/', createReviewRatingController);

// ✅ Keep dynamic routes after
router.get('/:id', getReviewRatingByIdController);
router.put('/:id', updateReviewRatingController); // ✅ fixed typo
router.delete('/:id', deleteReviewRatingController);

export default router;
