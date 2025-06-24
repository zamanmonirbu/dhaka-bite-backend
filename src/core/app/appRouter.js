import express from 'express';
import authRoutes from '../../entities/auth/auth.routes.js';
import userRoutes from '../../entities/user/user.routes.js';
import deliveryAreaRoutes from '../../entities/delivery-area/deliveryArea.routes.js';
import heroImageRoutes from '../../entities/heroImage/heroImage.routes.js';
import mealPackageRoutes from '../../entities/meal-package/mealPackage.routes.js';
import mealRoutes from '../../entities/meal/meal.routes.js'; 
import OtherPackageRoutes from '../../entities/other-package/otherPackage.routes.js';
import reviewRatingRoutes from '../../entities/review-rating/reviewRating.routes.js';
import locationRoutes from '../../entities/location/location.routes.js';
import contactRoutes from '../../entities/contact-us/contact.routes.js';
import blogRoutes from '../../entities/blog/blog.routes.js';
import offerRoutes from '../../entities/offer/offer.routes.js';
import mainMealRoutes from '../../entities/main-meal/mainMeal.routes.js';
import subcriptionRoutes from '../../entities/subcription/subcription.routes.js';
import adminRoutes from '../../entities/admin/admin.routes.js';

// import otherServiceRoutes from '../../entities/other-service/otherService.routes.js';
const router = express.Router();

// Define all your routes here
router.use('/v1/auth', authRoutes);
router.use('/v1/delivery-area', deliveryAreaRoutes);
router.use('/v1/hero-image',heroImageRoutes);
router.use('/v1/meal-package',mealPackageRoutes);
router.use('/v1/meals', mealRoutes);  
router.use('/v1/main-meal',mainMealRoutes); 
router.use('/v1/offers', offerRoutes); 
router.use('/v1/review-rating', reviewRatingRoutes);
router.use('/v1/contact-us', contactRoutes); // Assuming you have a contact route file
router.use('/v1/location', locationRoutes); // Assuming you have a location route file
router.use("/v1/blogs", blogRoutes);
router.use('/v1/subcription', subcriptionRoutes); // Assuming you have a meal route file

router.use('/v1/admin', adminRoutes);


router.use('/v1/other-package', OtherPackageRoutes); // Assuming you have a route file for other packages

// router.use('/v1/other-service', otherServiceRoutes);  

router.use('/v1/user', userRoutes);
// router.use('/v1/admin', adminRoutes);


export default router;
