import type { RouteRecordRaw } from 'vue-router';
import AuthLayout from '../core/layouts/AuthLayout.vue';

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('./views/LoginView.vue'),
        meta: { 
            guest: true,
            layout: AuthLayout
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./views/RegisterView.vue'),
        meta: { 
            guest: true,
            layout: AuthLayout
        }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('./views/ForgotPasswordView.vue'),
        meta: {
            guest: true,
            layout: AuthLayout
        }
    },
    {
        path: '/reset-password/:token',
        name: 'ResetPassword',
        component: () => import('./views/ResetPasswordView.vue'),
        meta: {
            guest: true,
            layout: AuthLayout
        }
    }
];
