import express from 'express';
import { multerUpload } from '../../core/middlewares/multer.js';
import {
  createHeroImageController,
  updateHeroImageController,
  deleteHeroImageController,
  getLastThreeHeroImagesController
} from './heroImage.controller.js';

const router = express.Router();

router.get('/', getLastThreeHeroImagesController);
router.post('/', multerUpload([{ name: 'image', maxCount: 1 }]), createHeroImageController);
router.put('/:id', multerUpload([{ name: 'image', maxCount: 1 }]), updateHeroImageController);
router.delete('/:id', deleteHeroImageController);

export default router;

