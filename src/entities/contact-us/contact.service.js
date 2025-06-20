import ContactUs from "./contact.model.js";

export const createContactUsService = async ({ name, email, subject, phone, message }) => {
  if (!name || !email || !subject || !phone || !message) throw new Error('All fields are required');

  const newContactUs = new ContactUs({
    name,
    email,
    subject,
    phone,
    message
  });

  return await newContactUs.save();
};

export const getAllContactUsService = async () => {
  return await ContactUs.find().sort({ createdAt: -1 });
};

export const getContactUsByIdService = async (id) => {
  if (!id) throw new Error('Contact us id is required');

  const contactUs = await ContactUs.findById(id);

  if (!contactUs) throw new Error('Contact us not found');

  return contactUs;
};

export const updateContactUsService = async (id, { name, email, subject, phone, message }) => {
  if (!id) throw new Error('Contact us id is required');

  const contactUs = await ContactUs.findByIdAndUpdate(id, {
    name,
    email,
    subject,
    phone,
    message
  }, { new: true });

  if (!contactUs) throw new Error('Contact us not found');

  return contactUs;
};

export const deleteContactUsService = async (id) => {
  if (!id) throw new Error('Contact us id is required');

  const contactUs = await ContactUs.findByIdAndRemove(id);

  if (!contactUs) throw new Error('Contact us not found');

  return contactUs;
};
