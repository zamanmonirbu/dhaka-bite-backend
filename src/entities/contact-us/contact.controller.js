import { createContactUsService, getAllContactUsService, getContactUsByIdService, updateContactUsService, deleteContactUsService } from './contact.service.js';
import { generateResponse } from '../../lib/responseFormate.js';
import { createPaginationInfo,createFilter } from '../../lib/pagination.js';
import ContactUs from './contact.model.js';

export const createContactController = async (req, res, next) => {
  try {
    const { name, email, subject, phone, message } = req.body;
    const contact = await createContactUsService({ name, email, subject, phone, message });
    generateResponse(res, 201, true, 'Contact us created successfully', contact);
  } catch (error) {
    next(error);
  }
};


export const getAllContactController = async (req, res, next) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const filter = createFilter(search);
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalData = await ContactUs.countDocuments(filter);

    const contacts = await ContactUs.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const pagination = createPaginationInfo(parseInt(page), parseInt(limit), totalData);

    generateResponse(res, 200, true, "Contacts retrieved successfully", {
      data: contacts,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};


export const getContactByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactUsByIdService(id);
    generateResponse(res, 200, true, 'Contact retrieved successfully', contact);
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, subject, phone, message } = req.body;
    const updatedContact = await updateContactUsService(id, { name, email, subject, phone, message });
    generateResponse(res, 200, true, 'Contact updated successfully', updatedContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteContactUsService(id);
    generateResponse(res, 200, true, 'Contact deleted successfully', null);
  } catch (error) {
    next(error);
  }
};

