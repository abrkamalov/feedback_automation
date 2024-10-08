<template>
  <div>
    <h1>Guest Feedback Form</h1>
    <form @submit.prevent="submitFeedback">
      <div>
        <label for="guest_name">Guest Name:</label>
        <input v-model="feedback.guest_name" id="guest_name" required />
      </div>
      <div>
        <label for="room_number">Room Number:</label>
        <input v-model="feedback.room_number" id="room_number" required />
      </div>
      <div>
        <label for="content">Feedback:</label>
        <textarea v-model="feedback.content" id="content" required></textarea>
      </div>
      <button type="submit">Submit Feedback</button>
    </form>
  </div>
</template>

<script>
import apiService from '@/services/apiService';

export default {
  data() {
    return {
      feedback: {
        guest_name: '',
        room_number: '',
        content: '',
      },
    };
  },
  methods: {
    async submitFeedback() {
      try {
        await apiService.post('/feedbacks', { feedback: this.feedback });
        alert('Feedback submitted successfully!');
        this.feedback = { guest_name: '', room_number: '', content: '' };
      } catch (error) {
        console.error(error);
        alert('An error occurred while submitting your feedback.');
      }
    },
  },
};
</script>

<style scoped>
/* Add basic styles or use a CSS framework */
</style>
