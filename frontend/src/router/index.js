import { createRouter, createWebHistory } from 'vue-router';
import FeedbackForm from '@/components/FeedbackForm.vue';
import AdminDashboard from '@/components/AdminDashboard.vue';
import FeedbackDetail from '@/components/FeedbackDetail.vue';

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
  {
    path: '/feedback/:id',
    name: 'FeedbackDetail',
    component: FeedbackDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
