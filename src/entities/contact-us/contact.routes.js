import express from 'express';
import {
  createContactController,
  getAllContactController,
  getContactByIdController,
  updateContactController,
  deleteContactController,
} from './contact.controller.js';

const router = express.Router();

router.post('/', createContactController);
router.get('/', getAllContactController);
router.get('/:id', getContactByIdController);
router.put('/:id', updateContactController);
router.delete('/:id', deleteContactController);

export default router;

