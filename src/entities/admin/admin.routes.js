import express from 'express';
import { getDashboardInfoController, getCustomerListController} from './admin.controller.js';

const router = express.Router();

router.get('/dashboard-info', getDashboardInfoController);
router.get('/customer-list', getCustomerListController);




export default router;

