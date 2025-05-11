import api from '../api/api';
import { CurriculumDetailResponseDTO } from '../types/curriculum';

export const fetchCurriculumDetails = async (curriculumId: number): Promise<CurriculumDetailResponseDTO[]> => {
  try {
    const response = await api.get(`/api/curriculum/details/${curriculumId}`);
    console.log('Debug: fetchCurriculumDetails - Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Debug: fetchCurriculumDetails - Error:', error);
    throw error;
  }
};