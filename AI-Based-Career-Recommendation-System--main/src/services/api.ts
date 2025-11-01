const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface CareerFormData {
  name: string;
  age: number;
  education: string;
  skills: string[];
  interests: string[];
}

export interface CareerPredictionResponse {
  career: string;
  status: string;
  message: string;
}

export interface OptionsResponse {
  skills: string[];
  interests: string[];
  education: string[];
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async getOptions(): Promise<OptionsResponse> {
    try {
      const response = await fetch(`${this.baseURL}/options`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching options:', error);
      throw error;
    }
  }

  async predictCareer(formData: CareerFormData): Promise<CareerPredictionResponse> {
    try {
      const response = await fetch(`${this.baseURL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error predicting career:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();