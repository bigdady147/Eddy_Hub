import { Request, Response, NextFunction } from 'express';
import { featureService } from './feature.service';
import { asyncHandler } from '../../core/asyncHandler';
import { ApiResponse } from '../../core/ApiResponse';
import { ApiError } from '../../core/ApiError';

export const getFeatures = asyncHandler(async (req: Request, res: Response) => {
    const features = await featureService.getAllFeatures();
    res.status(200).json(new ApiResponse(200, { features }, 'Features retrieved successfully'));
});

export const createFeature = asyncHandler(async (req: Request, res: Response) => {
    const { name, key, description } = req.body;
    
    if (!name || !key) {
        throw new ApiError(400, 'Name and key are required');
    }

    const feature = await featureService.createFeature({ name, key, description, isActive: true });
    res.status(201).json(new ApiResponse(201, { feature }, 'Feature created successfully'));
});
