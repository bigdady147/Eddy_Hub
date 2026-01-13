import api from '../utils/api';
import type { ApiResponse } from '../utils/api';

export interface FeatureRequest {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  feature: {
    _id: string;
    name: { vi: string; en: string } | string;
    key: string;
    description?: { vi: string; en: string };
    icon: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  requestMessage?: string;
  responseMessage?: string;
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: {
    _id: string;
    username: string;
  };
}

export const featureRequestApi = {
  async submitBulkRequests(featureIds: string[]): Promise<{ created: number; requests: FeatureRequest[] }> {
    const response = await api.post<ApiResponse<{ created: number; requests: FeatureRequest[] }>>('/feature-requests/bulk', { featureIds });
    return response.data.data;
  },

  async getMyRequests(): Promise<FeatureRequest[]> {
    const response = await api.get<ApiResponse<FeatureRequest[]>>('/feature-requests/my-requests');
    return response.data.data;
  },

  async cancelRequest(requestId: string): Promise<void> {
    await api.delete(`/feature-requests/${requestId}`);
  },

  // Admin methods
  async getStats(): Promise<{ total: number; pending: number; approved: number; rejected: number }> {
    const response = await api.get<ApiResponse<{ total: number; pending: number; approved: number; rejected: number }>>('/feature-requests/stats');
    return response.data.data;
  },

  async getAllRequests(): Promise<FeatureRequest[]> {
    const response = await api.get<ApiResponse<FeatureRequest[]>>('/feature-requests');
    return response.data.data;
  },

  async approveRequest(requestId: string, message?: string): Promise<FeatureRequest> {
    const response = await api.patch<ApiResponse<FeatureRequest>>(`/feature-requests/${requestId}/approve`, { responseMessage: message });
    return response.data.data;
  },

  async rejectRequest(requestId: string, message?: string): Promise<FeatureRequest> {
    const response = await api.patch<ApiResponse<FeatureRequest>>(`/feature-requests/${requestId}/reject`, { responseMessage: message });
    return response.data.data;
  }
};
