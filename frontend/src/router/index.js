import { createRouter, createWebHistory } from 'vue-router';
import FeedbackForm from '@/components/FeedbackForm.vue';
import AdminDashboard from '@/components/AdminDashboard.vue';

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
