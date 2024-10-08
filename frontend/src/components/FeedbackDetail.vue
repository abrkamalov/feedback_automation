<template>
  <div v-if="feedback">
    <h1>Feedback Detail</h1>
    <p><strong>Guest Name:</strong> {{ feedback.guest_name }}</p>
    <p><strong>Room Number:</strong> {{ feedback.room_number }}</p>
    <p><strong>Feedback:</strong> {{ feedback.content }}</p>
    <h2>Tags</h2>
    <ul>
      <li v-for="tag in feedback.tags" :key="tag.id">{{ tag.name }}</li>
    </ul>
    <h2>Actions</h2>
    <ul>
      <li v-for="action in feedback.action_logs" :key="action.id">
        {{ action.action_type }} - {{ action.status }}
        <p>{{ action.details }}</p>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Loading feedback...</p>
  </div>
</template>

<script>
import { useFeedbackStore } from '@/store/feedbackStore';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const feedbackStore = useFeedbackStore();
    const route = useRoute();
    const feedbackId = route.params.id;

    const feedback = computed(() =>
      feedbackStore.feedbacks.find((f) => f.id === parseInt(feedbackId))
    );

    onMounted(() => {
      if (!feedback.value) {
        feedbackStore.fetchFeedbacks();
      }
    });

    return {
      feedback,
    };
  },
};
</script>

<style scoped>
</style>
