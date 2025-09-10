import axios from 'axios';

interface HealthInsightRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user_profile: Record<string, any>;
  health_goals: string[];
}

class AIAgentService {
  private baseURL = '/api/ai';

  async generateInsights(request: HealthInsightRequest) {
    try {
      const response = await axios.post(
        `${this.baseURL}/generate-insights`, 
        request
      );
      return response.data;
    } catch (error) {
      console.error('AI Insights Generation Error', error);
      throw error;
    }
  }
}

export const aiAgentService = new AIAgentService();