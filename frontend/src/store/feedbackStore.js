import { defineStore } from 'pinia';
import apiService from '@/services/apiService';

export const useFeedbackStore = defineStore('feedback', {
  state: () => ({
    feedbacks: [],
  }),
  actions: {
    async fetchFeedbacks() {
      try {
        const response = await apiService.get('/feedbacks');
        this.feedbacks = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async removeFeedback(id) {
      try {
        await apiService.delete(`/feedbacks/${id}`);
        this.feedbacks = this.feedbacks.filter(feedback => feedback.id !== id);
      } catch (error) {
        console.error('Error removing feedback:', error);
      }
    },
  },
});
