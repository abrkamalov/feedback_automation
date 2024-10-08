<template>
  <div>
    <h1>Admin Dashboard</h1>
    <table>
      <thead>
        <tr>
          <th>Guest Name</th>
          <th>Room Number</th>
          <th>Feedback</th>
          <th>Tags</th>
          <th>Actions Taken</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feedback in feedbackStore.feedbacks" :key="feedback.id">
          <td>{{ feedback.guest_name }}</td>
          <td>{{ feedback.room_number }}</td>
          <td>{{ feedback.content }}</td>
          <td>
            <ul>
              <li v-for="tag in feedback.tags" :key="tag.id">{{ tag.name }}</li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="action in feedback.action_logs" :key="action.id">
                {{ action.action_type }} - {{ action.status }}
                <p>{{ action.details }}</p>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useFeedbackStore } from '@/store/feedbackStore';

export default {
  setup() {
    const feedbackStore = useFeedbackStore();
    feedbackStore.fetchFeedbacks();

    return {
      feedbackStore,
    };
  },
};
</script>

<style scoped>
</style>
