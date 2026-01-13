import api from '../utils/api';
import type { ApiResponse } from '../utils/api';
import type { Feature } from '../types/feature';

export const featureApi = {
  async getFeatures(): Promise<Feature[]> {
    const response = await api.get<ApiResponse<{ features: Feature[] }>>('/features');
    return response.data.data.features;
  },

  async createFeature(data: { name: string; key: string; description?: string }): Promise<Feature> {
    const response = await api.post<ApiResponse<{ feature: Feature }>>('/features', data);
    return response.data.data.feature;
  }
};
