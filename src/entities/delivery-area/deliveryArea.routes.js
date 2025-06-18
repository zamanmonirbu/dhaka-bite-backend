import express from 'express';
import {
  getDeliveryAreasController,
  getDeliveryAreaByIdController,
  createDeliveryAreaController,
  updateDeliveryAreaController,
  deleteDeliveryAreaController,
} from './deliveryArea.controller.js';

const router = express.Router();

router.get('/', getDeliveryAreasController);
router.get('/:id', getDeliveryAreaByIdController);
router.post('/', createDeliveryAreaController);
router.put('/:id', updateDeliveryAreaController);
router.delete('/:id', deleteDeliveryAreaController);

export default router;
