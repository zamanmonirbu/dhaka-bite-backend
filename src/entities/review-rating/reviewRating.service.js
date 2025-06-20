import ReviewRating from "./reviewRating.model.js";

export const createReviewRatingService = async ({review, rating, userId}) => {
  // console.log("Creating review rating with data:", { review, rating, userId });
  const reviewRating = new ReviewRating({
    review,
    rating,
    userId
  });
  const createdReviewRating = await reviewRating.save();
  return createdReviewRating;
};

export const getReviewRatingByUserIdService = async (userId) => {
  const reviewRatings = await ReviewRating.find({ userId });
  return reviewRatings;
};

export const getReviewRatingByIdService = async (id) => {
  const reviewRating = await ReviewRating.findById(id);
  if (!reviewRating) {
    throw new Error("Review rating not found");
  }
  return reviewRating;
};

export const deleteReviewRatingService = async (id) => {
  const reviewRating = await ReviewRating.findByIdAndDelete(id);
  if (!reviewRating) {
    throw new Error("Review rating not found");
  }
  return reviewRating;
};

export const updateReviewRatingService = async (id, data) => {
  const reviewRating = await ReviewRating.findByIdAndUpdate(id, data, { new: true });
  if (!reviewRating) {
    throw new Error("Review rating not found");
  }
  return reviewRating;
};  

export const getLatestAcceptedReviewsService = async () => {
  console.log("Fetching latest accepted reviews");
  const reviewRatings = await ReviewRating.find({ accepted: true })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("userId", "name profileImage");
  return reviewRatings;
};

