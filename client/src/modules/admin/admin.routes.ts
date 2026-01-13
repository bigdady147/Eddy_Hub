import type { RouteRecordRaw } from 'vue-router';

export const adminRoutes: RouteRecordRaw[] = [
    {
        path: '/admin',
        redirect: '/admin/dashboard',
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: () => import('./views/AdminDashboard.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/admin/permissions',
        name: 'PermissionManagement',
        component: () => import('./views/PermissionManagement.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    }
];
