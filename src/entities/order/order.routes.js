import express from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController,
} from "./order.controller.js";
import { adminMiddleware, riderAdminMiddleware, userMiddleware } from "../../core/middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", userMiddleware, createOrderController);
router.get("/", riderAdminMiddleware, getAllOrdersController);
router.get("/:id", getOrderByIdController);
router.put("/:id",riderAdminMiddleware, updateOrderController);
router.delete("/:id",adminMiddleware, deleteOrderController);

export default router;
