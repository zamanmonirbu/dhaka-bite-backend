import express from 'express';
import { multerUpload } from '../../core/middlewares/multer.js';
import {
  getMealPackagesController,
  getMealPackageByIdController,
  createMealPackageController,
  updateMealPackageController,
  deleteMealPackageController,
} from './otherPackage.controller.js';

const router = express.Router();

router.get('/', getMealPackagesController);
router.get('/:id', getMealPackageByIdController);
router.post('/', multerUpload([{ name: 'image', maxCount: 1 }]), createMealPackageController);
router.put('/:id', multerUpload([{ name: 'image', maxCount: 1 }]), updateMealPackageController);
router.delete('/:id', deleteMealPackageController);

export default router;
