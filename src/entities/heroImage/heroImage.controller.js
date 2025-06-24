import { generateResponse } from '../../lib/responseFormate.js';
import {
    createHeroImageService,
    updateHeroImageService,
    getLastThreeHeroImagesService,
    deleteHeroImageService
} from './heroImage.service.js';

export const createHeroImageController = async (req, res) => {
    try {
        const { title } = req.body;
        const file = req?.files?.image?.[0];
        if (!file) throw new Error('Image file is required');
        const heroImage = await createHeroImageService(title, file);

        generateResponse(res, 201, true, 'Hero image created successfully', heroImage);
    } catch (error) {

        console.error(error);

        generateResponse(res, 500, false, 'Failed to create hero image', error.message);
    }
};

export const updateHeroImageController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
         const file = req?.files?.image?.[0];
        if (!file) throw new Error('Image file is required');
        const heroImage = await updateHeroImageService(id, title, file);
        generateResponse(res, 200, true, 'Hero image updated successfully', heroImage);
    } catch (error) {
        generateResponse(res, 500, false, 'Failed to update hero image', error.message);
    }
};

export const getLastThreeHeroImagesController = async (req, res) => {
    try {
        const heroImages = await getLastThreeHeroImagesService();
        generateResponse(res, 200, true, 'Last 3 hero images', heroImages);
    } catch (error) {
        generateResponse(res, 500, false, 'Failed to get last 3 hero images', error.message);
    }
};

export const deleteHeroImageController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteHeroImageService(id);
        generateResponse(res, 200, true, 'Hero image deleted successfully', null);
    } catch (error) {
        console.log(error)
        generateResponse(res, 500, false, 'Failed to delete hero image', error.message);
    }
};
