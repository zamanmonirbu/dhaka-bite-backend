import { generateResponse } from "../../lib/responseFormate.js";
import {
  createOfferService,
  getAllOffersService,
  deleteOfferService,
} from "./offer.service.js";


// POST /api/offers
export const createOffer = async (req, res) => {
  try {
    const data = req.body;
    const file = req.files?.image?.[0];
    const offer = await createOfferService(data, file);
    generateResponse(res, 201, true, "Offer created successfully", offer);
  } catch (error) {
    generateResponse(res, 500, false, "Failed to create offer", null);
  }
};
// GET /api/offers
export const getAllOffers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    const { offers, total } = await getAllOffersService(parsedPage, parsedLimit);

    const pagination = {
      currentPage: parsedPage,
      totalPages: Math.ceil(total / parsedLimit),
      totalData: total,
      hasNextPage: parsedPage * parsedLimit < total,
      hasPrevPage: parsedPage > 1,
    };

    generateResponse(res, 200, true, "Offers fetched successfully", {
      offers,
      pagination,
    });
  } catch (error) {
    generateResponse(res, 500, false, "Failed to fetch offers", null);
  }
};


// DELETE /api/offers/:id
export const deleteOffer = async (req, res) => {
  try {
    const offer = await deleteOfferService(req.params.id);
    generateResponse(res, 200, true, "Offer deleted successfully", offer);
  } catch (error) {
    generateResponse(res, 500, false, "Failed to delete offer", null);
  }
};

