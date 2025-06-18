import HeroImage from './heroImage.model.js';
import { cloudinaryUpload } from '../../lib/cloudinaryUpload.js';

// Service to create a new hero image
export const createHeroImageService = async (title, imageFile) => {
    if (!imageFile) {
        throw new Error('Image file is required');
    }

    const sanitizedTitle = title.toLowerCase().replace(/\s+/g, "-").replace(/[?&=]/g, "");
    const imgUrl = await cloudinaryUpload(imageFile.path, sanitizedTitle, "hero-images");

    if (imgUrl === "file upload failed") {
        throw new Error('File upload failed');
    }

    const newHeroImage = new HeroImage({
        title,
        image: imgUrl.url,
    });

    return await newHeroImage.save();
};

// Service to update an existing hero image
export const updateHeroImageService = async (id, title, imageFile) => {
    const heroImage = await HeroImage.findById(id);
    if (!heroImage) {
        throw new Error('HeroImage not found');
    }

    let imgUrl;
    if (imageFile) {
        const sanitizedTitle = title.toLowerCase().replace(/\s+/g, "-").replace(/[?&=]/g, "");
        imgUrl = await cloudinaryUpload(imageFile.path, sanitizedTitle, "hero-images");

        if (imgUrl === "file upload failed") {
            throw new Error('File upload failed');
        }
    }

    heroImage.title = title || heroImage.title;
    heroImage.image = imgUrl ? imgUrl.url : heroImage.image;

    return await heroImage.save();
};

// Service to get last 3 hero images
export const getLastThreeHeroImagesService = async () => {
    return await HeroImage.find().sort({ createdAt: -1 }).limit(3);
};

// Service to delete a hero image
export const deleteHeroImageService = async (id) => {
    const heroImage = await HeroImage.findById(id);
    if (!heroImage) {
        throw new Error('HeroImage not found');
    }

    if (heroImage.image) {
        const publicId = heroImage.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
    }

    return await heroImage.remove();
};
