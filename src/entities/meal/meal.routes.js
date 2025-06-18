import { Router } from 'express';
import { createMealController, getMealsController, getMealByIdController, updateMealController, deleteMealController } from './meal.controller.js';
import { multerUpload } from '../../core/middlewares/multer.js';

const router = Router();

router.post('/', multerUpload([{ name: 'image', maxCount: 1 }]), createMealController);
router.get('/', getMealsController);
router.get('/:id', getMealByIdController);
router.put('/:id', multerUpload([{ name: 'image', maxCount: 1 }]), updateMealController);
router.delete('/:id', deleteMealController);

export default router;
