import express from 'express';
import { multerUpload } from '../../core/middlewares/multer.js';
import {
  createLocationController,
  updateLocationController,
  deleteLocationController,
  getLastThreeLocationsController
} from './location.controller.js';

const router = express.Router();

router.get('/', getLastThreeLocationsController);
router.post('/', multerUpload([{ name: 'image', maxCount: 1 }]), createLocationController);
router.put('/:id', multerUpload([{ name: 'image', maxCount: 1 }]), updateLocationController);
router.delete('/:id', deleteLocationController);

export default router;

