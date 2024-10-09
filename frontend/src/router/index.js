import { createRouter, createWebHistory } from 'vue-router';
import FeedbackForm from '@/views/FeedbackForm.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'FeedbackForm',
    component: FeedbackForm,
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
