import apiClient from 'app/lib/api-client';

export interface ChartLimitResponse {
  canGenerate: boolean;
  remainingChartsLimit: number;
  message?: string;
}

export const checkChartLimit = async (): Promise<ChartLimitResponse> => {
  try {
    const response = await apiClient.get('/charts/check-limit');
    return response.data;
  } catch (err: any) {
    console.error('Error checking chart limit:', err);
    throw err.response?.data?.message || 'Error checking chart limit. Please try again later.';
  }
};

export const useChartLimit = async (): Promise<any> => {
  try {
    const response = await apiClient.post('/charts/use-limit');
    return response.data;
  } catch (err: any) {
    console.error('Error using chart limit:', err);
    throw err.response?.data?.message || 'Error updating chart limit. Please try again later.';
  }
};