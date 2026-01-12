import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../modules/auth/stores/auth.store';
import { authRoutes } from '../modules/auth/auth.routes';
import { coreRoutes } from '../modules/core/core.routes';

const routes = [
    ...coreRoutes,
    ...authRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore();

    if (authStore.token && !authStore.user) {
        await authStore.fetchUser();
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login');
    } else if (to.meta.guest && authStore.isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;
