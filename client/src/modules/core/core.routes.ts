import type { RouteRecordRaw } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';

export const coreRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/HomeView.vue'),
        meta: { 
            requiresAuth: true,
            layout: MainLayout 
        }
    }
];
