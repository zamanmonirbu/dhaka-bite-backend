import { cloudinaryUpload } from '../../lib/cloudinaryUpload.js';
import Location from './location.model.js';

// Service to create a new location image
export const createLocationImageService = async (title, imageFile) => {
    if (!imageFile) {
        throw new Error('Image file is required');
    }

    const sanitizedTitle = title.toLowerCase().replace(/\s+/g, "-").replace(/[?&=]/g, "");
    const imgUrl = await cloudinaryUpload(imageFile.path, sanitizedTitle, "location-image");

    if (imgUrl === "file upload failed") {
        throw new Error('File upload failed');
    }

    const newLocation = new Location({
        title,
        image: imgUrl.url,
    });

    return await newLocation.save();
};

// Service to update an existing location image
export const updateLocationImageService = async (id, title, imageFile) => {
    const locationImage = await Location.findById(id);
    if (!locationImage) {
        throw new Error('LocationImage not found');
    }

    let imgUrl;
    if (imageFile) {
        const sanitizedTitle = title.toLowerCase().replace(/\s+/g, "-").replace(/[?&=]/g, "");
        imgUrl = await cloudinaryUpload(imageFile.path, sanitizedTitle, "location-image");

        if (imgUrl === "file upload failed") {
            throw new Error('File upload failed');
        }
    }

    locationImage.title = title || locationImage.title;
    locationImage.image = imgUrl ? imgUrl.url : locationImage.image;

    return await locationImage.save();
};

// Service to get last 3 location images
export const getLastThreeLocationImagesService = async () => {
    return await Location.findOne().sort({ createdAt: -1 });
};

// Service to delete a location image
export const deleteLocationImageService = async (id) => {
    const locationImage = await Location.findById(id);
    if (!locationImage) {
        throw new Error('LocationImage not found');
    }

    if (locationImage.image) {
        const publicId = locationImage.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
    }

    return await locationImage.remove();
};

