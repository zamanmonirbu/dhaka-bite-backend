import express from "express";
import {
  createOffer,
  getAllOffers,
  deleteOffer,
} from "./offer.controller.js";
import { multerUpload } from "../../core/middlewares/multer.js";


const router = express.Router();

router.post("/", multerUpload([{ name: "image", maxCount: 1 }]), createOffer);
router.get("/", getAllOffers);
router.delete("/:id", deleteOffer);

export default router;
