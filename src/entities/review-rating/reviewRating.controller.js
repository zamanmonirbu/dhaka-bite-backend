import {
  createReviewRatingService,
  getReviewRatingByIdService,
  getReviewRatingByUserIdService,
  deleteReviewRatingService,
  updateReviewRatingService,
  getLatestAcceptedReviewsService,
} from './reviewRating.service.js';
import { generateResponse } from '../../lib/responseFormate.js';

export const createReviewRatingController = async (req, res) => {
  try {
    const reviewRating = await createReviewRatingService(req.body);
    generateResponse(res, 201, true, 'Review rating created successfully', reviewRating);
  } catch (error) {
    // console.log('Error creating review rating:', error);
    generateResponse(res, 500, false, 'Failed to create review rating', null);
  }
};

export const getReviewRatingByIdController = async (req, res) => {
  try {
    const reviewRating = await getReviewRatingByIdService(req.params.id);
    generateResponse(res, 200, true, 'Review rating fetched successfully', reviewRating);
  } catch (error) {
    console.log('Error fetching review rating:', error);
    generateResponse(res, 500, false, 'Failed to fetch review rating', null);
  }
};

export const getReviewRatingByUserIdController = async (req, res) => {
  try {
    const reviewRatings = await getReviewRatingByUserIdService(req.params.userId);
    generateResponse(res, 200, true, 'Review ratings fetched successfully', reviewRatings);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to fetch review ratings', null);
  }
};

export const deleteReviewRatingController = async (req, res) => {
  try {
    const reviewRating = await deleteReviewRatingService(req.params.id);
    generateResponse(res, 200, true, 'Review rating deleted successfully', reviewRating);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to delete review rating', null);
  }
};

export const updateReviewRatingController = async (req, res) => {
  try {
    const updatedReviewRating = await updateReviewRatingService(req.params.id, req.body);
    generateResponse(res, 200, true, 'Review rating updated successfully', updatedReviewRating);
  } catch (error) {
    generateResponse(res, 500, false, 'Failed to update review rating', null);
  }
};

export const getLatestAcceptedReviewsController = async (req, res) => {
  console.log('Fetching latest accepted reviews...');
  try {
    const reviews = await getLatestAcceptedReviewsService();
    generateResponse(res, 200, true, 'Latest accepted reviews fetched successfully', reviews);
  } catch (error) {
    console.log('Error fetching latest accepted reviews:', error);
    generateResponse(res, 500, false, 'Failed to fetch latest accepted reviews', null);
  }
};