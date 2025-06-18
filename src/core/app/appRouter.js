import express from 'express';
import authRoutes from '../../entities/auth/auth.routes.js';
import userRoutes from '../../entities/user/user.routes.js';
import deliveryAreaRoutes from '../../entities/delivery-area/deliveryArea.routes.js';
import heroImageRoutes from '../../entities/heroImage/heroImage.routes.js';
import mealPackageRoutes from '../../entities/meal-package/mealPackage.routes.js';
import mealRoutes from '../../entities/meal/meal.routes.js'; 
const router = express.Router();

// Define all your routes here
router.use('/v1/auth', authRoutes);
router.use('/v1/delivery-area', deliveryAreaRoutes);
router.use('/v1/hero-image',heroImageRoutes);
router.use('/v1/meal-package',mealPackageRoutes);
router.use('/v1/meals', mealRoutes);    
router.use('/v1/user', userRoutes);
// router.use('/v1/admin', adminRoutes);


export default router;
